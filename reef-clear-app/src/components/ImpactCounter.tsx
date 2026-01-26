import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, Waves, Trash2 } from 'lucide-react';

export default function ImpactCounter() {
  const [bottles, setBottles] = useState(1);
  const bottlesPulled = bottles * 3;

  return (
    <motion.div
      className="card-gradient border border-cyan-700/50 rounded-3xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-2xl font-bold mb-2 text-center text-gradient">
        Impact Calculator
      </h3>
      <p className="text-cyan-300/80 text-center mb-8">
        See how many plastic bottles you'll help remove from the ocean
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        {/* Bottles to purchase */}
        <div className="text-center">
          <p className="text-sm text-cyan-400 mb-3">Reef Clear bottles purchased</p>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setBottles(Math.max(1, bottles - 1))}
              className="w-12 h-12 rounded-full bg-reef-teal/20 border border-reef-teal/50 flex items-center justify-center hover:bg-reef-teal/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="w-5 h-5 text-reef-aqua" />
            </motion.button>
            <motion.div
              key={bottles}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-6xl font-bold text-white w-20 text-center"
            >
              {bottles}
            </motion.div>
            <motion.button
              onClick={() => setBottles(Math.min(100, bottles + 1))}
              className="w-12 h-12 rounded-full bg-reef-teal/20 border border-reef-teal/50 flex items-center justify-center hover:bg-reef-teal/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-5 h-5 text-reef-aqua" />
            </motion.button>
          </div>
        </div>

        {/* Equals sign with animation */}
        <motion.div
          className="text-4xl text-reef-aqua"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          =
        </motion.div>

        {/* Bottles removed */}
        <div className="text-center">
          <p className="text-sm text-cyan-400 mb-3">Plastic bottles removed from ocean</p>
          <motion.div
            key={bottlesPulled}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold text-gradient"
          >
            {bottlesPulled}
          </motion.div>
        </div>
      </div>

      {/* Visual representation */}
      <div className="relative h-32 bg-gradient-to-b from-reef-ocean/20 to-reef-deep/40 rounded-2xl overflow-hidden mb-6">
        {/* Ocean waves at top */}
        <motion.div
          className="absolute top-0 left-0 right-0 flex gap-1 justify-center"
          animate={{
            x: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Waves className="w-full h-8 text-reef-cyan/30" />
        </motion.div>

        {/* Animated bottles being removed */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 flex-wrap p-4">
          {Array.from({ length: Math.min(bottlesPulled, 21) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [20, 0, 0, -30],
              }}
              transition={{
                delay: i * 0.1,
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <Trash2 className="w-6 h-6 text-reef-coral/70" />
            </motion.div>
          ))}
          {bottlesPulled > 21 && (
            <motion.span
              className="text-reef-aqua font-bold text-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              +{bottlesPulled - 21} more!
            </motion.span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-slate-900/50 rounded-xl p-4">
          <motion.p
            key={`weight-${bottlesPulled}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-reef-aqua"
          >
            {(bottlesPulled * 0.02).toFixed(2)} kg
          </motion.p>
          <p className="text-xs text-cyan-400">Plastic removed</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-4">
          <motion.p
            key={`co2-${bottlesPulled}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-reef-aqua"
          >
            {(bottlesPulled * 0.08).toFixed(2)} kg
          </motion.p>
          <p className="text-xs text-cyan-400">CO2 prevented</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-4">
          <motion.p
            key={`fish-${bottlesPulled}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-reef-aqua"
          >
            {bottlesPulled * 2}
          </motion.p>
          <p className="text-xs text-cyan-400">Marine animals protected</p>
        </div>
      </div>
    </motion.div>
  );
}
