#!/usr/bin/env python3
"""Builds the three self-contained walkthrough files from captures/.

    python3 build.py

Every capture is cut into the same three pieces (header, left menu, content) and
shown inside one fixed frame, so nothing moves between screens. Scrolled captures
of the same page are stitched into one tall page. Coordinates below are pixels in
the original capture, exactly as you would read them off the screenshot.
"""
import base64, io, json, os
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
CAP = os.path.join(HERE, "captures")
TOP, HEAD, SIDE = 87, 48, 200          # browser chrome, product header, left menu
BODY = TOP + HEAD                      # y where the menu/content start in a capture
STAGE_W = 1529


def cap(n):
    return Image.open(os.path.join(CAP, f"{n}.png")).convert("RGB")


def content_right(im):                 # drop the page scrollbar at the right edge
    return 1472 if im.width == 1490 else 1511


def find_shift(a, b):
    """How far capture b is scrolled below capture a."""
    x1 = content_right(a) - 6
    A = np.asarray(a).astype(int)[BODY:-2, 210:x1].mean(2)
    B = np.asarray(b).astype(int)[BODY:-2, 210:x1].mean(2)
    h = A.shape[0]
    best = min(range(100, h - 60), key=lambda s: np.abs(A[s + 12:h] - B[12:h - s]).mean())
    err = np.abs(A[best + 12:h] - B[12:h - best]).mean()
    assert err < 1.0, f"captures do not overlap cleanly (error {err:.2f})"
    return best


