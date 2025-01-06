import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'API Clinic',
  description: 'A powerful API testing tool',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'API Clinic',
    description: 'A powerful and user-friendly API testing tool designed to simplify the process of testing and debugging APIs.',
    url: 'https://api-clinic-nu.vercel.app',
    siteName: 'API Clinic',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 627,
        alt: 'API Clinic - API testing made easy'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Clinic',
    description: 'A powerful and user-friendly API testing tool designed to simplify the process of testing and debugging APIs.',
    images: ['/og-image.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}