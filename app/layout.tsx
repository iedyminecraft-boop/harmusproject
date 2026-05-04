import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Harmus Rent a Car | Închirieri Auto Premium',
  description: 'Servicii premium de închiriere auto în România. Mașini de calitate, prețuri competitive, disponibil 24/7. Contactează-ne acum!',
  keywords: 'închirieri auto, rent a car, mașini de închiriat, România, Harmus',
  authors: [{ name: 'Harmus Rent a Car' }],
  generator: 'v0.app',
  openGraph: {
    title: 'Harmus Rent a Car | Închirieri Auto Premium',
    description: 'Servicii premium de închiriere auto în România. Mașini de calitate, prețuri competitive.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
