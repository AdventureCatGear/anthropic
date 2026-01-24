export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: {
    heading: string;
    text: string;
  }[];
  keyPoints: string[];
}

export const modules: Module[] = [
  {
    id: 'what-is-bitcoin',
    title: 'What is Bitcoin?',
    description: 'Discover the revolutionary digital currency that changed finance forever',
    icon: '₿',
    content: [
      {
        heading: 'A Digital Revolution',
        text: 'Bitcoin is the world\'s first decentralized digital currency, created in 2009 by an anonymous person or group known as Satoshi Nakamoto. Unlike traditional currencies controlled by governments and banks, Bitcoin operates on a peer-to-peer network.'
      },
      {
        heading: 'Digital Gold',
        text: 'Bitcoin is often called "digital gold" because, like gold, it has a limited supply (only 21 million bitcoins will ever exist). This scarcity, combined with growing demand, has made it an attractive store of value.'
      },
      {
        heading: 'Borderless Money',
        text: 'Bitcoin can be sent anywhere in the world, instantly, without the need for banks or intermediaries. It transcends borders, making it perfect for international transactions and financial inclusion.'
      }
    ],
    keyPoints: [
      'First cryptocurrency created in 2009',
      'Decentralized - no single authority controls it',
      'Limited supply of 21 million bitcoins',
      'Transactions recorded on a public ledger',
      'Can be sent anywhere globally in minutes'
    ]
  },
  {
    id: 'blockchain',
    title: 'The Blockchain',
    description: 'Learn how blockchain technology powers Bitcoin\'s security and transparency',
    icon: '⛓️',
    content: [
      {
        heading: 'A Chain of Blocks',
        text: 'The blockchain is a distributed ledger that records all Bitcoin transactions. It\'s called a "blockchain" because transactions are grouped into blocks, and these blocks are linked together in a chain.'
      },
      {
        heading: 'Immutable History',
        text: 'Once a block is added to the chain, it cannot be altered or deleted. This makes the blockchain an immutable record of all transactions, ensuring transparency and preventing fraud.'
      },
      {
        heading: 'Distributed Network',
        text: 'The blockchain is maintained by thousands of computers (nodes) around the world. Each node has a complete copy of the blockchain, making it nearly impossible to hack or manipulate.'
      }
    ],
    keyPoints: [
      'Distributed ledger technology',
      'Transactions grouped into blocks',
      'Each block linked to the previous one',
      'Immutable and transparent',
      'Maintained by thousands of nodes worldwide'
    ]
  },
  {
    id: 'mining',
    title: 'Bitcoin Mining',
    description: 'Understand how new bitcoins are created and transactions are verified',
    icon: '⛏️',
    content: [
      {
        heading: 'Digital Mining',
        text: 'Bitcoin mining is the process of creating new bitcoins and verifying transactions. Miners use powerful computers to solve complex mathematical puzzles. The first miner to solve the puzzle gets to add a new block to the blockchain and receives newly created bitcoins as a reward.'
      },
      {
        heading: 'Proof of Work',
        text: 'Mining uses a consensus mechanism called "Proof of Work." This requires miners to expend computational energy to validate transactions, making it extremely costly to attack the network.'
      },
      {
        heading: 'The Halving',
        text: 'Every 210,000 blocks (approximately 4 years), the mining reward is cut in half. This event, called "the halving," ensures Bitcoin\'s scarcity and controlled supply. The next halving is expected in 2028.'
      }
    ],
    keyPoints: [
      'Miners verify transactions and create new blocks',
      'Requires solving complex mathematical puzzles',
      'Mining reward currently 3.125 BTC per block',
      'Halving occurs every ~4 years',
      'Secures the network through Proof of Work'
    ]
  },
  {
    id: 'transactions',
    title: 'How Transactions Work',
    description: 'See how Bitcoin enables secure, peer-to-peer value transfer',
    icon: '💸',
    content: [
      {
        heading: 'Peer-to-Peer Transfer',
        text: 'When you send Bitcoin, you\'re broadcasting a transaction to the network. This transaction includes the sender\'s address, the recipient\'s address, and the amount being sent.'
      },
      {
        heading: 'Digital Signatures',
        text: 'Transactions are secured using cryptographic signatures. You need a private key (like a password) to send Bitcoin from your wallet. This ensures only you can spend your bitcoins.'
      },
      {
        heading: 'Confirmation Process',
        text: 'Miners verify your transaction and include it in a block. Once added to the blockchain, your transaction is considered "confirmed." More confirmations mean more security, with 6 confirmations typically considered final.'
      }
    ],
    keyPoints: [
      'Transactions broadcast to the network',
      'Secured with cryptographic signatures',
      'Verified by miners and added to blocks',
      '6 confirmations typically needed for finality',
      'Average transaction time: 10-60 minutes'
    ]
  },
  {
    id: 'wallets',
    title: 'Bitcoin Wallets',
    description: 'Learn about storing and securing your bitcoins safely',
    icon: '👛',
    content: [
      {
        heading: 'Your Digital Vault',
        text: 'A Bitcoin wallet is a software program or physical device that stores your private keys—the cryptographic credentials you need to access and spend your bitcoins.'
      },
      {
        heading: 'Types of Wallets',
        text: 'There are several types: Hot wallets (connected to the internet, convenient for daily use), Cold wallets (offline storage, most secure), Hardware wallets (physical devices), and Paper wallets (printed private keys).'
      },
      {
        heading: 'Security First',
        text: 'Always backup your wallet\'s seed phrase (12-24 words) and store it securely. Never share your private keys. Remember: "Not your keys, not your coins."'
      }
    ],
    keyPoints: [
      'Stores your private keys securely',
      'Hot wallets: convenient but less secure',
      'Cold wallets: offline and most secure',
      'Always backup your seed phrase',
      'You control your own money'
    ]
  },
  {
    id: 'future',
    title: 'The Future of Bitcoin',
    description: 'Explore Bitcoin\'s potential and its role in the global economy',
    icon: '🚀',
    content: [
      {
        heading: 'Institutional Adoption',
        text: 'Major companies and institutions are embracing Bitcoin. From Tesla to MicroStrategy, corporations are adding Bitcoin to their balance sheets. El Salvador even made it legal tender in 2021.'
      },
      {
        heading: 'Lightning Network',
        text: 'The Lightning Network is a second-layer solution that enables instant, low-cost Bitcoin transactions. It\'s making Bitcoin practical for everyday purchases, from coffee to online shopping.'
      },
      {
        heading: 'Financial Freedom',
        text: 'Bitcoin represents financial sovereignty. In a world of inflation and capital controls, Bitcoin offers individuals the power to store and transfer value without permission. It\'s particularly valuable for people in countries with unstable currencies.'
      }
    ],
    keyPoints: [
      'Growing institutional and corporate adoption',
      'Lightning Network enables instant payments',
      'Potential global reserve asset',
      'Tool for financial inclusion',
      'Hedge against inflation and currency devaluation'
    ]
  }
];
