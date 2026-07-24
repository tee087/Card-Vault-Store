import { Star, Terminal, CheckCircle, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { testimonials } from '@/data/products';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState, useEffect } from 'react';

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 relative">
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
            <span className="text-green-700 font-mono text-sm">reviews.log</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono text-green-400 mb-2">
            $ tail -f /var/log/reviews
          </h2>
          <p className="text-green-600 font-mono text-sm">
            Live customer feedback stream
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-8 border border-green-500/30 bg-green-500/5 p-6">
          <div className="flex items-center gap-2 mb-4 text-green-700 font-mono text-xs">
            <Quote className="w-4 h-4" />
            <span>latest_entry</span>
          </div>
          <p className="text-green-400 font-mono text-lg mb-6 leading-relaxed">
            "{testimonials[activeIndex].comment}"
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border border-green-500/50 bg-green-500/20">
                <AvatarFallback className="text-green-400 font-mono">
                  {testimonials[activeIndex].avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-mono">{testimonials[activeIndex].name}</span>
                  {testimonials[activeIndex].verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-green-500 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-green-700 font-mono text-xs">{testimonials[activeIndex].date}</span>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 transition-all ${
                index === activeIndex 
                  ? 'w-8 bg-green-500' 
                  : 'bg-green-800 hover:bg-green-600'
              }`}
            />
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={`bg-black border border-green-500/30 hover:border-green-500 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-green-500 fill-current" />
                  ))}
                </div>
                <p className="text-green-600 font-mono text-sm mb-4 line-clamp-3">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 border border-green-500/30 bg-green-500/10">
                      <AvatarFallback className="text-xs text-green-400 font-mono">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-green-400 font-mono">{testimonial.name}</span>
                        {testimonial.verified && (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        )}
                      </div>
                      <span className="text-xs text-green-700 font-mono">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
