import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Globe, Shield } from 'lucide-react';

export default function IntroSection() {
  return (
    <motion.div
      className="mb-16 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-r from-bitcoin-orange/5 to-yellow-500/5 rounded-3xl blur-3xl" />

      <div className="relative card-gradient border border-bitcoin-orange/30 rounded-3xl p-8 md:p-12 overflow-hidden">
        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-bitcoin-orange/10 rounded-full blur-3xl"
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

        <div className="relative z-10">
          {/* Heading with icon */}
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-10 h-10 text-bitcoin-orange" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">
              Welcome to Bitcoin Academy Pro
            </h2>
          </div>

          {/* Main intro text */}
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
            Dive into the world of Bitcoin—the revolutionary digital currency that's transforming global finance.
            Whether you're a complete beginner or looking to deepen your understanding, this comprehensive academy
            will guide you through <span className="text-bitcoin-orange font-semibold">interactive lessons</span>,
            <span className="text-bitcoin-orange font-semibold"> real-world demonstrations</span>, and
            <span className="text-bitcoin-orange font-semibold"> current global developments</span>.
          </p>

          {/* Feature highlights grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
              whileHover={{ scale: 1.02, borderColor: '#F7931A50' }}
            >
              <TrendingUp className="w-8 h-8 text-bitcoin-orange mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Learn Fundamentals</h3>
              <p className="text-gray-400 text-sm">
                Master blockchain technology, mining, transactions, and why Bitcoin is unique among cryptocurrencies.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
              whileHover={{ scale: 1.02, borderColor: '#F7931A50' }}
            >
              <Shield className="w-8 h-8 text-bitcoin-orange mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Interactive Experience</h3>
              <p className="text-gray-400 text-sm">
                Play with live blockchain visualizations, simulate mining, and watch transactions get confirmed in real-time.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
              whileHover={{ scale: 1.02, borderColor: '#F7931A50' }}
            >
              <Globe className="w-8 h-8 text-bitcoin-orange mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Track Real Impact</h3>
              <p className="text-gray-400 text-sm">
                Follow Bitcoin's global journey from Davos discussions to nation-state adoption and institutional investment.
              </p>
            </motion.div>
          </div>

          {/* Call to action text */}
          <div className="bg-gradient-to-r from-bitcoin-orange/10 to-yellow-500/10 border border-bitcoin-orange/30 rounded-2xl p-6">
            <p className="text-center text-gray-300 text-lg">
              <span className="text-bitcoin-orange font-bold">Start your journey below</span> — explore educational modules,
              try interactive demonstrations, and discover why Bitcoin is reshaping the future of money.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
