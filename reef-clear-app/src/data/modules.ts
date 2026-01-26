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
    id: 'our-mission',
    title: 'Our Mission',
    description: 'Discover why we created Reef Clear and our commitment to protecting our oceans',
    icon: '🌊',
    content: [
      {
        heading: 'Born from the Ocean',
        text: 'Reef Clear was developed by divers at Aloha Reef, then refined alongside dive shops in Lahaina, Maui. We made a promise to do better for the oceans we love. Every decision we make starts with one question: "Is this good for the reef?"'
      },
      {
        heading: 'A Different Kind of Company',
        text: 'We\'re not just another product company. We\'re divers, snorkelers, and ocean lovers who saw a problem and decided to fix it. Traditional anti-fog solutions are filled with chemicals that harm marine life. We knew there had to be a better way.'
      },
      {
        heading: 'Investing in Ocean Cleanup',
        text: 'Every bottle of Reef Clear sold directly funds ocean cleanup efforts. We partner with 4ocean and Plastic Bank to put hands and nets in the water, pulling plastic out before it harms marine life. When you choose Reef Clear, you\'re joining a movement.'
      }
    ],
    keyPoints: [
      'Created by divers in Maui, Hawaii',
      'Developed with local dive shops',
      'Every purchase funds ocean cleanup',
      'Partners with 4ocean & Plastic Bank',
      'Mission: protect the reefs we love'
    ]
  },
  {
    id: 'plant-formula',
    title: 'Plant-Based Formula',
    description: 'Learn about the natural, biodegradable ingredients that make Reef Clear work',
    icon: '🌿',
    content: [
      {
        heading: 'Nature\'s Anti-Fog Solution',
        text: 'Reef Clear\'s formula is made entirely from plant-based, biodegradable ingredients. We use sugars derived from sugarcane and corn, combined with natural oils and aloe vera for a gentle yet powerful anti-fog solution that won\'t irritate your eyes or harm the ocean.'
      },
      {
        heading: 'Food-Grade Minerals',
        text: 'Our formula includes food-grade minerals that are completely safe for you and the environment. These minerals work alongside plant extracts to create a long-lasting anti-fog barrier. Everything in our formula biodegrades cleanly, leaving no trace behind.'
      },
      {
        heading: 'Tear-Free & Safe',
        text: 'Unlike traditional anti-fog solutions that can sting and irritate, Reef Clear is completely tear-free. We use ferment-based preservatives from radish root to keep the formula fresh without harsh chemicals. It\'s gentle enough for the most sensitive eyes.'
      }
    ],
    keyPoints: [
      'Plant-derived sugars (sugarcane, corn, glucose)',
      'Natural oils and aloe vera',
      'Food-grade minerals',
      'Radish root ferment preservatives',
      'Completely tear-free formula',
      '100% biodegradable ingredients'
    ]
  },
  {
    id: 'bioplastic-bottle',
    title: 'Wheat Straw Bottle',
    description: 'Explore our innovative bioplastic packaging made from agricultural waste',
    icon: '🌾',
    content: [
      {
        heading: 'Turning Waste into Wonder',
        text: 'Our bottles are made from wheat straw bioplastic - an innovative material created from agricultural waste. After wheat is harvested for food, the leftover stalks are typically burned, releasing CO2. Instead, we transform them into durable, eco-friendly bottles.'
      },
      {
        heading: '40% Less Plastic',
        text: 'By replacing petroleum-based plastic with plant-derived wheat fibers, our bottles contain 40% less traditional plastic. This dramatically reduces our carbon footprint and reliance on fossil fuels. It\'s a major step toward our goal of 100% plastic-free packaging.'
      },
      {
        heading: 'Complete Eco-Packaging',
        text: 'It\'s not just the bottle - our entire packaging system is sustainable. We ship in biodegradable kraft containers, and even our labels are plant-based, plastic-free, and made in the USA. Every element has been thoughtfully designed to minimize environmental impact.'
      }
    ],
    keyPoints: [
      'Made from wheat straw agricultural waste',
      '40% less petroleum-based plastic',
      'Reduces CO2 from crop burning',
      'Biodegradable kraft shipping containers',
      'Plant-based, plastic-free labels',
      'All packaging made in USA'
    ]
  },
  {
    id: 'ocean-cleanup',
    title: 'Buy One, Pull Three',
    description: 'See how your purchase helps remove plastic bottles from the ocean',
    icon: '♻️',
    content: [
      {
        heading: 'Every Purchase Makes Waves',
        text: 'When you buy one bottle of Reef Clear, we fund the removal of 3 plastic bottles from the ocean. It\'s simple math with massive impact. Your single purchase doesn\'t just give you clear vision underwater - it actively heals the oceans you\'re exploring.'
      },
      {
        heading: 'Partnership with 4ocean',
        text: 'We work with 4ocean, a global ocean cleanup organization that employs professional cleanup crews around the world. They remove trash from oceans, rivers, and coastlines every single day. Your purchase puts their hands and nets to work.'
      },
      {
        heading: 'Plastic Bank Partnership',
        text: 'We also partner with Plastic Bank to stop plastic before it reaches the water. They work in coastal communities without effective recycling programs, creating jobs for locals who collect and recycle plastic waste. It\'s environmental cleanup plus economic empowerment.'
      }
    ],
    keyPoints: [
      '1 bottle purchased = 3 bottles removed',
      'Partners with 4ocean for ocean cleanup',
      'Partners with Plastic Bank for prevention',
      'Creates jobs in coastal communities',
      'Global impact on plastic pollution',
      'Track your impact with every purchase'
    ]
  },
  {
    id: 'how-it-works',
    title: 'How to Use',
    description: 'Get the best anti-fog performance with these simple application tips',
    icon: '💧',
    content: [
      {
        heading: 'Simple Application',
        text: 'Apply just 1-2 drops of Reef Clear to the inside of your dry mask lens. Spread evenly with your finger to cover the entire lens surface. The plant-based formula creates an invisible barrier that prevents fog from forming.'
      },
      {
        heading: 'Quick Rinse',
        text: 'After spreading the solution, give your mask a quick rinse in water - fresh or salt water works great. This removes any excess solution while leaving the protective anti-fog layer intact. Your mask is now ready for crystal-clear vision.'
      },
      {
        heading: 'Long-Lasting Protection',
        text: 'One application of Reef Clear provides anti-fog protection for your entire dive or snorkel session. The 30mL bottle contains enough solution for 100+ applications, making it perfect for avid ocean explorers. No more constant reapplication needed.'
      }
    ],
    keyPoints: [
      'Apply 1-2 drops to dry lens',
      'Spread evenly with finger',
      'Quick rinse before use',
      'Lasts entire dive session',
      '100+ applications per bottle',
      'Works in fresh or salt water'
    ]
  },
  {
    id: 'reef-safe',
    title: 'Reef Safe Promise',
    description: 'Understand what reef-safe truly means and why it matters',
    icon: '🐠',
    content: [
      {
        heading: 'Protecting Marine Life',
        text: 'Many anti-fog products contain chemicals that are toxic to coral and marine life. Reef Clear is formulated with only reef-safe ingredients that biodegrade harmlessly. When you rinse your mask, you\'re not releasing toxins into the ecosystem you came to enjoy.'
      },
      {
        heading: 'Beyond "Reef Safe" Labels',
        text: 'The term "reef safe" isn\'t regulated, so some products make claims they can\'t back up. We go beyond labels - every ingredient in Reef Clear has been carefully selected to ensure it won\'t harm coral reefs, fish, or any marine organism.'
      },
      {
        heading: 'Part of the Solution',
        text: 'Coral reefs are dying at an alarming rate due to climate change, pollution, and harmful chemicals. By choosing truly reef-safe products, you become part of the solution. Your choices matter, and together we can protect these vital ecosystems for future generations.'
      }
    ],
    keyPoints: [
      'All ingredients biodegrade harmlessly',
      'No chemicals toxic to coral',
      'Safe for all marine life',
      'Goes beyond unregulated labels',
      'Protects the ecosystems you explore',
      'Part of ocean conservation movement'
    ]
  }
];
