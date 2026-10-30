import type { Product, Testimonial, FAQ } from '@/types';

// Quality levels for tools
const toolQualityLevels = ['Basic', 'Standard', 'Advanced', 'Professional', 'Premium', 'Industrial'];

// Helper function to generate random stock options
function generateStockOptions(basePrice: number, totalStock: number, isTool: boolean = false): Product['stockOptions'] {
  const options: { price: number; balance: number; stock: number; quality?: string }[] = [];
  
  if (isTool) {
    // For tools, use quality levels instead of balances
    const numOptions = Math.min(toolQualityLevels.length, 3 + Math.floor(Math.random() * 4));
    
    for (let i = 0; i < numOptions; i++) {
      const quality = toolQualityLevels[i];
      // Price increases with quality level
      const priceIncrement = Math.floor((basePrice * 0.5) * i);
      const price = basePrice + priceIncrement;
      
      // Distribute stock among options
      const remainingStock = totalStock - options.reduce((sum: number, opt) => sum + opt.stock, 0);
      const maxStockForOption = Math.min(remainingStock, Math.max(1, Math.floor(totalStock / (numOptions - i))));
      const stock = i === numOptions - 1 ? remainingStock : Math.min(maxStockForOption, Math.floor(Math.random() * maxStockForOption) + 1);
      
      if (stock > 0) {
        options.push({
          price,
          balance: 0, // Tools don't have balances
          stock,
          quality
        });
      }
    }
  } else {
    // For non-tools (cards, CCs, logs, accounts), use price/balance pattern
    const numOptions = 3 + Math.floor(Math.random() * 3); // 3-5 options
    
    // Generate options with price increasing and balance also increasing
    for (let i = 0; i < numOptions; i++) {
      // Price increases progressively: basePrice to basePrice + 150
      const priceIncrement = Math.floor((150 / numOptions) * (i + 1)) + Math.floor(Math.random() * 20);
      const price = basePrice + priceIncrement;
      
      // Balance increases with price: price * (10 + i*2) to price * (15 + i*2)
      // This ensures higher price = higher balance
      const balanceMultiplierLow = 10 + i * 2;
      const balanceMultiplierHigh = 15 + i * 2;
      const balanceMultiplier = balanceMultiplierLow + Math.floor(Math.random() * (balanceMultiplierHigh - balanceMultiplierLow));
      const balance = price * balanceMultiplier;
      
      // Distribute stock among options - ensure stock doesn't exceed total
      const remainingStock: number = totalStock - options.reduce((sum, opt) => sum + opt.stock, 0);
      const maxStockForOption = Math.min(remainingStock, Math.max(1, Math.floor(totalStock / (numOptions - i))));
      const stock: number = i === numOptions - 1 ? remainingStock : Math.min(maxStockForOption, Math.floor(Math.random() * maxStockForOption) + 1);
      
      if (stock > 0) {
        options.push({
          price,
          balance,
          stock
        });
      }
    }
  }
  
  // Sort by price
  return options.sort((a, b) => a.price - b.price);
}

