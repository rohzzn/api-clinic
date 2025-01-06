import { NextResponse } from 'next/server'
import { RequestData, ResponseData } from '@/types'

export async function POST(req: Request) {
  const requestData: RequestData = await req.json()

  try {
    const response = await fetch(requestData.url, {
      method: requestData.method,
      headers: requestData.headers,
      body: requestData.body,
    })

    const responseData: ResponseData = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: await response.text(),
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error making request:', error)
    return NextResponse.json(
      {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        data: 'Error making request',
      },
      { status: 500 }
    )
  }
}

