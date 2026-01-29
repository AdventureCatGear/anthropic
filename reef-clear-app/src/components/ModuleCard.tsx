import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Module } from '../data/modules';

interface ModuleCardProps {
  module: Module;
  index: number;
  onClick: () => void;
}

export default function ModuleCard({ module, index, onClick }: ModuleCardProps) {
  return (
    <motion.div
      className="card-gradient border border-cyan-700/50 rounded-2xl p-8 cursor-pointer hover:border-reef-teal/70 transition-all duration-300 group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          className="text-5xl mb-4 transform group-hover:scale-110 transition-transform"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {module.icon}
        </motion.div>
        <motion.div
          className="bg-reef-teal/10 p-2 rounded-full"
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-6 h-6 text-reef-aqua" />
        </motion.div>
      </div>

      <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
        {module.title}
      </h3>

      <p className="text-cyan-300/80 mb-6">
        {module.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {module.keyPoints.slice(0, 3).map((point, i) => (
          <span
            key={i}
            className="text-xs bg-cyan-900/50 px-3 py-1 rounded-full text-cyan-200"
          >
            {point}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
