# Local Agent Collective — M3 Ultra / 256GB

A design for a multi-agent system that runs entirely on a 2026 Mac Studio (M3 Ultra, 256GB unified memory). Optimized for: resident multi-model serving, tiered memory, overnight autonomous work, and cross-model consensus to suppress drift.

---

## 1. Hardware Budget (256GB unified memory)

Unified memory is the key advantage: models, vector stores, and working RAM share one pool at ~800GB/s. Everything below is sized to stay resident — no disk paging, no model swap.

| Allocation | Size | Purpose |
|---|---|---|
| Resident models (hot set) | ~140 GB | 3–4 models kept in memory simultaneously |
| Vector DB (Qdrant/LanceDB) | ~20 GB | Embeddings + payload, mmap'd |
| Graph DB (Memgraph) | ~12 GB | Entity/relation knowledge graph |
| Working KV caches | ~30 GB | Long-context sessions across agents |
| Orchestrator + tools + OS | ~30 GB | Everything else |
| Headroom | ~24 GB | Burst for overnight batch jobs |

**Why resident matters:** with agents that hand off mid-thought, a 20-second model load kills the pattern. With 256GB you don't swap; you co-resident.

---

## 2. Model Roster

Run via **MLX** (Apple Silicon native, ~2× faster than llama.cpp here) fronted by **Ollama** or a thin FastAPI layer. Don't use vLLM — Metal support is poor.

| Role | Model | Approx. size (Q4/Q5) | Why |
|---|---|---|---|
| **Lead reasoner** | Llama 3.3 70B or Qwen 2.5 72B | ~45 GB | Strong general reasoning, long context |
| **Second opinion** | DeepSeek-V3 or Mixtral 8x22B | ~50 GB | Different training lineage → genuinely different errors |
| **Code specialist** | Qwen2.5-Coder 32B | ~20 GB | SOTA local coding, fits with room to spare |
| **Fast workhorse** | Llama 3.2 3B or Phi-4 14B | ~2–8 GB | Summarization, routing, tool-arg extraction |
| **Vision** | Qwen2-VL 72B or Llama 3.2 Vision 11B | ~8–45 GB | Screenshot/diagram reading |
| **Embedding** | nomic-embed-text-v1.5 | ~0.5 GB | Fast, good quality |
| **Reranker** | bge-reranker-v2-m3 | ~0.6 GB | Cuts hallucination at retrieval boundary |

The **diversity of training lineage** (Meta / Alibaba / DeepSeek / Mistral) is deliberate — it's the basis of the consensus layer (§6).

---

## 3. Memory Architecture — Four Tiers

```
┌─────────────────────────────────────────────────────────────┐
│ TIER 1: Working (KV cache, current context)                 │
│   - Per-agent, 32k–128k tokens                              │
│   - Lives in RAM, dies with session                         │
├─────────────────────────────────────────────────────────────┤
│ TIER 2: Session (Redis, hours–days)                         │
│   - Scratchpads, tool outputs, inter-agent messages         │
│   - Persistent across agent restarts within a session       │
├─────────────────────────────────────────────────────────────┤
│ TIER 3: Semantic (Qdrant + SQLite)                          │
│   - Embedded chunks of everything ever said/read            │
│   - Retrieved by similarity + metadata filter               │
├─────────────────────────────────────────────────────────────┤
│ TIER 4: Structured (Memgraph knowledge graph)               │
│   - Entities, relations, facts with provenance + confidence │
│   - The "trimmed, understood" layer                         │
└─────────────────────────────────────────────────────────────┘
```

**The distinction that matters:** Tier 3 is everything you've seen; Tier 4 is what you understand. The overnight cycle (§5) is the process that promotes T3 → T4.

### Session Extension (long / collaborative sessions)

The problem: one agent fills 128k tokens; five collaborating agents each need their own context but share a growing workspace.

Strategy — **hierarchical working memory**:

1. **Active window** (per agent): last N turns, verbatim.
2. **Rolling summary**: Phi-4 compresses each ~8k-token stretch as it ages out. Summaries are structured: `{decisions, open_questions, artifacts, deferred}`.
3. **Shared workspace**: a single append-only Tier-2 doc every agent reads/writes. Like a war-room whiteboard.
4. **On-demand retrieval**: when an agent needs something from earlier, it queries Tier 3 with the reranker instead of scrolling.

