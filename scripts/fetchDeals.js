import axios from 'axios'
import fs from 'fs'
import path from 'path'

const today = new Date().toISOString().slice(0, 10)
const filePath = path.join('public', 'deals', `${today}.json`)

async function fetchDummyDeals() {
  try {
    const { data } = await axios.get(
      'https://dummyjson.com/products?limit=10&select=title,price,category,thumbnail,discountPercentage'
    )

    const deals = data.products.map((product) => ({
      title: product.title,
      price: product.price,
      originalPrice: Math.round(product.price * (1 + product.discountPercentage / 100)),
      image: product.thumbnail,
      category: product.category,
      link: `https://dummyjson.com/product/${product.id}`
    }))

    if (!fs.existsSync('public/deals')) fs.mkdirSync('public/deals', { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(deals, null, 2))
    console.log(`✅ Dummy deals saved: ${filePath}`)
  } catch (err) {
    console.error('❌ Failed to fetch dummy deals:', err.message)
  }
}

fetchDummyDeals()
