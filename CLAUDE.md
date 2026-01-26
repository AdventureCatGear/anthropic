# CLAUDE.md - AI Assistant Guide for Bitcoin Academy

This document provides essential context for AI assistants working on the Bitcoin Academy codebase.

## Project Overview

Bitcoin Academy is an **interactive educational web application** that teaches Bitcoin and blockchain technology through immersive learning experiences. It features animated visualizations, interactive demos, and comprehensive learning modules.

**Repository**: Educational web app with no backend - purely frontend React application.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2 | UI framework |
| TypeScript | 5.9 | Type safety |
| Vite | 7.2 | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 11.0 | Animations |
| Lucide React | 0.469 | Icon library |
| ESLint | 9.x | Code linting |

## Project Structure

```
bitcoin-academy/
├── src/
│   ├── components/           # React components
│   │   ├── Hero.tsx         # Landing page with animated intro
│   │   ├── ModuleCard.tsx   # Educational module preview cards
│   │   ├── ModuleDetail.tsx # Full module content modal
│   │   ├── BlockchainVisualization.tsx  # Interactive blockchain demo
│   │   ├── MiningDemo.tsx   # Proof-of-work mining simulator
│   │   └── TransactionDemo.tsx  # Transaction confirmation demo
│   ├── data/
│   │   └── modules.ts       # Educational content and Module type
│   ├── App.tsx              # Main app with state management
│   ├── index.css            # Global styles and Tailwind utilities
│   └── main.tsx             # React entry point
├── public/                   # Static assets
├── index.html               # HTML template
├── tailwind.config.js       # Custom colors, animations
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config (references app/node)
├── eslint.config.js         # ESLint flat config
├── netlify.toml             # Netlify deployment config
└── vercel.json              # Vercel deployment config
```

## Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server at http://localhost:5173
npm run build    # TypeScript check + production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Key Architecture Patterns

### Component Structure

Components follow this pattern:
- **TypeScript interfaces** for props at the top
- **Functional components** with hooks
- **Framer Motion** for all animations
- **Tailwind classes** for styling (no separate CSS files per component)

Example pattern:
```tsx
import { motion } from 'framer-motion';
import { IconName } from 'lucide-react';

interface ComponentProps {
  prop: Type;
  onAction: () => void;
}

export default function Component({ prop, onAction }: ComponentProps) {
  const [state, setState] = useState<Type>(initial);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="tailwind-classes"
    >
      {/* Content */}
    </motion.div>
  );
}
```

### State Management

- **Local state only** - no Redux/Zustand
- App.tsx manages: `showHero` (boolean), `selectedModule` (Module | null)
- Demo components manage their own simulation state

### Data Types

The main data type is `Module` defined in `src/data/modules.ts`:
```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;       // Emoji
  content: { heading: string; text: string; }[];
  keyPoints: string[];
}
```

## Styling Conventions

### Color Palette

Custom colors defined in `tailwind.config.js`:
- **Bitcoin Orange**: `#F7931A` - Primary accent (`text-bitcoin-orange`, `bg-bitcoin-orange`)
- **Dark theme**: Gradients from `gray-900` to `black`

### Custom Utilities

Defined in `src/index.css`:
- `.text-gradient` - Orange to yellow gradient text
- `.card-gradient` - Semi-transparent card backgrounds with blur

### Animation Classes

Custom Tailwind animations:
- `animate-float` - Floating vertical motion
- `animate-glow` - Pulsing opacity

### Common Patterns

```tsx
// Card styling
className="card-gradient border border-gray-700/50 rounded-3xl p-8"

// Gradient text
className="text-gradient"

// Primary button
className="bg-gradient-to-r from-bitcoin-orange to-yellow-500 text-black px-8 py-3 rounded-full font-semibold"

// Hover effects
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

## Code Conventions

### TypeScript

- Strict mode enabled
- Use `interface` for props, `type` for unions/primitives
- Export types alongside data: `export type { Module }`

### React

- Functional components only (no class components)
- Default exports for components
- Named exports for data/types
- Use `AnimatePresence` for exit animations

### Naming

- **Components**: PascalCase (`ModuleCard.tsx`)
- **Data files**: camelCase (`modules.ts`)
- **CSS classes**: Tailwind utilities
- **Event handlers**: `on` prefix (`onStart`, `onClose`)

### Imports Order

1. React/external libraries
2. Local components
3. Data/types
4. Styles (if any)

## Interactive Demos

Three interactive simulations demonstrate blockchain concepts:

1. **BlockchainVisualization** - Click "Mine New Block" to add blocks showing hash linking
2. **MiningDemo** - Adjustable difficulty slider, simulates proof-of-work attempts
3. **TransactionDemo** - Send simulated transactions, watch 6 confirmations

## Deployment

The app deploys to static hosting. Configuration exists for:

- **Netlify** (`netlify.toml`): SPA redirect rules configured
- **Vercel** (`vercel.json`): Vite framework auto-detected

Build output goes to `dist/` directory.

## Important Notes for AI Assistants

1. **No backend** - This is a static educational site
2. **Keep animations smooth** - Use Framer Motion, not CSS transitions
3. **Mobile-first** - All components should be responsive
4. **Dark theme** - Never add light backgrounds
5. **Educational focus** - Content accuracy matters for Bitcoin concepts
6. **Emoji icons** - Module icons are emojis, not icon components
7. **No external APIs** - All demos are client-side simulations

## Common Tasks

### Adding a New Module

1. Add module object to `modules` array in `src/data/modules.ts`
2. Follow existing structure: id, title, description, icon, content[], keyPoints[]

### Adding a New Demo Component

1. Create component in `src/components/`
2. Use `card-gradient` styling pattern
3. Import and add to App.tsx in the demos section
4. Manage simulation state locally

### Modifying Styles

1. Custom colors go in `tailwind.config.js`
2. Custom utilities go in `src/index.css` under `@layer utilities`
3. Use existing color palette (bitcoin-orange, grays)

## Testing

Currently no test framework is configured. To add tests:
- Recommended: Vitest (Vite-native)
- Add to `package.json` devDependencies
- Create `src/__tests__/` or `*.test.tsx` files
