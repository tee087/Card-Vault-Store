const fs = require('fs');
const path = 'src/data/products.ts';
let content = fs.readFileSync(path, 'utf8');

const binPattern = /(\{\s*id: 'bin-\d+',[\s\S]*?stockOptions: \[[\s\S]*?\]\s*\},)/g;

let match;
const results = [];

while ((match = binPattern.exec(content)) !== null) {
  const fullProduct = match[1];
  const binId = fullProduct.match(/id: 'bin-(\d+)'/)[1];
  const priceMatch = fullProduct.match(/price: (\d+)(?=,)/);
  const stockMatch = fullProduct.match(/stock: (\d+)/);
  
  if (priceMatch) {
    const price = parseInt(priceMatch[1]);
    const stock = stockMatch ? parseInt(stockMatch[1]) : 30;
    
    const stock1 = Math.round(stock * 0.5);
    const stock2 = Math.round(stock * 0.4);
    const stock3 = Math.round(stock * 0.1) || 1;
    
    const price2 = Math.floor(price * 2);
    const price3 = Math.floor(price * 3);
    
    const multiplier1 = 350 + Math.floor(Math.random() * 200);
    const multiplier2 = 750 + Math.floor(Math.random() * 300);
    const multiplier3 = 1150 + Math.floor(Math.random() * 400);
    
    const newStockOptions = `  stockOptions: [
      { price: ${price}, balance: ${price * multiplier1}, stock: ${stock1}, quality: 'Standard' },
      { price: ${price2}, balance: ${price2 * multiplier2}, stock: ${stock2}, quality: 'Premium' },
      { price: ${price3}, balance: ${price3 * multiplier3}, stock: ${stock3}, quality: 'Elite' }
    ]`;
    
    const newProduct = fullProduct.replace(
      /stockOptions: \[[\s\S]*?\]/,
      newStockOptions
    );
    
    results.push({ old: match[1], new: newProduct, binId });
  }
}

console.log('Found', results.length, 'BIN cards to fix');

for (let i = results.length - 1; i >= 0; i--) {
  content = content.replace(results[i].old, results[i].new);
}

fs.writeFileSync(path, content);
console.log('Done!');