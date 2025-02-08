import './globals.css'

import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Navbar from './components/navbar'
import Footer from './components/footer'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Valorant Skins',
  description: 'Valorant Skins Web App created by Kevin Wong',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-base-200 text-white">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
