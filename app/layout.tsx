import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
// Components
import Header from './Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
              src="/vercel.svg"
              alt="Froogle Lens Logo"
              className="dark:invert"
              width={100}
              height={24}
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
