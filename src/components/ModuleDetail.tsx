import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { Module } from '../data/modules';

interface ModuleDetailProps {
  module: Module;
  onClose: () => void;
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
