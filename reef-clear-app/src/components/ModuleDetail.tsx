import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import type { Module } from '../data/modules';

interface ModuleDetailProps {
  module: Module;
  onClose: () => void;
}

// Animation components for each module
function ModuleAnimation({ moduleId }: { moduleId: string }) {
  switch (moduleId) {
    case 'our-mission':
      // Ocean waves with heart
      return (
        <div className="flex justify-center mb-6 relative h-32">
          <motion.div
            className="absolute"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-7xl">🌊</div>
          </motion.div>
          <motion.div
            className="absolute"
            initial={{ scale: 0 }}
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-5xl mt-4">💙</div>
          </motion.div>
        </div>
      );

    case 'plant-formula':
      // Spinning ingredients
      return (
        <div className="flex justify-center mb-6 relative h-32">
          <motion.div
            className="relative w-32 h-32"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {['🌿', '🌽', '💧', '🌱'].map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 90}deg) translateY(-40px)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  delay: i * 0.25,
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        </div>
      );

    case 'bioplastic-bottle':
      // Wheat to bottle transformation
      return (
        <div className="flex justify-center items-center gap-8 mb-6 h-32">
          <motion.div
            className="text-6xl"
            animate={{
              opacity: [1, 0.5, 1],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🌾
          </motion.div>
          <motion.div
            className="text-3xl text-reef-aqua"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ➡️
          </motion.div>
          <motion.div
            className="text-6xl"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🧴
          </motion.div>
        </div>
      );

    case 'ocean-cleanup':
      // Bottles being removed animation
      return (
        <div className="flex justify-center mb-6 relative h-32">
          <div className="flex items-center gap-2">
            <motion.div
              className="text-5xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🛒
            </motion.div>
            <motion.div
              className="text-3xl text-reef-aqua mx-4"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              =
            </motion.div>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="text-4xl"
                initial={{ opacity: 1, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [20, 0, 0, -40],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                🍾
              </motion.div>
            ))}
          </div>
          <motion.div
            className="absolute bottom-0 text-sm text-reef-aqua font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            3 bottles removed!
          </motion.div>
        </div>
      );

    case 'how-it-works':
      // Step-by-step application
      return (
        <div className="flex justify-center gap-6 mb-6 h-32">
          {[
            { emoji: '💧', label: 'Drop' },
            { emoji: '👆', label: 'Spread' },
            { emoji: '🌊', label: 'Rinse' },
            { emoji: '✨', label: 'Clear!' },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <motion.div
                className="text-4xl"
                animate={{
                  scale: [1, 1.2, 1],
                  y: [0, -5, 0],
                }}
                transition={{
                  delay: i * 0.3,
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {step.emoji}
              </motion.div>
              <span className="text-xs text-cyan-300 mt-2">{step.label}</span>
            </motion.div>
          ))}
        </div>
      );

    case 'reef-safe':
      // Happy marine life
      return (
        <div className="flex justify-center mb-6 relative h-32">
          <motion.div
            className="flex gap-4"
            animate={{
              x: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {['🐠', '🐟', '🐡', '🦀', '🐚'].map((emoji, i) => (
              <motion.div
                key={i}
                className="text-5xl"
                animate={{
                  y: [0, -10, 0, 10, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  delay: i * 0.2,
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="absolute -bottom-2 w-full h-8 bg-gradient-to-t from-reef-ocean/30 to-transparent rounded-full blur-sm"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      );

    default:
      return null;
  }
}

export default function ModuleDetail({ module, onClose }: ModuleDetailProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="min-h-screen px-4 py-12 flex items-center justify-center">
        <motion.div
          className="card-gradient border border-cyan-700 rounded-3xl p-8 md:p-12 max-w-4xl w-full relative"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-cyan-700/50 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="text-6xl mb-4">{module.icon}</div>

            {/* Visual Animation */}
            <ModuleAnimation moduleId={module.id} />

            <h2 className="text-4xl font-bold mb-4 text-gradient">
              {module.title}
            </h2>
            <p className="text-xl text-cyan-300">
              {module.description}
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-8 mb-8">
            {module.content.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-semibold mb-3 text-reef-aqua">
                  {section.heading}
                </h3>
                <p className="text-cyan-100 leading-relaxed text-lg">
                  {section.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Key Points */}
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-700/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-reef-teal" />
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {module.keyPoints.map((point, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-cyan-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <span className="text-reef-teal mt-1">*</span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Close button at bottom */}
          <motion.button
            onClick={onClose}
            className="w-full mt-8 bg-gradient-to-r from-reef-teal to-reef-cyan text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-reef-teal/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue Learning
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
