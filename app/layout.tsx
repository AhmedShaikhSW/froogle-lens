/**
 * Layout Component
 * This component represents the root layout used for all pages of the web app.
 * It includes the global styles, font, and header, and wraps the content passed as children.
 */

// Importing required modules and components
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Header from './Header'

// Font configuration - Inter font with the 'latin' subset
const inter = Inter({ subsets: ['latin'] })

// Metadata for the page for SEO purposes
export const metadata: Metadata = {
  title: 'Classify | Froogle Lens',
  description: 'Classify your images. A frugal version of Google Lens.',
}

/**
 * RootLayout Component
 * This component wraps the entire app and provides a common layout for all pages.
 *
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The content of the page.
 * @returns {JSX.Element} The rendered root layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Setting language for the entire HTML document
    <html lang="en">
      {/* Setting the font for the entire body */}
      <body className={inter.className}>
        {/* Navbar header component that contains the logo and title */}
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
        {/* Remaining content of the page */}
        {children}
      </body>
    </html>
  )
}
