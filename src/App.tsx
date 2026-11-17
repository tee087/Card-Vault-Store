import { useState, useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';
import { StoreProvider } from '@/context/StoreContext';
import { MatrixRain } from '@/components/MatrixRain';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Products } from '@/sections/Products';
import { CartDrawer } from '@/sections/CartDrawer';
import { Features } from '@/sections/Features';
import { Testimonials } from '@/sections/Testimonials';
import { FAQ } from '@/sections/FAQ';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { Toaster } from '@/components/ui/sonner';
import { checkTermsAccepted } from '@/components/TermsAcceptance';
import { Chatbot } from '@/components/Chatbot';
import { Terms } from '@/sections/Terms';
import { Privacy } from '@/sections/Privacy';
import { Fullz } from '@/sections/Fullz';
import { SignUp } from '@/sections/SignUp';
import { Messages } from '@/sections/Messages';
import { SoldNotification } from '@/components/SoldNotification';

interface Notification {
  id: string;
  productName: string;
  location: string;
  price: number;
  balance: number;
}

function App() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Function to show sold notification
  const showSoldNotification = (productName: string, price: number, location: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, productName, location, price, balance: 0 }]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Expose function globally for use in other components
  useEffect(() => {
    (window as unknown as { showSoldNotification: typeof showSoldNotification }).showSoldNotification = showSoldNotification;
    return () => {
      delete (window as unknown as { showSoldNotification?: typeof showSoldNotification }).showSoldNotification;
    };
  }, []);

  // Live recent purchase notifications (like shadowswipe.cc)
  useEffect(() => {
    const products = [
      // BIN Cards (from products.ts)
      { name: "414720*9408 | Chase Bank", price: 63, balance: 34650 },
      { name: "440066*6611 | BOA Classic", price: 65, balance: 35750 },
      { name: "426684*4335 | Chase Classic", price: 67, balance: 36850 },
      { name: "410039*4291 | Citibank Classic", price: 69, balance: 37950 },
      { name: "517805*3079 | CapOne Platinum", price: 75, balance: 40500 },
      { name: "515676*2979 | CapOne World Elite", price: 85, balance: 46750 },
      { name: "601100*2276 | Discover Personal", price: 70, balance: 38500 },
      { name: "400022*3539 | Navy Debit", price: 60, balance: 33000 },
      { name: "434256*3532 | WF Everyday", price: 58, balance: 31900 },
      { name: "438857*3404 | Chase Flex", price: 62, balance: 34100 },
      { name: "542418*1804 | Citi Platinum", price: 78, balance: 124800 },
      { name: "483316*1682 | Chase Private Client", price: 68, balance: 115600 },
      { name: "535456*1675 | Revolut International", price: 72, balance: 129600 },
      { name: "481582*1663 | BOA Essential", price: 59, balance: 112100 },
      { name: "552433*1635 | BOA World Elite", price: 88, balance: 176000 },
      { name: "434258*1580 | WF Everyday", price: 61, balance: 128100 },
      { name: "427082*1487 | USAA Military", price: 64, balance: 140800 },
      { name: "400023*1461 | Navy Business", price: 76, balance: 174800 },
      { name: "416598*2295 | Revolut Premium", price: 95, balance: 228000 },
      { name: "601100*2276 | Discover Credit", price: 69, balance: 172500 },
      { name: "426690*792 | Chase Classic", price: 65, balance: 169000 },
      { name: "483316*1682 | Chase Private Client", price: 68, balance: 183600 },
      { name: "554037*1473 | RBC Avion", price: 95, balance: 266000 },
      { name: "542364*2121 | USAA Insurance", price: 63, balance: 182700 },
      { name: "534129*2446 | BMO Premier", price: 88, balance: 264000 },
      { name: "517546*453 | Huntington Enhanced", price: 65, balance: 227500 },
      { name: "518941*1851 | Citi Prestige", price: 95, balance: 304000 },
      { name: "407305*1026 | WF Gold", price: 61, balance: 201300 },
      { name: "416607*938 | BOA Travel", price: 78, balance: 265200 },
      { name: "423223*1063 | Prepaid Mastercard", price: 65, balance: 227500 },
      // Additional popular BIN cards
      { name: "414520*1 | BC Card Korea", price: 88, balance: 316800 },
      { name: "475419*1 | MetaBank Signature", price: 92, balance: 340400 },
      { name: "447678*1 | WF Debit Classic", price: 61, balance: 231800 },
      { name: "511301*1 | Traditional Bank", price: 68, balance: 265200 },
      { name: "411074*1 | Peruvian Debit", price: 72, balance: 288000 },
      { name: "435862*1 | Classic Credit", price: 64, balance: 262400 },
      { name: "429858*1 | MyPoint CU", price: 59, balance: 247800 },
      { name: "494392*1 | Business Debit", price: 76, balance: 326800 },
      { name: "412452*1 | Chase Private Client Debit", price: 72, balance: 316800 },
      { name: "472612*1 | WF Debit Classic", price: 66, balance: 297000 },
      // CCs
      { name: "CVV Dump Fresh", price: 55, balance: 8500 },
      { name: "Linkable CC Pack", price: 75, balance: 15000 },
      { name: "VBV Passed CC", price: 120, balance: 25000 },
      // Logs
      { name: "Bank Log Chase", price: 85, balance: 2500 },
      { name: "Chase Bank Log", price: 110, balance: 15000 },
      { name: "Wells Fargo Log", price: 95, balance: 12000 },
      { name: "EU Bank Log", price: 130, balance: 18000 },
      // Accounts
      { name: "PayPal Verified", price: 120, balance: 3500 },
      { name: "Amazon Prime Account", price: 25, balance: 5000 },
      { name: "CashApp Verified", price: 65, balance: 2500 },
      { name: "Netflix Premium", price: 15, balance: 100 },
      { name: "Spotify Lifetime", price: 20, balance: 300 },
      // Fullz
      { name: "Credit Card Fullz", price: 35, balance: 75000 },
      { name: "US Fullz Premium", price: 55, balance: 125000 },
      { name: "EU Fullz Package", price: 70, balance: 200000 },
      // Tools
      { name: "Card Checker Pro", price: 40, balance: 0 },
      { name: "BIN Lookup Tool", price: 30, balance: 0 },
      { name: "VPN Lifetime", price: 25, balance: 0 },
      // Courses
      { name: "Carding Master Course", price: 250, balance: 0 }
    ];

    const locations = [
      "United States", "Germany", "United Kingdom", "Canada", "Australia",
      "France", "Netherlands", "Spain", "Italy", "Sweden"
    ];

const showRandomPurchase = () => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      const id = Date.now().toString();
      
      setNotifications(prev => [...prev, { 
        id, 
        productName: randomProduct.name,
        location: randomLocation,
        price: randomProduct.price, 
        balance: randomProduct.balance
      }]);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
   };

    // Show first notification after 8 seconds
    const firstTimer = setTimeout(() => {
      showRandomPurchase();
    }, 8000);

    // Show random notifications every 15-45 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.floor(Math.random() * 30000 + 15000);
      setTimeout(showRandomPurchase, randomDelay);
    }, 45000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const accepted = checkTermsAccepted();
    setTermsAccepted(accepted);
    setIsChecking(false);

    // Handle hash routing
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
      
      // Auto-scroll to section if hash is present
      if (hash && hash !== 'home') {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    // Auto-scroll to products if coming from shared link
    if (window.location.hash.includes('products')) {
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Show Terms page
  if (currentPage === 'terms') {
    return (
      <StoreProvider>
        <Terms />
      </StoreProvider>
    );
  }

  // Show Privacy page
  if (currentPage === 'privacy') {
    return (
      <StoreProvider>
        <Privacy />
      </StoreProvider>
    );
  }

  // Show SignUp page
  if (currentPage === 'signup') {
    return (
      <StoreProvider>
        <SignUp />
      </StoreProvider>
    );
  }

  // Show Messages page
  if (currentPage === 'messages') {
    return (
      <StoreProvider>
        <Messages />
      </StoreProvider>
    );
  }

  // Show FULLZ page
  if (currentPage === 'fullz') {
    return (
      <StoreProvider>
        <CartProvider>
          <div className="min-h-screen bg-black text-green-500 font-mono relative">
            {/* Matrix Rain Background */}
            <MatrixRain />
            
            {/* Scanline overlay */}
            <div className="fixed inset-0 scanline pointer-events-none z-[5]" />
            
            {/* CRT flicker */}
            <div className="fixed inset-0 bg-green-500/[0.02] animate-flicker pointer-events-none z-[5]" />
            
            <Navigation />
            <main className="relative z-10 pt-24">
              <Fullz onProductSold={showSoldNotification} />
            </main>
            <Footer />
            <CartDrawer />
            <Toaster position="bottom-right" />
            <Chatbot />
            
            {/* Sold Notifications */}
            {notifications.map((notification) => (
              <SoldNotification
                key={notification.id}
                productName={notification.productName}
                location={notification.location}
                price={notification.price}
                balance={notification.balance}
                onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
              />
            ))}
          </div>
        </CartProvider>
      </StoreProvider>
    );
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!termsAccepted) {
    // Check if we're on terms or privacy page - still require acceptance
    const hash = window.location.hash.replace('#', '');
    if (hash === 'terms' || hash === 'privacy' || hash === 'signup') {
      // Allow access to terms/privacy without acceptance
    } else {
      // Redirect to terms page first
      window.location.hash = 'terms';
      return null;
    }
  }

  return (
    <StoreProvider>
      <CartProvider>
        <div className="min-h-screen bg-black text-green-500 font-mono relative">
        {/* Matrix Rain Background */}
        <MatrixRain />
        
        {/* Scanline overlay */}
        <div className="fixed inset-0 scanline pointer-events-none z-[5]" />
        
        {/* CRT flicker */}
        <div className="fixed inset-0 bg-green-500/[0.02] animate-flicker pointer-events-none z-[5]" />
        
        <Navigation />
        <main className="relative z-10">
          <Hero />
          <Products onProductSold={showSoldNotification} />
          <Features />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
        <Toaster position="bottom-right" />
        <Chatbot />
        
            {/* Sold Notifications */}
            {notifications.map((notification) => (
              <SoldNotification
                key={notification.id}
                productName={notification.productName}
                location={notification.location}
                price={notification.price}
                balance={notification.balance}
                onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
              />
            ))}
      </div>
      </CartProvider>
    </StoreProvider>
  );
}

export default App;
