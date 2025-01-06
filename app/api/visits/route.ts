import { NextResponse } from 'next/server'

let visits = 0
const clients = new Map()

export async function GET(request: Request) {
  // Regular API request to get current count
  if (request.headers.get('accept') !== 'text/event-stream') {
    return NextResponse.json({ visits })
  }

  // SSE connection
  const stream = new ReadableStream({
    start(controller) {
      const clientId = Date.now()
      clients.set(clientId, controller)

      // Send initial count
      controller.enqueue(`data: ${JSON.stringify({ visits: ++visits })}\n\n`)

      // Notify other clients about the new visitor
      clients.forEach((client, id) => {
        if (id !== clientId) {
          try {
            client.enqueue(`data: ${JSON.stringify({ visits })}\n\n`)
          } catch (error) {
            clients.delete(id)
          }
        }
      })
    }
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}