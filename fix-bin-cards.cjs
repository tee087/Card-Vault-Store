const fs = require('fs');
const path = 'src/data/products.ts';
let content = fs.readFileSync(path, 'utf8');

// Match each BIN card product entirely
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
    
    // Correct formula: balance = price * multiplier
    // Standard: price * (550 + random(0-200))
    // Premium: price * 2 * (950 + random(0-200)) = price * (1900 + random(0-200))
    // Elite: price * 3 * (1350 + random(0-200)) = price * (4050 + random(0-200))
    // But we want increasing balance, so use:
    // Standard: price * multiplier1
    // Premium: price * 2 * multiplier2 (higher than standard)
    // Elite: price * 3 * multiplier3 (highest)
    
    const multiplier1 = 550 + Math.floor(Math.random() * 200);
    const multiplier2 = 950 + Math.floor(Math.random() * 200);
    const multiplier3 = 1350 + Math.floor(Math.random() * 200);
    
    const price2 = Math.floor(price * 2);
    const price3 = Math.floor(price * 3);
    
    const newStockOptions = `  stockOptions: [
      { price: ${price}, balance: ${price * multiplier1}, stock: ${Math.round(stock * 0.5)}, quality: 'Standard' },
      { price: ${price2}, balance: ${price2 * multiplier2}, stock: ${Math.round(stock * 0.4)}, quality: 'Premium' },
      { price: ${price3}, balance: ${price3 * multiplier3}, stock: ${Math.round(stock * 0.1) || 1}, quality: 'Elite' }
    ]`;
    
    // Replace only the stockOptions part within the product
    const newProduct = fullProduct.replace(
      /stockOptions: \[[\s\S]*?\]/,
      newStockOptions
    );
    
    results.push({ old: match[1], new: newProduct, binId });
  }
}

console.log('Found', results.length, 'BIN cards to fix');

// Replace from the end to maintain offsets
for (let i = results.length - 1; i >= 0; i--) {
  content = content.replace(results[i].old, results[i].new);
}

fs.writeFileSync(path, content);
console.log('Done!');