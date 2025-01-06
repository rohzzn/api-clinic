import { NextResponse } from 'next/server'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

let visits = 0
const clients = new Set<ReadableStreamDefaultController>()

function sendVisitsToAll() {
  for (const client of clients) {
    try {
      client.enqueue(`data: ${JSON.stringify({ visits })}\n\n`)
    } catch (error) {
      clients.delete(client)
    }
  }
}

interface StreamController {
  controller?: ReadableStreamDefaultController
}

export async function GET() {
  const streamController: StreamController = {}
  
  const stream = new ReadableStream({
    start(controller) {
      clients.add(controller)
      
      // Send initial visits count
      controller.enqueue(`data: ${JSON.stringify({ visits: visits })}\n\n`)
      
      // Store the controller reference for cleanup
      streamController.controller = controller
    },
    cancel() {
      // Use the stored controller reference
      if (streamController.controller) {
        clients.delete(streamController.controller)
      }
    }
  })

  // Increment visits when a new client connects
  visits++
  
  // Notify all other clients about the new count
  sendVisitsToAll()

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive'
    }
  })
}