export const products: Product[] = [
  // Cards Category
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
  
  // Linkable CCs Category
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
  
  // Bank Logs Category
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
  
  // Accounts Category
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
  
  // Tools Category
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
  },

  // New Cards
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

  // New Linkable CCs
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
    features: ['Multi-Country Coverage', '10+ Banks', 'Verified Working', 'Bonus Cards', 'No Security Hassles', 'Priority Support', 'Full Details', 'Instant Delivery'],
    stock: 18,
    rating: 4.8,
    reviews: 198,
    stockOptions: generateStockOptions(300, 18, false)
  },

  // New Bank Logs
  {
    id: 'log-5',
    name: 'TD Bank Log',
    description: 'TD Bank account logs with full access credentials.',
    price: 340,
    category: 'logs',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Full Access'],
    stock: 14,
    rating: 4.7,
    reviews: 56,
    stockOptions: generateStockOptions(340, 14, false)
  },
  {
    id: 'log-6',
    name: 'Capital One Log',
    description: 'Capital One account logs with complete details.',
    price: 360,
    category: 'logs',
    badge: 'Fresh',
    features: ['Complete Account Access', '2FA Ready', 'Fresh Logs', 'Email Included', 'No Security Hassles', 'Replacement Guarantee', 'Instant Delivery', 'Full Support'],
    stock: 10,
    rating: 4.8,
    reviews: 42,
    stockOptions: generateStockOptions(360, 10, false)
  },
  {
    id: 'log-7',
    name: 'US Bank Log',
    description: 'US Bank account with full privileges and access.',
    price: 320,
    category: 'logs',
    features: ['Full Account Control', 'Online Access', 'Verified Account', 'No OTP Issues', 'Instant Delivery', 'Support Included', 'Easy Setup', 'Secure Access'],
    stock: 16,
    rating: 4.5,
    reviews: 63,
    stockOptions: generateStockOptions(320, 16, false)
  },

  // New Accounts
  {
    id: 'acc-5',
    name: 'Amazon Seller Account',
    description: 'Verified Amazon seller account ready for listings.',
    price: 280,
    category: 'accounts',
    badge: 'Verified',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Seller Verified'],
    stock: 15,
    rating: 4.7,
    reviews: 89,
    stockOptions: generateStockOptions(280, 15, false)
  },
  {
    id: 'acc-6',
    name: 'Stripe Connected Account',
    description: 'Fully verified Stripe account for payment processing.',
    price: 350,
    category: 'accounts',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Verified'],
    stock: 12,
    rating: 4.9,
    reviews: 67,
    stockOptions: generateStockOptions(350, 12, false)
  },
  {
    id: 'acc-7',
    name: 'Shopify Store Account',
    description: 'Premium Shopify store with apps installed.',
    price: 220,
    originalPrice: 280,
    category: 'accounts',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Premium Theme'],
    stock: 22,
    rating: 4.6,
    reviews: 134,
    stockOptions: generateStockOptions(220, 22, false)
  },

  // New Tools
  {
    id: 'tool-5',
    name: 'SMS Verification Tool',
    description: 'Virtual SMS verification for account creation.',
    price: 90,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', '24/7 Service', 'API Access', 'Multiple Countries', 'Fast Delivery'],
    stock: 180,
    rating: 4.5,
    reviews: 289,
    stockOptions: generateStockOptions(90, 180, true)
  },
  {
    id: 'tool-6',
    name: 'Email Verifier Pro',
    description: 'Professional email verification and validation tool.',
    price: 120,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'API', 'Reports', 'High Accuracy', 'Bulk Verify'],
    stock: 95,
    rating: 4.6,
    reviews: 178,
    stockOptions: generateStockOptions(120, 95, true)
  },
  {
    id: 'tool-7',
    name: 'VPN Premium Service',
    description: 'Premium VPN with high-speed servers worldwide.',
    price: 50,
    originalPrice: 70,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', '24/7 Support', 'Multi-Device', 'Global Servers', 'High Speed'],
    stock: 250,
    rating: 4.7,
    reviews: 456,
    stockOptions: generateStockOptions(50, 250, true)
  },
  {
    id: 'tool-8',
    name: 'Script Loader Pack',
    description: 'Collection of automation scripts for various tasks.',
    price: 180,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Support', 'Documentation', 'Regular Updates', '50+ Scripts'],
    stock: 60,
    rating: 4.8,
    reviews: 167,
    stockOptions: generateStockOptions(180, 60, true)
  },
  {
    id: 'tool-9',
    name: 'EvilURL',
    description: 'Detect & spoof lookalike domains using Unicode.',
    price: 120,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Python Based', 'Easy Setup', 'Phishing Protection', 'Domain Detection'],
    stock: 85,
    rating: 4.6,
    reviews: 78,
    stockOptions: generateStockOptions(120, 85, true)
  },
  {
    id: 'tool-10',
    name: 'CrackMapExec',
    description: 'Swiss army knife for pentesters working with Active Directory.',
    price: 250,
    category: 'tools',
    badge: 'Popular',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Regular Updates', 'Remote Execution', 'Lateral Movement', 'Credential Attacks'],
    stock: 45,
    rating: 4.9,
    reviews: 156,
    stockOptions: generateStockOptions(250, 45, true)
  },
  {
    id: 'tool-11',
    name: 'Ligolo-ng',
    description: 'Advanced reverse tunneling for red teamers.',
    price: 180,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Cross Platform', 'Easy Setup', 'Multi-channel', 'High Performance'],
    stock: 62,
    rating: 4.7,
    reviews: 89,
    stockOptions: generateStockOptions(180, 62, true)
  },
  {
    id: 'tool-12',
    name: 'Sliver',
    description: 'Powerful open-source C2 framework alternative to Cobalt Strike.',
    price: 350,
    category: 'tools',
    badge: 'Premium',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Advanced Obfuscation', 'External C2', 'Multi-player', 'Implant Generation'],
    stock: 25,
    rating: 4.9,
    reviews: 234,
    stockOptions: generateStockOptions(350, 25, true)
  },
  {
    id: 'tool-13',
    name: 'Peirates',
    description: 'Kubernetes penetration testing tool focused on AWS EKS.',
    price: 200,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Cloud Enum', 'Privilege Escalation', 'Credential Dumping', 'Kubernetes Attacks'],
    stock: 38,
    rating: 4.6,
    reviews: 67,
    stockOptions: generateStockOptions(200, 38, true)
  },
  {
    id: 'tool-14',
    name: 'Donut',
    description: 'Generates shellcode from PE files (used in fileless attacks).',
    price: 150,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Easy Integration', 'Cross Platform', 'Multiple Payloads', 'Fileless Execution'],
    stock: 95,
    rating: 4.5,
    reviews: 123,
    stockOptions: generateStockOptions(150, 95, true)
  },
  {
    id: 'tool-15',
    name: 'Rubeus',
    description: 'Post-exploitation Kerberos abuse tool (Golden Ticket, Pass-the-Ticket).',
    price: 280,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'S4U2Self', 'AS-REP Roasting', 'Pass-the-Ticket', 'Golden Ticket'],
    stock: 30,
    rating: 4.8,
    reviews: 145,
    stockOptions: generateStockOptions(280, 30, true)
  },
  {
    id: 'tool-16',
    name: 'SharpHound',
    description: 'Active Directory attack path mapping with BloodHound integration.',
    price: 220,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Easy Export', 'Attack Paths', 'Data Collection', 'BloodHound Compatible'],
    stock: 55,
    rating: 4.7,
    reviews: 189,
    stockOptions: generateStockOptions(220, 55, true)
  },
  {
    id: 'tool-17',
    name: 'LaZagne',
    description: 'Dumps credentials from local machines (password recovery).',
    price: 100,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Regular Updates', 'Local Storage', 'Password Recovery', 'Credential Dumping'],
    stock: 120,
    rating: 4.4,
    reviews: 267,
    stockOptions: generateStockOptions(100, 120, true)
  },
  {
    id: 'tool-18',
    name: 'Chisel',
    description: 'Fast TCP/UDP tunneling over HTTP (great for pivoting).',
    price: 140,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Easy Pivoting', 'Cross Platform', 'Fast Speed', 'HTTP Forward'],
    stock: 75,
    rating: 4.6,
    reviews: 98,
    stockOptions: generateStockOptions(140, 75, true)
  },
  {
    id: 'tool-19',
    name: 'NoPac',
    description: 'Exploits CVE-2021-42287 + 42278 for full domain takeover.',
    price: 320,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'High Success', 'Easy Use', 'Scanner Included', 'CVE Exploit'],
    stock: 20,
    rating: 4.9,
    reviews: 178,
    stockOptions: generateStockOptions(320, 20, true)
  },
  {
    id: 'tool-20',
    name: 'DeathStar',
    description: 'Automates privilege escalation in Active Directory environments.',
    price: 260,
    category: 'tools',
    features: ['Fully Functional', 'Easy Setup', 'Ready to Use', 'Full Documentation', 'Regular Updates', 'API Integration', 'Python Based', 'Priv Esc'],
    stock: 35,
    rating: 4.7,
    reviews: 112,
    stockOptions: generateStockOptions(260, 35, true)
  },

  // New Products - Additional Services
  {
    id: 'new-1',
    name: 'Bank Logs - Any Bank',
    description: 'Bank logs from any bank of your choice. Full access credentials included.',
    price: 350,
    category: 'logs',
    badge: 'Custom',
    features: ['Any Bank Available', 'Full Access', 'Fresh Logs', 'No Security Blocks', 'Instant Delivery', 'Support Included', 'Custom Request', 'Easy to Use'],
    stock: 20,
    rating: 4.8,
    reviews: 156,
    stockOptions: generateStockOptions(350, 20)
  },
  {
    id: 'new-2',
    name: 'Clean CCs - Spend Away',
    description: 'Clean credit cards ready for use. High success rate guaranteed.',
    price: 180,
    category: 'ccs',
    badge: 'Verified',
    features: ['Clean Cards', 'High Success Rate', 'Verified Working', 'Full Details', 'No OTP Blocks', 'Instant Delivery', 'Replacement Guarantee', 'Ready to Use'],
    stock: 45,
    rating: 4.7,
    reviews: 234,
    stockOptions: generateStockOptions(180, 45)
  },
  {
    id: 'new-3',
    name: 'CashApp Dumps - Cash Out',
    description: 'CashApp accounts with dumps ready for cash out operations.',
    price: 200,
    category: 'accounts',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'BTC Enabled'],
    stock: 30,
    rating: 4.6,
    reviews: 189,
    stockOptions: generateStockOptions(200, 30)
  },
  {
    id: 'new-4',
    name: 'PayPal w Access - Send',
    description: 'PayPal accounts with full access for sending money.',
    price: 150,
    category: 'accounts',
    badge: 'Verified',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Full Access'],
    stock: 25,
    rating: 4.9,
    reviews: 312,
    stockOptions: generateStockOptions(150, 25)
  },
  {
    id: 'new-5',
    name: 'Chime - Transfer',
    description: 'Chime bank accounts ready for transfers.',
    price: 180,
    category: 'accounts',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Transfer Ready'],
    stock: 18,
    rating: 4.7,
    reviews: 145,
    stockOptions: generateStockOptions(180, 18)
  },
  {
    id: 'new-6',
    name: 'Venmo - Drop',
    description: 'Venmo accounts ready for dropping funds.',
    price: 160,
    category: 'accounts',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Drop Ready'],
    stock: 22,
    rating: 4.6,
    reviews: 167,
    stockOptions: generateStockOptions(160, 22)
  },
  {
    id: 'new-7',
    name: 'Zelle - Quick Pay',
    description: 'Zelle enabled accounts for quick payments.',
    price: 190,
    category: 'accounts',
    badge: 'Fast',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Zelle Active'],
    stock: 28,
    rating: 4.8,
    reviews: 198,
    stockOptions: generateStockOptions(190, 28)
  },
  {
    id: 'new-8',
    name: 'Apple Pay - Wallet',
    description: 'Apple Pay wallets with linked cards ready to use.',
    price: 220,
    category: 'accounts',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Wallet Ready'],
    stock: 15,
    rating: 4.7,
    reviews: 134,
    stockOptions: generateStockOptions(220, 15)
  },
  {
    id: 'new-9',
    name: 'ACH - Wire It',
    description: 'ACH and wire transfer accounts for sending money.',
    price: 300,
    category: 'accounts',
    badge: 'Premium',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'ACH Enabled'],
    stock: 12,
    rating: 4.9,
    reviews: 89,
    stockOptions: generateStockOptions(300, 12)
  },
  {
    id: 'new-10',
    name: 'Slips - ATM Time',
    description: 'ATM slips ready for cash withdrawals.',
    price: 250,
    category: 'ccs',
    features: ['ATM Ready Slips', 'Fresh Stock', 'High Success Rate', 'Full Details', 'No Security Issues', 'Instant Delivery', 'Support Included', 'Easy to Use'],
    stock: 35,
    rating: 4.6,
    reviews: 178,
    stockOptions: generateStockOptions(250, 35)
  },
  {
    id: 'new-11',
    name: 'Stims - Cleared',
    description: 'Cleared stimulus accounts ready for use.',
    price: 280,
    category: 'accounts',
    features: ['Fully Functional', 'OTP Disabled', 'Ready for Shopping', 'Link Bank Account', 'Order Items Online', 'Full Details Included', 'No Security Hassles', 'Cleared Status'],
    stock: 18,
    rating: 4.8,
    reviews: 145,
    stockOptions: generateStockOptions(280, 18)
  },
  
  // Fullz Category
  {
    id: 'fullz-1',
    name: 'US Fullz Package',
    description: 'HIDDEN',
    price: 25,
    category: 'fullz',
    badge: 'Popular',
    features: ['HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN'],
    stock: 45,
    rating: 4.8,
    reviews: 234,
    stockOptions: generateStockOptions(25, 45)
  },
  {
    id: 'fullz-2',
    name: 'EU Fullz Bundle',
    description: 'HIDDEN',
    price: 24,
    category: 'fullz',
    badge: 'Premium',
    features: ['HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN'],
    stock: 32,
    rating: 4.7,
    reviews: 178,
    stockOptions: generateStockOptions(24, 32)
  },
  {
    id: 'fullz-3',
    name: 'UK Fullz Package',
    description: 'HIDDEN',
    price: 23,
    category: 'fullz',
    features: ['HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN'],
    stock: 28,
    rating: 4.6,
    reviews: 145,
    stockOptions: generateStockOptions(23, 28)
  },
  {
    id: 'fullz-4',
    name: 'Premium Fullz Elite',
    description: 'HIDDEN',
    price: 22,
    category: 'fullz',
    badge: 'Elite',
    features: ['HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN'],
    stock: 12,
    rating: 5.0,
    reviews: 67,
    stockOptions: generateStockOptions(22, 12)
  },
  {
    id: 'fullz-5',
    name: 'Canada Fullz Pack',
    description: 'HIDDEN',
    price: 21,
    category: 'fullz',
    features: ['HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN'],
    stock: 35,
    rating: 4.5,
    reviews: 98,
    stockOptions: generateStockOptions(21, 35)
  },
  {
    id: 'fullz-6',
    name: 'Fullz Starter Pack',
    description: 'HIDDEN',
    price: 20,
    category: 'fullz',
    badge: 'Value',
    features: ['HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN', 'HIDDEN'],
    stock: 60,
    rating: 4.4,
    reviews: 312,
    stockOptions: generateStockOptions(20, 60)
  },

  // Courses Category
  {
    id: 'course-1',
    name: 'Spamming Full Course',
    description: 'Ultimate Spamming Master Course - Complete toolkit for professional spammers. Master email marketing, SMS campaigns, scam pages creation, and advanced bulk messaging techniques. Includes scam letters & pages, professional mailers & software tools, essential bots & validators, SMTP/shell/cPanel/WordPress setups, video tutorials, eBooks, and proven spamming methods. Learn list building, automation scripts, high-conversion strategies, and stay updated with lifetime access. Everything a professional spammer needs in one comprehensive package. [PDF Contains: Video Tutorials, Best Lab Sites for Practice, Scam Templates, Mailer Setups, Bot Configurations, SMTP Guides, Automation Scripts, Success Case Studies, Money Making Strategies]',
    price: 500,
    category: 'spamming-course',
    badge: 'Complete Package',
    features: ['Scam Pages & Letters Creation', 'Professional Mailers & Software', 'Essential Bots & Validators', 'SMTP/Shell/CPanel/WordPress Setups', 'Video Tutorials & eBooks', 'SMS & Email Spamming Methods', 'List Building Techniques', 'Automation Scripts', 'High-Conversion Strategies', 'Lifetime Updates', '24/7 Support'],
    stock: 50,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 'course-2',
    name: 'Advanced Hacking Course',
    description: 'Elite Blackhat Hacking Master Course - Complete arsenal for professional hackers. Master RAT development & deployment, keylogger creation, botnet building & control, crypter & binder tools, rootkit installation, zero-day exploits, SQL injection, XSS attacks, phishing frameworks, malware analysis & creation. Includes private blackhat tools, exploit databases, underground hacking techniques, anonymity methods (VPN/Tor), anti-forensic tools, and advanced persistence techniques. Learn to bypass AV, create undetectable payloads, build C2 servers, and monetize your skills. Lifetime access with regular updates on latest vulnerabilities and techniques. [PDF Contains: Video Tutorials, Best Lab Sites for Practice, Exploit Databases, Tool Configurations, Malware Source Code, Anonymity Guides, C2 Server Setups, Zero-Day Exploits, Real-World Case Studies]',
    price: 800,
    category: 'hacking-course',
    badge: 'Professional Level',
    features: ['RAT Development & Deployment', 'Keylogger Creation', 'Botnet Building & Control', 'Crypters & Binders', 'Rootkit Installation', 'Zero-Day Exploits', 'SQL Injection & XSS', 'Phishing Frameworks', 'Malware Analysis', 'Anti-Forensic Tools', 'C2 Server Setup', 'AV Bypass Techniques', 'Lifetime Updates'],
    stock: 30,
    rating: 4.9,
    reviews: 89
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Michael R.',
    avatar: 'MR',
    rating: 5,
    comment: 'Best card shop I\'ve ever used. Fast delivery, quality products, and excellent support. The Visa Infinite card looks amazing!',
    date: '2026-02-28',
    verified: true
  },
  {
    id: 't2',
    name: 'Sarah K.',
    avatar: 'SK',
    rating: 5,
    comment: 'The linkable CCs worked perfectly for my needs. Customer service was very helpful when I had questions. Will definitely order again!',
    date: '2026-01-15',
    verified: true
  },
  {
    id: 't3',
    name: 'James T.',
    avatar: 'JT',
    rating: 4,
    comment: 'Great selection of products at competitive prices. The Card Checker Pro tool is worth every penny. Highly recommended!',
    date: '2025-12-20',
    verified: true
  },
  {
    id: 't4',
    name: 'Emily W.',
    avatar: 'EW',
    rating: 5,
    comment: 'Fast shipping and discreet packaging. The PayPal account was fully verified as described. Very satisfied with my purchase!',
    date: '2025-11-08',
    verified: true
  },
  {
    id: 't5',
    name: 'David L.',
    avatar: 'DL',
    rating: 5,
    comment: 'Been using CardVault for months now. Never had a bad experience. Their bank logs are fresh and working. 10/10 service!',
    date: '2025-10-22',
    verified: true
  },
  {
    id: 't6',
    name: 'Jessica M.',
    avatar: 'JM',
    rating: 4,
    comment: 'The tools section has everything you need. The proxy rotator works flawlessly. Great value for money!',
    date: '2025-09-14',
    verified: true
  }
];