Net effect: a 5-agent session can run for 12+ hours of wall-clock work without context exhaustion, because no agent ever carries the full history — they carry *their* slice plus retrieval rights.

---

## 4. Agent Roles & Orchestration

Use **LangGraph** or a custom state machine. Keep the roster small — more agents ≠ better.

| Agent | Model | Job |
|---|---|---|
| **Orchestrator** | 70B | Plans, delegates, ends turns |
| **Researcher** | 70B + tools | Web, docs, retrieval |
| **Coder** | Qwen-Coder 32B | Writes/edits/runs code |
| **Critic** | Second-opinion 70B | Reviews outputs, demands citations |
| **Memory Steward** | Phi-4 14B | Curates T2→T4 promotion, runs overnight |
| **Librarian** | Phi-4 + embed/rerank | Handles retrieval requests |

Communication: **Redis streams** as a message bus. Each agent subscribes to relevant topics. Simple, debuggable, persists across crashes.

---

## 5. Overnight Cycle (launchd job, ~11pm–7am)

A `launchd` plist kicks off the nightly pipeline. Phases run in order; each phase produces artifacts the next can read.

### Phase A — Ingest & Distill (30–60 min)
- Walk the day's transcripts, tool outputs, and artifacts.
- Memory Steward chunks + embeds new content → Tier 3.
- Extracts candidate facts: `(subject, predicate, object, source, confidence)`.

### Phase B — Consolidate (1–2 hrs)
- Dedupe candidate facts against Tier 4.
- Resolve contradictions: when new fact conflicts with existing, run a **two-model adjudication** (lead + second-opinion); log both verdicts. Lower the confidence of contested facts rather than deleting.
- Promote high-confidence, corroborated facts into the graph.
- **Trim**: Tier 3 chunks older than 30 days with zero retrieval hits and no graph promotions get archived to cold storage (still queryable, not in hot index).

### Phase C — Self-Review (30 min)
- Steward reads the day's decisions and tool calls.
- Produces a `patterns.md`: which prompts worked, which retrievals returned junk, which tools errored.
- Proposes prompt deltas and tool-description tweaks. **Does not apply them automatically** — queues them in `proposed_changes/` for morning approval. (Auto-mutating prompts is how agent systems quietly degrade.)

### Phase D — Deep Work (variable, bounded by wall clock)
This is the "overnight discussion" you asked for. The user queues tasks during the day:

```
queue/
  research-quantum-error-correction.task
  design-api-for-thing.task
  debug-intermittent-failure.task
```

Each task spawns a **debate loop**:
1. Lead proposes an approach.
2. Critic (different model) attacks it. Must cite specific weaknesses.
3. Lead revises or defends.
4. Loop until convergence or N rounds, whichever first.
5. A third model (fast workhorse) judges whether consensus is genuine or exhausted.

Artifacts accumulate in `overnight/<task-id>/` — notes, code, citations, dissents.

### Phase E — Morning Brief (15 min)
- Generate `morning-brief.md` with: completed tasks, unresolved dissents, proposed self-improvements, flagged contradictions.
- Optionally render to slides via a Marp or Reveal.js template.
- Desktop notification at your chosen wake time.

---

## 6. Consensus / Anti-Drift Layer

Not a single feature — a set of habits baked into the orchestration:

**1. Mandatory citation for factual claims.** Any claim an agent emits that isn't from its own reasoning must carry a source id (T3 chunk, T4 fact, or tool output). Claims without citations get flagged by the Critic and either cited or softened to opinion.

**2. Two-model vote on consequential outputs.** Before code runs, before a "final answer" is returned, before a graph write — the output goes to a second model (different lineage). Disagreement → third tiebreaker or escalate to human. Cost: ~2× tokens on final steps only, not every turn.

**3. Confidence decay.** Every Tier-4 fact has a `last_verified` timestamp. Confidence decays linearly with age. Nightly job re-verifies a sampled subset against primary sources.

**4. Devil's-advocate prompt for the Critic.** The Critic agent's system prompt specifically rewards finding holes, not agreeing. Measured over time: Critic-caught errors per 100 outputs — this is a health metric for the system.

