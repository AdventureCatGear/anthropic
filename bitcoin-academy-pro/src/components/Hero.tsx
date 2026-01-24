import { motion } from 'framer-motion';
import { Bitcoin, TrendingUp, Shield, Zap } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  const features = [
    { icon: Bitcoin, text: 'Decentralized Currency' },
    { icon: Shield, text: 'Secure & Transparent' },
    { icon: TrendingUp, text: 'Digital Gold' },
    { icon: Zap, text: 'Instant Transactions' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-bitcoin-orange/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="text-center z-10 max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Bitcoin symbol animation */}
        <motion.div
          className="inline-block mb-8"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="text-8xl md:text-9xl text-bitcoin-orange drop-shadow-2xl">
            ₿
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Bitcoin Academy
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Master the fundamentals of Bitcoin and blockchain technology through
          interactive lessons, stunning visualizations, and engaging content.
        </motion.p>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="card-gradient border border-gray-700/50 rounded-xl p-6 hover:border-bitcoin-orange/50 transition-colors"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-8 h-8 text-bitcoin-orange mx-auto mb-3" />
                <p className="text-sm text-gray-300">{feature.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onStart}
          className="bg-gradient-to-r from-bitcoin-orange to-yellow-500 text-black px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-bitcoin-orange/50 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Start Learning
        </motion.button>

        <motion.p
          className="mt-6 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          No signup required • 100% free • Interactive learning
        </motion.p>
      </motion.div>
    </div>
  );
}
