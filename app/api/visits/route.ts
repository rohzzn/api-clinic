import { NextResponse } from 'next/server'

// Force edge runtime
export const runtime = 'edge'
export const dynamic = 'force-dynamic'

// These are maintained in Edge runtime's memory
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

export async function GET() {
  let streamController: ReadableStreamDefaultController | null = null;

  const stream = new ReadableStream({
    start: async (controller) => {
      streamController = controller;
      clients.add(controller)
      controller.enqueue(`data: ${JSON.stringify({ visits })}\n\n`)

      // Increment after adding client
      visits++
      sendVisitsToAll()
    },
    cancel: () => {
      if (streamController) {
        clients.delete(streamController)
      }
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  })
}