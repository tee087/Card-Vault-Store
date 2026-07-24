import { useEffect, useState } from 'react';
import { Terminal, Code, ChevronRight, Shield, Zap, Users, Clock, CreditCard, Hash, Database, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Typing effect hook
function useTypingEffect(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    const startTyping = () => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
        }
      };
      type();
    };

    timeout = setTimeout(startTyping, startDelay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
}

export function Hero() {
  
  const { displayedText: line1 } = useTypingEffect('> initializing C4RD_V4ULT [v2.0]...', 30, 500);
  const { displayedText: line2, isComplete: line2Done } = useTypingEffect('> loading secure modules...', 30, 1500);
  const { displayedText: line3, isComplete: line3Done } = useTypingEffect('> establishing encrypted connection...', 30, 2800);
  const { displayedText: line4 } = useTypingEffect('> access granted. welcome, user.', 30, 4200);

  const stats = [
    { value: '50K+', label: 'orders_executed' },
    { value: '99.9%', label: 'uptime_status' },
    { value: '24/7', label: 'support_active' },
    { value: '0', label: 'breaches_detected' },
  ];

  const features = [
    { icon: CreditCard, text: 'Premium Cards', category: 'cards', color: 'border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400' },
    { icon: Key, text: 'Linkable CCs', category: 'ccs', color: 'border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400' },
    { icon: Database, text: 'Bank Logs', category: 'logs', color: 'border-purple-500 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400' },
    { icon: Users, text: 'Verified Accounts', category: 'accounts', color: 'border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400' },
    { icon: Zap, text: 'Pro Tools', category: 'tools', color: 'border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-400' },
    { icon: Shield, text: 'Secure Payments', category: 'all', color: 'border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to notify Products component
      window.dispatchEvent(new CustomEvent('selectCategory', { detail: { category: categoryId } }));
    }
  };

  return (
    <section id="home" className="relative flex items-center justify-center overflow-hidden pt-16 py-8">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none z-10" />
      
      {/* CRT flicker */}
      <div className="absolute inset-0 bg-green-500/[0.02] animate-flicker pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left: Terminal Window with animated border */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-xl p-0.5 bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 bg-[length:200%_100%] animate-border-flow opacity-60">
              <div className="h-full w-full bg-black rounded-lg" />
            </div>
            <div className="terminal-window relative z-10">
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-4 text-xs text-green-600 font-mono">user@cardvault:~</span>
            </div>
            
            {/* Terminal Body */}
            <div className="terminal-body min-h-[180px] font-mono text-xs">
              <div className="text-green-700 mb-2">$ ./boot_sequence.sh</div>
              
              <div className="space-y-1">
                <div className="text-green-500">
                  {line1}<span className="animate-blink">█</span>
                </div>
                {line2Done && (
                  <div className="text-green-500">
                    {line2}<span className="animate-blink">█</span>
                  </div>
                )}
                {line3Done && (
                  <div className="text-green-500">
                    {line3}<span className="animate-blink">█</span>
                  </div>
                )}
                {line2Done && line3Done && (
                  <div className="text-green-400 font-bold">
                    {line4}<span className="animate-blink">█</span>
                  </div>
                )}
              </div>

              {line2Done && line3Done && (
                <div className="mt-6 space-y-2">
                  <div className="text-green-600">$ <span className="text-green-400">cat</span> system_status.log</div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="border border-green-500/20 p-3 rounded bg-green-500/5">
                        <div className="text-green-400 text-lg font-bold">{stat.value}</div>
                        <div className="text-green-700 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
         </div>
           </div>
         </div>

          {/* Right: Content */}
          <div className="space-y-3 lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 border-2 border-green-500 flex items-center justify-center glow-green">
                <Terminal className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="text-green-700 text-xs font-mono">root@cardvault:~#</div>
                <div className="text-green-400 text-xl font-bold tracking-wider">CARDVAULT</div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-none">
              <span className="text-[#FFD700] font-mono text-sm block">{'//'} blackhat_access_granted</span>
              <span className="bg-gradient-to-r from-[#7928CA] via-[#FF0080] to-[#00FF88] bg-clip-text text-transparent animate-glow-pulse">Elite Underground</span>
              <span className="text-[#9D4EDD] block">Card Vault</span>
            </h1>

            <p className="text-gray-400 font-mono text-xs leading-snug max-w-md">
              <span className="text-[#00FF88]">$</span> <span className="text-gray-300">Elite arsenal:</span> <span className="text-[#FF0080]">cloned cards</span>, <span className="text-[#7928CA]">dumps</span>, <span className="text-[#FFD700]">fullz</span>, <span className="text-[#4ECDC4]">accounts</span>, <span className="text-[#FF6B6B]">logs</span> & <span className="text-[#A8E6CF]">tools</span>. Anonymous transactions, encrypted delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-mono rounded-none glow-green transition-all"
                asChild
              >
                <a href="#products">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  ./browse_products.sh
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-green-500/30 text-green-600 hover:bg-green-500/10 hover:text-green-400 font-mono rounded-none"
                asChild
              >
                <a href="#features">
                  <Code className="w-4 h-4 mr-2" />
                  cat features.txt
                </a>
              </Button>
            </div>

            {/* Code snippet decoration */}
            <div className="mt-6 p-3 border border-[#7928CA]/30 bg-[#1A1B26]/90 font-mono text-xs rounded-lg shadow-lg shadow-[#7928CA]/10">
              <div><span className="text-[#FF6B6B]">const</span> <span className="text-[#FFD700]">security</span> = {'{'}</div>
              <div className="pl-4"><span className="text-[#7928CA]">encryption</span>: <span className="text-[#00FF88]">'AES-256'</span>,</div>
              <div className="pl-4"><span className="text-[#7928CA]">anonymity</span>: <span className="text-[#FF0080]">true</span>,</div>
              <div className="pl-4"><span className="text-[#7928CA]">delivery</span>: <span className="text-[#4ECDC4]">'instant'</span></div>
              <div>{'}'};</div>
            </div>

            {/* Features Grid */}
            <div className="mt-8">
              <div className="text-green-700 text-xs mb-3">$ ls categories/</div>
              <div className="grid grid-cols-3 gap-2">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(feature.category)}
                    className={`flex items-center gap-2 p-2 border rounded transition-all duration-300 cursor-pointer hover:shadow-lg ${ feature.color}`}
                  >
                    <feature.icon className="w-4 h-4" />
                    <span className="text-xs font-mono">{feature.text}</span>
                  </button>
                ))}
              </div>
            </div>

             {/* Trust Badges */}
             <div className="mt-6 flex flex-wrap gap-4 items-center">
               <div className="flex items-center gap-2 text-green-700 text-xs">
                 <Shield className="w-4 h-4" />
                 <span>SSL Secured</span>
               </div>
               <div className="flex items-center gap-2 text-green-700 text-xs">
                 <Zap className="w-4 h-4" />
                 <span>Instant Delivery</span>
               </div>
               <div className="flex items-center gap-2 text-green-700 text-xs">
                 <Clock className="w-4 h-4" />
                 <span>24/7 Support</span>
               </div>
               <div className="flex items-center gap-2 text-green-700 text-xs">
                 <Hash className="w-4 h-4" />
                 <span>Crypto Payments</span>
               </div>
             </div>
           </div>
         </div>
         
         {/* Scroll Down Indicator */}
         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-green-500 font-mono text-xs animate-bounce">
           <span>SCROLL DOWN FOR PRODUCTS ▼</span>
         </div>
       </div>
     </section>
   );
 }
