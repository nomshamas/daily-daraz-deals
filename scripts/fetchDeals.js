import fs from 'fs'
import path from 'path'

// Generate today's date filename
const today = new Date().toISOString().slice(0, 10)
const filePath = path.join('public', 'deals', `${today}.json`)

// Dummy deal generator
const deals = [
  {
    title: 'Mi Wireless Earbuds',
    image: 'https://example.com/earbuds.jpg',
    price: 2199,
    originalPrice: 3499,
    category: 'Audio',
    link: 'https://www.daraz.pk/products/earbuds-example'
  },
  {
    title: 'Samsung 64GB MicroSD Card',
    image: 'https://example.com/sdcard.jpg',
    price: 1199,
    originalPrice: 1899,
    category: 'Storage',
    link: 'https://www.daraz.pk/products/sdcard-example'
  }
]

// Write JSON file
fs.writeFileSync(filePath, JSON.stringify(deals, null, 2))
console.log(`✅ Created daily deals at ${filePath}`)
