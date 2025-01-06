'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [visits, setVisits] = useState(0)

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch('/api/visits')
        const data = await res.json()
        setVisits(data.visits)
      } catch (error) {
        console.error('Error fetching visit count:', error)
      }
    }

    fetchVisits()

    // Set up an interval to fetch the visit count every 30 seconds
    const intervalId = setInterval(fetchVisits, 30000)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-4">
        <p className="text-sm text-center text-muted-foreground">
          Diagnosing APIs, one request at a time. Total check-ups: {visits}
        </p>
      </div>
    </footer>
  )
}

