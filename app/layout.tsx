import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
// Components
import Header from './Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Classify | Froogle Lens',
  description: 'Classify your images. A frugal version of Google Lens.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header 
          logo={
            <Image
              src="/froogle-logo.svg"
              alt="Froogle Lens Logo"
              className="dark:invert"
              width={25}
              height={25}
              priority
            />
          }
          title="Froogle Lens"
        />
        {children}
      </body>
    </html>
  )
}
