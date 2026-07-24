import { Twitter, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import logo from '@/lib/card vault favicon.jpeg';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'cards', href: '#products' },
      { name: 'linkable_ccs', href: '#products' },
      { name: 'bank_logs', href: '#products' },
      { name: 'accounts', href: '#products' },
      { name: 'tools', href: '#products' },
    ],
    support: [
      { name: 'faq', href: '#faq' },
      { name: 'contact', href: '#contact' },
      { name: 'terms', href: '#terms' },
      { name: 'privacy', href: '#privacy' },
    ],
    social: [
      { name: 'telegram', icon: MessageCircle, href: 'https://t.me/cardvaultstore' },
      { name: 'twitter', icon: Twitter, href: '#' },
      { name: 'email', icon: Mail, href: '#' },
    ],
  };

  return (
    <footer className="relative pt-16 pb-8 border-t border-green-500/30 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="C4RD_V4ULT"
                className="w-12 h-12 object-contain border border-green-500"
              />
              <div>
                <span className="text-green-400 font-mono font-bold tracking-wider">
                  <span className="text-red-500">C</span>
                  <span className="text-orange-500">4</span>
                  <span className="text-yellow-500">R</span>
                  <span className="text-green-500">D</span>
                  <span className="text-cyan-500">_</span>
                  <span className="text-blue-500">V</span>
                  <span className="text-purple-500">4</span>
                  <span className="text-pink-500">U</span>
                  <span className="text-red-500">L</span>
                  <span className="text-orange-500">T</span>
                </span>
                <span className="text-green-700 text-xs font-mono ml-2">[v2.0]</span>
              </div>
            </a>
            <p className="text-green-700 font-mono text-sm mb-6 max-w-md">
              Secure source for premium digital assets. Encrypted transactions, 
              anonymous delivery, 24/7 support.
            </p>
            <div className="flex gap-2">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 border border-green-500/30 flex items-center justify-center text-green-600 hover:text-green-400 hover:border-green-500 hover:bg-green-500/10 transition-all"
                  aria-label={item.name}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-green-400 font-mono text-sm mb-4">$ ls products/</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-green-700 hover:text-green-400 transition-colors font-mono text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-green-400 font-mono text-sm mb-4">$ ls support/</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-green-700 hover:text-green-400 transition-colors font-mono text-sm flex items-center gap-1"
                  >
                    {link.name}
                    {link.href === '#' && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-green-500/20 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-700 font-mono text-xs text-center sm:text-left">
            # {currentYear} C4RD_V4ULT. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#terms" className="text-green-700 hover:text-green-400 transition-colors font-mono text-xs">
              terms.sh
            </a>
            <a href="#privacy" className="text-green-700 hover:text-green-400 transition-colors font-mono text-xs">
              privacy.sh
            </a>
            <a href="#" className="text-green-700 hover:text-green-400 transition-colors font-mono text-xs">
              cookies.sh
            </a>
          </div>
        </div>


      </div>
    </footer>
  );
}
