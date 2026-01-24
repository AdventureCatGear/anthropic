import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Pickaxe, Zap, Award } from 'lucide-react';

export default function MiningDemo() {
  const [mining, setMining] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [found, setFound] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [difficulty, setDifficulty] = useState(4);

  const generateHash = () => {
    const hash = Math.random().toString(16).substr(2, 16);
    return '0'.repeat(difficulty) + hash.substr(difficulty);
  };

  const startMining = () => {
    setMining(true);
    setFound(false);
    setAttempts(0);

    let attempt = 0;
    const interval = setInterval(() => {
      attempt++;
      setAttempts(attempt);

      const hash = Math.random().toString(16).substr(2, 16);
      setCurrentHash(hash);

      // Simulate finding a valid hash
      if (Math.random() < 0.01 || attempt > 100) {
        const validHash = generateHash();
        setCurrentHash(validHash);
        setFound(true);
        setMining(false);
        clearInterval(interval);
      }
    }, 50);
  };

  const reset = () => {
    setFound(false);
    setAttempts(0);
    setCurrentHash('');
  };

  return (
    <div className="card-gradient border border-gray-700/50 rounded-3xl p-8 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gradient flex items-center gap-3">
        <Pickaxe className="w-8 h-8" />
        Mining Simulator
      </h2>

      <p className="text-gray-400 mb-8">
        Experience how Bitcoin mining works. Miners must find a hash that starts with a certain number of zeros.
        The more zeros required (higher difficulty), the harder it is to find a valid hash.
      </p>

      {/* Difficulty selector */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          Difficulty (number of leading zeros):
        </label>
        <input
          type="range"
          min="2"
          max="6"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          disabled={mining}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Easy (2)</span>
          <span className="text-bitcoin-orange font-bold">{difficulty}</span>
          <span>Hard (6)</span>
        </div>
      </div>

      {/* Mining visualization */}
      <div className="bg-gray-900/50 rounded-2xl p-8 mb-6 border border-gray-700/50">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">
            <AnimatePresence mode="wait">
              {!mining && !found && (
                <motion.div
                  key="idle"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  ⛏️
                </motion.div>
              )}
              {mining && (
                <motion.div
                  key="mining"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-16 h-16 text-bitcoin-orange mx-auto" />
                </motion.div>
              )}
              {found && (
                <motion.div
                  key="found"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <Award className="w-16 h-16 text-yellow-500 mx-auto" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-gray-500">Attempts:</span>
              <motion.span
                className="ml-2 text-2xl font-bold text-bitcoin-orange"
                key={attempts}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
              >
                {attempts}
              </motion.span>
            </div>

            {currentHash && (
              <div>
                <span className="text-gray-500 block mb-2">Current Hash:</span>
                <motion.div
                  className={`font-mono text-sm break-all ${
                    found ? 'text-green-400' : 'text-gray-400'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {currentHash}
                </motion.div>
              </div>
            )}

            {found && (
              <motion.div
                className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-green-400 font-semibold">
                  🎉 Valid hash found! Block mined successfully!
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Hash starts with {difficulty} zeros - proof of work complete!
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex gap-4 justify-center">
        {!mining && !found && (
          <motion.button
            onClick={startMining}
            className="bg-gradient-to-r from-bitcoin-orange to-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-bitcoin-orange/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Mining
          </motion.button>
        )}

        {found && (
          <motion.button
            onClick={reset}
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        )}
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        {mining
          ? 'Mining in progress... searching for a valid hash'
          : 'Click Start Mining to begin the proof-of-work process'}
      </p>
    </div>
  );
}
