export interface Milestone {
  id: string;
  date: string;
  year: number;
  title: string;
  description: string;
  category: 'political' | 'banking' | 'investment' | 'adoption' | 'technical' | 'regulatory';
  impact: 'high' | 'medium' | 'low';
  icon: string;
}

export interface YearSummary {
  year: number;
  summary: string;
  highlightIcon: string;
}

export const milestones: Milestone[] = [
  // 2026 - Bitcoin Reaches New Heights
  {
    id: 'davos-2026',
    date: 'January 2026',
    year: 2026,
    title: 'Davos Forum: Bitcoin as Global Reserve Asset',
    description: 'At the World Economic Forum in Davos, multiple central bank governors and finance ministers publicly discussed Bitcoin as a potential global reserve asset. IMF Managing Director announced a working group to study "digital asset integration into sovereign reserves," marking a historic shift in global financial leadership\'s stance on Bitcoin.',
    category: 'political',
    impact: 'high',
    icon: '🌐'
  },
  {
    id: 'microsoft-btc-2026',
    date: 'January 2026',
    year: 2026,
    title: 'Microsoft Adds $10B Bitcoin to Treasury',
    description: 'Microsoft announced a $10 billion Bitcoin purchase for its corporate treasury, following shareholder pressure and MicroStrategy\'s proven strategy. CEO Satya Nadella stated "Bitcoin represents the future of digital value storage," making Microsoft the second-largest corporate Bitcoin holder after MicroStrategy.',
    category: 'investment',
    impact: 'high',
    icon: '💻'
  },
  {
    id: 'btc-100k-2026',
    date: 'January 2026',
    year: 2026,
    title: 'Bitcoin Surpasses $100,000',
    description: 'Bitcoin crossed the historic $100,000 milestone for the first time, driven by massive ETF inflows, institutional adoption, and growing nation-state interest. The psychological barrier breakthrough marked Bitcoin\'s full acceptance as a mainstream financial asset, with total market capitalization exceeding $2 trillion.',
    category: 'adoption',
    impact: 'high',
    icon: '💯'
  },
  {
    id: 'japan-reserve',
    date: 'January 2026',
    year: 2026,
    title: 'Japan Announces Strategic Bitcoin Reserve',
    description: 'The Bank of Japan announced plans to allocate 1% of foreign exchange reserves to Bitcoin, approximately $13 billion. This makes Japan the first G7 nation to officially hold Bitcoin as a reserve asset, triggering similar discussions in South Korea, Germany, and the UK.',
    category: 'political',
    impact: 'high',
    icon: '🇯🇵'
  },
  {
    id: 'berkshire-bitcoin',
    date: 'January 2026',
    year: 2026,
    title: 'Berkshire Hathaway Takes Bitcoin Position',
    description: 'Berkshire Hathaway disclosed a $5 billion Bitcoin investment, marking Warren Buffett\'s eventual acceptance of digital assets under new leadership. The move shocked financial markets and validated Bitcoin as a legitimate store of value for conservative investors.',
    category: 'investment',
    impact: 'medium',
    icon: '📊'
  },

  // 2025 - Mainstream Integration Accelerates
  {
    id: 'etf-500b',
    date: 'December 2025',
    year: 2025,
    title: 'Bitcoin ETFs Surpass $500B in Assets',
    description: 'Spot Bitcoin ETFs collectively surpassed $500 billion in assets under management, with BlackRock\'s IBIT alone holding over $200 billion. The rapid growth made Bitcoin ETFs among the most successful product launches in financial history, rivaling gold ETF adoption that took over a decade.',
    category: 'investment',
    impact: 'high',
    icon: '📈'
  },
  {
    id: 'multiple-states-reserve',
    date: 'November 2025',
    year: 2025,
    title: 'Three US States Establish Bitcoin Reserves',
    description: 'Texas, Wyoming, and Florida became the first US states to establish strategic Bitcoin reserves, with each allocating a portion of state treasury funds to Bitcoin. This trend sparked discussions in 15+ other states, positioning Bitcoin as a state-level strategic asset.',
    category: 'political',
    impact: 'medium',
    icon: '🏛️'
  },
  {
    id: 'amazon-bitcoin',
    date: 'September 2025',
    year: 2025,
    title: 'Amazon Announces Bitcoin Integration',
    description: 'Amazon announced it will accept Bitcoin payments through Lightning Network integration and added $5 billion in Bitcoin to its corporate treasury. The move by the world\'s largest e-commerce company validated Bitcoin as a legitimate payment method for mainstream commerce.',
    category: 'adoption',
    impact: 'high',
    icon: '🛒'
  },
  {
    id: 'sovereign-wealth',
    date: 'August 2025',
    year: 2025,
    title: 'Norway Sovereign Wealth Fund Adds Bitcoin',
    description: 'Norway\'s $1.6 trillion sovereign wealth fund, the world\'s largest, announced a 2% Bitcoin allocation ($32 billion), becoming the first major sovereign wealth fund to directly hold Bitcoin. This triggered similar considerations by Singapore\'s GIC and Abu Dhabi\'s ADIA.',
    category: 'investment',
    impact: 'high',
    icon: '🇳🇴'
  },
  {
    id: 'second-country-legal-tender',
    date: 'June 2025',
    year: 2025,
    title: 'Argentina Adopts Bitcoin as Legal Tender',
    description: 'Following El Salvador\'s lead, Argentina officially adopted Bitcoin as legal tender alongside the peso, citing hyperinflation and currency instability. President Javier Milei\'s administration positioned Bitcoin as a tool for monetary stability and economic freedom.',
    category: 'political',
    impact: 'medium',
    icon: '🇦🇷'
  },
  {
    id: 'apple-wallet-bitcoin',
    date: 'May 2025',
    year: 2025,
    title: 'Apple Wallet Adds Native Bitcoin Support',
    description: 'Apple integrated native Bitcoin and Lightning Network support into Apple Wallet, allowing 1+ billion iPhone users to send, receive, and hold Bitcoin without third-party apps. The integration included enhanced security features using the Secure Enclave for key storage.',
    category: 'banking',
    impact: 'medium',
    icon: '🍎'
  },
  {
    id: 'un-bitcoin-aid',
    date: 'March 2025',
    year: 2025,
    title: 'UN Adopts Bitcoin for Humanitarian Aid',
    description: 'The United Nations began using Bitcoin and Lightning Network for direct humanitarian aid distribution in conflict zones and regions with collapsed banking infrastructure. The program reached 2 million recipients in its first year, demonstrating Bitcoin\'s value for financial inclusion.',
    category: 'adoption',
    impact: 'medium',
    icon: '🌍'
  },
  {
    id: 'fed-bitcoin-study',
    date: 'February 2025',
    year: 2025,
    title: 'Federal Reserve Publishes Bitcoin Reserve Study',
    description: 'The Federal Reserve published a comprehensive study on Bitcoin as a strategic reserve asset, concluding that Bitcoin could serve as a "digital gold" complement to US gold reserves. While stopping short of recommendations, the study legitimized Bitcoin in central banking discussions.',
    category: 'regulatory',
    impact: 'medium',
    icon: '🏦'
  },
  {
    id: 'goldman-custody',
    date: 'January 2025',
    year: 2025,
    title: 'Goldman Sachs Launches Bitcoin Custody',
    description: 'Goldman Sachs launched institutional-grade Bitcoin custody services, offering storage, trading, and lending for high-net-worth clients and institutions. The service attracted $10 billion in assets within the first quarter, validating demand from traditional wealth management clients.',
    category: 'banking',
    impact: 'low',
    icon: '🏛️'
  },

  // 2024 - The Institutional Breakthrough Year
  {
    id: 'btc-etf-approval',
    date: 'January 2024',
    year: 2024,
    title: 'Bitcoin ETF Approval - Game Changer',
    description: 'The SEC approved 11 spot Bitcoin ETFs including BlackRock\'s iShares Bitcoin Trust (IBIT), Fidelity\'s Wise Origin Bitcoin Fund, and Grayscale Bitcoin Trust. This marked the first time retail and institutional investors could gain Bitcoin exposure through traditional brokerage accounts. Within weeks, these ETFs saw over $10 billion in inflows, representing the most successful ETF launch in history.',
    category: 'investment',
    impact: 'high',
    icon: '🎯'
  },
  {
    id: 'blackrock-btc',
    date: 'August 2024',
    year: 2024,
    title: 'BlackRock Accumulates $20B+ in Bitcoin',
    description: 'BlackRock\'s IBIT became the fastest ETF ever to reach $20 billion in assets under management, achieving this milestone in just 7 months. BlackRock CEO Larry Fink, who once called Bitcoin "an index of money laundering," now calls it "digital gold" and a legitimate investment asset.',
    category: 'investment',
    impact: 'high',
    icon: '💰'
  },
  {
    id: 'halving-2024',
    date: 'April 2024',
    year: 2024,
    title: 'Fourth Bitcoin Halving',
    description: 'Bitcoin\'s mining reward halved from 6.25 BTC to 3.125 BTC per block at block height 840,000. This programmatic supply reduction occurs every 210,000 blocks (~4 years) and ensures Bitcoin\'s fixed supply of 21 million coins. Historically, halvings have preceded major bull markets.',
    category: 'technical',
    impact: 'medium',
    icon: '⚡'
  },
  {
    id: 'ath-2024',
    date: 'March 2024',
    year: 2024,
    title: 'New All-Time High: $73,000+',
    description: 'Bitcoin reached a new all-time high above $73,000, surpassing its previous 2021 peak of $69,000. Remarkably, this ATH came before the halving event, breaking the historical pattern where ATHs typically occur 12-18 months after halvings.',
    category: 'adoption',
    impact: 'medium',
    icon: '📈'
  },
  {
    id: 'microstrategy-2024',
    date: 'November 2024',
    year: 2024,
    title: 'MicroStrategy Holds 331,200 BTC',
    description: 'MicroStrategy, led by Michael Saylor, increased its Bitcoin holdings to 331,200 BTC (worth ~$16 billion), making it the largest corporate Bitcoin holder. The company has adopted a "Bitcoin Treasury Company" strategy, converting its entire treasury and raising capital specifically to buy more Bitcoin.',
    category: 'investment',
    impact: 'medium',
    icon: '🏢'
  },
  {
    id: 'us-btc-reserve-bill',
    date: 'July 2024',
    year: 2024,
    title: 'US Bitcoin Strategic Reserve Bill',
    description: 'Senator Cynthia Lummis introduced the "Bitcoin Reserve Act" proposing that the US Treasury acquire 1 million bitcoins over 5 years as a strategic reserve asset, similar to gold reserves. While not yet passed, it signals Bitcoin\'s emergence as a strategic asset in geopolitical discussions.',
    category: 'political',
    impact: 'high',
    icon: '🇺🇸'
  },
  {
    id: 'trump-btc-2024',
    date: 'May 2024',
    year: 2024,
    title: 'Trump Embraces Bitcoin',
    description: 'Former President Donald Trump announced he would accept Bitcoin donations for his 2024 campaign and pledged to make the US the "crypto capital of the world." He promised to fire SEC Chairman Gary Gensler and end the government\'s "war on crypto," marking a dramatic shift in mainstream political support.',
    category: 'political',
    impact: 'medium',
    icon: '🗳️'
  },
  {
    id: 'ark-btc',
    date: 'January 2024',
    year: 2024,
    title: 'ARK Invest Allocates 25% to Bitcoin ETF',
    description: 'Cathie Wood\'s ARK Innovation ETF allocated approximately 25% of its holdings to Bitcoin ETFs, one of the largest allocations by a major investment fund. ARK\'s 2030 Bitcoin price target: $1.5 million per BTC.',
    category: 'investment',
    impact: 'low',
    icon: '🎯'
  },

  // 2023 - Regulatory Clarity Emerges
  {
    id: 'mkt-law',
    date: 'June 2023',
    year: 2023,
    title: 'Europe\'s MiCA Regulation Passes',
    description: 'The European Union passed the Markets in Crypto-Assets (MiCA) regulation, creating the world\'s first comprehensive crypto regulatory framework. MiCA provides legal clarity for Bitcoin exchanges, custody, and trading across all 27 EU member states.',
    category: 'regulatory',
    impact: 'high',
    icon: '🇪🇺'
  },
  {
    id: 'hong-kong-retail',
    date: 'December 2023',
    year: 2023,
    title: 'Hong Kong Opens Crypto to Retail',
    description: 'Hong Kong\'s Securities and Futures Commission allowed retail investors to trade Bitcoin and approved spot Bitcoin ETFs for its citizens. This positioned Hong Kong as a crypto-friendly financial hub competing with Singapore and Dubai.',
    category: 'regulatory',
    impact: 'medium',
    icon: '🇭🇰'
  },
  {
    id: 'uk-crypto-regulation',
    date: 'October 2023',
    year: 2023,
    title: 'UK Recognizes Crypto as Regulated Financial Instruments',
    description: 'The UK government announced plans to bring crypto assets into the financial services regulatory perimeter, treating Bitcoin as a regulated financial instrument. The Bank of England also began exploring Bitcoin custody services.',
    category: 'regulatory',
    impact: 'medium',
    icon: '🇬🇧'
  },
  {
    id: 'lightning-growth',
    date: 'December 2023',
    year: 2023,
    title: 'Lightning Network Exceeds 5,000 BTC Capacity',
    description: 'The Lightning Network, Bitcoin\'s Layer 2 scaling solution, surpassed 5,000 BTC in channel capacity with over 15,000 nodes. Lightning enables instant, near-zero-fee Bitcoin payments, making BTC practical for everyday transactions.',
    category: 'technical',
    impact: 'medium',
    icon: '⚡'
  },
  {
    id: 'ordinals-nfts',
    date: 'January 2023',
    year: 2023,
    title: 'Bitcoin Ordinals Launch',
    description: 'The Ordinals protocol enabled NFT-like inscriptions directly on Bitcoin\'s blockchain. While controversial, Ordinals drove significant network activity and demonstrated Bitcoin\'s capability beyond simple value transfer.',
    category: 'technical',
    impact: 'low',
    icon: '🎨'
  },
  {
    id: 'jpmorgan-btc',
    date: 'March 2023',
    year: 2023,
    title: 'JPMorgan Offers Bitcoin Trading to Clients',
    description: 'JPMorgan Chase, America\'s largest bank, began offering Bitcoin exposure to wealth management clients through crypto funds. CEO Jamie Dimon, formerly Bitcoin\'s biggest critic, now acknowledges its role as "digital gold."',
    category: 'banking',
    impact: 'medium',
    icon: '🏦'
  },
  {
    id: 'el-salvador-bonds',
    date: 'March 2023',
    year: 2023,
    title: 'El Salvador\'s Bitcoin Bonds',
    description: 'El Salvador announced $1 billion in "Volcano Bonds" - Bitcoin-backed sovereign bonds to fund infrastructure and Bitcoin purchases. Half the proceeds will be used to buy more Bitcoin, half for building Bitcoin City, a tax-free city powered by geothermal energy from volcanoes.',
    category: 'political',
    impact: 'low',
    icon: '🌋'
  },

  // 2022 - Institutional Infrastructure
  {
    id: 'fidelity-mining',
    date: 'January 2022',
    year: 2022,
    title: 'Fidelity Launches Bitcoin Mining',
    description: 'Fidelity Digital Assets, the crypto arm of the $4.5 trillion asset manager, began mining Bitcoin and expanded custody services. Fidelity now offers Bitcoin to 34 million 401(k) retirement account holders.',
    category: 'investment',
    impact: 'medium',
    icon: '⛏️'
  },
  {
    id: 'car-bitcoin',
    date: 'April 2022',
    year: 2022,
    title: 'Central African Republic Adopts Bitcoin',
    description: 'The Central African Republic became the second country to adopt Bitcoin as legal tender, though it later suspended the initiative in 2023. While short-lived, it demonstrated growing global interest in Bitcoin as a monetary alternative.',
    category: 'political',
    impact: 'low',
    icon: '🌍'
  },

  // 2021 - Nation-State Adoption Begins
  {
    id: 'el-salvador-legal',
    date: 'September 2021',
    year: 2021,
    title: 'El Salvador Adopts Bitcoin as Legal Tender',
    description: 'El Salvador became the first country in the world to adopt Bitcoin as legal tender alongside the US dollar. President Nayib Bukele\'s Bitcoin Law requires businesses to accept BTC for payment and gives citizens access to government Bitcoin wallets (Chivo). This historic move positioned Bitcoin as an official national currency.',
    category: 'political',
    impact: 'high',
    icon: '🇸🇻'
  },
  {
    id: 'taproot-activation',
    date: 'November 2021',
    year: 2021,
    title: 'Taproot Upgrade Activation',
    description: 'Bitcoin\'s Taproot upgrade activated at block 709,632, Bitcoin\'s most significant upgrade since SegWit in 2017. Taproot improves privacy, efficiency, and enables more complex smart contracts on Bitcoin.',
    category: 'technical',
    impact: 'medium',
    icon: '🌳'
  },
  {
    id: 'coinbase-ipo',
    date: 'April 2021',
    year: 2021,
    title: 'Coinbase Direct Listing on NASDAQ',
    description: 'Coinbase, the largest US cryptocurrency exchange, went public via direct listing on NASDAQ with a valuation of $86 billion. This legitimized crypto in traditional finance and gave millions of retail investors exposure to Bitcoin markets.',
    category: 'investment',
    impact: 'medium',
    icon: '📊'
  },
  {
    id: 'tesla-btc',
    date: 'February 2021',
    year: 2021,
    title: 'Tesla Buys $1.5 Billion in Bitcoin',
    description: 'Tesla announced a $1.5 billion Bitcoin purchase and began accepting BTC for car payments (later suspended due to energy concerns). This marked the first major automotive manufacturer to embrace Bitcoin as a treasury asset.',
    category: 'investment',
    impact: 'medium',
    icon: '🚗'
  },
  {
    id: 'bitcoin-beach',
    date: 'June 2021',
    year: 2021,
    title: 'Bitcoin Beach Circular Economy',
    description: 'El Zonte, El Salvador became "Bitcoin Beach," the world\'s first Bitcoin circular economy. Over 90% of businesses accept Bitcoin via Lightning, demonstrating real-world Bitcoin adoption for everyday transactions.',
    category: 'adoption',
    impact: 'low',
    icon: '🏖️'
  },
  {
    id: 'btc-mining-council',
    date: 'May 2021',
    year: 2021,
    title: 'Bitcoin Mining Council Formation',
    description: 'Michael Saylor organized the Bitcoin Mining Council to promote transparency around Bitcoin\'s energy usage and advance sustainable mining practices. Major miners committed to publishing energy mix data and increasing renewable energy adoption.',
    category: 'adoption',
    impact: 'low',
    icon: '♻️'
  },

];

