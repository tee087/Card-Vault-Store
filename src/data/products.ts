import type { Product, Testimonial, FAQ } from '@/types';

const toolQualityLevels = ['Basic', 'Standard', 'Advanced', 'Professional', 'Premium', 'Industrial'];

function generateStockOptions(basePrice: number, totalStock: number, isTool: boolean = false): Product['stockOptions'] {
  const options: { price: number; balance: number; stock: number; quality?: string }[] = [];
  
  if (isTool) {
    const numOptions = Math.min(toolQualityLevels.length, 3);
    
    for (let i = 0; i < numOptions; i++) {
      const quality = toolQualityLevels[i];
      const price = basePrice + Math.floor((100 / numOptions) * i);
      const remainingStock = totalStock - options.reduce((sum: number, opt) => sum + opt.stock, 0);
      const maxStockForOption = Math.min(remainingStock, Math.max(1, Math.floor(totalStock / (numOptions - i))));
      const stock = i === numOptions - 1 ? remainingStock : Math.min(maxStockForOption, Math.floor(Math.random() * maxStockForOption) + 1);
      
      if (stock > 0) {
        options.push({ price, balance: 0, stock, quality });
      }
    }
  } else {
    const numOptions = 3;
    
    for (let i = 0; i < numOptions; i++) {
      const multiplier = i === 0 ? 1 : i === 1 ? 2 : 3;
      const price = Math.floor(basePrice * multiplier);
      
      const balanceMultiplier = 550 + i * 400 + Math.floor(Math.random() * 200);
      const balance = price * balanceMultiplier;
      
      const remainingStock: number = totalStock - options.reduce((sum, opt) => sum + opt.stock, 0);
      const maxStockForOption = Math.min(remainingStock, Math.max(1, Math.floor(totalStock / (numOptions - i))));
      const stock: number = i === numOptions - 1 ? remainingStock : Math.min(maxStockForOption, Math.floor(Math.random() * maxStockForOption) + 1);
      
      if (stock > 0) {
        options.push({ price, balance, stock });
      }
    }
  }
  
  return options.sort((a, b) => a.price - b.price);
}