export const faqs: FAQ[] = [
  {
    id: 'f1',
    question: 'How does the delivery process work?',
    answer: 'All digital products are delivered instantly via encrypted email or through our secure customer portal. Physical cards are shipped discreetly with tracking within 24-48 hours of order confirmation.'
  },
  {
    id: 'f2',
    question: 'What payment methods do you accept?',
    answer: 'We accept Bitcoin, Ethereum, Monero, and other major cryptocurrencies. We also accept payments through verified payment processors for your convenience and security.'
  },
  {
    id: 'f3',
    question: 'Is there a refund policy?',
    answer: 'Yes, we offer replacements for non-working products within 24 hours of delivery. Please contact our support team immediately if you encounter any issues with your order.'
  },
  {
    id: 'f4',
    question: 'How can I verify the quality of products?',
    answer: 'All our products go through rigorous quality checks before shipping. We also provide proof of verification for digital products and tracking for physical items.'
  },
  {
    id: 'f5',
    question: 'Do you offer bulk discounts?',
    answer: 'Yes, we offer significant discounts for bulk orders. Contact our support team for custom pricing on orders above $1000.'
  },
  {
    id: 'f6',
    question: 'Is my information secure?',
    answer: 'Absolutely. We use military-grade encryption for all communications and transactions. We never store sensitive customer data and all orders are processed anonymously.'
  }
];

export const categories = [
  { id: 'all', name: 'All Products', icon: 'LayoutGrid' },
  { id: 'cards', name: 'Cards', icon: 'CreditCard' },
  { id: 'ccs', name: 'Linkable CCs', icon: 'Link' },
  { id: 'logs', name: 'Bank Logs', icon: 'Database' },
  { id: 'accounts', name: 'Accounts', icon: 'UserCircle' },
  { id: 'tools', name: 'Tools', icon: 'Wrench' },
  { id: 'fullz', name: 'Fullz', icon: 'FileText' },
  { id: 'spamming-course', name: 'Spamming Full Course', icon: 'Mail' },
  { id: 'hacking-course', name: 'Advanced Hacking Course', icon: 'Shield' }
] as const;
