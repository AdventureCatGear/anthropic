import { motion } from 'framer-motion';
import { useState } from 'react';

interface Ingredient {
  name: string;
  icon: string;
  description: string;
  benefit: string;
  source: string;
}

const ingredients: Ingredient[] = [
  {
    name: 'Sugarcane Extract',
    icon: '🌿',
    description: 'Natural surfactant derived from sugarcane',
    benefit: 'Creates a clear, anti-fog barrier on lens surface',
    source: 'Sustainably grown sugarcane plants'
  },
  {
    name: 'Corn Glucose',
    icon: '🌽',
    description: 'Plant-based sugar from corn',
    benefit: 'Helps formula spread evenly across the lens',
    source: 'Agricultural corn production'
  },
  {
    name: 'Aloe Vera',
    icon: '🌱',
    description: 'Soothing plant extract',
    benefit: 'Gentle on eyes and skin, adds moisture',
    source: 'Aloe vera plant leaves'
  },
  {
    name: 'Natural Oils',
    icon: '💧',
    description: 'Plant-derived essential oils',
    benefit: 'Water-resistant protection layer',
    source: 'Coconut and plant oils'
  },
  {
    name: 'Radish Root Ferment',
    icon: '🥕',
    description: 'Natural antimicrobial preservative',
    benefit: 'Keeps formula fresh without harsh chemicals',
    source: 'Fermented radish root extract'
  },
  {
    name: 'Food-Grade Minerals',
    icon: '✨',
    description: 'Safe mineral compounds',
    benefit: 'Enhances anti-fog effectiveness',
    source: 'Natural mineral deposits'
  }
];

export default function IngredientWheel() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? ingredients[selectedIndex] : null;

  return (
    <motion.div
      className="card-gradient border border-cyan-700/50 rounded-3xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-2xl font-bold mb-2 text-center text-gradient">
        Plant-Based Ingredients
      </h3>
      <p className="text-cyan-300/80 text-center mb-8">
        Click on any ingredient to learn more about it
      </p>

      {/* Ingredient wheel */}
      <div className="flex justify-center mb-8">
        <div className="relative w-72 h-72">
          {/* Center circle */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-reef-teal to-reef-cyan flex items-center justify-center shadow-lg shadow-reef-teal/30"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-4xl">💧</span>
          </motion.div>

          {/* Ingredient circles */}
          {ingredients.map((ingredient, i) => {
            const angle = (i * 360) / ingredients.length - 90;
            const radius = 100;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.button
                key={i}
                className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
                  selectedIndex === i
                    ? 'bg-reef-teal shadow-lg shadow-reef-teal/50 scale-110'
                    : 'bg-slate-800/80 hover:bg-slate-700/80'
                }`}
                style={{
                  top: `calc(50% + ${y}px - 32px)`,
                  left: `calc(50% + ${x}px - 32px)`,
                }}
                onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: selectedIndex === i ? 1.1 : 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                {ingredient.icon}
              </motion.button>
            );
          })}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {ingredients.map((_, i) => {
              const angle = (i * 360) / ingredients.length - 90;
              const innerRadius = 45;
              const outerRadius = 85;
              const x1 = 144 + Math.cos((angle * Math.PI) / 180) * innerRadius;
              const y1 = 144 + Math.sin((angle * Math.PI) / 180) * innerRadius;
              const x2 = 144 + Math.cos((angle * Math.PI) / 180) * outerRadius;
              const y2 = 144 + Math.sin((angle * Math.PI) / 180) * outerRadius;

              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={selectedIndex === i ? '#0D9488' : '#164E63'}
                  strokeWidth={selectedIndex === i ? 3 : 2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.3 }}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected ingredient info */}
      <motion.div
        className="min-h-[200px]"
        initial={false}
        animate={{ opacity: 1 }}
      >
        {selected ? (
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-900/50 rounded-2xl p-6 border border-reef-teal/30"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{selected.icon}</span>
              <div>
                <h4 className="text-xl font-bold text-white">{selected.name}</h4>
                <p className="text-cyan-400">{selected.description}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-reef-teal/10 rounded-xl p-4">
                <p className="text-sm text-reef-aqua font-semibold mb-1">Benefit</p>
                <p className="text-cyan-100">{selected.benefit}</p>
              </div>
              <div className="bg-reef-ocean/10 rounded-xl p-4">
                <p className="text-sm text-reef-aqua font-semibold mb-1">Source</p>
                <p className="text-cyan-100">{selected.source}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-cyan-400 bg-slate-900/30 rounded-2xl p-8">
            <p className="text-center">
              Click on any ingredient above to learn what makes Reef Clear special
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
