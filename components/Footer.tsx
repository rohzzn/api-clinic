'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [visits, setVisits] = useState(0)

  useEffect(() => {
    // First get the initial count
    fetch('/api/visits')
      .then(res => res.json())
      .then(data => setVisits(data.visits))
    
    // Then setup SSE for live updates
    const eventSource = new EventSource('/api/visits')
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setVisits(data.visits)
    }

    return () => {
      eventSource.close()
    }
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