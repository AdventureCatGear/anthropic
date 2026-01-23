import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Link2 } from 'lucide-react';

interface Block {
  id: number;
  hash: string;
  previousHash: string;
  transactions: number;
  timestamp: string;
}

export default function BlockchainVisualization() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 0,
      hash: '00000a1b2c3d4e5f',
      previousHash: '0000000000000000',
      transactions: 2453,
      timestamp: new Date(Date.now() - 600000).toLocaleTimeString(),
    },
    {
      id: 1,
      hash: '00000f5e4d3c2b1a',
      previousHash: '00000a1b2c3d4e5f',
      transactions: 1876,
      timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
    },
  ]);

  const addBlock = () => {
    const lastBlock = blocks[blocks.length - 1];
    const newBlock: Block = {
      id: lastBlock.id + 1,
      hash: `0000${Math.random().toString(16).substr(2, 12)}`,
      previousHash: lastBlock.hash,
      transactions: Math.floor(Math.random() * 3000) + 500,
      timestamp: new Date().toLocaleTimeString(),
    };
    setBlocks([...blocks, newBlock]);
  };

  return (
    <div className="card-gradient border border-gray-700/50 rounded-3xl p-8 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gradient flex items-center gap-3">
        <Link2 className="w-8 h-8" />
        Interactive Blockchain
      </h2>

      <p className="text-gray-400 mb-8">
        See how blocks are linked together in a chain. Each block contains a hash of the previous block,
        creating an immutable chain of data.
      </p>

      {/* Blockchain visualization */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-4 min-w-max">
          {blocks.map((block, index) => (
            <div key={block.id} className="flex items-center">
              <motion.div
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-bitcoin-orange/50 rounded-xl p-6 min-w-[280px]"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1
                }}
                whileHover={{ scale: 1.05, borderColor: '#F7931A' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-bitcoin-orange font-bold text-lg">
                    Block #{block.id}
                  </span>
                  <span className="text-xs text-gray-500">{block.timestamp}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Hash:</span>
                    <div className="font-mono text-green-400 break-all">
                      {block.hash}
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500">Previous:</span>
                    <div className="font-mono text-blue-400 break-all">
                      {block.previousHash}
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500">Transactions:</span>
                    <span className="ml-2 text-white">{block.transactions}</span>
                  </div>
                </div>
              </motion.div>

              {index < blocks.length - 1 && (
                <motion.div
                  className="flex items-center px-2"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div className="w-12 h-1 bg-gradient-to-r from-bitcoin-orange to-yellow-500" />
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-l-yellow-500 border-t-transparent border-b-transparent" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add block button */}
      <motion.button
        onClick={addBlock}
        className="mt-6 bg-bitcoin-orange hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-5 h-5" />
        Mine New Block
      </motion.button>

      <p className="text-center text-gray-500 text-sm mt-4">
        Click to add a new block and see how it links to the previous one
      </p>
    </div>
  );
}
