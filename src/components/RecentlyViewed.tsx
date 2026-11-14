import { ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { useCart } from '@/context/CartContext';

export function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed();
  const { addToCart } = useCart();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-green-400 mb-4 font-mono">
        $ ls recently_viewed/
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentlyViewed.slice(0, 6).map(product => (
          <Card key={product.id} className="bg-black border-green-500/20 hover:border-green-500/50 transition-all">
            <CardContent className="p-4">
              <h3 className="font-mono text-sm text-green-400 mb-2 truncate" title={product.name}>
                {product.name}
              </h3>
              <p className="text-xs text-green-600 font-mono mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-400">
                  ${product.price}
                </span>
                <Button
                  size="sm"
                  onClick={() => addToCart(product)}
                  className="bg-green-500/20 hover:bg-green-500 text-green-400"
                >
                  <ShoppingCart className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}