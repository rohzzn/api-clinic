import { NextResponse } from 'next/server'

let visits = 0

export async function GET() {
  visits++
  return NextResponse.json({ visits })
}