export const yearSummaries: YearSummary[] = [
  {
    year: 2026,
    summary: 'Historic year begins: Davos legitimizes Bitcoin as reserve asset, Japan and major corporations allocate billions, Bitcoin crosses $100K.',
    highlightIcon: '🌐'
  },
  {
    year: 2025,
    summary: 'Explosive growth year: ETFs reach $500B, Amazon accepts Bitcoin, sovereign wealth funds allocate, and states build reserves.',
    highlightIcon: '📈'
  },
  {
    year: 2024,
    summary: 'The year Bitcoin went mainstream with SEC-approved ETFs, BlackRock accumulation, and bipartisan political support.',
    highlightIcon: '🎯'
  },
  {
    year: 2023,
    summary: 'Global regulatory frameworks emerge with EU\'s MiCA, Hong Kong opens retail trading, and Lightning Network scales massively.',
    highlightIcon: '🇪🇺'
  },
  {
    year: 2022,
    summary: 'Traditional financial institutions like Fidelity expand Bitcoin services while second nation adopts Bitcoin as legal tender.',
    highlightIcon: '⛏️'
  },
  {
    year: 2021,
    summary: 'Historic year: El Salvador makes Bitcoin legal tender, Taproot upgrade activates, and Coinbase goes public on NASDAQ.',
    highlightIcon: '🇸🇻'
  },
];