**5. Contradiction log.** Every resolved contradiction stays in a log with both sides. This is how you catch a model that's been quietly confabulating on a topic for weeks.

**6. Ground-truth anchors.** A small set of known-true facts (dates, math identities, code that compiles) are injected into random eval runs. A model that starts missing these is drifting and gets quarantined.

---

## 7. Tech Stack Summary

| Layer | Pick | Why |
|---|---|---|
| Model serving | **MLX** + Ollama frontend | Native Apple Silicon, fastest on M3 |
| Orchestration | **LangGraph** (or custom) | Explicit state, replayable |
| Message bus | **Redis streams** | Simple, persistent, debuggable |
| Vector store | **Qdrant** (or LanceDB) | Rust, fast, good filtering |
| Graph store | **Memgraph** | Cypher-compatible, in-memory, fast |
| Doc/session store | **SQLite + FTS5** | Zero-ops, durable |
| Scheduler | **launchd** | Native, reliable |
| Tool sandbox | **Docker** or **bwrap-like** via macOS sandbox-exec | Contain code-exec agent |
| Observability | **OpenTelemetry** + local Grafana | See what the agents are doing |
| Morning brief | **Marp** (MD → slides) | Fits the markdown-first workflow |

---

## 8. Proposed Directory Layout

```
agent-collective/
├── ARCHITECTURE.md              # this file
├── config/
│   ├── models.yaml              # model registry, quantization, context limits
│   ├── agents.yaml              # agent roster, system prompts, tools
│   └── overnight.yaml           # nightly pipeline config
├── orchestrator/                # LangGraph state machine
├── agents/                      # per-agent definitions + prompts
├── memory/
│   ├── working/                 # KV cache adapters
│   ├── semantic/                # Qdrant client + chunkers
│   └── graph/                   # Memgraph schemas + writers
├── tools/                       # web, shell, code-exec, etc.
├── consensus/                   # multi-model vote, citation checker
├── overnight/
│   ├── pipeline.py              # phases A–E
│   ├── queue/                   # user-submitted tasks
│   └── artifacts/               # dated output folders
├── evals/                       # ground-truth anchors, drift tests
├── brief/                       # morning-brief templates
└── ops/
    ├── launchd/                 # plist files
    └── telemetry/               # OTel collector config
```

---

## 9. Phased Build (realistic order)

**Phase 1 — Foundation (week 1–2):** MLX + Ollama serving 2 models, Qdrant up, Redis up, a single orchestrator that can call both models and log to SQLite. No overnight. No graph yet.

**Phase 2 — Memory (week 3–4):** Chunker + embedder pipeline, reranker, retrieval tool. Rolling summary for sessions.

**Phase 3 — Multi-agent (week 5–6):** Orchestrator + Researcher + Critic. Citation discipline. Two-model vote on final answers.

**Phase 4 — Graph + overnight lite (week 7–8):** Memgraph, fact extraction, Phases A–C of the overnight cycle. Skip the debate loop for now.

**Phase 5 — Overnight debate + brief (week 9–10):** Phase D debate loop, morning brief generator.

**Phase 6 — Self-review gate (week 11+):** Proposed-changes queue, evals, drift monitoring. This is the part that keeps the system honest long-term.

---

## 10. Realistic Limits

Worth stating plainly:

- **Local 70B ≠ Claude/GPT-4 class.** Don't expect frontier quality on hard reasoning. The multi-model consensus narrows the gap on factual tasks; on deep novel reasoning it doesn't close it.
- **"Self-optimizing" is bounded.** The system can tune prompts, retrieval params, and tool descriptions. It cannot meaningfully retrain models overnight on this hardware — LoRA fine-tuning of a 70B in 8 hours is possible but fragile, and I'd skip it until everything else is solid.
- **Overnight wall-clock is finite.** ~8 hours × ~20 tok/s on a 70B ≈ 500k tokens of generation. That's enough for real work, but not unlimited. Task queue needs priorities.
- **Drift control reduces but doesn't eliminate hallucination.** Citation discipline + two-model vote catches a large fraction; nothing catches all of it. The contradiction log is how you find the residual.

---

## Next Step

If you want, I can scaffold Phase 1 — the config files, a working `orchestrator/` that calls two local models with logging, and the launchd plist stubs — so you have a running skeleton to grow from. Say the word and I'll build it.
