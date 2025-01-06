'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [visits, setVisits] = useState(0)

  useEffect(() => {
    const eventSource = new EventSource('/api/visits')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setVisits(data.visits)
    }

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      eventSource.close()
      
      // Try to reconnect after 5 seconds
      setTimeout(() => {
        const newEventSource = new EventSource('/api/visits')
        newEventSource.onmessage = eventSource.onmessage
        newEventSource.onerror = eventSource.onerror
      }, 5000)
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