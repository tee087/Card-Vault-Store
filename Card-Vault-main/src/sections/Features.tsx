import { Shield, Zap, Lock, Clock, Headphones, Globe, CheckCircle, Terminal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: Shield,
    title: 'secure_transactions',
    description: 'Military-grade encryption for all data and transactions.',
    status: 'active',
  },
  {
    icon: Zap,
    title: 'instant_delivery',
    description: 'Digital products delivered instantly via encrypted channels.',
    status: 'active',
  },
  {
    icon: Lock,
    title: 'anonymous_mode',
    description: 'No personal information required. Complete privacy.',
    status: 'enabled',
  },
  {
    icon: Clock,
    title: 'always_online',
    description: '24/7 availability. Shop anytime, anywhere.',
    status: 'running',
  },
  {
    icon: Headphones,
    title: 'premium_support',
    description: 'Expert support team available around the clock.',
    status: 'online',
  },
  {
    icon: Globe,
    title: 'global_shipping',
    description: 'Worldwide discreet shipping to any location.',
    status: 'active',
  },
  {
    icon: CheckCircle,
    title: 'quality_verified',
    description: 'All products tested and verified before delivery.',
    status: 'passed',
  },
  {
    icon: Terminal,
    title: 'bulk_orders',
    description: 'Special pricing for large quantity orders.',
    status: 'available',
  },
];

export function Features() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={ref}
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-mono text-sm">features.module</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono text-green-400 mb-2">
            $ systemctl status features
          </h2>
          <p className="text-green-600 font-mono text-sm">
            All systems operational
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`bg-black border border-green-500/30 hover:border-green-500 transition-all duration-300 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 border border-green-500/50 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-xs text-green-700 font-mono">[{feature.status}]</span>
                </div>
                <h3 className="text-green-400 font-mono text-sm mb-2 group-hover:text-green-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-green-700 font-mono text-xs leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Stats */}
        <div className="mt-12 border border-green-500/30 p-6 bg-green-500/5">
          <div className="text-green-700 font-mono text-sm mb-4">$ uptime && system_info</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50K+', label: 'orders_completed' },
              { value: '99.9%', label: 'uptime_percentage' },
              { value: '4.9/5', label: 'avg_rating' },
              { value: '0', label: 'security_breaches' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-mono text-green-400">{stat.value}</div>
                <div className="text-xs text-green-700 font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
