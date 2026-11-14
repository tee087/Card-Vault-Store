import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FavButtonProps {
  isFav: boolean;
  onClick: () => void;
}

export function FavButton({ isFav, onClick }: FavButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`transition-all ${isFav 
        ? 'text-pink-400 hover:text-pink-300 hover:bg-pink-500/20' 
        : 'text-gray-400 hover:text-pink-400 hover:bg-pink-500/10'
      } rounded-full`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
    </Button>
  );
}