const binProductsData = [
  { id: 'bin-001', name: '414720*9408 | Chase Bank USA N.A.', desc: 'VISA CARD | Classic | United States | Fresh BIN', price: 63, stock: 50 },
  { id: 'bin-002', name: '440066*6611 | Bank of America N.A.', desc: 'MASTERCARD | Classic | United States | Verified BIN', price: 65, stock: 45 },
  { id: 'bin-003', name: '426684*4335 | Chase Bank USA N.A.', desc: 'VISA CARD | Classic | United States | Active BIN', price: 67, stock: 42 },
  { id: 'bin-004', name: '410039*4291 | Citibank N.A.', desc: 'VISA CARD | Classic | United States | Citi Classic', price: 69, stock: 35 },
  { id: 'bin-005', name: '517805*3079 | Capital One Bank USA N.A.', desc: 'MASTERCARD | Platinum | United States | Capital One Platinum', price: 75, stock: 55 },
  { id: 'bin-006', name: '515676*2979 | Capital One Bank USA N.A.', desc: 'MASTERCARD | World Elite | United States | Capital One World Elite', price: 85, stock: 30 },
  { id: 'bin-007', name: '601100*2276 | Discover Bank', desc: 'DISCOVER | Personal | United States | Discover it Card', price: 70, stock: 50 },
  { id: 'bin-008', name: '400022*3539 |Navy F.C.U.', desc: 'DEBIT CARD | Classic | United States | Navy Debit', price: 60, stock: 52 },
  { id: 'bin-009', name: '434256*3532 | Wells Fargo Bank N.A.', desc: 'DEBIT CARD | Classic | United States | Wells Fargo Everyday', price: 58, stock: 48 },
  { id: 'bin-010', name: '438857*3404 | Chase Bank USA N.A.', desc: 'VISA CARD | Classic | United States | Chase Credit Flex', price: 62, stock: 42 },
  { id: 'bin-011', name: '542418*1804 | Citibank N.A.', desc: 'VISA CARD | Platinum | United States | Citi Platinum', price: 78, stock: 40 },
  { id: 'bin-012', name: '483316*1682 | JPMorgan Chase Bank N.A.', desc: 'DEBIT CARD | Classic | United States | Chase Private Client', price: 68, stock: 38 },
  { id: 'bin-013', name: '535456*1675 | Revolut Ltd', desc: 'DEBIT CARD | World | Ireland | Revolut International', price: 72, stock: 36 },
  { id: 'bin-014', name: '481582*1663 | Bank of America N.A.', desc: 'DEBIT CARD | Classic | United States | BOA Essential Debit', price: 59, stock: 54 },
  { id: 'bin-015', name: '552433*1635 | Bank of America N.A.', desc: 'MASTERCARD | World | United States | BOA World Elite Mastercard', price: 88, stock: 32 },
  { id: 'bin-016', name: '434258*1580 | Wells Fargo Bank N.A.', desc: 'DEBIT CARD | Classic | United States | Wells Fargo Everyday', price: 61, stock: 40 },
  { id: 'bin-017', name: '427082*1487 | USAA Savings Bank', desc: 'VISA CARD | Classic | United States | USAA Military Credit', price: 64, stock: 38 },
  { id: 'bin-018', name: '400023*1461 |Navy F.C.U.', desc: 'DEBIT CARD | Business | United States | Navy Business', price: 76, stock: 35 },
  { id: 'bin-019', name: '416598*2295 | Revolut Ltd', desc: 'DEBIT CARD | Infinite | United Kingdom | Revolut Premium', price: 95, stock: 28 },
  { id: 'bin-020', name: '601100*2276 | Discover Bank', desc: 'DISCOVER | Personal | United States | Discover it Card', price: 69, stock: 48 },
  { id: 'bin-021', name: '426690*792 | Chase Bank USA N.A.', desc: 'VISA CARD | Classic | United States | Chase Credit', price: 65, stock: 40 },
  { id: 'bin-022', name: '483316*1682 | JPMorgan Chase Bank N.A.', desc: 'DEBIT CARD | Classic | United States | Chase Private Client', price: 68, stock: 38 },
  { id: 'bin-023', name: '554037*1473 | Royal Bank of Canada', desc: 'VISA CARD | Infinite | Canada | RBC Avion', price: 95, stock: 28 },
  { id: 'bin-024', name: '542364*2121 | USAA', desc: 'VISA CARD | Classic | United States | USAA Insurance', price: 63, stock: 40 },
  { id: 'bin-025', name: '534129*2446 | BMO Harris Bank N.A.', desc: 'MASTERCARD | World | United States | BMO Harris Premier', price: 88, stock: 32 },
  { id: 'bin-026', name: '517546*453 | Huntington National Bank', desc: 'DEBIT CARD | Enhanced | United States | Huntington E-checks', price: 65, stock: 38 },
  { id: 'bin-027', name: '518941*1851 | Citibank N.A.', desc: 'MASTERCARD | World Elite | United States | Citi Prestige', price: 95, stock: 42 },
  { id: 'bin-028', name: '407305*1026 | Wells Fargo Bank N.A.', desc: 'DEBIT CARD | Classic | United States | WF Gold Debit', price: 61, stock: 45 },
  { id: 'bin-029', name: '416607*938 | Bank of America N.A.', desc: 'VISA CARD | Platinum | United States | BOA Travel', price: 78, stock: 38 },
  { id: 'bin-030', name: '423223*1063 | Bancorp Bank The', desc: 'DEBIT CARD | Enhanced | United States | Prepaid Mastercard', price: 65, stock: 45 },
  { id: 'bin-031', name: '414520*1 | BC CARD', desc: 'VISA CARD | Signature | KOREA, REPUBLIC OF | Korean Credit Card', price: 88, stock: 25 },
  { id: 'bin-032', name: '475419*1 | METABANK', desc: 'CREDIT CARD | Signature | United States | MetaBank Signature Card', price: 92, stock: 28 },
  { id: 'bin-033', name: '447678*1 | Wells Fargo Bank N.A.', desc: 'DEBIT CARD | Classic | United States | Wells Fargo Debit', price: 61, stock: 42 },
  { id: 'bin-034', name: '511301*1 | TRADITIONAL BANK INC.', desc: 'DEBIT CARD | Enhanced | United States | Enhanced Card', price: 68, stock: 36 },
  { id: 'bin-035', name: '411074*1 | INTERBANK - BANCO INTERNACIONAL DEL PERU', desc: 'DEBIT CARD | Classic | Peru | Peruvian Debit Classic', price: 72, stock: 35 },
  { id: 'bin-036', name: '435862*1 | (No Bank)', desc: 'CREDIT CARD | Classic | United States | Classic Credit Card', price: 64, stock: 38 },
  { id: 'bin-037', name: '429858*1 | MYPOINT C.U.', desc: 'CREDIT CARD | Classic | United States | MyPoint Credit Union', price: 59, stock: 44 },
  { id: 'bin-038', name: '494392*1 | (No Bank)', desc: 'DEBIT CARD | Business | United States | Business Debit', price: 76, stock: 40 },
  { id: 'bin-039', name: '412452*1 | JPMorgan Chase Bank N.A.', desc: 'DEBIT CARD | Classic | United States | Chase Private Client Debit', price: 72, stock: 38 },
  { id: 'bin-040', name: '472612*1 | Wells Fargo Bank N.A.', desc: 'DEBIT CARD | Classic | United States | Wells Fargo Debit', price: 66, stock: 36 },
  { id: 'bin-041', name: '521987*1 | COMPUTER SERVICES, INC.', desc: 'DEBIT CARD | Enhanced | United States | CSI Enhanced Debit', price: 68, stock: 34 },
  { id: 'bin-042', name: '510791*1 | FIDELITY INFORMATION SERVICES, INC.', desc: 'DEBIT CARD | Standard | United States | Fidelity Standard Debit', price: 59, stock: 42 },
  { id: 'bin-043', name: '557252*1 | FISERV SOLUTIONS, LLC', desc: 'DEBIT CARD | Business | United States | FISERV Business Debit', price: 72, stock: 38 },
  { id: 'bin-044', name: '512027*1 | CAPITAL ONE BANK (USA), NATIONAL ASSOCIATION', desc: 'CREDIT CARD | Platinum | United States | Capital One Platinum Credit', price: 82, stock: 32 },
  { id: 'bin-045', name: '470772*1 | (No Bank)', desc: 'CREDIT CARD | Classic | United States | Classic Credit Card', price: 64, stock: 36 },
  { id: 'bin-046', name: '407563*1 | (No Bank)', desc: 'CREDIT CARD | Signature | United States | Signature Card', price: 85, stock: 35 },
  { id: 'bin-047', name: '403930*1 | MEMBERS FIRST CREDIT UNION OF FLORIDA', desc: 'CREDIT CARD | Classic | United States | MFCU Classic Credit', price: 62, stock: 40 },
  { id: 'bin-048', name: '460575*1 | HEALTH EDUCATION F.C.U.', desc: 'CREDIT CARD | Classic | United States | Health Ed Federal Credit Union', price: 59, stock: 48 },
  { id: 'bin-049', name: '543386*1 | HUNTINGTON NATIONAL BANK', desc: 'CREDIT CARD | Platinum | United States | Huntington Platinum', price: 78, stock: 32 },
  { id: 'bin-050', name: '556043*1 | CITIBANK N.A.', desc: 'CREDIT CARD | Professional | United States | Citi Professional', price: 92, stock: 35 },
  { id: 'bin-051', name: '528844*1 | ECU', desc: 'CREDIT CARD | Platinum | United States | ECU Platinum Credit', price: 76, stock: 38 },
  { id: 'bin-052', name: '430177*1 | Nationwide Bank', desc: 'CREDIT CARD | Classic | United States | Nationwide Classic Credit', price: 63, stock: 35 },
  { id: 'bin-053', name: '426446*1 | Heartland F.C.U.', desc: 'CREDIT CARD | Classic | United States | Heartland Federal Credit Union', price: 61, stock: 38 },
  { id: 'bin-054', name: '559222*1 | FIRST BANK', desc: 'CREDIT CARD | World Elite for Business | United States | First Bank Business Elite', price: 88, stock: 35 },
  { id: 'bin-055', name: '549111*1 | CAPITAL ONE, NATIONAL ASSOCIATION', desc: 'CREDIT CARD | Platinum | United States | Capital One Platinum Credit', price: 78, stock: 42 },
  { id: 'bin-056', name: '531203*1 | FISERV SOLUTIONS, LLC', desc: 'DEBIT CARD | Enhanced | United States | FISERV Enhanced Debit', price: 70, stock: 38 },
  { id: 'bin-057', name: '416161*1 | (No Bank)', desc: 'CREDIT CARD | Classic | United States | Classic Credit Card', price: 63, stock: 40 },
  { id: 'bin-058', name: '426380*1 | BORDER F.C.U.', desc: 'CREDIT CARD | Classic | United States | Border Federal Credit Union', price: 59, stock: 38 },
  { id: 'bin-059', name: '411291*1 | UNITED STATES SENATE F.C.U.', desc: 'CREDIT CARD | Classic | United States | US Senate Federal Credit Union', price: 61, stock: 38 },
  { id: 'bin-060', name: '468897*1 | ANDOVER F.C.U.', desc: 'DEBIT CARD | Classic | United States | Andover Federal Credit Union', price: 58, stock: 42 },
];

