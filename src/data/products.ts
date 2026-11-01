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
  },

  // Daily Drops Category
  {
    id: 'daily-ihg',
    name: 'IHG',
    description: 'Full access || email || login',
    price: 45,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Full Access', 'Email Included', 'Login Credentials'],
    stock: 10,
    rating: 4.7,
    reviews: 89,
    stockOptions: [
      { price: 45, balance: 250000, stock: 2, quality: '250k+ Points' },
      { price: 60, balance: 500000, stock: 3, quality: '500K+ Points' },
      { price: 100, balance: 1000000, stock: 3, quality: '1M+ Points' },
      { price: 185, balance: 2000000, stock: 1, quality: '2M+ Points' },
      { price: 400, balance: 4000000, stock: 1, quality: '4M+ Points' }
    ]
  },
  {
    id: 'daily-1',
    name: 'BEST BUY',
    description: 'Full access || email || login',
    price: 50,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Full Access', 'Email Included', 'Login Credentials'],
    stock: 15,
    rating: 4.6,
    reviews: 156,
    stockOptions: [
      { price: 100, balance: 3500, stock: 5, quality: '+ Credit [$3500 REWARD]' },
      { price: 50, balance: 1400, stock: 5, quality: '+ Credit [$1400 REWARD]' },
      { price: 250, balance: 5000, stock: 3, quality: '+ Credit [$5000 REWARD]' },
      { price: 500, balance: 7400, stock: 2, quality: '+ Credit [$7,400 REWARD]' }
    ]
  },
  {
    id: 'daily-2',
    name: 'FANDULE',
    description: 'Fandules fa || login || email',
    price: 45,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Full Access', 'Login Credentials', 'Email Included'],
    stock: 12,
    rating: 4.8,
    reviews: 67,
    stockOptions: [
      { price: 250, balance: 6500, stock: 4, quality: '[ $6,500 ]' },
      { price: 120, balance: 4000, stock: 4, quality: '[ $4,000 ]' },
      { price: 45, balance: 2500, stock: 4, quality: '[ $2,500 ] BAL' }
    ]
  },
  {
    id: 'daily-3',
    name: 'PRE PAY',
    description: 'Prepay fa logs || full email access',
    price: 45,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Full Access Logs', 'Full Email Access'],
    stock: 18,
    rating: 4.5,
    reviews: 123,
    stockOptions: [
      { price: 80, balance: 2500, stock: 6, quality: '[ $2,500 ]' },
      { price: 45, balance: 1200, stock: 12, quality: '[ $1,200 ]' }
    ]
  },
  {
    id: 'daily-4',
    name: 'OTP BOT',
    description: 'Otp bot || bypass || codes || emails',
    price: 65,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['OTP Bypass', 'Codes Included', 'Emails Access'],
    stock: 10,
    rating: 4.9,
    reviews: 45,
    stockOptions: [
      { price: 65, balance: 0, stock: 3, quality: '[4 DAYS]' },
      { price: 250, balance: 0, stock: 3, quality: '[LIFETIME]' },
      { price: 150, balance: 0, stock: 4, quality: '[WEEKLY]' }
    ]
  },
  {
    id: 'daily-5',
    name: 'BLITZ CC [ ACC ]',
    description: 'CC || CVV || ACCESS',
    price: 45,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['CC Access', 'CVV Included', 'Full Access'],
    stock: 8,
    rating: 4.7,
    reviews: 89,
    stockOptions: [
      { price: 85, balance: 4500, stock: 3, quality: '+ FA [ $4,500 ]' },
      { price: 45, balance: 2500, stock: 5, quality: '+ FA [ $2,500 ]' }
    ]
  },
  {
    id: 'daily-6',
    name: 'CASH APP FA',
    description: 'Cashapp full access with all plugins',
    price: 50,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Full Access', 'All Plugins', 'Bitcoin Enabled'],
    stock: 14,
    rating: 4.6,
    reviews: 134,
    stockOptions: [
      { price: 50, balance: 2000, stock: 5, quality: 'FA [ $2,000 ]' },
      { price: 100, balance: 4000, stock: 9, quality: 'FA [ $4,000 ]' }
    ]
  },
  {
    id: 'daily-7',
    name: 'DISCOVER',
    description: 'Account || email || access',
    price: 45,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Account Access', 'Email Included', 'Full Access'],
    stock: 20,
    rating: 4.5,
    reviews: 178,
    stockOptions: [
      { price: 45, balance: 2000, stock: 7, quality: 'CC + CVV [ $2,000 ]' },
      { price: 80, balance: 3500, stock: 7, quality: 'CC + CVV [ $3,500 ]' },
      { price: 150, balance: 5000, stock: 6, quality: 'CC + CVV [ $5,000 ]' }
    ]
  },
  {
    id: 'daily-8',
    name: 'PAYPAL',
    description: 'Account || Email || Access',
    price: 70,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Account Access', 'Email Included', 'Full Access'],
    stock: 11,
    rating: 4.8,
    reviews: 145,
    stockOptions: [
      { price: 70, balance: 1500, stock: 4, quality: 'Verified [ $1,500 ]' },
      { price: 110, balance: 2500, stock: 4, quality: 'Business [ $2,500 ]' },
      { price: 180, balance: 5000, stock: 2, quality: 'Merchant [ $5,000 ]' },
      { price: 300, balance: 10000, stock: 1, quality: 'Premium [ $10,000 ]' }
    ]
  },
  {
    id: 'daily-9',
    name: 'CHIME',
    description: 'Full email access',
    price: 45,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Full Email Access'],
    stock: 16,
    rating: 4.6,
    reviews: 98,
    stockOptions: [
      { price: 45, balance: 1000, stock: 6, quality: '[ $1,000 ]' },
      { price: 70, balance: 2500, stock: 6, quality: '[ $2,500 ]' },
      { price: 115, balance: 5000, stock: 3, quality: '[ $5,000 ]' },
      { price: 190, balance: 10000, stock: 1, quality: '[ $10,000 ]' }
    ]
  },
  {
    id: 'daily-10',
    name: 'HILTON',
    description: 'Hotel log || Email || access',
    price: 65,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Hotel Account', 'Email Included', 'Full Access'],
    stock: 13,
    rating: 4.7,
    reviews: 112,
    stockOptions: [
      { price: 65, balance: 50000, stock: 4, quality: '50K Points' },
      { price: 100, balance: 100000, stock: 4, quality: '100K Points' },
      { price: 165, balance: 200000, stock: 3, quality: '200K Points' },
      { price: 275, balance: 500000, stock: 2, quality: '500K Points' }
    ]
  },
  {
    id: 'daily-11',
    name: 'ACORN FA + BAL',
    description: 'ACORN FA || MAIL || BAL..',
    price: 75,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Full Access', 'Mail Included', 'Balance Available'],
    stock: 9,
    rating: 4.8,
    reviews: 76,
    stockOptions: [
      { price: 75, balance: 2500, stock: 3, quality: '[ $2,500 ]' },
      { price: 115, balance: 5000, stock: 3, quality: '[ $5,000 ]' },
      { price: 190, balance: 10000, stock: 2, quality: '[ $10,000 ]' },
      { price: 320, balance: 25000, stock: 1, quality: '[ $25,000 ]' }
    ]
  },
  {
    id: 'daily-12',
    name: 'ABC PROXY',
    description: 'PROXY || BYPASS',
    price: 30,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Proxy Service', 'Bypass Capabilities'],
    stock: 25,
    rating: 4.4,
    reviews: 189,
    stockOptions: [
      { price: 30, balance: 0, stock: 9, quality: '[MONTHLY]' },
      { price: 50, balance: 0, stock: 9, quality: '[QUARTERLY]' },
      { price: 80, balance: 0, stock: 5, quality: '[6 MONTHS]' },
      { price: 130, balance: 0, stock: 2, quality: '[YEARLY]' }
    ]
  },
  {
    id: 'daily-13',
    name: 'ULTA + BAL',
    description: 'ULTA || BAL || EMAIL || ACCESS',
    price: 35,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Account Access', 'Balance Included', 'Email Included', 'Full Access'],
    stock: 17,
    rating: 4.5,
    reviews: 145,
    stockOptions: [
      { price: 35, balance: 2000, stock: 8, quality: '[$2,0OO]' },
      { price: 65, balance: 3500, stock: 9, quality: '[$3,5OO]' }
    ]
  },
  {
    id: 'daily-14',
    name: 'VANILLA PREPAID CC+CVV',
    description: 'CC+CVV || MAIL ACCESS || BY PASS',
    price: 85,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['CC+CVV', 'Mail Access', 'Bypass Ready'],
    stock: 7,
    rating: 4.7,
    reviews: 89,
    stockOptions: [
      { price: 85, balance: 1000, stock: 2, quality: '[ $1,000 ]' },
      { price: 130, balance: 2500, stock: 2, quality: '[ $2,500 ]' },
      { price: 215, balance: 5000, stock: 2, quality: '[ $5,000 ]' },
      { price: 360, balance: 10000, stock: 1, quality: '[ $10,000 ]' }
    ]
  },
  {
    id: 'daily-15',
    name: 'CMX BYPASS',
    description: 'LOG || CODE || MAIL',
    price: 55,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Log Included', 'Code Access', 'Mail Included'],
    stock: 12,
    rating: 4.8,
    reviews: 67,
    stockOptions: [
      { price: 55, balance: 0, stock: 4, quality: '[STANDARD]' },
      { price: 85, balance: 0, stock: 4, quality: '[PREMIUM]' },
      { price: 140, balance: 0, stock: 3, quality: '[ENTERPRISE]' },
      { price: 235, balance: 0, stock: 1, quality: '[ULTIMATE]' }
    ]
  },
  {
    id: 'daily-16',
    name: 'EMAIL & SMS BOOMBER',
    description: 'MAIL|| ACCESS',
    price: 35,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Email Access', 'SMS Bomber'],
    stock: 22,
    rating: 4.6,
    reviews: 123,
    stockOptions: [
      { price: 35, balance: 0, stock: 8, quality: '[10K MESSAGES]' },
      { price: 55, balance: 0, stock: 8, quality: '[25K MESSAGES]' },
      { price: 90, balance: 0, stock: 4, quality: '[50K MESSAGES]' },
      { price: 150, balance: 0, stock: 2, quality: '[100K MESSAGES]' }
    ]
  },
  {
    id: 'daily-17',
    name: 'AMAZON FA',
    description: 'LOG || ACCESS || MAIL',
    price: 60,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Log Included', 'Full Access', 'Mail Included'],
    stock: 14,
    rating: 4.7,
    reviews: 156,
    stockOptions: [
      { price: 60, balance: 500, stock: 5, quality: '[ $500 CREDIT ]' },
      { price: 95, balance: 1000, stock: 5, quality: '[ $1,000 CREDIT ]' },
      { price: 155, balance: 2000, stock: 3, quality: '[ $2,000 CREDIT ]' },
      { price: 260, balance: 5000, stock: 1, quality: '[ $5,000 CREDIT ]' }
    ]
  },
  {
    id: 'daily-18',
    name: 'DAILY PAY FA',
    description: 'LOG || ACCESS || MAIL',
    price: 65,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Log Included', 'Full Access', 'Mail Included'],
    stock: 11,
    rating: 4.8,
    reviews: 89,
    stockOptions: [
      { price: 65, balance: 1000, stock: 4, quality: '[ $1,000 ]' },
      { price: 100, balance: 2000, stock: 4, quality: '[ $2,000 ]' },
      { price: 165, balance: 5000, stock: 2, quality: '[ $5,000 ]' },
      { price: 275, balance: 10000, stock: 1, quality: '[ $10,000 ]' }
    ]
  },
  {
    id: 'daily-19',
    name: 'SOUTHWEST FLIGHTS',
    description: 'LOG | FLIGHT | EMAILS',
    price: 75,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Log Included', 'Flight Access', 'Emails Included'],
    stock: 9,
    rating: 4.9,
    reviews: 67,
    stockOptions: [
      { price: 75, balance: 50000, stock: 3, quality: '50K Points' },
      { price: 115, balance: 100000, stock: 3, quality: '100K Points' },
      { price: 190, balance: 200000, stock: 2, quality: '200K Points' },
      { price: 320, balance: 500000, stock: 1, quality: '500K Points' }
    ]
  },
  {
    id: 'daily-20',
    name: 'WALMART FA',
    description: 'LOG = ACCESS = MAIL',
    price: 45,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Log Included', 'Full Access', 'Mail Included'],
    stock: 19,
    rating: 4.5,
    reviews: 178,
    stockOptions: [
      { price: 45, balance: 500, stock: 7, quality: '[ $500 ]' },
      { price: 70, balance: 1000, stock: 7, quality: '[ $1,000 ]' },
      { price: 115, balance: 2000, stock: 4, quality: '[ $2,000 ]' },
      { price: 190, balance: 5000, stock: 1, quality: '[ $5,000 ]' }
    ]
  },
  {
    id: 'daily-21',
    name: 'KLARNA FA +ID',
    description: 'LOG = ACCESS = MAIL',
    price: 80,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['Log Included', 'Full Access', 'Mail Included'],
    stock: 8,
    rating: 4.8,
    reviews: 45,
    stockOptions: [
      { price: 80, balance: 1000, stock: 3, quality: '[ $1,000 LIMIT ]' },
      { price: 125, balance: 2500, stock: 3, quality: '[ $2,500 LIMIT ]' },
      { price: 205, balance: 5000, stock: 1, quality: '[ $5,000 LIMIT ]' },
      { price: 345, balance: 10000, stock: 1, quality: '[ $10,000 LIMIT ]' }
    ]
  },
  {
    id: 'daily-22',
    name: 'Enrolls Cc',
    description: 'Cc | Mail Access | Codes',
    price: 90,
    category: 'daily-drops',
    badge: 'Daily Drop',
    features: ['CC Account', 'Mail Access', 'Codes Included'],
    stock: 6,
    rating: 4.7,
    reviews: 89,
    stockOptions: [
      { price: 90, balance: 500, stock: 2, quality: '[ $500 REWARD ]' },
      { price: 140, balance: 1000, stock: 2, quality: '[ $1,000 REWARD ]' },
      { price: 230, balance: 2000, stock: 1, quality: '[ $2,000 REWARD ]' },
      { price: 385, balance: 5000, stock: 1, quality: '[ $5,000 REWARD ]' }
    ]
  },

  // US Bank Logs
  {
    id: 'us-bank-pnc',
    name: 'PNC Bank Log',
    description: 'Fresh PNC Bank account logs with full access credentials and verified balances.',
    price: 340,
    category: 'logs',
    features: ['Fully Functional', 'OTP Disabled', 'Verified Balance', 'Full Access', 'Email Included', 'No Security Blocks', 'Instant Delivery', '24/7 Support'],
    stock: 15,
    rating: 4.7,
    reviews: 78,
    stockOptions: generateStockOptions(340, 15)
  },
  {
    id: 'us-bank-woodforest',
    name: 'Woodforest Bank Log',
    description: 'Woodforest Bank account logs with complete login details and full access.',
    price: 310,
    category: 'logs',
    features: ['Complete Login Details', '2FA Bypass', 'Email Included', 'Fresh Logs', 'No Security Blocks', 'Support Guide', 'Instant Delivery', 'Full Access'],
    stock: 18,
    rating: 4.6,
    reviews: 65,
    stockOptions: generateStockOptions(310, 18)
  },
  {
    id: 'us-bank-chime',
    name: 'Chime Bank Log',
    description: 'Chime Bank account logs with verified balances and full access.',
    price: 330,
    category: 'logs',
    features: ['Verified Balance', 'Full Control', 'Secure Access', 'Fresh Stock', 'No OTP Required', 'Instant Delivery', 'Easy Setup', 'Support Available'],
    stock: 22,
    rating: 4.8,
    reviews: 89,
    stockOptions: generateStockOptions(330, 22)
  },
  {
    id: 'us-bank-citizens',
    name: 'Citizens Bank Log',
    description: 'Citizens Bank account logs with premium features and verified balances.',
    price: 360,
    category: 'logs',
    badge: 'Premium',
    features: ['High Balance Account', 'Premium Features', 'Full Access', 'Email Verified', 'No Security Issues', 'Bonus Included', 'Instant Delivery', 'VIP Support'],
    stock: 12,
    rating: 4.9,
    reviews: 56,
    stockOptions: generateStockOptions(360, 12)
  },
  {
    id: 'us-bank-amex',
    name: 'American Express National Log',
    description: 'American Express National account logs with complete access and full privileges.',
    price: 380,
    category: 'logs',
    badge: 'Elite',
    features: ['Elite Status Account', 'Full Privileges', 'Verified Access', 'Email Included', 'No Security Blocks', 'Instant Delivery', 'Premium Support', 'Full Access'],
    stock: 10,
    rating: 4.8,
    reviews: 72,
    stockOptions: generateStockOptions(380, 10)
  },
  {
    id: 'us-bank-regions',
    name: 'Regions Bank Log',
    description: 'Regions Bank account logs with full credentials and verified access.',
    price: 320,
    category: 'logs',
    features: ['Complete Access', 'Verified Credentials', 'Email Included', 'Fresh Logs', 'No Security Blocks', 'Support Included', 'Instant Delivery', 'Full Access'],
    stock: 14,
    rating: 4.7,
    reviews: 68,
    stockOptions: generateStockOptions(320, 14)
  },
  {
    id: 'us-bank-huntington',
    name: 'Huntington National Bank Log',
    description: 'Huntington National Bank account logs with full control and verified balances.',
    price: 350,
    category: 'logs',
    features: ['Full Account Control', 'Verified Balances', 'Email Included', 'Fresh Stock', 'No OTP Issues', 'Instant Delivery', 'Support Included', 'Secure Access'],
    stock: 11,
    rating: 4.6,
    reviews: 54,
    stockOptions: generateStockOptions(350, 11)
  },
  {
    id: 'us-bank-first-republic',
    name: 'First Republic Bank Log',
    description: 'First Republic Bank account logs with premium features and elite access.',
    price: 400,
    category: 'logs',
    badge: 'Premium',
    features: ['Premium Account', 'Elite Access', 'Full Control', 'Email Verified', 'No Security Issues', 'Bonus Included', 'Instant Delivery', 'VIP Support'],
    stock: 8,
    rating: 4.9,
    reviews: 43,
    stockOptions: generateStockOptions(400, 8)
  },
  {
    id: 'us-bank-keybank',
    name: 'KeyBank Log',
    description: 'KeyBank account logs with complete access and verified balances.',
    price: 340,
    category: 'logs',
    features: ['Verified Balance', 'Full Access', 'Email Included', 'Fresh Logs', 'No Security Blocks', 'Instant Delivery', 'Support Included', 'Easy Setup'],
    stock: 13,
    rating: 4.7,
    reviews: 61,
    stockOptions: generateStockOptions(340, 13)
  },
  {
    id: 'us-bank-hsbc',
    name: 'HSBC Bank USA Log',
    description: 'HSBC Bank USA account logs with international features and full access.',
    price: 370,
    category: 'logs',
    features: ['International Access', 'Full Control', 'Verified Account', 'Email Included', 'No OTP Issues', 'Instant Delivery', '24/7 Support', 'Full Access'],
    stock: 9,
    rating: 4.8,
    reviews: 58,
    stockOptions: generateStockOptions(370, 9)
  },

  // UK Bank Logs
  {
    id: 'uk-bank-hsbc',
    name: 'HSBC Holdings Log',
    description: 'HSBC Holdings account logs with premium UK banking features and verified balances.',
    price: 420,
    category: 'logs',
    badge: 'Premium',
    features: ['Premium UK Banking', 'Verified Balance', 'Full Access', 'Email Included', 'International Access', 'No Security Blocks', 'Instant Delivery', 'VIP Support'],
    stock: 10,
    rating: 4.9,
    reviews: 67,
    stockOptions: generateStockOptions(420, 10)
  },
  {
    id: 'uk-bank-lloyds',
    name: 'Lloyds Banking Group Log',
    description: 'Lloyds Banking Group account logs with full UK banking access and verified credentials.',
    price: 380,
    category: 'logs',
    features: ['UK Banking Access', 'Verified Credentials', 'Email Included', 'Fresh Logs', 'No Security Blocks', 'Support Included', 'Instant Delivery', 'Full Access'],
    stock: 12,
    rating: 4.8,
    reviews: 71,
    stockOptions: generateStockOptions(380, 12)
  },
  {
    id: 'uk-bank-barclays',
    name: 'Barclays Log',
    description: 'Barclays UK account logs with premium features and full access credentials.',
    price: 390,
    category: 'logs',
    features: ['Premium UK Account', 'Full Access', 'Verified Credentials', 'Email Included', 'No OTP Issues', 'Instant Delivery', 'Support Included', 'Secure Access'],
    stock: 11,
    rating: 4.7,
    reviews: 82,
    stockOptions: generateStockOptions(390, 11)
  },
  {
    id: 'uk-bank-standard-chartered',
    name: 'Standard Chartered Log',
    description: 'Standard Chartered UK account logs with international banking features.',
    price: 410,
    category: 'logs',
    badge: 'International',
    features: ['International Banking', 'Full Control', 'Verified Account', 'Email Included', 'No Security Blocks', 'Instant Delivery', '24/7 Support', 'Full Access'],
    stock: 9,
    rating: 4.8,
    reviews: 59,
    stockOptions: generateStockOptions(410, 9)
  },
  {
    id: 'uk-bank-santander',
    name: 'Santander UK Log',
    description: 'Santander UK account logs with verified balances and full access.',
    price: 370,
    category: 'logs',
    features: ['Verified Balance', 'Full Access', 'Email Included', 'Fresh Logs', 'No Security Blocks', 'Instant Delivery', 'Support Included', 'UK Banking'],
    stock: 13,
    rating: 4.6,
    reviews: 74,
    stockOptions: generateStockOptions(370, 13)
  },
  {
    id: 'uk-bank-close-brothers',
    name: 'Close Brothers Log',
    description: 'Close Brothers account logs with premium UK features and full access.',
    price: 395,
    category: 'logs',
    features: ['Premium UK Access', 'Full Control', 'Verified Account', 'Email Included', 'No OTP Issues', 'Instant Delivery', 'VIP Support', 'Full Access'],
    stock: 10,
    rating: 4.7,
    reviews: 63,
    stockOptions: generateStockOptions(395, 10)
  },
  {
    id: 'uk-bank-schroders',
    name: 'Schroders Log',
    description: 'Schroders investment account logs with verified balances and full access.',
    price: 450,
    category: 'logs',
    badge: 'Investment',
    features: ['Investment Account', 'Verified Balance', 'Full Access', 'Email Included', 'No Security Blocks', 'Instant Delivery', 'Premium Support', 'Full Access'],
    stock: 8,
    rating: 4.8,
    reviews: 52,
    stockOptions: generateStockOptions(450, 8)
  },
  {
    id: 'uk-bank-bank-of-england',
    name: 'Bank of England Log',
    description: 'Bank of England related financial account logs with premium features.',
    price: 480,
    category: 'logs',
    badge: 'Elite',
    features: ['Elite Financial Access', 'Full Control', 'Verified Account', 'Email Included', 'No Security Issues', 'Bonus Included', 'Instant Delivery', 'VIP Support'],
    stock: 7,
    rating: 4.9,
    reviews: 48,
    stockOptions: generateStockOptions(480, 7)
  },
  {
    id: 'uk-bank-tesco',
    name: 'Tesco Bank Log',
    description: 'Tesco Bank account logs with verified balances and full access credentials.',
    price: 360,
    category: 'logs',
    features: ['Verified Balance', 'Full Access', 'Email Included', 'Fresh Logs', 'No Security Blocks', 'Instant Delivery', 'Support Included', 'UK Banking'],
    stock: 14,
    rating: 4.6,
    reviews: 69,
    stockOptions: generateStockOptions(360, 14)
  },
  {
    id: 'uk-bank-rbs',
    name: 'Royal Bank of Scotland Log',
    description: 'Royal Bank of Scotland account logs with premium UK banking features.',
    price: 385,
    category: 'logs',
    features: ['Premium UK Banking', 'Full Access', 'Verified Credentials', 'Email Included', 'No OTP Issues', 'Instant Delivery', 'Support Included', 'Secure Access'],
    stock: 11,
    rating: 4.7,
    reviews: 76,
    stockOptions: generateStockOptions(385, 11)
  },
  {
    id: 'uk-bank-tsb',
    name: 'TSB Bank Log',
    description: 'TSB Bank account logs with verified balances and full access.',
    price: 355,
    category: 'logs',
    features: ['Verified Balance', 'Full Access', 'Email Included', 'Fresh Logs', 'No Security Blocks', 'Instant Delivery', 'Support Included', 'UK Banking'],
    stock: 15,
    rating: 4.5,
    reviews: 55,
    stockOptions: generateStockOptions(355, 15)
  },

  // Script Logs
  {
    id: 'script-shopwithscrip',
    name: 'Shopwithscrip Logs',
    description: 'Shopwithscrip logs with full access, email included, and verified credentials.',
    price: 120,
    category: 'logs',
    badge: 'Verified',
    features: ['Full Access', 'Email Included', 'Verified Credentials', 'No Security Blocks', 'Instant Delivery', 'Support Included', 'Fresh Logs', 'Easy Setup'],
    stock: 25,
    rating: 4.6,
    reviews: 89,
    stockOptions: generateStockOptions(120, 25)
  },
  {
    id: 'script-fundwithscrip',
    name: 'Fundwithscrip Logs',
    description: 'Fundwithscrip logs with complete access and verified balances.',
    price: 135,
    category: 'logs',
    features: ['Verified Balance', 'Full Access', 'Email Included', 'No Security Issues', 'Instant Delivery', 'Support Included', 'Fresh Stock', 'Secure Access'],
    stock: 22,
    rating: 4.7,
    reviews: 76,
    stockOptions: generateStockOptions(135, 22)
  },

  // Other Tools
  {
    id: 'tool-premium-rdp',
    name: 'Premium RDP Logs',
    description: 'Premium RDP servers with high-performance specs and global locations.',
    price: 180,
    category: 'tools',
    badge: 'Premium',
    features: ['High Performance', 'Global Locations', 'Full Access', 'Admin Rights', 'No Detection', 'Instant Delivery', '24/7 Support', 'Windows Server'],
    stock: 50,
    rating: 4.8,
    reviews: 123,
    stockOptions: generateStockOptions(180, 50, true)
  },
  {
    id: 'tool-karma-credit',
    name: 'Karma Credit Logs',
    description: 'Karma credit logs with verified balances and full account access.',
    price: 150,
    category: 'logs',
    features: ['Verified Balance', 'Full Access', 'Email Included', 'No Security Blocks', 'Instant Delivery', 'Support Included', 'Fresh Logs', 'Easy to Use'],
    stock: 30,
    rating: 4.5,
    reviews: 98,
    stockOptions: generateStockOptions(150, 30)
  },
  {
    id: 'tool-credit-card-logs',
    name: 'Credit Card Logs',
    description: 'Fresh credit card logs with CVV and expiration dates for various banks.',
    price: 85,
    category: 'ccs',
    badge: 'Verified',
    features: ['Fresh Logs', 'CVV Included', 'Expiration Dates', 'Verified Working', 'No Security Blocks', 'Instant Delivery', 'Multiple Banks', 'Full Details'],
    stock: 45,
    rating: 4.6,
    reviews: 167,
    stockOptions: generateStockOptions(85, 45)
  },
  {
    id: 'tool-coinzoom',
    name: 'Coinzoom Logs',
    description: 'Coinzoom account logs with verified balances and full access.',
    price: 200,
    category: 'accounts',
    features: ['Cryptocurrency Access', 'Verified Balance', 'Full Access', 'Email Included', 'No Security Issues', 'Instant Delivery', 'Support Included', 'Trading Ready'],
    stock: 20,
    rating: 4.7,
    reviews: 78,
    stockOptions: generateStockOptions(200, 20)
  },
  {
    id: 'tool-coinbase',
    name: 'Coinbase Logs',
    description: 'Coinbase account logs with cryptocurrency balances and full trading access.',
    price: 220,
    category: 'accounts',
    badge: 'Verified',
    features: ['Cryptocurrency Trading', 'Verified Balance', 'Full Access', 'Email Included', 'No Security Blocks', 'Instant Delivery', '24/7 Support', 'Trading Ready'],
    stock: 18,
    rating: 4.8,
    reviews: 92,
    stockOptions: generateStockOptions(220, 18)
  },
  {
    id: 'tool-webmail',
    name: 'Webmail Logs',
    description: 'Webmail account logs from various providers with verified access.',
    price: 75,
    category: 'accounts',
    features: ['Multiple Providers', 'Verified Access', 'Full Access', 'Email Included', 'No Security Blocks', 'Instant Delivery', 'Support Included', 'Fresh Logs'],
    stock: 40,
    rating: 4.5,
    reviews: 134,
    stockOptions: generateStockOptions(75, 40)
  },
  {
    id: 'tool-paypal-logs',
    name: 'PayPal Logs',
    description: 'PayPal account logs with verified balances and full transaction access.',
    price: 140,
    category: 'accounts',
    features: ['Verified Balance', 'Full Transaction Access', 'Email Included', 'No Security Blocks', 'Instant Delivery', 'Support Included', 'Fresh Logs', 'Sending Ready'],
    stock: 35,
    rating: 4.7,
    reviews: 156,
    stockOptions: generateStockOptions(140, 35)
  },
  {
    id: 'tool-cashapp-logs',
    name: 'Cashapp Logs',
    description: 'CashApp account logs with Bitcoin enabled and full access.',
    price: 160,
    category: 'accounts',
    features: ['Bitcoin Enabled', 'Full Access', 'Email Included', 'No Security Issues', 'Instant Delivery', 'Support Included', 'Fresh Stock', 'Cash Out Ready'],
    stock: 28,
    rating: 4.6,
    reviews: 145,
    stockOptions: generateStockOptions(160, 28)
  },
  // Residential Proxies Category - Gateway-based, host:port:user:pass delivery
  {
    id: 'proxy-data-5gb',
    name: 'Residential Proxy - 5 GB Data Pack',
    description: 'Pay-as-you-go residential proxy traffic. Real USA residential IPs covering all 50 states, cities, towns, streets, and apartments. Gateway-based: connect to one host:port with username/password. SOCKS5 & HTTP supported. Per-request rotation or sticky sessions. Ideal for light scraping and account work.',
    price: 10,
    category: 'proxies',
    badge: 'Starter',
    features: ['5 GB bandwidth', 'All 50 USA States', 'City & State targeting', 'Residential ISP IPs', 'SOCKS5 & HTTP', 'Username/Password Auth', 'Per-request rotation', '30-day validity', 'Instant delivery', 'host:port:user:pass format'],
    stock: 999,
    rating: 4.6,
    reviews: 89,
    stockOptions: [
      { price: 10, balance: 0, stock: 1, quality: '5 GB / 30 days' }
    ]
  },
  {
    id: 'proxy-data-20gb',
    name: 'Residential Proxy - 20 GB Data Pack',
    description: 'USA residential proxy traffic with volume discount. Real ISP IPs across all states, metro areas, suburbs, towns, and villages. Gateway-based credentials (host:port:user:pass). SOCKS5 & HTTP. Per-request rotation or sticky sessions. Ideal for moderate scraping and multi-account work.',
    price: 35,
    originalPrice: 40,
    category: 'proxies',
    badge: 'Popular',
    features: ['20 GB bandwidth', 'All 50 USA States', 'City & State targeting', 'Residential ISP IPs', 'SOCKS5 & HTTP', 'Username/Password Auth', 'Per-request rotation', '60-day validity', 'Instant delivery', 'host:port:user:pass format'],
    stock: 999,
    rating: 4.7,
    reviews: 156,
    stockOptions: [
      { price: 35, balance: 0, stock: 1, quality: '20 GB / 60 days' }
    ]
  },
  {
    id: 'proxy-data-100gb',
    name: 'Residential Proxy - 100 GB Data Pack',
    description: 'High-volume USA residential proxy traffic. All 50 states, every city, town, village, street, and apartment covered. Real residential ISP IPs. Gateway-based: host:port:username:password. SOCKS5 & HTTP. Per-request rotation or sticky sessions up to 24h. Ideal for large scraping operations.',
    price: 130,
    originalPrice: 150,
    category: 'proxies',
    badge: 'Bulk',
    features: ['100 GB bandwidth', 'All 50 USA States', 'City, State & ASN targeting', 'Residential ISP IPs', 'SOCKS5 & HTTP', 'Username/Password Auth', 'Sticky sessions up to 24h', '90-day validity', 'Instant delivery', 'host:port:user:pass format'],
    stock: 999,
    rating: 4.8,
    reviews: 234,
    stockOptions: [
      { price: 130, balance: 0, stock: 1, quality: '100 GB / 90 days' }
    ]
  },
  {
    id: 'proxy-port-5',
    name: 'Residential Proxy - 5 Concurrent Ports',
    description: 'Port-based residential proxy subscription. 5 concurrent ports with unlimited bandwidth per port. Real USA residential IPs across all states, cities, towns, streets, and apartments. Each port gets its own host:port:username:password. SOCKS5 & HTTP. Sticky or rotating per port. Ideal for small teams and steady scraping workloads.',
    price: 52,
    category: 'proxies',
    badge: 'Monthly',
    features: ['5 concurrent ports', 'Unlimited bandwidth per port', 'All 50 USA States', 'City & State targeting', 'Residential ISP IPs', 'SOCKS5 & HTTP', 'Username/Password Auth', 'Sticky or rotating per port', 'Monthly subscription', 'host:port:user:pass per port'],
    stock: 999,
    rating: 4.7,
    reviews: 67,
    stockOptions: [
      { price: 52, balance: 0, stock: 1, quality: '5 ports / month' }
    ]
  },
  {
    id: 'proxy-port-25',
    name: 'Residential Proxy - 25 Concurrent Ports',
    description: 'Port-based residential proxy subscription. 25 concurrent ports with unlimited bandwidth per port. Real USA residential IPs across all states, metro areas, suburbs, towns, and villages. Each port gets its own host:port:username:password. SOCKS5 & HTTP. Sticky or rotating per port. Ideal for production pipelines.',
    price: 183,
    originalPrice: 220,
    category: 'proxies',
    badge: 'Team',
    features: ['25 concurrent ports', 'Unlimited bandwidth per port', 'All 50 USA States', 'City, State & ASN targeting', 'Residential ISP IPs', 'SOCKS5 & HTTP', 'Username/Password Auth', 'Sticky or rotating per port', 'Monthly subscription', 'host:port:user:pass per port'],
    stock: 999,
    rating: 4.8,
    reviews: 89,
    stockOptions: [
      { price: 183, balance: 0, stock: 1, quality: '25 ports / month' }
    ]
  },
  {
    id: 'proxy-port-100',
    name: 'Residential Proxy - 100 Concurrent Ports',
    description: 'Port-based residential proxy subscription. 100 concurrent ports with unlimited bandwidth per port. Complete USA coverage: all 50 states, every city, town, village, street, and apartment. Each port gets its own host:port:username:password. SOCKS5 & HTTP. Sticky or rotating per port. Ideal for 24/7 production traffic.',
    price: 599,
    originalPrice: 700,
    category: 'proxies',
    badge: 'Enterprise',
    features: ['100 concurrent ports', 'Unlimited bandwidth per port', 'All 50 USA States', 'City, State & ASN targeting', 'Residential ISP IPs', 'SOCKS5 & HTTP', 'Username/Password Auth', 'Sticky or rotating per port', 'Monthly subscription', 'host:port:user:pass per port', 'Reserved capacity'],
    stock: 999,
    rating: 4.9,
    reviews: 45,
    stockOptions: [
      { price: 599, balance: 0, stock: 1, quality: '100 ports / month' }
    ]
  },
  {
    id: 'proxy-isp-1',
    name: 'ISP Static Residential Proxy - 1 IP',
    description: 'Static ISP residential proxy - one fixed IP address that stays yours for the month. Real ISP-registered IP (not datacenter). Ideal for long sessions, account management, and workflows requiring a consistent address. Gateway-based: host:port:username:password. SOCKS5 & HTTP. Unmetered bandwidth.',
    price: 15,
    category: 'proxies',
    badge: 'Static',
    features: ['1 static ISP IP', 'Fixed address for 30 days', 'USA location targeting', 'Residential ISP IP', 'SOCKS5 & HTTP', 'Username/Password Auth', 'Unmetered bandwidth', 'Monthly subscription', 'host:port:user:pass format'],
    stock: 999,
    rating: 4.7,
    reviews: 123,
    stockOptions: [
      { price: 15, balance: 0, stock: 1, quality: '1 IP / month' }
    ]
  },
  {
    id: 'proxy-isp-10',
    name: 'ISP Static Residential Proxy - 10 IPs',
    description: 'Static ISP residential proxies - 10 fixed IP addresses that stay yours for the month. Real ISP-registered IPs. Ideal for account farms and long-term operations. Gateway-based: host:port:username:password per IP. SOCKS5 & HTTP. Unmetered bandwidth.',
    price: 130,
    originalPrice: 150,
    category: 'proxies',
    badge: 'Static',
    features: ['10 static ISP IPs', 'Fixed addresses for 30 days', 'USA location targeting', 'Residential ISP IPs', 'SOCKS5 & HTTP', 'Username/Password Auth', 'Unmetered bandwidth', 'Monthly subscription', 'host:port:user:pass per IP'],
    stock: 999,
    rating: 4.8,
    reviews: 67,
    stockOptions: [
      { price: 130, balance: 0, stock: 1, quality: '10 IPs / month' }
    ]
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
    comment: 'Been using C4RD_V4ULT for months now. Never had a bad experience. Their bank logs are fresh and working. 10/10 service!',
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

export const newProducts: Product[] = [
// ==================== DUMPS ====================
{
  id: 'dump-1',
  name: 'Track 1 Dump USA Premium',
  description: 'Track 1 magnetic stripe dump from US banks. Full track data with PIN. High success rate at ATMs and POS. Fresh batches updated daily.',
  price: 150,
  category: 'dumps',
  badge: 'Fresh',
  features: ['Track 1 Data', 'PIN Included', 'US Banks', 'ATM Compatible', 'POS Ready', 'Instant Delivery', 'Replacement Guarantee', '24/7 Support'],
  stock: 80,
  rating: 4.8,
  reviews: 234,
  stockOptions: [
    { price: 150, balance: 2000, stock: 10, quality: 'Standard' },
    { price: 300, balance: 5000, stock: 8, quality: 'High Balance' },
    { price: 500, balance: 10000, stock: 5, quality: 'Elite' }
  ]
},
{
  id: 'dump-2',
  name: 'Track 2 Dump EU Bundle',
  description: 'Track 2 magnetic stripe dump from European banks. Cloned card ready for ATM cashout. Verified working with chip and PIN bypass.',
  price: 180,
  category: 'dumps',
  badge: 'Popular',
  features: ['Track 2 Data', 'EU Banks', 'ATM Cashout', 'Chip & PIN Bypass', 'Verified Working', 'Fast Delivery', 'Replacement Policy', 'Support'],
  stock: 65,
  rating: 4.7,
  reviews: 189,
  stockOptions: [
    { price: 180, balance: 3000, stock: 8, quality: 'Standard' },
    { price: 350, balance: 7500, stock: 6, quality: 'Premium' },
    { price: 600, balance: 15000, stock: 3, quality: 'VIP' }
  ]
},
{
  id: 'dump-3',
  name: 'Dump with PIN - Canada',
  description: 'Canadian bank dump with full PIN. Ready for immediate ATM withdrawal. High limit accounts with verified balances.',
  price: 200,
  category: 'dumps',
  badge: 'Premium',
  features: ['Track Data', 'PIN Included', 'Canadian Banks', 'ATM Withdrawal', 'High Limits', 'Verified Balance', 'Instant Delivery', 'Support'],
  stock: 40,
  rating: 4.9,
  reviews: 145,
  stockOptions: [
    { price: 200, balance: 4000, stock: 5, quality: 'Regular' },
    { price: 400, balance: 10000, stock: 4, quality: 'Gold' },
    { price: 700, balance: 20000, stock: 2, quality: 'Platinum' }
  ]
},
{
  id: 'dump-4',
  name: 'Dump UK - Contactless',
  description: 'UK bank dump with contactless payment enabled. Works at contactless POS terminals and ATMs across the United Kingdom.',
  price: 160,
  category: 'dumps',
  features: ['Contactless Enabled', 'UK Banks', 'POS Terminals', 'ATM Access', 'Fresh Stock', 'Quick Delivery', 'Guarantee', 'Support'],
  stock: 55,
  rating: 4.6,
  reviews: 112,
  stockOptions: [
    { price: 160, balance: 2500, stock: 7, quality: 'Basic' },
    { price: 320, balance: 6000, stock: 5, quality: 'Enhanced' },
    { price: 550, balance: 12000, stock: 3, quality: 'Supreme' }
  ]
},

// ==================== CVV / CVV2 ====================
{
  id: 'cvv-1',
  name: 'CVV2 USA Pack',
  description: 'CVV2 card-not-present data from US banks. Full card details including CVV, expiration, and billing address. Ready for online shopping.',
  price: 40,
  category: 'cvv',
  badge: 'Best Seller',
  features: ['CVV2 Data', 'US Banks', 'Card Not Present', 'Full Details', 'Billing Address', 'Online Shopping', 'Instant Delivery', 'High Success'],
  stock: 120,
  rating: 4.7,
  reviews: 345,
  stockOptions: [
    { price: 40, balance: 1000, stock: 15, quality: 'Standard' },
    { price: 80, balance: 3000, stock: 12, quality: 'Premium' },
    { price: 150, balance: 7000, stock: 8, quality: 'Elite' }
  ]
},
{
  id: 'cvv-2',
  name: 'CVV2 EU Bundle',
  description: 'European CVV2 data from multiple EU countries. Verified working for international online transactions. Full cardholder details included.',
  price: 50,
  category: 'cvv',
  badge: 'Popular',
  features: ['CVV2 Data', 'EU Countries', 'International Use', 'Verified Working', 'Full Cardholder Info', 'Fast Delivery', 'Replacement', 'Support'],
  stock: 90,
  rating: 4.6,
  reviews: 267,
  stockOptions: [
    { price: 50, balance: 1500, stock: 12, quality: 'Standard' },
    { price: 100, balance: 4000, stock: 10, quality: 'Premium' },
    { price: 180, balance: 9000, stock: 6, quality: 'Elite' }
  ]
},
{
  id: 'cvv-3',
  name: 'CVV2 UK Pack',
  description: 'United Kingdom CVV2 data from major UK banks. High success rate for UK and international e-commerce sites.',
  price: 45,
  category: 'cvv',
  features: ['CVV2 Data', 'UK Banks', 'High Success Rate', 'E-commerce Ready', 'Full Details', 'Instant Delivery', 'Guarantee', '24/7 Support'],
  stock: 70,
  rating: 4.5,
  reviews: 189,
  stockOptions: [
    { price: 45, balance: 1200, stock: 10, quality: 'Regular' },
    { price: 90, balance: 3500, stock: 8, quality: 'Enhanced' },
    { price: 160, balance: 8000, stock: 5, quality: 'Supreme' }
  ]
},
{
  id: 'cvv-4',
  name: 'CVV2 CA / AU Mix',
  description: 'Canadian and Australian CVV2 data mix. Fresh stock from top financial institutions in CA and AU regions.',
  price: 55,
  category: 'cvv',
  features: ['CVV2 Data', 'CA & AU Banks', 'Fresh Stock', 'Top Institutions', 'Online Ready', 'Quick Delivery', 'Support', 'Replacement'],
  stock: 50,
  rating: 4.4,
  reviews: 134,
  stockOptions: [
    { price: 55, balance: 1800, stock: 8, quality: 'Basic' },
    { price: 110, balance: 4500, stock: 6, quality: 'Standard' },
    { price: 200, balance: 10000, stock: 4, quality: 'Premium' }
  ]
},

// ==================== RDP ====================
{
  id: 'rdp-1',
  name: 'RDP USA - Admin Access',
  description: 'Remote Desktop Protocol access to USA-based machines with admin privileges. Residential IP, clean history, full control.',
  price: 80,
  category: 'rdp',
  badge: 'Fresh',
  features: ['Admin Access', 'USA IP', 'Residential', 'Full Control', 'Clean History', 'Persistent', 'Fast Connection', '24/7 Uptime'],
  stock: 25,
  rating: 4.9,
  reviews: 156,
  stockOptions: [
    { price: 80, balance: 0, stock: 5, quality: '1 Day' },
    { price: 150, balance: 0, stock: 8, quality: '3 Days' },
    { price: 300, balance: 0, stock: 12, quality: '7 Days' }
  ]
},
{
  id: 'rdp-2',
  name: 'RDP EU - Corporate',
  description: 'European corporate RDP access with domain admin privileges. High-speed connection, clean IP, suitable for pivoting.',
  price: 100,
  category: 'rdp',
  badge: 'Premium',
  features: ['Domain Admin', 'EU Corporate', 'High Speed', 'Clean IP', 'Pivot Ready', 'Persistent Access', 'Secure Tunnel', 'Support'],
  stock: 15,
  rating: 4.8,
  reviews: 89,
  stockOptions: [
    { price: 100, balance: 0, stock: 3, quality: '24 Hours' },
    { price: 200, balance: 0, stock: 5, quality: '3 Days' },
    { price: 400, balance: 0, stock: 7, quality: '1 Week' }
  ]
},
{
  id: 'rdp-3',
  name: 'RDP UK - Home User',
  description: 'UK home user RDP access. Standard user privileges with ability to escalate. Residential IP for bypassing geo-restrictions.',
  price: 60,
  category: 'rdp',
  features: ['User Access', 'UK Residential', 'Geo Bypass', 'Escalation Possible', 'Stable Connection', 'Instant Access', 'Guarantee', 'Support'],
  stock: 30,
  rating: 4.7,
  reviews: 112,
  stockOptions: [
    { price: 60, balance: 0, stock: 6, quality: '1 Day' },
    { price: 120, balance: 0, stock: 10, quality: '3 Days' },
    { price: 250, balance: 0, stock: 14, quality: '7 Days' }
  ]
},
{
  id: 'rdp-4',
  name: 'RDP CA / AU Mix',
  description: 'Canadian and Australian RDP access mix. Various privilege levels. Clean residential IPs from tier-1 countries.',
  price: 70,
  category: 'rdp',
  features: ['RDP Access', 'CA & AU IPs', 'Tier-1 Countries', 'Residential', 'Clean History', 'Multiple Privileges', 'Fast Setup', 'Support'],
  stock: 20,
  rating: 4.6,
  reviews: 78,
  stockOptions: [
    { price: 70, balance: 0, stock: 4, quality: '24 Hours' },
    { price: 140, balance: 0, stock: 7, quality: '3 Days' },
    { price: 280, balance: 0, stock: 9, quality: '1 Week' }
  ]
},

// ==================== SHELLS ====================
{
  id: 'shell-1',
  name: 'Web Shell - PHP Backdoor',
  description: 'PHP web shell backdoor for compromised web servers. Full file system access, command execution, and database access.',
  price: 30,
  category: 'shells',
  badge: 'Popular',
  features: ['PHP Shell', 'File System Access', 'Command Execution', 'Database Access', 'Persistent', 'Undetectable', 'Easy Upload', 'Support'],
  stock: 100,
  rating: 4.5,
  reviews: 234,
  stockOptions: [
    { price: 30, balance: 0, stock: 20, quality: 'Basic' },
    { price: 60, balance: 0, stock: 15, quality: 'Advanced' },
    { price: 100, balance: 0, stock: 10, quality: 'Pro' }
  ]
},
{
  id: 'shell-2',
  name: 'Web Shell - ASP.NET',
  description: 'ASP.NET web shell for Windows servers. Full IIS access, PowerShell execution, and .NET framework access.',
  price: 40,
  category: 'shells',
  features: ['ASP.NET Shell', 'IIS Access', 'PowerShell', '.NET Access', 'Windows Server', 'Persistent', 'Stealthy', 'Support'],
  stock: 60,
  rating: 4.6,
  reviews: 189,
  stockOptions: [
    { price: 40, balance: 0, stock: 12, quality: 'Standard' },
    { price: 80, balance: 0, stock: 10, quality: 'Enhanced' },
    { price: 130, balance: 0, stock: 6, quality: 'Elite' }
  ]
},
{
  id: 'shell-3',
  name: 'Web Shell - Python / JSP',
  description: 'Python and JSP web shells for Linux and Java servers. Full command execution and server control.',
  price: 35,
  category: 'shells',
  features: ['Python/JSP Shell', 'Linux/Java Servers', 'Command Execution', 'Full Server Control', 'Stealth', 'Easy Deploy', 'Guarantee', 'Support'],
  stock: 80,
  rating: 4.4,
  reviews: 156,
  stockOptions: [
    { price: 35, balance: 0, stock: 16, quality: 'Basic' },
    { price: 70, balance: 0, stock: 13, quality: 'Standard' },
    { price: 120, balance: 0, stock: 9, quality: 'Premium' }
  ]
},
{
  id: 'shell-4',
  name: 'Web Shell - All-in-One Pack',
  description: 'Complete web shell pack with PHP, ASP.NET, Python, JSP, and CGI shells for any server environment.',
  price: 80,
  category: 'shells',
  badge: 'Best Value',
  features: ['Multi-Language', 'All Server Types', 'Full Control', 'Command Execution', 'Persistent', 'Stealth', 'Comprehensive', 'Support'],
  stock: 40,
  rating: 4.8,
  reviews: 134,
  stockOptions: [
    { price: 80, balance: 0, stock: 8, quality: 'Pack' },
    { price: 150, balance: 0, stock: 6, quality: 'Pro Pack' },
    { price: 250, balance: 0, stock: 4, quality: 'Ultimate' }
  ]
},

// ==================== SMTP / MAILERS ====================
{
  id: 'smtp-1',
  name: 'SMTP Server - Unlimited',
  description: 'Unlimited SMTP server for bulk email sending. No daily limits, high inbox rate, suitable for mailers and campaigns.',
  price: 60,
  category: 'smtp',
  badge: 'Essential',
  features: ['Unlimited SMTP', 'No Daily Limit', 'High Inbox Rate', 'Bulk Sending', 'Mailer Compatible', 'Anonymous', 'Fast Setup', 'Support'],
  stock: 40,
  rating: 4.7,
  reviews: 189,
  stockOptions: [
    { price: 60, balance: 0, stock: 8, quality: '30 Days' },
    { price: 120, balance: 0, stock: 10, quality: '90 Days' },
    { price: 250, balance: 0, stock: 12, quality: '365 Days' }
  ]
},
{
  id: 'smtp-2',
  name: 'Mailer Software Pack',
  description: 'Professional mailer software with SMTP rotation, spintax support, and campaign management. Ready for bulk email operations.',
  price: 100,
  category: 'smtp',
  badge: 'Professional',
  features: ['Mailer Software', 'SMTP Rotation', 'Spintax Support', 'Campaign Management', 'Bulk Operations', 'GUI Interface', 'Updates', 'Support'],
  stock: 30,
  rating: 4.8,
  reviews: 156,
  stockOptions: [
    { price: 100, balance: 0, stock: 6, quality: 'Standard' },
    { price: 200, balance: 0, stock: 5, quality: 'Pro' },
    { price: 400, balance: 0, stock: 3, quality: 'Enterprise' }
  ]
},
{
  id: 'smtp-3',
  name: 'Spam Leads Database',
  description: 'Millions of fresh spam leads and email lists. Verified addresses for bulk mailing campaigns. Categorized by region and niche.',
  price: 40,
  category: 'smtp',
  features: ['Millions of Leads', 'Verified Emails', 'Regional Categories', 'Niche Lists', 'Bulk Mailing Ready', 'Fresh Data', 'Instant Download', 'Support'],
  stock: 100,
  rating: 4.5,
  reviews: 312,
  stockOptions: [
    { price: 40, balance: 0, stock: 20, quality: '1M Leads' },
    { price: 80, balance: 0, stock: 18, quality: '5M Leads' },
    { price: 150, balance: 0, stock: 15, quality: '10M Leads' }
  ]
},
{
  id: 'smtp-4',
  name: 'SMTP + Mailer Combo',
  description: 'Complete SMTP server and mailer software combo. Everything needed for professional bulk email operations.',
  price: 140,
  category: 'smtp',
  badge: 'Complete Package',
  features: ['SMTP Server', 'Mailer Software', 'Unlimited Sending', 'High Inbox Rate', 'Campaign Tools', 'Anonymous', 'All-in-One', 'Support'],
  stock: 25,
  rating: 4.9,
  reviews: 112,
  stockOptions: [
    { price: 140, balance: 0, stock: 5, quality: 'Basic' },
    { price: 280, balance: 0, stock: 6, quality: 'Pro' },
    { price: 500, balance: 0, stock: 4, quality: 'Ultimate' }
  ]
},

// ==================== STEALERS / MALWARE ====================
{
  id: 'stealer-1',
  name: 'RedLine Stealer Logs',
  description: 'RedLine infostealer logs with browser credentials, cookies, autofill, and crypto wallets. Fresh logs from infected machines.',
  price: 50,
  category: 'stealers',
  badge: 'Fresh',
  features: ['RedLine Logs', 'Browser Credentials', 'Cookies', 'Autofill', 'Crypto Wallets', 'Fresh Logs', 'Infected Machines', 'Instant Delivery'],
  stock: 90,
  rating: 4.8,
  reviews: 267,
  stockOptions: [
    { price: 50, balance: 0, stock: 15, quality: 'Standard' },
    { price: 100, balance: 0, stock: 12, quality: 'Premium' },
    { price: 200, balance: 0, stock: 8, quality: 'Elite' }
  ]
},
{
  id: 'stealer-2',
  name: 'Raccoon Stealer Pack',
  description: 'Raccoon stealer logs with system info, browser data, and cryptocurrency wallets. High-quality logs from global infections.',
  price: 55,
  category: 'stealers',
  badge: 'Popular',
  features: ['Raccoon Logs', 'System Info', 'Browser Data', 'Crypto Wallets', 'Global Infections', 'High Quality', 'Fast Delivery', 'Support'],
  stock: 75,
  rating: 4.7,
  reviews: 223,
  stockOptions: [
    { price: 55, balance: 0, stock: 12, quality: 'Regular' },
    { price: 110, balance: 0, stock: 10, quality: 'Enhanced' },
    { price: 220, balance: 0, stock: 7, quality: 'Supreme' }
  ]
},
{
  id: 'stealer-3',
  name: 'Cookie Grabber / Session Stealer',
  description: 'Session stealer and cookie grabber for hijacking web sessions. Steal auth tokens, session cookies, and bypass 2FA.',
  price: 70,
  category: 'stealers',
  features: ['Session Stealer', 'Cookie Grabber', 'Auth Tokens', '2FA Bypass', 'Session Hijack', 'Web Sessions', 'Quick Deploy', 'Support'],
  stock: 60,
  rating: 4.6,
  reviews: 178,
  stockOptions: [
    { price: 70, balance: 0, stock: 10, quality: 'Basic' },
    { price: 140, balance: 0, stock: 8, quality: 'Standard' },
    { price: 280, balance: 0, stock: 5, quality: 'Pro' }
  ]
},
{
  id: 'stealer-4',
  name: 'Crypto Drainer / Wallet Stealer',
  description: 'Cryptocurrency wallet stealer and drainer. Extracts private keys, seed phrases, and drains wallet balances.',
  price: 90,
  category: 'stealers',
  badge: 'High Risk',
  features: ['Wallet Stealer', 'Crypto Drainer', 'Private Keys', 'Seed Phrases', 'Balance Drain', 'Multi-Coin', 'Stealth', 'Support'],
  stock: 45,
  rating: 4.9,
  reviews: 145,
  stockOptions: [
    { price: 90, balance: 0, stock: 8, quality: 'Basic' },
    { price: 180, balance: 0, stock: 6, quality: 'Advanced' },
    { price: 350, balance: 0, stock: 4, quality: 'Elite' }
  ]
},

// ==================== FAKE DOCS / IDS ====================
{
  id: 'doc-1',
  name: 'Fake US Driver License',
  description: 'High-quality fake US driver license with holograms, UV features, and scannable barcode. State-specific templates available.',
  price: 150,
  category: 'docs',
  badge: 'Popular',
  features: ['Fake DL', 'Holograms', 'UV Features', 'Scannable Barcode', 'State-Specific', 'High Quality', 'Discreet Shipping', 'Guarantee'],
  stock: 30,
  rating: 4.7,
  reviews: 189,
  stockOptions: [
    { price: 150, balance: 0, stock: 5, quality: 'Standard' },
    { price: 250, balance: 0, stock: 4, quality: 'Premium' },
    { price: 400, balance: 0, stock: 3, quality: 'Elite' }
  ]
},
{
  id: 'doc-2',
  name: 'Fake Passport - International',
  description: 'Fake international passport with biometric page, holograms, and machine-readable zone. Multiple country options available.',
  price: 300,
  category: 'docs',
  badge: 'Premium',
  features: ['Fake Passport', 'Biometric Page', 'Holograms', 'MRZ', 'Multi-Country', 'High Quality', 'Discreet', 'Support'],
  stock: 20,
  rating: 4.8,
  reviews: 134,
  stockOptions: [
    { price: 300, balance: 0, stock: 4, quality: 'Standard' },
    { price: 500, balance: 0, stock: 3, quality: 'Premium' },
    { price: 800, balance: 0, stock: 2, quality: 'Diplomatic' }
  ]
},
{
  id: 'doc-3',
  name: 'Fake ID - EU / UK',
  description: 'Fake European and UK identity cards with security features. Valid for age verification and basic ID checks.',
  price: 120,
  category: 'docs',
  features: ['Fake ID', 'EU / UK', 'Security Features', 'Age Verification', 'ID Checks', 'Quality Print', 'Discreet Shipping', 'Support'],
  stock: 40,
  rating: 4.6,
  reviews: 156,
  stockOptions: [
    { price: 120, balance: 0, stock: 8, quality: 'Standard' },
    { price: 200, balance: 0, stock: 6, quality: 'Premium' },
    { price: 350, balance: 0, stock: 4, quality: 'Elite' }
  ]
},
{
  id: 'doc-4',
  name: 'SSN / DOB Full Package',
  description: 'Complete SSN and date of birth package with full identity details. Suitable for verification and account creation.',
  price: 80,
  category: 'docs',
  features: ['SSN', 'DOB', 'Full Identity', 'Verification Ready', 'Account Creation', 'Fresh Data', 'Instant Delivery', 'Support'],
  stock: 60,
  rating: 4.5,
  reviews: 223,
  stockOptions: [
    { price: 80, balance: 0, stock: 12, quality: 'Basic' },
    { price: 150, balance: 0, stock: 10, quality: 'Standard' },
    { price: 300, balance: 0, stock: 7, quality: 'Full' }
  ]
},

// ==================== DROP ACCOUNTS ====================
{
  id: 'drop-1',
  name: 'Drop Bank Account - USA',
  description: 'US drop bank account ready for receiving funds. Online banking access, debit card, and account details included.',
  price: 200,
  category: 'drops',
  badge: 'Fresh',
  features: ['Drop Account', 'USA Bank', 'Online Banking', 'Debit Card', 'Account Details', 'Receive Funds', 'Instant Access', 'Support'],
  stock: 25,
  rating: 4.8,
  reviews: 167,
  stockOptions: [
    { price: 200, balance: 0, stock: 5, quality: 'Basic' },
    { price: 350, balance: 0, stock: 4, quality: 'Verified' },
    { price: 500, balance: 0, stock: 3, quality: 'Business' }
  ]
},
{
  id: 'drop-2',
  name: 'Drop PayPal / CashApp',
  description: 'Drop PayPal and CashApp accounts for receiving and cashing out funds. Verified with linked bank accounts.',
  price: 150,
  category: 'drops',
  badge: 'Popular',
  features: ['Drop Account', 'PayPal', 'CashApp', 'Verified', 'Linked Bank', 'Receive Funds', 'Cash Out Ready', 'Support'],
  stock: 35,
  rating: 4.7,
  reviews: 212,
  stockOptions: [
    { price: 150, balance: 0, stock: 7, quality: 'Standard' },
    { price: 280, balance: 0, stock: 6, quality: 'Verified' },
    { price: 450, balance: 0, stock: 4, quality: 'Premium' }
  ]
},
{
  id: 'drop-3',
  name: 'Drop Crypto Wallet',
  description: 'Cryptocurrency drop wallet for receiving and laundering crypto funds. Multiple coin support with private key access.',
  price: 180,
  category: 'drops',
  features: ['Drop Wallet', 'Crypto', 'Multiple Coins', 'Private Key', 'Receive Funds', 'Laundering Ready', 'Anonymous', 'Support'],
  stock: 30,
  rating: 4.6,
  reviews: 145,
  stockOptions: [
    { price: 180, balance: 0, stock: 6, quality: 'Basic' },
    { price: 320, balance: 0, stock: 5, quality: 'Multi-Coin' },
    { price: 550, balance: 0, stock: 3, quality: 'Whale' }
  ]
},
{
  id: 'drop-4',
  name: 'Drop Account Pack - All-in-One',
  description: 'Complete drop account pack with bank, PayPal, CashApp, and crypto wallets. Everything for money laundering operations.',
  price: 450,
  category: 'drops',
  badge: 'Complete Package',
  features: ['All-in-One', 'Bank', 'PayPal', 'CashApp', 'Crypto', 'Money Laundering', 'Complete Setup', 'Support'],
  stock: 15,
  rating: 4.9,
  reviews: 89,
  stockOptions: [
    { price: 450, balance: 0, stock: 3, quality: 'Pack' },
    { price: 800, balance: 0, stock: 2, quality: 'Pro Pack' },
    { price: 1500, balance: 0, stock: 1, quality: 'Enterprise' }
  ]
},

// ==================== GIFT CARDS ====================
{
  id: 'gift-1',
  name: 'Amazon Gift Card Balance',
  description: 'Amazon gift card with loaded balance. Instant code delivery for online shopping. Various denominations available.',
  price: 50,
  category: 'giftcards',
  badge: 'Best Seller',
  features: ['Amazon GC', 'Loaded Balance', 'Instant Code', 'Online Shopping', 'Multiple Denominations', 'Fast Delivery', 'Guarantee', 'Support'],
  stock: 100,
  rating: 4.8,
  reviews: 345,
  stockOptions: [
    { price: 50, balance: 100, stock: 20, quality: '$100 Balance' },
    { price: 100, balance: 250, stock: 15, quality: '$250 Balance' },
    { price: 200, balance: 500, stock: 10, quality: '$500 Balance' }
  ]
},
{
  id: 'gift-2',
  name: 'eBay / Walmart Gift Card',
  description: 'eBay and Walmart gift cards with balance. Ready for immediate use on major e-commerce platforms.',
  price: 45,
  category: 'giftcards',
  badge: 'Popular',
  features: ['eBay / Walmart GC', 'Loaded Balance', 'Instant Code', 'E-commerce Ready', 'Major Platforms', 'Quick Delivery', 'Support', 'Guarantee'],
  stock: 85,
  rating: 4.7,
  reviews: 267,
  stockOptions: [
    { price: 45, balance: 100, stock: 15, quality: '$100 Balance' },
    { price: 90, balance: 250, stock: 12, quality: '$250 Balance' },
    { price: 180, balance: 500, stock: 8, quality: '$500 Balance' }
  ]
},
{
  id: 'gift-3',
  name: 'Steam / Gaming Gift Card',
  description: 'Steam and gaming platform gift cards. Loaded balances for game purchases and in-game items.',
  price: 40,
  category: 'giftcards',
  features: ['Steam / Gaming GC', 'Loaded Balance', 'Instant Code', 'Game Purchases', 'In-Game Items', 'Multiple Platforms', 'Fast Delivery', 'Support'],
  stock: 90,
  rating: 4.6,
  reviews: 223,
  stockOptions: [
    { price: 40, balance: 50, stock: 20, quality: '$50 Balance' },
    { price: 75, balance: 100, stock: 18, quality: '$100 Balance' },
    { price: 150, balance: 250, stock: 12, quality: '$250 Balance' }
  ]
},
{
  id: 'gift-4',
  name: 'iTunes / Google Play Gift Card',
  description: 'Apple iTunes and Google Play gift cards with balance. For app purchases, subscriptions, and digital content.',
  price: 35,
  category: 'giftcards',
  features: ['iTunes / Google Play GC', 'Loaded Balance', 'Instant Code', 'App Purchases', 'Subscriptions', 'Digital Content', 'Quick Delivery', 'Support'],
  stock: 80,
  rating: 4.5,
  reviews: 189,
  stockOptions: [
    { price: 35, balance: 25, stock: 20, quality: '$25 Balance' },
    { price: 60, balance: 50, stock: 18, quality: '$50 Balance' },
    { price: 120, balance: 100, stock: 14, quality: '$100 Balance' }
  ]
},

// ==================== STREAMING / SOCIAL ====================
{
  id: 'stream-1',
  name: 'Netflix / Premium Streaming Account',
  description: 'Premium streaming accounts including Netflix, Hulu, Disney+. Full access with subscription already paid.',
  price: 15,
  category: 'streaming',
  badge: 'Cheap',
  features: ['Streaming Account', 'Netflix', 'Hulu', 'Disney+', 'Premium Access', 'Paid Subscription', 'Instant Delivery', 'Support'],
  stock: 200,
  rating: 4.4,
  reviews: 456,
  stockOptions: [
    { price: 15, balance: 0, stock: 50, quality: '1 Month' },
    { price: 40, balance: 0, stock: 40, quality: '3 Months' },
    { price: 70, balance: 0, stock: 30, quality: '6 Months' }
  ]
},
{
  id: 'stream-2',
  name: 'Spotify / Music Streaming Account',
  description: 'Spotify Premium and music streaming accounts. Ad-free listening with full music library access.',
  price: 10,
  category: 'streaming',
  features: ['Music Account', 'Spotify Premium', 'Ad-Free', 'Full Library', 'Instant Access', 'Cheap', 'Fast Delivery', 'Support'],
  stock: 150,
  rating: 4.3,
  reviews: 378,
  stockOptions: [
    { price: 10, balance: 0, stock: 40, quality: '1 Month' },
    { price: 25, balance: 0, stock: 35, quality: '3 Months' },
    { price: 45, balance: 0, stock: 30, quality: '6 Months' }
  ]
},
{
  id: 'stream-3',
  name: 'Social Media Followers / Engagement',
  description: 'Instagram, Twitter, TikTok followers and engagement. Real-looking accounts with likes, views, and comments.',
  price: 25,
  category: 'streaming',
  features: ['Social Followers', 'Instagram', 'Twitter', 'TikTok', 'Likes', 'Views', 'Comments', 'Real Accounts'],
  stock: 300,
  rating: 4.2,
  reviews: 523,
  stockOptions: [
    { price: 25, balance: 0, stock: 60, quality: '1K Followers' },
    { price: 50, balance: 0, stock: 50, quality: '5K Followers' },
    { price: 100, balance: 0, stock: 40, quality: '10K Followers' }
  ]
},
{
  id: 'stream-4',
  name: 'Gaming Accounts - Steam / Origin / Epic',
  description: 'Gaming accounts with game libraries. Steam, Origin, and Epic Games accounts with multiple titles.',
  price: 30,
  category: 'streaming',
  badge: 'Gamer',
  features: ['Gaming Account', 'Steam', 'Origin', 'Epic Games', 'Game Library', 'Multiple Titles', 'Instant Access', 'Support'],
  stock: 100,
  rating: 4.5,
  reviews: 234,
  stockOptions: [
    { price: 30, balance: 0, stock: 20, quality: '5 Games' },
    { price: 60, balance: 0, stock: 15, quality: '15 Games' },
    { price: 120, balance: 0, stock: 10, quality: '30+ Games' }
  ]
}];

export const categories = [
  { id: 'all', name: 'All Products', icon: 'LayoutGrid' },
  { id: 'cards', name: 'Cards', icon: 'CreditCard' },
  { id: 'ccs', name: 'Linkable CCs', icon: 'Link' },
  { id: 'logs', name: 'Bank Logs', icon: 'Database' },
  { id: 'accounts', name: 'Accounts', icon: 'UserCircle' },
  { id: 'tools', name: 'Tools', icon: 'Wrench' },
  { id: 'fullz', name: 'Fullz', icon: 'FileText' },
  { id: 'spamming-course', name: 'Spamming Full Course', icon: 'Mail' },
  { id: 'hacking-course', name: 'Advanced Hacking Course', icon: 'Shield' },
  { id: 'daily-drops', name: 'Daily Drops', icon: 'Zap' },
  { id: 'proxies', name: 'Residential Proxies', icon: 'Globe' },
  { id: 'dumps', name: 'Dumps Track 1/2', icon: 'CreditCard' },
  { id: 'cvv', name: 'CVV / CVV2', icon: 'Lock' },
  { id: 'rdp', name: 'RDP Access', icon: 'Monitor' },
  { id: 'shells', name: 'Web Shells', icon: 'Terminal' },
  { id: 'smtp', name: 'SMTP / Mailers', icon: 'Mail' },
  { id: 'stealers', name: 'Stealers / Malware', icon: 'Zap' },
  { id: 'docs', name: 'Fake Docs / IDs', icon: 'IdCard' },
  { id: 'drops', name: 'Drop Accounts', icon: 'UserPlus' },
  { id: 'giftcards', name: 'Gift Cards', icon: 'Gift' },
  { id: 'streaming', name: 'Streaming / Social', icon: 'Play' }
] as const;
