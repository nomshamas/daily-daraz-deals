import { useEffect, useState } from 'react'
import DealCard from '../components/DealCard'

const IndexPage = () => {
  const [deals, setDeals] = useState([])
  const [filteredDeals, setFilteredDeals] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    const baseUrl = import.meta.env.BASE_URL || ''

    fetch(`${baseUrl}deals/${today}.json`)
      .then(res => {
        if (!res.ok) throw new Error('JSON not found')
        return res.json()
      })
      .then(data => {
        console.log('Deals fetched:', data)
        setDeals(data)
        setFilteredDeals(data)
        const uniqueCats = ['All', ...new Set(data.map(d => d.category))]
        setCategories(uniqueCats)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load deals:', err)
        setDeals([])
        setFilteredDeals([])
        setCategories(['All'])
        setLoading(false)
      })
  }, [])


  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat)
    if (cat === 'All') {
      setFilteredDeals(deals)
    } else {
      setFilteredDeals(deals.filter(d => d.category === cat))
    }
  }

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🔥 Today’s Daraz Deals</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full border text-sm ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredDeals.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal, index) => (
            <DealCard key={index} deal={deal} />
          ))}
        </div>
      ) : (
        <p className="text-center">No deals found.</p>
      )}
    </main>
  )
}

export default IndexPage
