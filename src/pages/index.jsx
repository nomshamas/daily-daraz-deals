import { useEffect, useState } from 'react'
import DealCard from '../components/DealCard'

const IndexPage = () => {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    fetch(`/deals/${today}.json`)
      .then((res) => res.json())
      .then((data) => {
        setDeals(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load deals:', err)
        setLoading(false)
      })
  }, [])

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🔥 Today’s Daraz Deals</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : deals.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <DealCard key={index} deal={deal} />
          ))}
        </div>
      ) : (
        <p className="text-center">No deals found for today.</p>
      )}
    </main>
  )
}

export default IndexPage
