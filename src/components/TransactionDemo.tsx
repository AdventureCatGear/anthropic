import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  status: 'pending' | 'confirmed';
  confirmations: number;
}

export default function TransactionDemo() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState(0.5);
  const [sending, setSending] = useState(false);

  const sendTransaction = () => {
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      from: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      to: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy',
      amount: amount,
      status: 'pending',
      confirmations: 0,
    };

    setTransactions([newTx, ...transactions]);
    setSending(true);

    // Simulate confirmations
    let confirmations = 0;
    const interval = setInterval(() => {
      confirmations++;
      setTransactions((txs) =>
        txs.map((tx) =>
          tx.id === newTx.id
            ? {
                ...tx,
                confirmations,
                status: confirmations >= 6 ? 'confirmed' : 'pending',
              }
            : tx
        )
      );

      if (confirmations >= 6) {
        clearInterval(interval);
        setSending(false);
      }
    }, 800);
  };

  return (
    <div className="card-gradient border border-gray-700/50 rounded-3xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-gradient flex items-center gap-3">
        <Send className="w-8 h-8" />
        Transaction Simulator
      </h2>

      <p className="text-gray-400 mb-8">
        See how Bitcoin transactions are broadcast and confirmed on the network.
        Transactions typically need 6 confirmations to be considered final.
      </p>

      {/* Send transaction form */}
      <div className="bg-gray-900/50 rounded-2xl p-6 mb-8 border border-gray-700/50">
        <h3 className="text-xl font-semibold mb-4">Send Bitcoin</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Amount (BTC)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              min="0.001"
              max="100"
              step="0.1"
              disabled={sending}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-bitcoin-orange focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">From Address</label>
            <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 font-mono text-sm text-gray-400 break-all">
              1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">To Address</label>
            <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 font-mono text-sm text-gray-400 break-all">
              3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy
            </div>
          </div>

          <motion.button
            onClick={sendTransaction}
            disabled={sending}
            className="w-full bg-gradient-to-r from-bitcoin-orange to-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-bitcoin-orange/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!sending ? { scale: 1.02 } : {}}
            whileTap={!sending ? { scale: 0.98 } : {}}
          >
            {sending ? 'Broadcasting...' : 'Send Transaction'}
          </motion.button>
        </div>
      </div>

      {/* Transaction list */}
      {transactions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            <AnimatePresence>
              {transactions.map((tx) => (
                <motion.div
                  key={tx.id}
                  className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {tx.status === 'confirmed' ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Clock className="w-6 h-6 text-yellow-500" />
                        </motion.div>
                      )}
                      <div>
                        <span className="text-sm text-gray-500">Transaction ID</span>
                        <div className="font-mono text-sm">{tx.id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-bitcoin-orange">
                        {tx.amount} BTC
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">From:</span>
                      <div className="font-mono text-xs text-gray-400 break-all">
                        {tx.from}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">To:</span>
                      <div className="font-mono text-xs text-gray-400 break-all">
                        {tx.to}
                      </div>
                    </div>
                  </div>

                  {/* Confirmation progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Confirmations</span>
                      <span
                        className={
                          tx.confirmations >= 6
                            ? 'text-green-500 font-semibold'
                            : 'text-yellow-500'
                        }
                      >
                        {tx.confirmations}/6
                      </span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-bitcoin-orange to-green-500 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(tx.confirmations / 6) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {tx.status === 'confirmed' && (
                    <motion.div
                      className="mt-4 bg-green-500/10 border border-green-500/50 rounded-lg p-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-green-400 text-sm font-semibold">
                        ✓ Transaction confirmed and finalized
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
