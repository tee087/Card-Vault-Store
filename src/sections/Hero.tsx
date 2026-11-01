import { useEffect, useState } from 'react';
import { Terminal, Code, ChevronRight, Shield, Zap, Users, Clock, Hash, Key, CreditCard, Database, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

function useTypingEffect(text: string, speed: number = 30, startDelay: number = 0) {
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

// Pre-computed background particles (generated once at module load, not during render)
const PARTICLES = Array.from({ length: 40 }).map((_, i) => ({
  key: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  duration: `${5 + Math.random() * 10}s`,
}));

export function Hero() {
  const { displayedText: line1 } = useTypingEffect('> system initialized. access granted.', 25, 300);
  const { displayedText: line2, isComplete: line2Done } = useTypingEffect('> secure connection established.', 25, 900);
  const { displayedText: line3, isComplete: line3Done } = useTypingEffect('> welcome to CARDVAULT.', 25, 1500);

  const stats = [
    { value: '50K+', label: 'orders executed' },
    { value: '99.9%', label: 'uptime' },
    { value: '24/7', label: 'support' },
    { value: '0', label: 'breaches' },
  ];

  const features = [
    { icon: CreditCard, text: 'Premium Cards', category: 'cards', color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400' },
    { icon: Key, text: 'Linkable CCs', category: 'ccs', color: 'border-cyan-500 bg-cyan-500/10 text-cyan-400' },
    { icon: Database, text: 'Bank Logs', category: 'logs', color: 'border-purple-500 bg-purple-500/10 text-purple-400' },
    { icon: Users, text: 'Verified Accounts', category: 'accounts', color: 'border-amber-500 bg-amber-500/10 text-amber-400' },
    { icon: Zap, text: 'Pro Tools', category: 'tools', color: 'border-red-500 bg-red-500/10 text-red-400' },
    { icon: Globe, text: 'Residential Proxies', category: 'proxies', color: 'border-indigo-500 bg-indigo-500/10 text-indigo-400' },
    { icon: Shield, text: 'Secure Payments', category: 'all', color: 'border-blue-500 bg-blue-500/10 text-blue-400' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('selectCategory', { detail: { category: categoryId } }));
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-16 py-8 lg:pt-24 lg:py-16">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLES.map((p) => (
          <div
            key={p.key}
            className="absolute w-1 h-1 bg-green-500 rounded-full animate-float opacity-25"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none z-10" />

      {/* CRT flicker */}
      <div className="absolute inset-0 bg-black/[0.4] animate-flicker pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left: Hero Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-green-500 flex items-center justify-center glow-green rounded">
                <Terminal className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="text-green-700 text-xs font-mono">{line1}</div>
                <div className="text-green-400 text-xl font-bold tracking-wider">CARDVAULT</div>
              </div>
            </div>

            {line2Done && line3Done && (
              <>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="text-[#FFD700]">//</span>
                  <span className="text-white">Elite Underground</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#7928CA] via-[#FF0080] to-[#00FF88] bg-clip-text text-transparent animate-glow-pulse">Card Vault</span>
                </h1>

                <p className="text-green-300 text-sm sm:text-base leading-relaxed max-w-lg">
                  Premium cloned cards, linkable CCs, bank logs, verified accounts and pro tools.
                  Anonymous BTC transactions with instant delivery and 24/7 support.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-green-500 text-black hover:bg-green-400 font-mono font-bold rounded-none shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all"
                    asChild
                  >
                    <a href="#products">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Browse Products
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-white font-mono rounded-none"
                    asChild
                  >
                    <a href="#features">
                      <Code className="w-4 h-4 mr-2" />
                      Features
                    </a>
                  </Button>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-3 rounded border border-green-500/20 bg-green-500/5"
                    >
                      <div className="text-green-400 text-lg font-bold">{stat.value}</div>
                      <div className="text-green-600 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-6 flex flex-wrap gap-3 items-center">
                  <div className="flex items-center gap-2 px-2 py-1 rounded border border-green-500/20 bg-green-500/5 text-green-400 text-xs">
                    <Shield className="w-3 h-3" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded border border-green-500/20 bg-green-500/5 text-green-400 text-xs">
                    <Zap className="w-3 h-3" />
                    <span>Instant Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded border border-green-500/20 bg-green-500/5 text-green-400 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded border border-green-500/20 bg-green-500/5 text-green-400 text-xs">
                    <Hash className="w-3 h-3" />
                    <span>BTC Payments</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Clean Terminal Preview */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="relative rounded-xl p-0.5 bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 bg-[length:200%_100%] animate-border-flow opacity-70">
              <div className="h-full w-full bg-black rounded-lg overflow-hidden">
                <div className="border-b border-green-500/30 px-3 py-2 bg-green-900/20 flex items-center gap-2">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                  <span className="ml-3 text-xs text-green-600 font-mono">user@cardvault:~</span>
                </div>
                <div className="p-4 font-mono text-xs space-y-2">
                  <div className="text-green-500">{line1}<span className="animate-blink">█</span></div>
                  {line2Done && <div className="text-green-500">{line2}<span className="animate-blink">█</span></div>}
                  {line3Done && (
                    <>
                      <div className="text-green-500">{line3}<span className="animate-blink">█</span></div>
                      <div className="mt-2 text-green-400 font-bold">$ cat system_status.log</div>
                      <div className="text-green-600 text-xs mt-1">All systems operational.</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Category chips (mobile visible, smaller on desktop) */}
          <div className="lg:col-span-3 mt-4">
            <div className="text-green-700 text-xs font-mono mb-2">$ browse categories/</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(feature.category)}
                  className={`flex items-center gap-2 p-2 border rounded transition-colors cursor-pointer ${feature.color}`}
                >
                  <feature.icon className="w-4 h-4" />
                  <span className="text-xs font-mono">{feature.text}</span>
                </button>
              ))}
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