def data_uri(im):
    buf = io.BytesIO()
    im.save(buf, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


class Builder:
    def __init__(self):
        self.images, self.offsets = {}, {}

    def img(self, key, im):
        if key not in self.images:
            self.images[key] = data_uri(im)
        return key

    def header(self, n, theme):
        return self.img(f"head_{theme}", cap(n).crop((0, TOP, STAGE_W, BODY)))

    def page(self, caps, right=None):
        """Content + menu for one screen; several caps = one stitched scrolling page."""
        ims = [cap(n) for n in caps]
        x1 = right or content_right(ims[0])
        strips, off = [], 0
        for i, im in enumerate(ims):
            self.offsets[caps[i]] = off
            top = BODY if i == 0 else BODY + 40           # join inside the overlap
            strips.append((off + top - BODY, im.crop((SIDE, top, x1, im.height - 2))))
            if i + 1 < len(ims):
                off += find_shift(im, ims[i + 1])
        h = strips[-1][0] + strips[-1][1].height
        out = Image.new("RGB", (x1 - SIDE, h))
        for y, s in strips:
            out.paste(s, (0, y))
        side = ims[0].crop((0, BODY, SIDE, ims[0].height - 2))
        k = "_".join(map(str, caps))
        return self.img(f"page_{k}", out), out.size, self.img(f"side_{k}", side)

    def crop(self, n, box):
        im = cap(n).crop(box)
        return self.img(f"crop_{n}_{box[0]}_{box[1]}", im), im.size

    # ---- coordinate conversion: capture pixels -> layer pixels ----
    def rect(self, spec):
        layer, r = spec[0], list(spec[-1])
        if layer == "c":
            r[0] -= SIDE; r[1] += self.offsets[spec[1]] - BODY
        elif layer == "s":
            r[1] -= BODY
        elif layer == "h":
            r[1] -= TOP
        return layer, r

    def hot(self, spec, **kw):
        layer, r = self.rect(spec)
        return dict(l=layer, r=r, **kw)


def screen(b, label, caps, theme="light", tab=True, right=None):
    key, (w, h), side = b.page(caps, right)
    return dict(label=label, theme=theme, content=key, cw=w, ch=h, side=side, tab=tab,
                hot=[], patches=[], overlays={})


def patch(b, n, x, y, w, text, **style):
    """Paint over a piece of text in the content and set new text in its place."""
    _, r = b.rect(("c", n, [x, y - 9, w, 18]))
    return dict(r=r, text=text, **style)


LINK = dict(color="#0072a3", underline=True)

# ---------------------------------------------------------------------------
# Shared screens
# ---------------------------------------------------------------------------

def home(b, to_ai=None, to_opt=None, to_rs=None):
    s = screen(b, "Home", [22])
    if to_ai:
        s["hot"] += [b.hot(("s", [0, 303, 200, 28]), go=to_ai, label="AI & Tokenomics"),
                     b.hot(("c", 22, [1053, 207, 413, 231]), go=to_ai, label="Open AI & Tokenomics")]
    else:
        s["hot"].append(b.hot(("c", 22, [1053, 207, 413, 231]), title="Multicloud AI Tokenomics",
            text="AI model cost and token consumption sit on the executive dashboard next to the cloud bill. The AI spend walkthrough goes deeper into this."))
    if to_opt:
        s["hot"].append(b.hot(("s", [0, 274, 200, 28]), go=to_opt, label="Recommendations"))
    if to_rs:
        s["hot"] += [b.hot(("s", [0, 331, 200, 28]), go=to_rs, label="Realized Savings"),
                     b.hot(("c", 22, [209, 847, 1257, 310]), go=to_rs, label="Open Realized Savings")]
    else:
        s["hot"].append(b.hot(("c", 22, [209, 847, 1257, 310]), title="Realized Savings",
            text="Savings actually captured, month by month, with the running total as a line: $2,594,311 last month and $41,428,230 over the last 12 months."))
    s["hot"] += [
        b.hot(("c", 22, [209, 207, 835, 231]), title="Month-to-date cost per cloud",
            text="Headline effective cost for each cloud this month. Every figure is a link to the report behind it."),
        b.hot(("c", 22, [209, 447, 414, 391]), title="Multi Cloud by LOB",
            text="Spend grouped by line of business rather than by account, across GCP, AWS and Azure. A Perspective maps accounts and tags to the way the business is organised."),
        b.hot(("c", 22, [631, 447, 835, 391]), title="Provider split and trend",
            text="Share of spend per provider, and effective cost per month. This is a custom dashboard: each tile is a saved report."),
    ]
    return s


# ---------------------------------------------------------------------------
# Scenario 1: AI spend
# ---------------------------------------------------------------------------

def scenario_ai():
    b = Builder()
    b.header(47, "light")
    S = {}
    S["home"] = home(b, to_ai="ai")

    ai = S["ai"] = screen(b, "AI & Tokenomics", [9, 20, 21])
    ai["hot"] = [
        b.hot(("s", [0, 162, 200, 28]), go="home", label="Home"),
        b.hot(("c", 9, [209, 686, 625, 472]), go="rep_model", label="Open Cost by Model report"),
        b.hot(("c", 21, [209, 208, 625, 472]), go="rep_mp", label="Open Multi-Provider AI Cost and Usage by Model"),
        b.hot(("c", 9, [209, 207, 414, 471]), title="Total Cost by Provider",
            text="Monthly AI spend split by cloud: Azure, Google Cloud and AWS on one chart, climbing through the year."),
        b.hot(("c", 9, [631, 207, 835, 471]), title="By subcategory and by service",
            text="The same spend cut two more ways: by kind of workload (search, generative AI, virtual machines, AI platforms) and by individual service. Next Series pages through the smaller ones."),
        b.hot(("c", 9, [843, 686, 623, 472]), title="Tokenomics",
            text="Effective cost per one million tokens, ranked by model. It shows which models are expensive per token and which are cheap, so teams can match the model to the job."),
        b.hot(("c", 20, [209, 320, 625, 471]), title="Processing Mode Details",
            text="Cost split by how requests were run: standard, batch or priority. Batch is usually the cheaper way to run work that can wait."),
        b.hot(("c", 20, [843, 320, 623, 471]), title="Caching Details",
            text="Cost split by token type: input, output, cached reads and cached writes. A large cached-read share means prompt caching is doing its job."),
        b.hot(("c", 20, [209, 838, 1257, 152]), title="Frontier Lab AI",
            text="Spend that comes directly from the model providers rather than through a cloud marketplace: cache efficiency, total tokens consumed and total cost, each linked to its report."),
        b.hot(("c", 21, [843, 208, 623, 472]), title="By provider",
            text="Daily direct spend with Anthropic and OpenAI side by side."),
        b.hot(("c", 21, [209, 688, 1257, 472]), title="By user",
            text="Daily AI cost attributed to individual users. This is where 'who is spending it?' gets answered."),
    ]

    rm = S["rep_model"] = screen(b, "Cost by Model", [10])
    rm["hot"] = [
        b.hot(("c", 10, [213, 137, 54, 20]), go="ai", label="Back"),
        b.hot(("s", [0, 162, 200, 28]), go="home", label="Home"),
        b.hot(("s", [0, 405, 200, 28]), go="ai", label="AI & Tokenomics"),
        b.hot(("c", 10, [215, 222, 1015, 26]), title="Report controls",
            text="Every dashboard card opens as a full report you can reshape: chart type, interval, time period, axes and the category to group by."),
        b.hot(("c", 10, [215, 275, 1255, 355]), title="Effective cost per day by model",
            text="One stacked bar per day and one colour per model, across every cloud: Gemini, Claude and GPT model families on the same axis."),
        b.hot(("c", 10, [215, 686, 1260, 370]), title="Per-model daily costs",
            text="One row per model with the cost for every day, sortable and exportable. This is where the long tail of small experiments shows up."),
    ]

    def report(label, n, tab=True):
        s = screen(b, label, [n], tab=tab)
        s["hot"] = [b.hot(("c", n, [213, 137, 54, 20]), go="ai", label="Back"),
                    b.hot(("s", [0, 162, 200, 28]), go="home", label="Home"),
                    b.hot(("s", [0, 405, 200, 28]), go="ai", label="AI & Tokenomics")]
        return s

    mp = S["rep_mp"] = report("Multi-Provider report", 11)
    mp["hot"] += [
        b.hot(("c", 11, [797, 222, 146, 25]), go="rep_mp@yaxis", label="Open the Y-Axis options"),
        b.hot(("c", 11, [215, 275, 1255, 355]), title="Effective cost per day by model name",
            text="Direct spend with the model providers, by exact model version."),
        b.hot(("c", 11, [215, 686, 1260, 370]), title="Per-model table",
            text="The table always matches the chart. Export downloads it for a spreadsheet or a finance review."),
        b.hot(("c", 11, [1265, 179, 206, 21]), title="Subscriptions and Actions",
            text="Subscriptions delivers the report to people on a schedule. Actions holds the save and share options."),
    ]

    # Y-Axis dropdown: a close-up capture, placed exactly under the chip it belongs to
    key, (w, h) = b.crop(60, (9, 34, 246, 255))
    mp["overlays"]["yaxis"] = dict(src=key, w=w, h=h, kind="pop", x=797, y=245 - TOP, hot=[
        dict(l="o", r=[40, 171, 192, 23], go="rep_usage", label="Usage Quantity"),
        dict(l="o", r=[40, 55, 192, 112], title="Measures",
             text="What the chart plots: cache efficiency, effective cost, effective cost per one million tokens, list cost or usage quantity."),
    ])

    us = S["rep_usage"] = report("Usage view", 31, tab=False)
    us["hot"] += [
        b.hot(("c", 31, [1180, 224, 74, 20]), go="rep_usage@filters", label="Open All Filters"),
        b.hot(("c", 31, [215, 275, 1255, 355]), title="Usage quantity per day",
            text="The same report with the Y-axis switched from cost to tokens used."),
    ]
    panels = [("filters", 32), ("pick", 33), ("set", 34)]
    for oid, n in panels:
        key, (w, h) = b.crop(n, (1057, BODY, 1490, 1164))
        us["overlays"][oid] = dict(src=key, w=w, h=h, kind="panel", hot=[])
    us["overlays"]["filters"]["hot"] = [
        dict(l="o", r=[8, 314, 180, 22], go="rep_usage@pick", label="Expand User"),
        dict(l="o", r=[8, 146, 180, 166], title="Filter groups",
             text="Filter on any dimension in the dataset: AI attributes, cost, organization, project, provider, services, usage or user."),
        dict(l="o", r=[84, 36, 62, 16], go="rep_usage", label="Close panel"),
    ]
    us["overlays"]["pick"]["hot"] = [
        dict(l="o", r=[154, 536, 228, 26], go="rep_usage@set", label="Pick this user"),
        dict(l="o", r=[84, 36, 62, 16], go="rep_usage", label="Close panel"),
    ]
    us["overlays"]["set"]["hot"] = [
        dict(l="o", r=[12, 33, 62, 22], go="rep_user", label="Apply"),
        dict(l="o", r=[84, 36, 62, 16], go="rep_usage", label="Close panel"),
    ]

    ru = S["rep_user"] = report("One user's usage", 35)
    ru["hot"] += [
        b.hot(("c", 35, [215, 275, 1255, 320]), title="One user's token usage",
            text="The report now shows a single user: which models they called and how many tokens each day."),
        b.hot(("c", 35, [215, 667, 1260, 268]), title="Model by day",
            text="Four models for this user, with a total row. The same filter works for a business unit, a team or a project."),
        b.hot(("c", 35, [1180, 224, 92, 20]), title="All Filters (1)",
            text="The badge shows one filter is applied."),
    ]

    T = lambda s, spec, title, text, **kw: dict(s=s, title=title, text=text, **dict(zip(("l", "r"), b.rect(spec))), **kw)
    O = lambda s, r, title, text, **kw: dict(s=s, l="o", r=r, title=title, text=text, **kw)
    tour = [
        T("home", ("c", 22, [209, 207, 1257, 231]), "Start with the executive view",
          "A CFO dashboard puts cloud cost and AI cost on one page."),
        T("home", ("c", 22, [1053, 207, 413, 231]), "AI has its own line",
          "AI model cost and tokens consumed are tracked alongside the cloud bill.", do="Click the tile to open AI & Tokenomics.", act="ai"),
        T("ai", ("c", 9, [209, 207, 414, 471]), "AI spend across every cloud",
          "Azure, Google Cloud and AWS on one chart, month by month."),
        T("ai", ("c", 9, [843, 686, 623, 472]), "Tokenomics: cost per million tokens",
          "The unit cost of every model, ranked. It answers: are we using an expensive model where a cheap one would do?"),
        T("ai", ("c", 20, [209, 320, 1257, 471]), "How the tokens were bought",
          "Batch versus standard processing, and cached versus uncached tokens. These are the two biggest levers on AI unit cost."),
        T("ai", ("c", 20, [209, 838, 1257, 152]), "Direct provider spend",
          "Spend that goes straight to the model providers is pulled in too, with cache efficiency and total tokens."),
        T("ai", ("c", 21, [209, 688, 1257, 472]), "Down to the user",
          "Daily cost attributed to the individual people calling the models."),
        T("ai", ("c", 21, [209, 208, 625, 472]), "Open the report behind a card",
          "Every card is a summary of a full report.", do="Click this card.", act="rep_mp"),
        T("rep_mp", ("c", 11, [797, 222, 146, 25]), "Reshape the report",
          "Cost is one way to look at it. The Y-axis can plot other measures.", do="Click the Y-Axis control.", act="rep_mp@yaxis"),
        O("rep_mp@yaxis", [40, 171, 192, 23], "Pick a measure",
          "Cost, list cost, cost per one million tokens, cache efficiency or tokens used.", do="Click Usage Quantity.", act="rep_usage"),
        T("rep_usage", ("c", 31, [1180, 224, 74, 20]), "Filter it even further",
          "The chart now shows tokens used per day. Filters narrow it to exactly the slice you care about.", do="Click All Filters.", act="rep_usage@filters"),
        O("rep_usage@filters", [8, 314, 180, 22], "Filter on any dimension",
          "Organization, project, provider, user and more.", do="Click User.", act="rep_usage@pick"),
        O("rep_usage@pick", [154, 536, 228, 26], "Pick a person",
          "Users are listed by name.", do="Click the ticked user.", act="rep_usage@set"),
        O("rep_usage@set", [12, 33, 62, 22], "Apply the filter",
          "One user is selected.", do="Click Apply.", act="rep_user"),
        T("rep_user", ("c", 35, [215, 275, 1255, 320]), "One person's AI usage",
          "Which models this user called and how many tokens, each day. The same filter works for a business unit, a team or a project: from total spend to one group or one person in a few clicks."),
    ]
    return dict(file="ai-spend.html", title="Where is our AI spend going?", start="home", screens=S, tour=tour, images=b.images)


# ---------------------------------------------------------------------------
# Scenario 2: bring your own data
# ---------------------------------------------------------------------------

DC_NAMES = ["Azure Databricks Prod", "Finance Allocations", "Databricks Analytics", "Unit Economics Monthly",
            "Unit Economics Daily", "Unit Economics Summary", "Snowflake Spend", "Databricks ML Platform",
            "Datadog Spend", "MongoDB Atlas Spend", "Private Cloud Chargeback", "Databricks Data Science",
            "Databricks Sandbox", "SaaS Licenses", "Databricks Shared Services", "Colocation Invoices",
            "Reseller Invoices", "Support Contracts", "Vendor Credits", "Marketplace Purchases"]


def scenario_data():
    b = Builder()
    b.header(47, "light")
    S = {}
    side_ds = b.hot(("s", [0, 247, 200, 28]), go="datasets", label="Reporting")

    dc = S["connect"] = screen(b, "Data Connect", [36])
    key, (w, h) = b.crop(37, (284, 394, 1206, 858))
    dc["overlays"]["choose"] = dict(src=key, w=w, h=h, kind="dialog", hot=[
        dict(l="o", r=[353, 256, 216, 143], go="meta", label="Anthropic"),
        dict(l="o", r=[119, 94, 684, 143], title="Cloud and file sources",
             text="AWS cost and usage exports, CSV or Parquet uploads for any provider that isn't natively supported, and Databricks system tables."),
        dict(l="o", r=[119, 256, 215, 143], title="OpenAI",
             text="Imports OpenAI spend and token usage by project and model through the Usage and Costs APIs."),
        dict(l="o", r=[588, 256, 215, 143], title="GitHub Copilot",
             text="Imports GitHub Copilot usage and adoption metrics by organization and team."),
        dict(l="o", r=[836, 418, 66, 25], go="connect", label="Cancel"),
        dict(l="o", r=[878, 16, 28, 28], go="connect", label="Close"),
    ])
    dc["hot"] = [
        b.hot(("c", 36, [1334, 151, 137, 24]), go="connect@choose", label="Add Data Connect"),
        b.hot(("s", [0, 247, 200, 28]), go="datasets", label="Reporting"),
        b.hot(("c", 36, [220, 286, 1250, 765]), title="Your connections",
            text="Each row is a source of cost or usage data brought in from outside the three big clouds: Databricks workspaces, file uploads and direct provider APIs, with a health status and last collection time."),
    ]
    dc["patches"] = [patch(b, 36, 268, y, 262, name, **LINK) for name, y in zip(DC_NAMES,
        [325, 360, 395, 430, 465, 500, 535, 569, 604, 639, 674, 709, 744, 779, 814, 849, 884, 919, 954, 989])]
    dc["patches"].append(dict(r=b.rect(("c", 36, [222, 1012, 1230, 9]))[1], text=""))   # half-visible last row
    # Connection health: most healthy, two warnings (rows 6 and 13) and one failure (row 16) left as captured.
    rows = [325, 360, 395, 430, 465, 500, 535, 569, 604, 639, 674, 709, 744, 779, 814, 849, 884, 919, 954, 989]
    times = ["6:02 AM", "6:02 AM", "6:04 AM", "6:05 AM", "6:05 AM", "", "6:07 AM", "6:08 AM", "6:09 AM", "6:11 AM",
             "6:12 AM", "6:12 AM", "", "6:14 AM", "6:15 AM", "", "6:16 AM", "6:18 AM", "6:19 AM", "6:21 AM"]
    for i, y in enumerate(rows):
        if i in (5, 12, 15):
            continue
        dc["patches"].append(dict(r=b.rect(("c", 36, [992, y - 9, 112, 26]))[1], text="", badge=True))
        if times[i]:
            dc["patches"].append(patch(b, 36, 1154, y, 170, "Nov 14, 2026 " + times[i]))

    me = S["meta"] = screen(b, "New connection", [42], right=1527)
    me["hot"] = [
        b.hot(("c", 42, [244, 416, 57, 26]), go="auth", label="Next"),
        b.hot(("c", 42, [214, 569, 66, 26]), go="connect", label="Cancel"),
        b.hot(("c", 42, [220, 142, 76, 16]), go="connect", label="Data Connect"),
        side_ds,
        b.hot(("c", 42, [217, 221, 1295, 332]), title="Three steps",
            text="Name the connection, authenticate, then review the schema CloudHealth infers from the provider's data."),
    ]
    au = S["auth"] = screen(b, "Authentication", [43], tab=False, right=1527)
    au["hot"] = [
        b.hot(("c", 43, [214, 602, 66, 26]), go="connect", label="Cancel"),
        b.hot(("c", 43, [220, 142, 76, 16]), go="connect", label="Data Connect"),
        side_ds,
        b.hot(("c", 43, [243, 345, 730, 180]), title="Authentication",
            text="An Analytics API key plus the organization ID and name. Once connected, spend and token usage by workspace and model are collected on a schedule."),
    ]

    ds = S["datasets"] = screen(b, "Datasets", [49])
    key, (w, h) = b.crop(50, (304, 442, 1225, 824))
    ds["overlays"]["choose"] = dict(src=key, w=w, h=h, kind="dialog", hot=[
        dict(l="o", r=[317, 77, 268, 285], go="form", label="Join Datasets"),
        dict(l="o", r=[29, 77, 269, 285], title="Curate Dataset",
             text="Start from one dataset and keep only the columns, filters and calculations you need."),
        dict(l="o", r=[604, 77, 268, 285], title="Merge Datasets",
             text="Stack datasets that share the same columns into one, adding rows rather than columns."),
        dict(l="o", r=[877, 16, 28, 28], go="datasets", label="Close"),
    ])
    ds["hot"] = [
        b.hot(("c", 49, [1390, 151, 120, 24]), go="datasets@choose", label="Create Dataset"),
        b.hot(("s", [0, 645, 200, 28]), go="connect", label="Data Connect"),
        b.hot(("c", 49, [220, 238, 1289, 790]), title="Datasets",
            text="Everything you can report on. CloudHealth provides datasets for each cloud, for AI cost and usage, and for FOCUS; Data Connect sources and your own custom datasets sit alongside them."),
    ]
    ds["patches"] = [
        patch(b, 49, 268, 277, 232, "Consolidated Waste Reporting", **LINK),
        patch(b, 49, 268, 788, 232, "Policy Flex Orgs", **LINK),
        patch(b, 49, 268, 827, 232, "Policy Block Coverage", **LINK),
        patch(b, 49, 268, 866, 232, "Policy Violation Assets", **LINK),
        patch(b, 49, 268, 932, 232, "Multicloud Marketplace", **LINK),
        patch(b, 49, 1170, 277, 140, "Dean Tandoor"), patch(b, 49, 1170, 932, 140, "Dean Tandoor"),
        patch(b, 49, 1170, 788, 140, "Ivan Tanev"), patch(b, 49, 1170, 827, 140, "Ivan Tanev"),
        patch(b, 49, 1170, 866, 140, "Ivan Tanev"),
    ]

    crumb = lambda n: b.hot(("c", n, [220, 142, 50, 16]), go="datasets", label="Datasets")
    fo = S["form"] = screen(b, "Create Dataset", [51])
    fo["hot"] = [
        b.hot(("c", 51, [223, 535, 1283, 26]), go="select", label="Dataset selection"),
        b.hot(("c", 51, [1383, 183, 60, 21]), go="datasets", label="Cancel"), crumb(51),
        b.hot(("c", 51, [243, 285, 640, 225]), title="Name and description",
            text="Custom dataset names start with CUSTOM_ so they are easy to tell apart from the built-in ones. A dataset can stay private or be shared with the organization."),
    ]
    se = S["select"] = screen(b, "Select datasets", [55], tab=False)
    se["hot"] = [
        b.hot(("c", 55, [223, 833, 1283, 26]), go="curate", label="Configuration"),
        b.hot(("c", 55, [1383, 183, 60, 21]), go="datasets", label="Cancel"), crumb(55),
        b.hot(("c", 55, [243, 575, 730, 245]), title="Two datasets, one view",
            text="A join adds columns by combining two datasets that share row values. Here AWS Cost History is joined with Azure AI Cost and Usage."),
    ]
    cu = S["curate"] = screen(b, "Join and curate", [57])
    for oid, n, hots in [
        ("measures", 26, [dict(l="o", r=[18, 170, 290, 705], title="Measures",
            text="The numeric columns to bring in from each dataset: cost in several forms, savings, and usage quantity. Switch the Column Dataset to choose from the other side of the join.")]),
        ("dims", 30, [dict(l="o", r=[18, 195, 290, 155], title="AI dimensions",
            text="The AI dataset carries its own dimensions: model, model provider, token type, processing mode, modality and more. Any of them can become a column in the new dataset."),
            dict(l="o", r=[18, 170, 290, 22], title="Dimension groups",
            text="Dimensions are grouped by account, billing, charge, perspective, provider, region, service, time and usage.")]),
    ]:
        key, (w, h) = b.crop(n, (1169, BODY, 1490, 1164))
        cu["overlays"][oid] = dict(src=key, w=w, h=h, kind="panel",
            hot=hots + [dict(l="o", r=[12, 33, 62, 22], go="curate", label="Apply"),
                        dict(l="o", r=[84, 36, 62, 16], go="curate", label="Close")])
    cu["hot"] = [
        b.hot(("c", 57, [470, 893, 110, 21]), go="curate@measures", label="Add Measures"),
        b.hot(("c", 57, [637, 929, 118, 21]), go="curate@dims", label="Add Dimensions"),
        b.hot(("c", 57, [1383, 183, 60, 21]), go="datasets", label="Cancel"), crumb(57),
        b.hot(("c", 57, [253, 385, 610, 165]), title="Type of join",
            text="Inner, left, right or full. A full outer join keeps every row from both datasets, matched where possible."),
        b.hot(("c", 57, [253, 570, 1227, 125]), title="Join columns",
            text="The columns the two datasets have in common. Here they are matched on month."),
        b.hot(("c", 57, [253, 785, 400, 28]), title="UI or SQL",
            text="Build the dataset with the controls below, or switch to SQL Query and write it directly."),
        b.hot(("c", 57, [223, 1074, 1268, 26]), title="Preview",
            text="Preview shows the resulting rows before you create the dataset. Once created, it appears in the Datasets list and can be used in any report or dashboard."),
    ]

    T = lambda s, spec, title, text, **kw: dict(s=s, title=title, text=text, **dict(zip(("l", "r"), b.rect(spec))), **kw)
    O = lambda s, r, title, text, **kw: dict(s=s, l="o", r=r, title=title, text=text, **kw)
    tour = [
        T("connect", ("c", 36, [220, 286, 1250, 300]), "Not all spend comes from the big three clouds",
          "Data Connect brings in everything else: Databricks, file uploads and direct provider APIs, ready to report on."),
        T("connect", ("c", 36, [1334, 151, 137, 24]), "Add a source",
          "A connection takes a few minutes.", do="Click Add Data Connect.", act="connect@choose"),
        O("connect@choose", [119, 94, 684, 305], "Choose what to connect",
          "AWS exports, file uploads, Databricks, OpenAI, Anthropic and GitHub Copilot.", do="Click Anthropic to connect an AI provider.", act="meta"),
        T("meta", ("c", 42, [217, 221, 1295, 332]), "Three steps",
          "Name the connection, authenticate, review the schema.", do="Click Next.", act="auth"),
        T("auth", ("c", 43, [243, 345, 730, 180]), "An API key is all it needs",
          "No exports or spreadsheets to maintain: spend and token usage by workspace and model are collected automatically and sit next to your cloud costs."),
        T("auth", ("s", [0, 247, 200, 28]), "Now shape the data",
          "Connected sources become datasets you can report on.", do="Click Reporting to open Datasets.", act="datasets"),
        T("datasets", ("c", 49, [220, 145, 1290, 520]), "One catalogue of datasets",
          "Built-in datasets for each cloud, AI and FOCUS, next to Data Connect sources and your own custom ones.", do="Click Create Dataset to build one.", act="datasets@choose"),
        O("datasets@choose", [317, 77, 268, 285], "Curate, join or merge",
          "Join adds columns by combining two datasets that share row values.", do="Click Join Datasets.", act="form", pos="above"),
        T("form", ("c", 51, [223, 240, 1283, 321]), "Name it",
          "Custom dataset names start with CUSTOM_, and a dataset can stay private or be shared with the organization.", do="Click Dataset selection.", act="select"),
        T("select", ("c", 55, [223, 535, 1283, 324]), "The two datasets to join",
          "Already chosen here: AWS Cost History as Dataset 1 and Azure AI Cost and Usage as Dataset 2.", do="Click Configuration.", act="curate"),
        T("curate", ("c", 57, [253, 385, 1227, 310]), "Define the join",
          "Choose the join type and the columns the two datasets share. Here they are matched on month."),
        T("curate", ("c", 57, [470, 893, 110, 21]), "Choose what to keep",
          "Measures are the numbers; dimensions are what you group them by.", do="Click Add Measures.", act="curate@measures"),
        O("curate@measures", [8, 28, 304, 850], "Measures from either side",
          "Cost, savings and usage columns from the AWS dataset. Switch Column Dataset to pick from the Azure AI one.", do="Click Apply.", act="curate"),
        T("curate", ("c", 57, [637, 929, 118, 21]), "And the dimensions",
          "The columns you will group and filter by.", do="Click Add Dimensions.", act="curate@dims"),
        O("curate@dims", [18, 195, 290, 155], "AI-specific dimensions",
          "Model, model provider, token type, processing mode: the AI dataset's own vocabulary. Create then saves the dataset for use in any report or dashboard."),
    ]
    return dict(file="bring-your-data.html", title="Bring your own data", start="connect", screens=S, tour=tour, images=b.images)


# ---------------------------------------------------------------------------
# Scenario 3: savings
# ---------------------------------------------------------------------------

def scenario_savings():
    b = Builder()
    b.header(47, "light")
    S = {}
    S["home"] = home(b, to_opt="opt", to_rs="realized")

    def side_exp(home_=True):          # menu with Recommendations expanded (captures 47, 48)
        return [b.hot(("s", [0, 162, 200, 28]), go="home", label="Home"),
                b.hot(("s", [0, 301, 200, 26]), go="opt", label="Optimization"),
                b.hot(("s", [0, 326, 200, 26]), go="right", label="Rightsizing"),
                b.hot(("s", [0, 408, 200, 28]), go="realized", label="Realized Savings")]

    op = S["opt"] = screen(b, "Optimization", [47], right=1527)
    op["hot"] = side_exp() + [
        b.hot(("c", 47, [649, 760, 431, 392]), go="right", label="Open Rightsizing"),
        b.hot(("c", 47, [870, 345, 200, 60]), go="realized", label="Open Realized Savings"),
        b.hot(("c", 47, [209, 280, 650, 232]), title="Savings Summary",
            text="$230,283 of potential monthly savings over the last 30 days, split by where it comes from: rightsizing, commitments, anomalies and wasted resources."),
        b.hot(("c", 47, [209, 520, 871, 232]), title="Commitment summaries",
            text="For spend-based commitments (Savings Plans) and resource-based ones (Reserved Instances): what buying more would save, current coverage, what is about to expire and what is underutilized."),
        b.hot(("c", 47, [209, 760, 432, 392]), title="Active Anomalies",
            text="Unusual spend detected in the last 30 days, with the service and cost impact of each. Each date links to the anomaly."),
        b.hot(("c", 47, [1088, 280, 432, 352]), title="Optimization Best Practices",
            text="Built-in guidance on the order to do things in: know your KPIs, optimize before you buy, and repeat often."),
        b.hot(("c", 47, [1088, 640, 432, 392]), title="Wasted Resource Summary",
            text="Unused or unattached assets that are ready to delete, such as empty app service plans, aged snapshots and stopped instances, with a count for each."),
    ]
    ri = S["right"] = screen(b, "Rightsizing", [48], right=1527)
    ri["hot"] = side_exp() + [
        b.hot(("c", 48, [217, 278, 424, 484]), title="Potential savings by top 5 services",
            text="$115,866 a month, the same figure as on the Optimization page, split into what comes from downsizing and what comes from terminating."),
        b.hot(("c", 48, [649, 278, 423, 316]), title="Cost by top 5 services",
            text="Current monthly cost against what it would be if the recommendations were applied."),
        b.hot(("c", 48, [1080, 278, 424, 466]), title="Terminate recommendations",
            text="Specific actions with a monthly saving against each. Every line opens the list of instances involved."),
        b.hot(("c", 48, [214, 196, 404, 24]), title="Filters",
            text="Rightsizing covers AWS, Azure and Google Cloud together, and can be narrowed to one provider or billing account."),
        b.hot(("c", 48, [310, 237, 132, 24]), title="Recommendations tab",
            text="The full list of rightsizing recommendations, resource by resource."),
    ]
    rs = S["realized"] = screen(b, "Realized Savings", [44, 45, 46])
    rs["hot"] = [
        b.hot(("s", [0, 162, 200, 28]), go="home", label="Home"),
        b.hot(("s", [0, 274, 200, 28]), go="opt", label="Recommendations"),
        b.hot(("c", 44, [209, 318, 1296, 312]), title="Realized Savings",
            text="What was actually saved each month and where it came from: eliminated resources, downsized resources, commitment discounts and negotiated discounts. The line is the running total."),
        b.hot(("c", 44, [209, 679, 644, 352]), title="Commitment Savings",
            text="Monthly savings from spend-based and resource-based commitments."),
        b.hot(("c", 44, [861, 679, 644, 352]), title="Commitment Coverage",
            text="How much eligible usage is covered by a commitment, month by month."),
        b.hot(("c", 45, [209, 339, 644, 312]), title="Commitment Utilization",
            text="How much of what was committed is actually being used. Low utilization is money already spent and not put to work."),
        b.hot(("c", 45, [209, 699, 644, 392]), title="Effective Savings Rate",
            text="The return on negotiated and commitment discounts: what you saved as a share of what you would have paid at list price."),
        b.hot(("c", 46, [209, 382, 644, 392]), title="Downsized Resources",
            text="Savings realized by moving resources to a smaller size, by service, as either savings or a count of resources."),
        b.hot(("c", 46, [209, 782, 644, 392]), title="Eliminated Resources",
            text="Savings realized by terminating unused or decommissioned resources."),
    ]

    T = lambda s, spec, title, text, **kw: dict(s=s, title=title, text=text, **dict(zip(("l", "r"), b.rect(spec))), **kw)
    tour = [
        T("home", ("c", 22, [209, 847, 1257, 310]), "The question every CFO asks",
          "Are we actually saving money? $2,594,311 last month and $41,428,230 over 12 months says yes. Start with what could still be saved."),
        T("home", ("s", [0, 274, 200, 28]), "Where the next savings are",
          "Recommendations lists every saving CloudHealth has found that hasn't been acted on yet, with a monthly value on each.", do="Click Recommendations.", act="opt"),
        T("opt", ("c", 47, [209, 280, 650, 232]), "Everything still on the table",
          "$230,283 a month of potential savings, split by source."),
        T("opt", ("c", 47, [209, 520, 871, 232]), "Commitments",
          "What buying more would save, how much is covered today, and how much already bought is going unused."),
        T("opt", ("c", 47, [209, 760, 432, 392]), "Anomalies",
          "Unusual spend is flagged with its cost impact, before it becomes next month's surprise."),
        T("opt", ("c", 47, [649, 760, 431, 392]), "The biggest slice: rightsizing",
          "Half of the potential savings comes from resources that are bigger than they need to be.", do="Click the Rightsizing Summary.", act="right"),
        T("right", ("c", 48, [217, 278, 424, 484]), "Which services are oversized",
          "The five services with the most to give back: $115,866 a month in total, split into what downsizing saves and what terminating saves."),
        T("right", ("c", 48, [1080, 278, 424, 466]), "Specific actions, with a price on each",
          "Not 'optimize compute' but a named action and its monthly saving."),
        T("right", ("s", [0, 408, 200, 28]), "From potential to proven",
          "A recommendation only counts once someone acts on it. Realized Savings shows what was actually captured.", do="Click Realized Savings.", act="realized"),
        T("realized", ("c", 44, [209, 318, 1296, 312]), "Savings you can prove",
          "Realized savings by month and by source, with the cumulative total."),
        T("realized", ("c", 44, [209, 679, 1296, 352]), "Commitments, measured",
          "Savings and coverage from commitments over the year."),
        T("realized", ("c", 45, [209, 699, 644, 392]), "Effective Savings Rate",
          "One number for the return on your discounts, tracked over time. The slide from about 60% to 33% also shows there is room to save more."),
        T("realized", ("c", 46, [209, 382, 644, 792]), "Closing the loop",
          "Savings from downsizing and eliminating resources: the recommendations you saw earlier, turned into results."),
    ]
    return dict(file="savings.html", title="Are we actually saving money?", start="home", screens=S, tour=tour, images=b.images)


def main():
    tpl = open(os.path.join(HERE, "template.html"), encoding="utf8").read()
    fonts = {w: base64.b64encode(open(os.path.join(HERE, "fonts", f"metropolis-latin-{w}-normal.woff2"), "rb").read()).decode()
             for w in (400, 500, 600)}
    font_css = "".join(
        f"@font-face{{font-family:Metropolis;font-weight:{w};src:url(data:font/woff2;base64,{d}) format('woff2')}}"
        for w, d in fonts.items())
    scenarios = [scenario_ai(), scenario_data(), scenario_savings()]
    nav = [dict(file=s["file"], title=s["title"]) for s in scenarios]
    for s in scenarios:
        for sid in {t["s"].split("@")[0] for t in s["tour"]} | {s["start"]}:
            assert sid in s["screens"], sid
        cfg = dict(title=s["title"], start=s["start"], screens=s["screens"], tour=s["tour"],
                   images=s["images"], nav=nav, file=s["file"])
        html = (tpl.replace("/*FONTS*/", font_css).replace("__TITLE__", s["title"])
                   .replace("__CFG__", json.dumps(cfg, separators=(",", ":"))))
        open(os.path.join(HERE, s["file"]), "w", encoding="utf8").write(html)
        print(f"{s['file']}: {len(html) / 1e6:.1f} MB, {len(s['screens'])} screens, {len(s['tour'])} tour steps")


if __name__ == "__main__":
    main()