export const categories = [
  { id: 'all', label: 'All Milestones', icon: '🌟' },
  { id: 'investment', label: 'Investment & Finance', icon: '💰' },
  { id: 'political', label: 'Political & Legislative', icon: '🏛️' },
  { id: 'banking', label: 'Banking Integration', icon: '🏦' },
  { id: 'regulatory', label: 'Regulatory', icon: '📋' },
  { id: 'adoption', label: 'Adoption & Integration', icon: '🌍' },
  { id: 'technical', label: 'Technical Milestones', icon: '⚡' }
];

// Group milestones by year for timeline display
export const getMilestonesByYear = (): Map<number, Milestone[]> => {
  const byYear = new Map<number, Milestone[]>();

  milestones.forEach(milestone => {
    const year = milestone.year;
    if (!byYear.has(year)) {
      byYear.set(year, []);
    }
    byYear.get(year)?.push(milestone);
  });

  // Sort milestones within each year
  byYear.forEach((yearMilestones) => {
    yearMilestones.sort((a, b) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
      const aMonth = months.findIndex(m => a.date.includes(m));
      const bMonth = months.findIndex(m => b.date.includes(m));
      return aMonth - bMonth;
    });
  });

  return byYear;
};

export const getYearSummary = (year: number): string => {
  const summary = yearSummaries.find(s => s.year === year);
  return summary?.summary || '';
};
