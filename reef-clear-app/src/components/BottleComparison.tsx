import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

interface BottleType {
  name: string;
  icon: string;
  material: string;
  decomposition: string;
  plasticContent: string;
  carbonFootprint: string;
  features: { text: string; good: boolean }[];
}

const bottles: Record<string, BottleType> = {
  traditional: {
    name: 'Traditional Plastic',
    icon: '🛢️',
    material: 'Petroleum-based PET',
    decomposition: '450+ years',
    plasticContent: '100% petroleum plastic',
    carbonFootprint: 'High CO2 emissions',
    features: [
      { text: 'Made from fossil fuels', good: false },
      { text: 'Takes 450+ years to decompose', good: false },
      { text: 'Releases microplastics', good: false },
      { text: 'Contributes to ocean pollution', good: false },
      { text: 'Cheap to produce', good: true },
    ]
  },
  wheatStraw: {
    name: 'Wheat Straw Bioplastic',
    icon: '🌾',
    material: 'Agricultural waste + bio-polymer',
    decomposition: 'Much faster breakdown',
    plasticContent: '40% less petroleum plastic',
    carbonFootprint: 'Reduced CO2 emissions',
    features: [
      { text: 'Made from agricultural waste', good: true },
      { text: 'Reduces crop burning emissions', good: true },
      { text: '40% less petroleum plastic', good: true },
      { text: 'Supports sustainable farming', good: true },
      { text: 'Step toward plastic-free future', good: true },
    ]
  }
};

export default function BottleComparison() {
  const [selectedBottle, setSelectedBottle] = useState<'traditional' | 'wheatStraw'>('wheatStraw');
  const bottle = bottles[selectedBottle];

  return (
    <motion.div
      className="card-gradient border border-cyan-700/50 rounded-3xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-2xl font-bold mb-2 text-center text-gradient">
        Bottle Material Comparison
      </h3>
      <p className="text-cyan-300/80 text-center mb-8">
        Compare traditional plastic vs. our wheat straw bioplastic
      </p>

      {/* Toggle buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          onClick={() => setSelectedBottle('traditional')}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            selectedBottle === 'traditional'
              ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
              : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-slate-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Traditional Plastic
        </motion.button>
        <motion.button
          onClick={() => setSelectedBottle('wheatStraw')}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            selectedBottle === 'wheatStraw'
              ? 'bg-reef-teal/20 border-2 border-reef-teal text-reef-aqua'
              : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-slate-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Wheat Straw Bioplastic
        </motion.button>
      </div>

      {/* Bottle visualization */}
      <div className="flex justify-center mb-8">
        <motion.div
          key={selectedBottle}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-48 h-48 rounded-3xl flex items-center justify-center text-8xl ${
            selectedBottle === 'wheatStraw'
              ? 'bg-gradient-to-br from-reef-teal/20 to-reef-cyan/20 border-2 border-reef-teal/50'
              : 'bg-gradient-to-br from-red-900/20 to-orange-900/20 border-2 border-red-500/50'
          }`}
        >
          <motion.span
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {bottle.icon}
          </motion.span>
        </motion.div>
      </div>

      {/* Stats grid */}
      <motion.div
        key={`stats-${selectedBottle}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-slate-900/50 rounded-xl p-4 text-center">
          <p className="text-xs text-cyan-400 mb-1">Material</p>
          <p className="text-sm font-semibold text-white">{bottle.material}</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-4 text-center">
          <p className="text-xs text-cyan-400 mb-1">Decomposition</p>
          <p className="text-sm font-semibold text-white">{bottle.decomposition}</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-4 text-center">
          <p className="text-xs text-cyan-400 mb-1">Plastic Content</p>
          <p className="text-sm font-semibold text-white">{bottle.plasticContent}</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-4 text-center">
          <p className="text-xs text-cyan-400 mb-1">Carbon Footprint</p>
          <p className="text-sm font-semibold text-white">{bottle.carbonFootprint}</p>
        </div>
      </motion.div>

      {/* Features list */}
      <motion.div
        key={`features-${selectedBottle}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3"
      >
        {bottle.features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              feature.good
                ? 'bg-reef-teal/10 border border-reef-teal/30'
                : 'bg-red-900/10 border border-red-500/30'
            }`}
          >
            {feature.good ? (
              <Check className="w-5 h-5 text-reef-teal flex-shrink-0" />
            ) : (
              <X className="w-5 h-5 text-red-500 flex-shrink-0" />
            )}
            <span className={feature.good ? 'text-cyan-100' : 'text-red-300'}>
              {feature.text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Wheat straw process (shown only for wheat straw) */}
      {selectedBottle === 'wheatStraw' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-gradient-to-r from-reef-teal/10 to-reef-cyan/10 border border-reef-teal/30 rounded-2xl"
        >
          <h4 className="text-lg font-bold text-white mb-4 text-center">
            From Farm Waste to Bottle
          </h4>
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            {[
              { emoji: '🌾', label: 'Wheat Harvested' },
              { emoji: '🏭', label: 'Straw Collected' },
              { emoji: '⚙️', label: 'Bio-processed' },
              { emoji: '🧴', label: 'Bottle Made' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.15 }}
                >
                  <span className="text-3xl mb-1">{step.emoji}</span>
                  <span className="text-xs text-cyan-300">{step.label}</span>
                </motion.div>
                {i < 3 && (
                  <ArrowRight className="w-4 h-4 text-reef-teal hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
