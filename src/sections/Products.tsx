import { useState, useEffect } from 'react';
import {
  ShoppingCart, CreditCard, Link, Database,
  UserCircle, Wrench, Terminal, Eye, ChevronRight, Hash, FileText, ChevronUp, ChevronDown, Zap, Globe, Lock, Monitor, Mail, IdCard, UserPlus, Gift, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Product, Category, StockOption } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid: Terminal,
  CreditCard,
  Link,
  Database,
  UserCircle,
  Wrench,
  FileText,
  Zap,
  Globe,
  Lock,
  Monitor,
  Mail,
  IdCard,
  UserPlus,
  Gift,
  Play
};

const productRefs: Record<string, HTMLDivElement | null> = {};

function DailyDropsCollection({ products, onProductSold: _onProductSold }: { products: Product[]; onProductSold?: (productName: string, price: number, location: string) => void }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  return (
    <>
      <div className="border border-orange-500/50 bg-orange-500/5 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-orange-400 mb-2 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Daily Drops Collection
          </h3>
          <p className="text-orange-600 font-mono text-sm">
            âš¡ Fresh daily drops that change frequently when stock is exhausted. Renewed daily with new inventory.
          </p>
        </div>

        <div className="grid gap-4">
          {products.map((product, _index) => (
            <div key={product.id} className="border border-orange-500/30 bg-orange-500/5 p-4 hover:bg-orange-500/10 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-300 mb-1">{product.name}</h4>
                  <p className="text-orange-600 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-400 font-mono">from ${product.price}</span>
                    <Button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-orange-500 hover:bg-orange-600 text-black font-mono text-xs px-3 py-1"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Details Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl bg-surface0 text-surface0PrimaryText border-surface0Border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-orange-400 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              {selectedProduct?.name}
            </DialogTitle>
            <DialogDescription className="text-orange-300/70 text-sm mb-2">
              {selectedProduct?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              <p className="text-surface0SecondaryText">{selectedProduct.description}</p>

              <div className="space-y-3">
                {selectedProduct.stockOptions?.map((option, index) => (
                  <div key={index} className="border border-orange-500/30 bg-orange-500/5 p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-orange-300">{selectedProduct.name} | {option.quality}</h4>
                      <div className="flex items-center gap-4 text-sm mt-1">
                        <span className="text-green-400 font-mono">from ${option.price}</span>
                        <span className="text-orange-400">{option.stock} ({option.stock}) In Stock</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        // Add to cart with selected option details
                        const productWithOption = {
                          ...selectedProduct,
                          name: `${selectedProduct.name} | ${option.quality}`,
                          price: option.price,
                          id: `${selectedProduct.id}-${option.quality?.replace(/\s+/g, '-').toLowerCase()}`
                        };
                        addToCart(productWithOption);
                        setSelectedProduct(null);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-black font-mono"
                    >
                      Buy Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ProductCard({ product, index: _index, onProductSold: _onProductSold }: { product: Product; index: number; onProductSold?: (productName: string, price: number, location: string) => void }) {
  const { addToCart } = useCart();
  const { products: storeProducts, reduceStock, reduceOptionStock } = useStore();
  const currentProduct = storeProducts.find(p => p.id === product.id) || product;
  const isTool = product.category === 'tools';
  
  // Calculate total remaining stock from all options
  const totalOptionStock = currentProduct.stockOptions?.reduce((sum, opt) => {
    const storeOpt = currentProduct.stockOptions?.find(o => o.price === opt.price);
    return sum + (storeOpt?.stock ?? opt.stock);
  }, 0) ?? currentProduct.stock;
  const [selectedStockOption, setSelectedStockOption] = useState<StockOption | null>(
    product.stockOptions && product.stockOptions.length > 0 ? product.stockOptions[0] : null
  );

  const categoryColors: Record<string, string> = {
    cards: 'border-green-500/50',
    ccs: 'border-cyan-500/50',
    logs: 'border-purple-500/50',
    accounts: 'border-yellow-500/50',
    tools: 'border-red-500/50',
    fullz: 'border-pink-500/50',
    'daily-drops': 'border-orange-500/50',
  };

  const categoryPrefixes: Record<string, string> = {
    cards: 'CARD',
    ccs: 'CC',
    logs: 'LOG',
    accounts: 'ACC',
    tools: 'TOOL',
    fullz: 'FULLZ',
    proxies: 'PROXY',
    dumps: 'DUMP',
    cvv: 'CVV',
    rdp: 'RDP',
    shells: 'SHELL',
    smtp: 'SMTP',
    stealers: 'STEALER',
    docs: 'DOC',
    drops: 'DROP',
    giftcards: 'GIFT',
    streaming: 'STREAM'
  };

  const registerRef = (id: string) => (node: HTMLDivElement | null) => {
    productRefs[id] = node;
  };

  return (
    <Card 
      id={product.id}
      ref={registerRef(product.id)}
      className={`group relative bg-black overflow-hidden rounded-xl transition-all duration-400 shadow-lg shadow-green-900/20 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-1`}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-xl p-0.5 bg-gradient-to-r from-green-500 via-[#FFD700] to-green-500 bg-[length:200%_100%] animate-border-flow opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <div className="h-full w-full bg-black rounded-[10px]" />
      </div>
      
      {/* Static base border */}
      <div className={`absolute inset-0 rounded-xl border-2 ${categoryColors[product.category]} group-hover:border-transparent transition-all duration-400`} />
      {/* Product ID Badge */}
      <div className="absolute top-0 left-0 bg-green-500/20 border-r border-b border-green-500/30 px-2 py-1">
        <span className="text-xs font-mono text-green-600">
          {categoryPrefixes[product.category]}-{String(_index + 1).padStart(3, '0')}
        </span>
      </div>

      {/* Stock Badge */}
      <div className="absolute top-0 right-0 bg-green-500/20 border-l border-b border-green-500/30 px-2 py-1">
        <span className={`text-xs font-mono ${totalOptionStock > 10 ? 'text-green-500' : totalOptionStock > 0 ? 'text-yellow-500' : 'text-red-500'}`}>
          {totalOptionStock > 0 ? `${totalOptionStock} in stock` : 'OUT OF STOCK'}
        </span>
      </div>

      {/* Inner glow border effect */}
      <div className="absolute inset-0 border border-green-500/10 pointer-events-none rounded-xl" />
      
      {/* Product Content */}
      <CardContent className="p-6 pt-12 relative z-10">
        <div className="mb-4">
          <h3 className="font-mono text-lg text-green-400 group-hover:text-green-300 transition-colors">
            {product.name}
          </h3>
          <div className="text-xs text-green-700 font-mono mt-1">
            cat {product.category}/{product.id}.txt
          </div>
        </div>
        
        <p className="text-sm text-green-600 mb-2 line-clamp-2 font-mono">
          {product.category === 'fullz' ? 'HIDDEN' : product.description}
        </p>

        {/* Notice - Chat with admin */}
        <div className="mb-4 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs">
          <span className="text-yellow-500 font-mono">
            Notice: Chat with admin for assistance{' '}
            <a
              href="https://t.me/cardvaultstore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 underline"
            >
              @cardvaultstore
            </a>
          </span>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {product.category === 'fullz'
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-[#DDA0DD]">
                  <ChevronRight className="w-4 h-4 text-[#FFD700]" />
                  <span className="font-mono">HIDDEN</span>
                </div>
              ))
            : product.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-[#DDA0DD]">
                  <ChevronRight className="w-4 h-4 text-[#FFD700]" />
                  <span className="font-mono">{feature}</span>
                </div>
              ))
          }
        </div>
        
          <div className="flex items-center justify-between pt-4 border-t border-green-500/20">
            <div className="flex flex-col gap-2">
              {product.stockOptions && product.stockOptions.length > 0 ? (
                <div className="mb-1">
                  <Select
                    value={selectedStockOption ? (isTool ? `${selectedStockOption.price}-${selectedStockOption.quality}` : `${selectedStockOption.price}-${selectedStockOption.balance}`) : ''}
                    onValueChange={(value) => {
                      const parts = value.split('-');
                      const price = Number(parts[0]);
                      const option = product.stockOptions?.find(o => o.price === price);
                      if (option) setSelectedStockOption(option);
                    }}
                  >
                    <SelectTrigger className="h-auto py-2 px-3 text-xs border-green-500/50 bg-black/80 text-green-400 font-mono w-full justify-between">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-green-500/50 min-w-[200px]">
                      {product.stockOptions?.map((option, idx) => {
                        const storeProduct = storeProducts.find(p => p.id === product.id);
                        const storeOption = storeProduct?.stockOptions?.find(o => o.price === option.price);
                        const currentOptionStock = storeOption?.stock ?? option.stock;
                        
                        return (
                          <SelectItem 
                            key={idx} 
                            value={`${option.price}-${isTool ? option.quality : option.balance}`}
                            className="text-green-400 font-mono text-xs focus:bg-green-500/20 focus:text-green-300 py-2"
                            disabled={currentOptionStock === 0}
                          >
                            <span className="text-[#FF6B6B] font-semibold">PRICE ${option.price}</span>
                            {isTool ? (
                              <span className="text-[#4ECDC4] ml-2">- {option.quality}</span>
                            ) : (
                              <span className="text-[#45B7D1] ml-2">- Balance ${option.balance.toLocaleString()}</span>
                            )}
                            <span className={`ml-2 ${currentOptionStock > 5 ? 'text-[#96CEB4]' : currentOptionStock > 0 ? 'text-[#FFEAA7]' : 'text-[#FF6B6B]'}`}>
                              ({currentOptionStock} left)
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="text-[#95E1D3] text-xs">Stock: {totalOptionStock}</div>
              )}
              <div className="flex items-center gap-1">
                <Button 
                  size="sm"
                  onClick={() => {
                    if (selectedStockOption) {
                      const itemToAdd = { ...product, price: selectedStockOption.price, stock: selectedStockOption.stock };
                      reduceOptionStock(product.id, selectedStockOption.price, 1);
                      addToCart(itemToAdd);
                      if (_onProductSold) {
                        const location = product.location || (product.name.includes('US') ? 'United States' : product.name.includes('EU') ? 'European Union' : product.name.includes('UK') ? 'United Kingdom' : product.name.includes('CA') ? 'Canada' : product.name.includes('AU') ? 'Australia' : 'Global');
                        _onProductSold(product.name, selectedStockOption.price, location);
                      }
                    } else {
                      reduceStock(product.id, 1);
                      addToCart(product);
                      if (_onProductSold) {
                        const location = product.location || (product.name.includes('US') ? 'United States' : product.name.includes('EU') ? 'European Union' : product.name.includes('UK') ? 'United Kingdom' : product.name.includes('CA') ? 'Canada' : product.name.includes('AU') ? 'Australia' : 'Global');
                        _onProductSold(product.name, product.price, location);
                      }
                    }
                  }}
                  disabled={totalOptionStock === 0 || (selectedStockOption ? (currentProduct.stockOptions?.find(o => o.price === selectedStockOption.price)?.stock ?? selectedStockOption.stock) === 0 : false)}
                  className={`bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black ${totalOptionStock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ShoppingCart className="w-3 h-3" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-green-500/30 text-green-600 hover:bg-green-500/10 hover:text-green-400"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg bg-black border border-green-500/30">
                    <DialogHeader>
                      <DialogTitle className="text-green-400 font-mono flex items-center gap-2">
                        <Terminal className="w-5 h-5" />
                        {product.name}
                      </DialogTitle>
                      <DialogDescription className="text-green-600 text-sm mb-2">
                        {product.category === 'fullz' ? 'HIDDEN' : product.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 font-mono">
                      <div className="p-3 border border-green-500/20 bg-green-500/5">
                        <span className="text-green-700">$ cat description</span>
                        <p className="text-green-400 mt-2">{product.category === 'fullz' ? 'HIDDEN' : product.description}</p>
                      </div>

                      {/* Notice - Chat with admin */}
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/30">
                        <span className="text-yellow-500 font-mono text-sm">
                          Notice: Chat with admin for assistance{' '}
                          <a 
                            href="https://t.me/cardvaultstore" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-yellow-300 underline"
                          >
                            @cardvaultstore
                          </a>
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-green-700">$ ls features/</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product.category === 'fullz'
                            ? Array.from({ length: product.features.length }).map((_, idx) => (
                                <span key={idx} className="text-xs text-green-500 border border-green-500/30 px-2 py-1">
                                  HIDDEN
                                </span>
                              ))
                            : product.features.map((feature, idx) => (
                                <span key={idx} className="text-xs text-green-500 border border-green-500/30 px-2 py-1">
                                  {feature}
                                </span>
                              ))
                          }
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-green-500/20">
                        <div className="text-green-700">
                          stock: <span className="text-green-400">{totalOptionStock} remaining</span>
                        </div>
                        <div>
                          <span className="text-green-700">price: </span>
                          <span className="text-green-400 text-xl">
                            ${selectedStockOption ? selectedStockOption.price : product.price}
                          </span>
                          {selectedStockOption && (
                            <div className="text-green-600 text-xs">
                              {isTool 
                                ? `Level: ${selectedStockOption.quality}`
                                : `Balance: ${selectedStockOption.balance.toLocaleString()}`
                              }
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => {
                          if (selectedStockOption) {
                            const itemToAdd = { ...product, price: selectedStockOption.price, stock: selectedStockOption.stock };
                            reduceOptionStock(product.id, selectedStockOption.price, 1);
                            addToCart(itemToAdd);
                            if (_onProductSold) {
                              const location = product.location || (product.name.includes('US') ? 'United States' : product.name.includes('EU') ? 'European Union' : product.name.includes('UK') ? 'United Kingdom' : product.name.includes('CA') ? 'Canada' : product.name.includes('AU') ? 'Australia' : 'Global');
                              _onProductSold(product.name, selectedStockOption.price, location);
                            }
                          } else {
                            reduceStock(product.id, 1);
                            addToCart(product);
                            if (_onProductSold) {
                              const location = product.location || (product.name.includes('US') ? 'United States' : product.name.includes('EU') ? 'European Union' : product.name.includes('UK') ? 'United Kingdom' : product.name.includes('CA') ? 'Canada' : product.name.includes('AU') ? 'Australia' : 'Global');
                              _onProductSold(product.name, product.price, location);
                            }
                          }
                        }}
                        className="w-full bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-mono"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        ./add_to_cart.sh
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="font-mono text-right">
              <div className="flex items-center justify-end gap-1">
                <span className="text-[#F38181]">$</span>
                <span className="text-[#A8E6CF] text-xl font-bold">
                  {selectedStockOption ? selectedStockOption.price : currentProduct.price}
                </span>
                <span className="text-[#88D8B0]">.00</span>
              </div>
              {product.originalPrice && (
                <span className="text-green-800 text-sm line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
      </CardContent>
    </Card>
  );
}

// Fullz Inventory Component - same as Fullz.tsx but using green colors
const fullzData = [
  {
    id: 'us',
    name: 'United States',
    flag: 'ðŸ‡ºðŸ‡¸',
    code: 'US',
    entries: Array.from({ length: 50 }, (_, i) => {
      const firstNames = ['John', 'James', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian', 'George', 'Edward'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris'];
      const states = [
        'California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan',
        'New Jersey', 'Virginia', 'Washington', 'Arizona', 'Massachusetts', 'Tennessee', 'Indiana', 'Missouri', 'Maryland', 'Wisconsin',
        'Colorado', 'Minnesota', 'South Carolina', 'Alabama', 'Louisiana', 'Kentucky', 'Oregon', 'Oklahoma', 'Connecticut', 'Utah',
        'Iowa', 'Nevada', 'Arkansas', 'Mississippi', 'Kansas', 'New Mexico', 'Nebraska', 'West Virginia', 'Idaho', 'Hawaii',
        'New Hampshire', 'Maine', 'Montana', 'Rhode Island', 'Delaware', 'South Dakota', 'North Dakota', 'Alaska', 'Vermont', 'Wyoming'
      ];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const state = states[Math.floor(Math.random() * states.length)];

      return {
        id: `us-${i + 1}`,
        fullName: `${firstName} ${lastName} (${state})`,
        homeAddress: 'HIDDEN',
        dateOfBirth: 'HIDDEN',
        ssn: 'HIDDEN',
        phone: 'HIDDEN',
        email: 'HIDDEN',
        cardDetails: 'HIDDEN',
        cvvExpiry: 'HIDDEN',
        bankAccount: 'HIDDEN',
        driversLicense: 'HIDDEN',
        passport: 'HIDDEN',
        mothersMaidenName: 'HIDDEN',
        securityQA: 'HIDDEN',
        bankingLogin: 'HIDDEN',
        emailAccess: 'HIDDEN',
        utilityBills: 'HIDDEN',
        employmentInfo: 'HIDDEN',
        taxId: 'HIDDEN',
        medicalInsurance: 'HIDDEN',
        idPhotos: 'HIDDEN',
        selfies: 'HIDDEN',
        price: 20 + Math.floor(Math.random() * 5),
        status: (Math.random() > 0.1 ? 'available' : 'sold') as 'available' | 'sold'
      };
    })
  },
  {
    id: 'eu',
    name: 'European Union',
    flag: 'ðŸ‡ªðŸ‡º',
    code: 'EU',
    entries: Array.from({ length: 50 }, (_, i) => {
      const firstNames = ['Hans', 'Klaus', 'Franz', 'Wolfgang', 'Heinz', 'Karl', 'Otto', 'GÃ¼nther', 'Dieter', 'Horst', 'JÃ¼rgen', 'Peter', 'Werner', 'Gerhard', 'Walter', 'Heinrich', 'Helmut', 'Fritz', 'Kurt', 'Herbert', 'Johann', 'Rudolf', 'Ernst', 'Willi', 'Alfred'];
      const lastNames = ['MÃ¼ller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'SchÃ¤fer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'SchrÃ¶der', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'KrÃ¼ger', 'Hofmann', 'Hartmann', 'Lange'];
      const countries = ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Slovakia', 'Slovenia', 'Croatia', 'Romania', 'Bulgaria', 'Greece', 'Portugal', 'Ireland'];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const country = countries[Math.floor(Math.random() * countries.length)];

      return {
        id: `eu-${i + 1}`,
        fullName: `${firstName} ${lastName} (${country})`,
        homeAddress: 'HIDDEN',
        dateOfBirth: 'HIDDEN',
        ssn: 'HIDDEN',
        phone: 'HIDDEN',
        email: 'HIDDEN',
        cardDetails: 'HIDDEN',
        cvvExpiry: 'HIDDEN',
        bankAccount: 'HIDDEN',
        driversLicense: 'HIDDEN',
        passport: 'HIDDEN',
        mothersMaidenName: 'HIDDEN',
        securityQA: 'HIDDEN',
        bankingLogin: 'HIDDEN',
        emailAccess: 'HIDDEN',
        utilityBills: 'HIDDEN',
        employmentInfo: 'HIDDEN',
        taxId: 'HIDDEN',
        medicalInsurance: 'HIDDEN',
        idPhotos: 'HIDDEN',
        selfies: 'HIDDEN',
        price: 20 + Math.floor(Math.random() * 5),
        status: (Math.random() > 0.1 ? 'available' : 'sold') as 'available' | 'sold'
      };
    })
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: 'ðŸ‡¬ðŸ‡§',
    code: 'UK',
    entries: Array.from({ length: 50 }, (_, i) => {
      const firstNames = ['James', 'John', 'David', 'Michael', 'Christopher', 'Matthew', 'Daniel', 'Andrew', 'Richard', 'Paul', 'Mark', 'Thomas', 'Stephen', 'Anthony', 'Charles', 'Robert', 'William', 'Joseph', 'Edward', 'George', 'Peter', 'Brian', 'Kevin', 'Patrick', 'Alan'];
      const lastNames = ['Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Davies', 'Wilson', 'Evans', 'Thomas', 'Johnson', 'Roberts', 'Robinson', 'Thompson', 'Wright', 'Walker', 'White', 'Edwards', 'Hughes', 'Green', 'Hall', 'Lewis', 'Harris', 'Clarke', 'Patel', 'Jackson'];
      const regions = ['Greater London', 'West Midlands', 'Greater Manchester', 'West Yorkshire', 'Kent', 'Essex', 'Merseyside', 'South Yorkshire', 'Hampshire', 'Surrey', 'Hertfordshire', 'Tyne and Wear', 'Norfolk', 'Staffordshire', 'Cheshire', 'Derbyshire', 'Nottinghamshire', 'Leicestershire', 'North Yorkshire', 'Lancashire', 'East Sussex', 'West Sussex', 'Cambridgeshire', 'Northumberland', 'Shropshire', 'Somerset', 'Cornwall', 'Cumbria', 'Durham', 'Dorset', 'Gloucestershire', 'Wiltshire', 'Devon', 'Worcestershire', 'Lincolnshire', 'Buckinghamshire', 'Northamptonshire', 'Oxfordshire', 'Warwickshire', 'Berkshire', 'Bedfordshire', 'Isle of Wight', 'Herefordshire', 'Rutland', 'Scotland', 'Wales', 'Northern Ireland'];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];

      return {
        id: `uk-${i + 1}`,
        fullName: `${firstName} ${lastName} (${region})`,
        homeAddress: 'HIDDEN',
        dateOfBirth: 'HIDDEN',
        ssn: 'HIDDEN',
        phone: 'HIDDEN',
        email: 'HIDDEN',
        cardDetails: 'HIDDEN',
        cvvExpiry: 'HIDDEN',
        bankAccount: 'HIDDEN',
        driversLicense: 'HIDDEN',
        passport: 'HIDDEN',
        mothersMaidenName: 'HIDDEN',
        securityQA: 'HIDDEN',
        bankingLogin: 'HIDDEN',
        emailAccess: 'HIDDEN',
        utilityBills: 'HIDDEN',
        employmentInfo: 'HIDDEN',
        taxId: 'HIDDEN',
        medicalInsurance: 'HIDDEN',
        idPhotos: 'HIDDEN',
        selfies: 'HIDDEN',
        price: 20 + Math.floor(Math.random() * 5),
        status: (Math.random() > 0.1 ? 'available' : 'sold') as 'available' | 'sold'
      };
    })
  },
  {
    id: 'ca',
    name: 'Canada',
    flag: 'ðŸ‡¨ðŸ‡¦',
    code: 'CA',
    entries: Array.from({ length: 50 }, (_, i) => {
      const firstNames = ['Michael', 'Christopher', 'Matthew', 'David', 'James', 'John', 'Robert', 'Daniel', 'Joseph', 'Andrew', 'Ryan', 'Nicholas', 'Tyler', 'William', 'Jonathan', 'Alexander', 'Brandon', 'Anthony', 'Kevin', 'Thomas', 'Eric', 'Steven', 'Justin', 'Brian', 'Adam'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark'];
      const provinces = ['Ontario', 'British Columbia', 'Quebec', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island', 'Northwest Territories', 'Nunavut', 'Yukon'];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const province = provinces[Math.floor(Math.random() * provinces.length)];

      return {
        id: `ca-${i + 1}`,
        fullName: `${firstName} ${lastName} (${province})`,
        homeAddress: 'HIDDEN',
        dateOfBirth: 'HIDDEN',
        ssn: 'HIDDEN',
        phone: 'HIDDEN',
        email: 'HIDDEN',
        cardDetails: 'HIDDEN',
        cvvExpiry: 'HIDDEN',
        bankAccount: 'HIDDEN',
        driversLicense: 'HIDDEN',
        passport: 'HIDDEN',
        mothersMaidenName: 'HIDDEN',
        securityQA: 'HIDDEN',
        bankingLogin: 'HIDDEN',
        emailAccess: 'HIDDEN',
        utilityBills: 'HIDDEN',
        employmentInfo: 'HIDDEN',
        taxId: 'HIDDEN',
        medicalInsurance: 'HIDDEN',
        idPhotos: 'HIDDEN',
        selfies: 'HIDDEN',
        price: 20 + Math.floor(Math.random() * 5),
        status: (Math.random() > 0.1 ? 'available' : 'sold') as 'available' | 'sold'
      };
    })
  }
];

const fullzTableColumns = [
  { key: 'fullName', label: 'Full Name' },
  { key: 'homeAddress', label: 'Home Address' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
  { key: 'ssn', label: 'SSN/National ID' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'email', label: 'Email Address' },
  { key: 'cardDetails', label: 'Card Details' },
  { key: 'cvvExpiry', label: 'CVV & Expiry' },
  { key: 'bankAccount', label: 'Bank Account' },
  { key: 'driversLicense', label: "Driver's License" },
  { key: 'passport', label: 'Passport Details' },
  { key: 'mothersMaidenName', label: "Mother's Maiden Name" },
  { key: 'securityQA', label: 'Security Q&A' },
  { key: 'bankingLogin', label: 'Banking Login' },
  { key: 'emailAccess', label: 'Email Access' },
  { key: 'utilityBills', label: 'Utility Bills' },
  { key: 'employmentInfo', label: 'Employment Info' },
  { key: 'taxId', label: 'Tax ID' },
  { key: 'medicalInsurance', label: 'Medical Insurance' },
  { key: 'idPhotos', label: 'ID Photos' },
  { key: 'selfies', label: 'Selfies/Facial' }
];

function FullzInventory({ onProductSold }: { onProductSold?: (productName: string, price: number, location: string) => void }) {
  const { addToCart } = useCart();
  const { reduceStock } = useStore();
  const [selectedCountry, setSelectedCountry] = useState<typeof fullzData[0] | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (entry: any) => {
    const product = {
      id: entry.id,
      name: `${entry.id} - ${selectedCountry?.name || 'Fullz'} Package`,
      description: 'Complete identity package',
      price: entry.price,
      category: 'fullz' as const,
      features: fullzTableColumns.map(col => `${col.label}: HIDDEN`),
      stock: 1,
      rating: 4.8,
      reviews: 100,
      stockOptions: [{ price: entry.price, balance: 0, stock: 1 }]
    };
    reduceStock(entry.id, 1);
    addToCart(product);
    if (onProductSold) {
      const location = selectedCountry?.name || 'Global';
      onProductSold(product.name, entry.price, location);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-4 h-4 text-pink-500" />
          <span className="text-pink-600 font-mono text-sm">fullz.catalog</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-mono text-pink-300 mb-2">
          $ ls -la /fullz/
        </h2>
        <p className="text-pink-500 font-mono text-sm">
          Select a country to view available identity packages
        </p>
      </div>

      {/* Info Banner */}
      <div className="mb-8 p-4 border border-pink-500/30 bg-pink-500/5 rounded">
        <div className="flex items-start gap-3">
          <span className="w-5 h-5 text-pink-400 mt-0.5">ðŸ”’</span>
          <div>
            <h3 className="text-pink-300 font-mono text-sm font-semibold mb-1">Premium Identity Packages</h3>
            <p className="text-pink-500 font-mono text-xs">
              Complete identity packages with full personal details. Click a country flag to view available entries.
              All data is verified and ready for immediate use.
            </p>
          </div>
        </div>
      </div>

      {/* Country Flags */}
      <div className="flex flex-wrap gap-6 mb-8 justify-center">
        {fullzData.map((country) => (
          <button
            key={country.id}
            onClick={() => setSelectedCountry(selectedCountry?.id === country.id ? null : country)}
            className={`group flex flex-col items-center gap-2 p-6 border rounded-lg transition-all duration-300 ${
              selectedCountry?.id === country.id
                ? 'border-pink-400 bg-pink-500/20 shadow-lg shadow-pink-500/20'
                : 'border-pink-500/30 bg-black hover:border-pink-400 hover:bg-pink-500/10'
            }`}
          >
            <span className="text-6xl group-hover:scale-110 transition-transform">{country.flag}</span>
            <span className="text-pink-300 font-mono text-sm">{country.name}</span>
            <span className="text-pink-500 font-mono text-xs">{country.entries.length} entries</span>
          </button>
        ))}
      </div>

      {/* Data Table */}
      {selectedCountry && (
        <div className="border border-pink-500/30 bg-black/50 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-pink-500/30 bg-pink-500/10">
            <h3 className="text-pink-300 font-mono flex items-center gap-2">
              <span className="text-2xl">{selectedCountry.flag}</span>
              {selectedCountry.name} Fullz Database
              <span className="text-pink-500 text-sm ml-2">({selectedCountry.entries.length} entries)</span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-pink-500/30 hover:bg-pink-500/10">
                  <TableHead className="text-pink-400 font-mono w-[50px]">ID</TableHead>
                  <TableHead className="text-pink-400 font-mono">Full Name</TableHead>
                  <TableHead className="text-pink-400 font-mono">DOB</TableHead>
                  <TableHead className="text-pink-400 font-mono">SSN/ID</TableHead>
                  <TableHead className="text-pink-400 font-mono">Card</TableHead>
                  <TableHead className="text-pink-400 font-mono">Price</TableHead>
                  <TableHead className="text-pink-400 font-mono">Status</TableHead>
                  <TableHead className="text-pink-400 font-mono">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCountry.entries.map((entry, index) => (
                  <>
                    <TableRow
                      key={entry.id}
                      className="border-pink-500/20 hover:bg-pink-500/10 cursor-pointer"
                      onClick={() => toggleRow(entry.id)}
                    >
                      <TableCell className="font-mono text-pink-500">{index + 1}</TableCell>
                      <TableCell className="font-mono text-pink-300">{entry.fullName}</TableCell>
                      <TableCell className="font-mono text-pink-400">{entry.dateOfBirth}</TableCell>
                      <TableCell className="font-mono text-pink-400">{entry.ssn}</TableCell>
                      <TableCell className="font-mono text-pink-400">{entry.cardDetails}</TableCell>
                      <TableCell className="font-mono text-green-400">${entry.price}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-mono ${
                          entry.status === 'available'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {entry.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center gap-1">
                          {expandedRows[entry.id] ? (
                            <ChevronUp className="w-4 h-4 text-pink-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-pink-400" />
                          )}
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(entry);
                            }}
                            disabled={entry.status === 'sold'}
                            className="bg-pink-500/20 border border-pink-500 text-pink-300 hover:bg-pink-500 hover:text-black disabled:opacity-50"
                          >
                              <ShoppingCart className="w-3 h-3" />
                              Add
                          </Button>
                          </div>
                        </TableCell>
                      </TableRow>

                    {/* Expanded Row with Full Details */}
                    {expandedRows[entry.id] && (
                      <TableRow className="bg-pink-500/5">
                        <TableCell colSpan={8} className="p-0">
                          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {fullzTableColumns.map((col) => (
                              <div key={col.key} className="border border-pink-500/20 p-3 rounded">
                                <div className="text-pink-500 font-mono text-xs mb-1">{col.label}</div>
                                <div className="text-pink-300 font-mono text-sm">
                                  {entry[col.key as keyof typeof entry] as string}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedCountry && (
        <div className="text-center py-16 border border-pink-500/20">
          <p className="text-pink-500 font-mono">$ echo "Select a country flag above to view available packages"</p>
        </div>
      )}
    </div>
  );
}

export { productRefs };
// Proxy Inventory Component - Fullz-style UI with address form
const USA_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
  'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts',
  'Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
  'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
];

const COUNTRY_STATES: Record<string, string[]> = {
  USA: USA_STATES,
  Canada: [
    'Ontario','British Columbia','Quebec','Alberta','Manitoba','Saskatchewan','Nova Scotia',
    'New Brunswick','Newfoundland and Labrador','Prince Edward Island','Northwest Territories',
    'Nunavut','Yukon'
  ],
  'United Kingdom': [
    'England','Scotland','Wales','Northern Ireland','Greater London','West Midlands',
    'Greater Manchester','West Yorkshire','Kent','Essex'
  ],
  EU: [
    'Germany','France','Italy','Spain','Netherlands','Belgium','Austria','Switzerland',
    'Sweden','Norway','Denmark','Finland','Poland','Czech Republic','Hungary','Slovakia',
    'Slovenia','Croatia','Romania','Bulgaria','Greece','Portugal','Ireland'
  ],
  Australia: [
    'New South Wales','Victoria','Queensland','Western Australia','South Australia',
    'Tasmania','Australian Capital Territory','Northern Territory'
  ],
  'Other': ['Any']
};

const PROXY_PLANS = [
  { id: 'data-5gb', name: '5 GB Data Pack', price: 10, type: 'data' },
  { id: 'data-20gb', name: '20 GB Data Pack', price: 35, type: 'data' },
  { id: 'data-100gb', name: '100 GB Data Pack', price: 130, type: 'data' },
  { id: 'port-5', name: '5 Concurrent Ports', price: 52, type: 'port' },
  { id: 'port-25', name: '25 Concurrent Ports', price: 183, type: 'port' },
  { id: 'port-100', name: '100 Concurrent Ports', price: 599, type: 'port' },
  { id: 'isp-1', name: '1 Static ISP IP', price: 15, type: 'isp' },
  { id: 'isp-10', name: '10 Static ISP IPs', price: 130, type: 'isp' }
];

function ProxyInventory({ onProductSold }: { onProductSold?: (productName: string, price: number, location: string) => void }) {
  const { addToCart } = useCart();
  const [selectedPlan, setSelectedPlan] = useState<typeof PROXY_PLANS[0] | null>(null);
  const [form, setForm] = useState({ country: '', state: '', street: '', address: '' });
  const availableStates = COUNTRY_STATES[form.country] || COUNTRY_STATES['Other'];

  const handleProxySelect = (plan: typeof PROXY_PLANS[0]) => {
    setSelectedPlan(plan);
  };

  const handleCheckout = () => {
    if (!selectedPlan || !form.country || !form.state || !form.street || !form.address) {
      alert('Please fill Country, State, Street, and Address before checkout');
      return;
    }
    const product = {
      id: `proxy-${selectedPlan.id}`,
      name: `Residential Proxy - ${selectedPlan.name}`,
      description: `Residential proxy - ${form.country}, ${form.state}, ${form.street}, ${form.address}`,
      price: selectedPlan.price,
      category: 'proxies' as const,
      features: [
        'Gateway: host:port:username:password',
        'SOCKS5 & HTTP protocols',
        'Username/Password Authentication',
        'Instant delivery',
        'Residential ISP IPs for ' + form.country
      ],
      stock: 1,
      rating: 4.8,
      reviews: 100,
      stockOptions: [{ price: selectedPlan.price, balance: 0, stock: 1 }]
    };
    addToCart(product);
    if (onProductSold) {
      onProductSold(product.name, selectedPlan.price, `${form.country}, ${form.state}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-indigo-400" />
          <span className="text-indigo-600 font-mono text-sm">proxy.catalog</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-mono text-indigo-400 mb-2">
          $ ls -la /proxies/
        </h2>
        <p className="text-indigo-500 font-mono text-sm">
          Select a proxy plan, enter your target address, then checkout. Delivered as host:port:username:password.
        </p>
      </div>

      {/* SocksDroid APK Notice */}
      <div className="mb-8 p-5 border border-indigo-500/40 bg-indigo-500/10 rounded-lg flex items-start gap-3">
          <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">â¬‡</span>
          </div>
          <div>
            <h3 className="text-indigo-300 font-mono text-sm font-bold mb-1">Download SocksDroid App</h3>
            <p className="text-indigo-500 font-mono text-xs mb-2">
              SocksDroid is a SOCKS5 proxy client for Android. Configure your purchased residential proxy with Server IP, Server Port, Username and Password.
            </p>
            <Button
              asChild
              className="bg-indigo-500 hover:bg-indigo-400 text-black font-mono text-sm px-4 py-2 flex items-center gap-2"
            >
              <a href="/SocksDroid.apk" download className="text-black">
                <span className="text-lg">📱</span>
                Download SocksDroid APK
              </a>
            </Button>
          </div>
        </div>

      {/* Proxy Plans */}
      <div className="mb-8">
        <h3 className="text-indigo-400 font-mono text-sm mb-3">$ select-proxy-plan --plan=</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROXY_PLANS.map((plan) => {
            let planTypeText = 'Pay per GB';
            let planIcon = '📦';
            if (plan.type === 'port') {
              planTypeText = 'Concurrent ports';
              planIcon = '🔌';
            } else if (plan.type === 'isp') {
              planTypeText = 'Static IP per month';
              planIcon = '📶';
            }
            return (
            <button
              key={plan.id}
              onClick={() => handleProxySelect(plan)}
              className="p-4 border rounded-lg transition-all flex flex-col items-start gap-2"
            >
              <div className="flex items-center gap-1 mb-1">
                <span className={selectedPlan?.id === plan.id ? 'text-indigo-400 font-bold' : 'text-indigo-500 font-mono text-sm'}>
                  {planIcon}
                </span>
                <span className="text-indigo-400 font-mono text-xs ml-auto">${plan.price}</span>
              </div>
              <span className="text-indigo-300 font-mono text-sm font-medium">{plan.name}</span>
              <span className="text-indigo-500 font-mono text-xs mt-1">{planTypeText}</span>
            </button>
            );
          })}
        </div>
      </div>

      {/* Address Form */}
      {selectedPlan && (
        <div className="mb-8 p-6 border border-indigo-500/30 bg-indigo-500/5 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-indigo-400" />
            <h3 className="text-indigo-400 font-mono text-lg font-bold">$ configure-proxy --target=</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-indigo-500 font-mono text-xs mb-1 block">Country</label>
              <Select
                value={form.country}
                onValueChange={(value) => setForm({ ...form, country: value, state: '' })}
              >
                <SelectTrigger className="bg-black border-indigo-500/40 text-indigo-400 font-mono rounded px-3 py-2 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 w-full">
                  <SelectValue placeholder="Select country..." />
                </SelectTrigger>
                <SelectContent className="bg-black border-indigo-500/40 text-indigo-400 font-mono">
                  {Object.keys(COUNTRY_STATES).map((c) => (
                    <SelectItem key={c} value={c} className="text-indigo-400 font-mono">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <label className="text-indigo-500 font-mono text-xs mb-1 block">State / Region</label>
              <Select
                value={form.state}
                onValueChange={(value) => setForm({ ...form, state: value })}
              >
                <SelectTrigger className="bg-black border-indigo-500/40 text-indigo-400 font-mono rounded px-3 py-2 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 w-full">
                  <SelectValue placeholder="Select state/region..." />
                </SelectTrigger>
                <SelectContent className="bg-black border-indigo-500/40 text-indigo-400 font-mono">
                  {availableStates.map((s) => (
                    <SelectItem key={s} value={s} className="text-indigo-400 font-mono">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            </div>
            <div>
              <label className="text-indigo-500 font-mono text-xs mb-1 block">Street</label>
              <input
                className="bg-black border border-indigo-500/40 text-indigo-400 font-mono rounded px-3 py-2 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 w-full"
                placeholder="e.g. 123 Main Street"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
              />
            </div>
            <div>
              <label className="text-indigo-500 font-mono text-xs mb-1 block">Specific Address / Apartment</label>
              <input
                className="bg-black border border-indigo-500/40 text-indigo-400 font-mono rounded px-3 py-2 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 w-full"
                placeholder="e.g. Apt 4B"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleCheckout}
              className="bg-indigo-500 hover:bg-indigo-400 text-black font-mono font-bold px-6 py-2 shadow-lg shadow-indigo-500/30"
            >
              $ ./checkout.sh --total=${selectedPlan.price}
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedPlan && (
        <div className="text-center py-16 border border-indigo-500/20">
          <p className="text-indigo-500 font-mono">$ echo "Select a proxy plan above to configure your target address"</p>
        </div>
      )}
    </div>
  );
}

export function Products({ onProductSold }: { onProductSold?: (productName: string, price: number, location: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const { ref, isVisible } = useScrollAnimation();
  const { products: storeProducts } = useStore();

  // Listen for category selection from Hero
  useEffect(() => {
    const handleSelectCategory = (event: Event) => {
      const customEvent = event as CustomEvent<{ category: string }>;
      setActiveCategory(customEvent.detail.category as Category);
    };

    window.addEventListener('selectCategory', handleSelectCategory);
    return () => window.removeEventListener('selectCategory', handleSelectCategory);
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? storeProducts.filter(p => p.category !== 'fullz')
    : storeProducts.filter(p => p.category === activeCategory && p.category !== 'fullz');

  return (
    <section id="products" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={ref}
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-mono text-sm">products.catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono text-green-400 mb-2">
            $ ls -la /inventory/
          </h2>
          <p className="text-green-600 font-mono text-sm">
            total {filteredProducts.length} items available
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12 p-4 border border-green-500/20 bg-green-500/5">
          <span className="text-green-700 font-mono text-sm mr-2">$ filter --category=</span>
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Terminal;
            const categoryColors: Record<string, string> = {
              'all': 'border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400',
              'cards': 'border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400',
              'ccs': 'border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400',
              'logs': 'border-purple-500 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400',
              'accounts': 'border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400',
              'tools': 'border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-400',
              'fullz': 'border-pink-500 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400',
              'proxies': 'border-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400',
              'dumps': 'border-orange-500 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400',
              'cvv': 'border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400',
              'rdp': 'border-rose-500 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400',
              'shells': 'border-slate-500 bg-slate-500/10 hover:bg-slate-500/20 text-slate-400',
              'smtp': 'border-lime-500 bg-lime-500/10 hover:bg-lime-500/20 text-lime-400',
              'stealers': 'border-fuchsia-500 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400',
              'docs': 'border-gray-500 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400',
              'drops': 'border-stone-500 bg-stone-500/10 hover:bg-stone-500/20 text-stone-400',
              'giftcards': 'border-violet-500 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400',
              'streaming': 'border-sky-500 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400'
            };
            const activeColorMap: Record<string, string> = {
              'all': 'bg-blue-500 text-black border-blue-500 shadow-lg shadow-blue-500/50',
              'cards': 'bg-emerald-500 text-black border-emerald-500 shadow-lg shadow-emerald-500/50',
              'ccs': 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/50',
              'logs': 'bg-purple-500 text-black border-purple-500 shadow-lg shadow-purple-500/50',
              'accounts': 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/50',
              'tools': 'bg-red-500 text-black border-red-500 shadow-lg shadow-red-500/50',
              'fullz': 'bg-pink-500 text-black border-pink-500 shadow-lg shadow-pink-500/50',
              'proxies': 'bg-indigo-500 text-black border-indigo-500 shadow-lg shadow-indigo-500/50',
              'dumps': 'bg-orange-500 text-black border-orange-500 shadow-lg shadow-orange-500/50',
              'cvv': 'bg-yellow-500 text-black border-yellow-500 shadow-lg shadow-yellow-500/50',
              'rdp': 'bg-rose-500 text-black border-rose-500 shadow-lg shadow-rose-500/50',
              'shells': 'bg-slate-500 text-black border-slate-500 shadow-lg shadow-slate-500/50',
              'smtp': 'bg-lime-500 text-black border-lime-500 shadow-lg shadow-lime-500/50',
              'stealers': 'bg-fuchsia-500 text-black border-fuchsia-500 shadow-lg shadow-fuchsia-500/50',
              'docs': 'bg-gray-500 text-black border-gray-500 shadow-lg shadow-gray-500/50',
              'drops': 'bg-stone-500 text-black border-stone-500 shadow-lg shadow-stone-500/50',
              'giftcards': 'bg-violet-500 text-black border-violet-500 shadow-lg shadow-violet-500/50',
              'streaming': 'bg-sky-500 text-black border-sky-500 shadow-lg shadow-sky-500/50'
            };
            const colorClass = categoryColors[category.id] || categoryColors['all'];
            const activeClass = activeColorMap[category.id] || activeColorMap['all'];
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.id as Category)}
                className={`font-mono text-xs relative overflow-hidden border transition-all duration-300 ${
                  category.id === 'daily-drops'
                    ? 'fire-category-button'
                    : activeCategory === category.id
                    ? activeClass
                    : colorClass
                }`}
              >
                <Icon className="w-3 h-3 mr-1" />
                <span className="relative z-10">{category.id}</span>
                {category.id === 'daily-drops' && (
                  <div className="fire-flames-category">
                    <div className="flame-core"></div>
                    <div className="flame-outer"></div>
                    <div className="flame-spark-1"></div>
                    <div className="flame-spark-2"></div>
                    <div className="flame-spark-3"></div>
                  </div>
                )}
              </Button>
            );
          })}
        </div>

        {/* Products Grid */}
        {activeCategory === 'fullz' ? (
          <FullzInventory onProductSold={onProductSold} />
        ) : activeCategory === 'proxies' ? (
          <ProxyInventory onProductSold={onProductSold} />
        ) : activeCategory === 'daily-drops' ? (
          <DailyDropsCollection products={filteredProducts} onProductSold={onProductSold} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} onProductSold={onProductSold} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 border border-green-500/20">
            <p className="text-green-700 font-mono">$ echo "No products found"</p>
            <p className="text-green-600 font-mono mt-2">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

