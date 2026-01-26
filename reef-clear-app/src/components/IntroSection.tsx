import { motion } from 'framer-motion';
import { Droplet, Leaf, Recycle, Fish } from 'lucide-react';

export default function IntroSection() {
  const highlights = [
    {
      icon: Droplet,
      title: 'Plant-Based Formula',
      description: 'Made from sugarcane, corn, aloe vera, and natural oils'
    },
    {
      icon: Leaf,
      title: 'Biodegradable',
      description: 'Every ingredient breaks down cleanly in the environment'
    },
    {
      icon: Recycle,
      title: 'Ocean Cleanup',
      description: 'Every purchase removes 3 bottles from the ocean'
    },
    {
      icon: Fish,
      title: 'Reef Safe',
      description: 'Safe for coral, fish, and all marine life'
    }
  ];

  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-gradient border border-cyan-700/50 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-10">
          <motion.div
            className="inline-block text-6xl mb-4"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🌊
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Welcome to the Reef Clear Story
          </h2>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
            Reef Clear isn't just anti-fog drops - it's a movement. Every bottle represents our
            commitment to the oceans we love. Made by divers in Maui, powered by plants, and
            packaged in innovative bioplastic.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-800/30 hover:border-reef-teal/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-reef-teal/20 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-6 h-6 text-reef-aqua" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-cyan-300/80 text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-10 p-6 bg-gradient-to-r from-reef-teal/10 to-reef-cyan/10 rounded-2xl border border-reef-teal/20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-lg text-cyan-100">
            <span className="text-reef-aqua font-semibold">Did you know?</span> Reef Clear was
            developed alongside dive shops in Lahaina, Maui with a promise to protect the very
            reefs we explore. Scroll down to learn more about what makes Reef Clear different.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