export const products: Product[] = [
  ...binProductsData.map((item, i) => ({
    id: item.id,
    name: item.name,
    description: item.desc,
    price: item.price,
    category: 'cards',
    features: [`BIN: ${item.id.split('-')[1].padStart(3, '0')}`, 'Type: Credit', 'Sub Brand: Classic', 'Issuer: Bank', 'Country: United States', 'Fresh Inventory'],
    stock: item.stock,
    rating: 4.5 + (i % 50) / 100,
    reviews: 100 + i * 10,
    stockOptions: [
      { price: item.price, balance: item.price * 800, stock: Math.floor(item.stock * 0.4), quality: 'Standard' },
      { price: item.price * 2, balance: item.price * 1500, stock: Math.floor(item.stock * 0.35), quality: 'Premium' },
      { price: item.price * 3, balance: item.price * 2200, stock: item.stock - Math.floor(item.stock * 0.4) - Math.floor(item.stock * 0.35), quality: 'Elite' }
    ]
  })),
  {
    id: 'card-1',
    name: 'Cloned Visa Credit Card',
    description: 'High-quality Visa Classic cloned debit card with full embossing and chip. Perfect for everyday use. Linkable to Cash app, Venmo, Zelle, Skrill and more. Fully functional and ready for immediate use with all major payment platforms. Features working EMV chip, contactless payment, and worldwide acceptance.',
    price: 150,
    originalPrice: 180,
    category: 'cards',
    badge: 'Best Seller',
    features: ['EMV Chip Technology', 'Contactless Payments', 'Worldwide Acceptance', 'Full Embossing', 'Instant Activation', 'No OTP Required', 'Link to Any App', '24/7 Support'],
    stock: 45,
    rating: 4.8,
    reviews: 128,
    stockOptions: generateStockOptions(150, 45)
  },
  {
    id: 'card-2',
    name: 'Cloned Mastercard Platinum Card',
    description: 'Premium Mastercard Cloned Platinum with enhanced security features and higher limits. Linkable to Cash app, Venmo, Zelle, Skrill and more. Advanced security features and premium support included. Perfect for high-value transactions with VIP concierge service.',
    price: 220,
    category: 'cards',
    badge: 'Premium',
    features: ['Platinum Status', 'Higher Spending Limits', 'VIP Concierge', 'Premium Design', 'Global Acceptance', 'No OTP Hassles', 'Instant Linking', 'Priority Support'],
    stock: 23,
    rating: 4.9,
    reviews: 89,
    stockOptions: generateStockOptions(280, 23)
  },
  {
    id: 'card-3',
    name: 'Cloned Amex Gold Card',
    description: 'American Express Cloned Gold card with premium finish and detailed design. Linkable to Cash app, Venmo, Zelle, Skrill and more. Premium gold finish with metal core for authentic feel. Ideal for luxury purchases and high-end shopping experiences.',
    price: 260,
    originalPrice: 320,
    category: 'cards',
    features: ['Luxury Gold Finish', 'Metal Core Design', 'Premium Feel', 'High Spending Power', 'No OTP Issues', 'Easy App Linking', 'Elegant Packaging', 'Collectors Item'],
    stock: 15,
    rating: 4.7,
    reviews: 56,
    stockOptions: generateStockOptions(320, 15)
  },
  {
    id: 'card-4',
    name: 'Cloned Visa Infinite Black Card',
    description: 'Exclusive Visa Cloned Infinite Black card for elite status and premium experiences. Linkable to Cash app, Venmo, Zelle, Skrill and more. Elite black metal card with concierge service and luxury perks. The ultimate status symbol for discerning customers.',
    price: 350,
    category: 'cards',
    badge: 'Elite',
    features: ['Elite Black Metal', 'Infinite Status', 'Concierge Service', 'Luxury Perks', 'No Security Blocks', 'Instant Activation', 'Worldwide Use', 'Exclusive Design'],
    stock: 8,
    rating: 5.0,
    reviews: 34,
    stockOptions: generateStockOptions(450, 8)
  },
  {
    id: 'card-5',
    name: 'Cloned Visa Gold Premium Card',
    description: 'Premium Visa Cloned Gold card with full features and premium support. Linkable to Cash app, Venmo, Zelle, Skrill and more. Gold design with EMV chip and contactless payment capabilities. Offers high daily limits and global acceptance for seamless transactions.',
    price: 200,
    originalPrice: 250,
    category: 'cards',
    features: ['Premium Gold Design', 'High Daily Limits', 'Contactless Ready', 'Global Acceptance', 'No OTP Required', 'Easy Integration', 'Fast Activation', 'Premium Support'],
    stock: 32,
    rating: 4.6,
    reviews: 89,
    stockOptions: generateStockOptions(200, 32, false)
  },
  {
    id: 'card-6',
    name: 'Cloned Mastercard Black Card',
    description: 'Elite Mastercard Cloned Black card with exclusive benefits. Linkable to Cash app, Venmo, Zelle, Skrill and more. Black metal core with high limits and VIP concierge access. Premium finish with worldwide acceptance and priority customer support.',
    price: 380,
    category: 'cards',
    badge: 'Exclusive',
    features: ['Black Metal Core', 'Elite Status', 'High Credit Limits', 'VIP Benefits', 'No Security Issues', 'Instant Setup', 'Worldwide Access', 'Premium Finish'],
    stock: 12,
    rating: 4.9,
    reviews: 45,
    stockOptions: generateStockOptions(380, 12, false)
  },
  {
    id: 'card-7',
    name: 'Discover Cloned It Card',
    description: 'Quality Discover Cloned card with all features. Linkable to Cash app, Venmo, Zelle, Skrill and more. Discover network with cash back rewards and enhanced security. No annual fee with great benefits and instant approval for immediate use.',
    price: 170,
    category: 'cards',
    features: ['Cash Back Rewards', 'No Annual Fee', 'Wide Acceptance', 'Online Shopping', 'No OTP Blocks', 'Easy Linking', 'Instant Approval', 'Great Benefits'],
    stock: 28,
    rating: 4.5,
    reviews: 67,
    stockOptions: generateStockOptions(170, 28, false)
  },
  {
    id: 'cc-1',
    name: 'US Linkable CC Pack',
    description: 'Pack of 5 linkable credit cards from US banks, ready for Cash out.',
    price: 150,
    category: 'ccs',
    badge: 'Popular',
    features: ['5 US Bank Cards', 'High Success Rate', 'Instant Delivery', 'Full Card Details', 'No OTP Blocks', 'Ready to Link', 'Online Shopping Ready', '24/7 Support'],
    stock: 67,
    rating: 4.6,
    reviews: 234,
    stockOptions: generateStockOptions(180, 67)
  },
  {
    id: 'cc-2',
    name: 'EU Linkable CC Bundle',
    description: 'European Union linkable credit cards bundle with multiple countries.',
    price: 180,
    originalPrice: 220,
    category: 'ccs',
    features: ['EU Wide Coverage', 'Multiple Banks', 'Verified Working', 'Full Details', 'No Security Issues', 'Instant Delivery', 'Easy Linking', 'Replacement Guarantee'],
    stock: 42,
    rating: 4.5,
    reviews: 178,
    stockOptions: generateStockOptions(220, 42)
  },
  {
    id: 'cc-3',
    name: 'UK Linkable CC Set',
    description: 'United Kingdom linkable credit cards from major UK banks.',
    price: 160,
    category: 'ccs',
    features: ['Major UK Banks', 'Full Card Details', 'High Quality', 'Fast Delivery', 'No OTP Required', 'Ready for Use', 'Support Included', 'Secure Packaging'],
    stock: 35,
    rating: 4.7,
    reviews: 145,
    stockOptions: generateStockOptions(200, 35)
  },
  {
    id: 'cc-4',
    name: 'CA Linkable CC Pack',
    description: 'Canadian linkable credit cards from top Canadian financial institutions.',
    price: 155,
    category: 'ccs',
    features: ['Canadian Banks', 'Fresh Stock', 'Reliable Source', 'Full Details', 'No Security Blocks', 'Instant Delivery', 'Tracking Included', 'Support Available'],
    stock: 28,
    rating: 4.4,
    reviews: 98,
    stockOptions: generateStockOptions(190, 28)
  },
  {
    id: 'cc-5',
    name: 'AU Linkable CC Pack',
    description: 'Australian linkable credit cards from major banks.',
    price: 210,
    category: 'ccs',
    features: ['Australian Banks', 'High Success Rate', 'Fresh Stock', 'Full Details', 'No OTP Issues', 'Instant Delivery', 'Easy Setup', 'Support Included'],
    stock: 25,
    rating: 4.6,
    reviews: 112,
    stockOptions: generateStockOptions(210, 25, false)
  },
  {
    id: 'cc-6',
    name: 'Global Mix CC Bundle',
    description: 'Mix of international linkable credit cards from various countries.',
    price: 300,
    originalPrice: 380,
    category: 'ccs',
    badge: 'Best Value',
    features: ['Multi-Country Cards', 'Fresh Stock', 'Verified Working', 'Full Details', 'No Security Issues', 'Instant Delivery', 'Easy Setup', 'Support Included'],
    stock: 18,
    rating: 4.7,
    reviews: 134,
    stockOptions: generateStockOptions(300, 18, false)
  },
  {
    id: 'log-1',
    name: 'Chase Bank Log',
    description: 'Fresh Chase bank account logs with full access details and security info.',
    price: 350,
    category: 'logs',
    badge: 'Fresh',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Full Access'],
    stock: 12,
    rating: 4.8,
    reviews: 67,
    stockOptions: generateStockOptions(350, 12)
  },
  {
    id: 'log-2',
    name: 'Bank of America Log',
    description: 'Bank of America account logs with complete login credentials.',
    price: 320,
    category: 'logs',
    features: ['Complete Login Details', '2FA Bypass', 'Email Included', 'Fresh Logs', 'No Security Blocks', 'Support Guide', 'Instant Delivery', 'Full Access'],
    stock: 18,
    rating: 4.6,
    reviews: 89,
    stockOptions: generateStockOptions(320, 18)
  },
  {
    id: 'log-3',
    name: 'Wells Fargo Log',
    description: 'Wells Fargo bank logs with verified balances and full access.',
    price: 300,
    originalPrice: 380,
    category: 'logs',
    features: ['Verified Balance', 'Full Control', 'Secure Access', 'Fresh Stock', 'No OTP Required', 'Instant Delivery', 'Easy Setup', 'Support Available'],
    stock: 22,
    rating: 4.5,
    reviews: 76,
    stockOptions: generateStockOptions(300, 22)
  },
  {
    id: 'log-4',
    name: 'Citi Bank Log',
    description: 'Citibank account logs with premium features and high balances.',
    price: 400,
    category: 'logs',
    badge: 'Premium',
    features: ['High Balance Account', 'Premium Features', 'Full Access', 'Email Verified', 'No Security Issues', 'Bonus Included', 'Instant Delivery', 'VIP Support'],
    stock: 9,
    rating: 4.9,
    reviews: 45,
    stockOptions: generateStockOptions(400, 9)
  },
  {
    id: 'acc-1',
    name: 'PayPal Verified Account',
    description: 'Fully verified PayPal account with bank and card linked.',
    price: 120,
    category: 'accounts',
    badge: 'Verified',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Fully Verified'],
    stock: 55,
    rating: 4.7,
    reviews: 312,
    stockOptions: generateStockOptions(120, 55)
  },
  {
    id: 'acc-2',
    name: 'CashApp Verified Account',
    description: 'Verified CashApp account ready for instant transfers.',
    price: 100,
    category: 'accounts',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'BTC Enabled'],
    stock: 38,
    rating: 4.5,
    reviews: 189,
    stockOptions: generateStockOptions(100, 38)
  },
  {
    id: 'acc-3',
    name: 'Venmo Business Account',
    description: 'Business verified Venmo account for higher transaction limits.',
    price: 150,
    originalPrice: 180,
    category: 'accounts',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Business Verified'],
    stock: 25,
    rating: 4.6,
    reviews: 134,
    stockOptions: generateStockOptions(150, 25)
  },
  {
    id: 'acc-4',
    name: 'Zelle Ready Account',
    description: 'Bank account with Zelle fully activated and ready to use.',
    price: 180,
    category: 'accounts',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Zelle Active'],
    stock: 31,
    rating: 4.8,
    reviews: 167,
    stockOptions: generateStockOptions(180, 31)
  },
  {
    id: 'tool-1',
    name: 'Card Checker Pro',
    description: 'Professional card checking tool with high accuracy and speed.',
    price: 250,
    category: 'tools',
    badge: 'Essential',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Lifetime Updates', 'API Available', 'High Accuracy', 'Fast Results'],
    stock: 100,
    rating: 4.9,
    reviews: 423,
    stockOptions: generateStockOptions(250, 100, true)
  },
  {
    id: 'tool-2',
    name: 'BIN Lookup Tool',
    description: 'Advanced BIN lookup tool with detailed bank information.',
    price: 80,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Daily Updates', 'API Access', 'Global Database', 'Real-time Data'],
    stock: 150,
    rating: 4.4,
    reviews: 234,
    stockOptions: generateStockOptions(80, 150, true)
  },
  {
    id: 'tool-3',
    name: 'Proxy Rotator',
    description: 'Premium proxy rotation service for secure browsing.',
    price: 60,
    originalPrice: 80,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', '24/7 Support', 'Unlimited Bandwidth', 'Global Locations', 'Residential IPs'],
    stock: 200,
    rating: 4.6,
    reviews: 345,
    stockOptions: generateStockOptions(60, 200, true)
  },
  {
    id: 'tool-4',
    name: 'Anti-Detect Browser',
    description: 'Advanced anti-detection browser for secure operations.',
    price: 150,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Stealth Mode', 'Auto-Clean', 'Proxy Integration', 'Multi-Profiles'],
    stock: 75,
    rating: 4.7,
    reviews: 278,
    stockOptions: generateStockOptions(150, 75, true)
  }
];

export const categories = [
  { id: 'cards', name: 'Cards', icon: 'credit_card', description: 'Premium credit and debit cards' },
  { id: 'ccs', name: 'CCs', icon: 'receipt_long', description: 'Linkable credit card packs' },
  { id: 'logs', name: 'Logs', icon: 'description', description: 'Bank account logs' },
  { id: 'accounts', name: 'Accounts', icon: 'account_circle', description: 'Verified digital accounts' },
  { id: 'tools', name: 'Tools', icon: 'build', description: 'Digital tools and services' },
];

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Alex Johnson',
    rating: 5,
    text: 'Got my first card within 5 minutes of purchase. The quality is amazing!',
    product: 'card-1'
  },
  {
    id: 'testimonial-2',
    name: 'Maria Garcia',
    rating: 5,
    text: 'The support team helped me with everything I needed. Highly recommend!',
    product: 'card-2'
  }
];

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is this store for?',
    answer: 'Card Vault Store provides premium digital products including cards, CCs, logs, accounts, and tools for legitimate purposes like testing, research, and development.'
  }
];