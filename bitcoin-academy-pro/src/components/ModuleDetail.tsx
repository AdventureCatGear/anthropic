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
    case 'what-is-bitcoin':
      // Spinning Bitcoin symbol with pulse
      return (
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-bitcoin-orange to-yellow-500 flex items-center justify-center text-6xl shadow-2xl shadow-bitcoin-orange/50"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            ₿
          </motion.div>
        </div>
      );

    case 'blockchain':
      // Connected blocks forming a chain
      return (
        <div className="flex justify-center gap-2 mb-6 overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-bitcoin-orange to-yellow-600 rounded-lg flex items-center justify-center shadow-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  delay: i * 0.2,
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-white font-mono text-xs">#{i + 1}</span>
              </motion.div>
              {i < 3 && (
                <motion.div
                  className="absolute top-1/2 -right-2 w-4 h-0.5 bg-bitcoin-orange"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      );

    case 'mining':
      // Pickaxe mining with particles
      return (
        <div className="flex justify-center mb-6 relative h-32">
          <motion.div
            className="text-7xl"
            animate={{
              rotate: [-10, 10, -10],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⛏️
          </motion.div>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute bottom-8 left-1/2 w-2 h-2 bg-bitcoin-orange rounded-full"
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -40],
                x: [(i - 2) * 10, (i - 2) * 20]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      );

    case 'transactions':
      // Coins moving from sender to receiver
      return (
        <div className="flex justify-center items-center gap-8 mb-6 relative h-32">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-2xl shadow-lg"
            animate={{ scale: [1, 0.95, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            👤
          </motion.div>

          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bitcoin-orange flex items-center justify-center text-sm shadow-lg"
              initial={{ x: -60, opacity: 0 }}
              animate={{
                x: 60,
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut"
              }}
            >
              ₿
            </motion.div>
          ))}

          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-2xl shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            👤
          </motion.div>
        </div>
      );

    case 'wallets':
      // Secure vault opening and closing
      return (
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-32 h-32 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl shadow-2xl border-4 border-bitcoin-orange relative overflow-hidden"
            animate={{
              boxShadow: [
                '0 0 20px rgba(247, 147, 26, 0.3)',
                '0 0 40px rgba(247, 147, 26, 0.6)',
                '0 0 20px rgba(247, 147, 26, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🔒
            </motion.div>
          </motion.div>
        </div>
      );

    case 'future':
      // Rocket launching upward
      return (
        <div className="flex justify-center mb-6 relative h-32">
          <motion.div
            className="text-7xl"
            initial={{ y: 0 }}
            animate={{
              y: [0, -80, -80, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.6, 1]
            }}
          >
            🚀
          </motion.div>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-8 bg-gradient-to-t from-bitcoin-orange to-transparent rounded-full"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scaleY: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
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
          className="card-gradient border border-gray-700 rounded-3xl p-8 md:p-12 max-w-4xl w-full relative"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-700/50 rounded-full transition-colors"
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
            <p className="text-xl text-gray-400">
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
                <h3 className="text-2xl font-semibold mb-3 text-bitcoin-orange">
                  {section.heading}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {section.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Key Points */}
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-bitcoin-orange" />
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {module.keyPoints.map((point, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <span className="text-bitcoin-orange mt-1">•</span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Close button at bottom */}
          <motion.button
            onClick={onClose}
            className="w-full mt-8 bg-gradient-to-r from-bitcoin-orange to-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-bitcoin-orange/50 transition-all duration-300"
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
