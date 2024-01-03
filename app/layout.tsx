/**
 * Layout Component
 * Represents the root layout used for all pages of the web app.
 * Includes global styles, font, and header. Wraps content passed as children.
 */

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Header from './Header'

const inter = Inter({ subsets: ['latin'] })

// Page metadata for SEO purposes
export const metadata: Metadata = {
  title: 'Classify | Froogle Lens',
  description: 'Classify your images. A frugal version of Google Lens.',
}

/**
 * RootLayout Component
 * Wraps the entire app and provides a common layout for all pages.
 *
 * @param {Object} props - Properties object for component.
 * @param {React.ReactNode} props.children - Content of page.
 * @returns {JSX.Element} Rendered root layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navbar header component containing logo and title */}
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
        {/* Remaining content of page */}
        {children}
      </body>
    </html>
  )
}
