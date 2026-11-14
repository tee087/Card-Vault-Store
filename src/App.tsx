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
      // Cards
      { name: "Visa Gold Card", price: 45 },
      { name: "Mastercard Platinum", price: 65 },
      { name: "Amex Black Card", price: 95 },
      { name: "Discover Card", price: 35 },
      // CCs
      { name: "CVV Dump 101", price: 55 },
      { name: "Fresh Base CC", price: 25 },
      { name: "Linkable CC", price: 75 },
      { name: "VBV Passed CC", price: 120 },
      // Logs
      { name: "Bank Log USA", price: 85 },
      { name: "Chase Bank Log", price: 110 },
      { name: "Wells Fargo Log", price: 95 },
      { name: "EU Bank Log", price: 130 },
      // Accounts
      { name: "PayPal Verified", price: 120 },
      { name: "Amazon Prime Account", price: 25 },
      { name: "CashApp Verified", price: 65 },
      { name: "Netflix Premium", price: 15 },
      { name: "Spotify Lifetime", price: 20 },
      // Fullz
      { name: "Credit Card Fullz", price: 35 },
      { name: "US Fullz Premium", price: 55 },
      { name: "EU Fullz Package", price: 70 },
      { name: "CA Fullz", price: 45 },
      // Tools
      { name: "Card Checker Pro", price: 40 },
      { name: "BIN Lookup Tool", price: 30 },
      { name: "VPN Lifetime", price: 25 },
      { name: "Socks5 Residential", price: 35 },
      // Courses
      { name: "Carding Master Course", price: 250 },
      { name: "Spamming Academy", price: 180 },
      { name: "Hacking Fundamentals", price: 120 },
      { name: "Bank Transfer Method", price: 150 }
    ];

    const locations = [
      "United States", "Germany", "United Kingdom", "Canada", "Australia",
      "France", "Netherlands", "Spain", "Italy", "Sweden"
    ];

    const showRandomPurchase = () => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
       // Create notification with separate product and location
      const id = Date.now().toString();
      setNotifications(prev => [...prev, { 
        id, 
        productName: randomProduct.name,
        location: randomLocation,
        price: randomProduct.price, 
        balance: Math.floor(Math.random() * 5000 + 500)
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
    if (hash === 'terms' || hash === 'privacy') {
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
