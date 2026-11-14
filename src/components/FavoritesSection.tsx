import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';

export function FavoritesSection() {
  const { favorites, removeFav } = useFavorites();
  const { addToCart } = useCart();

  if (favorites.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-pink-400 mb-4 font-mono flex items-center gap-2">
        <Heart className="w-6 h-6" />
        $ ls favorites/
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favorites.map(product => (
          <Card key={product.id} className="bg-black border-pink-500/20 hover:border-pink-500/50 transition-all">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-mono text-sm text-pink-400 mb-2 truncate flex-1" title={product.name}>
                  {product.name}
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFav(product.id)}
                  className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-pink-600 font-mono mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-pink-400">
                  ${product.price}
                </span>
                <Button
                  size="sm"
                  onClick={() => addToCart(product)}
                  className="bg-pink-500/20 hover:bg-pink-500 text-pink-400"
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