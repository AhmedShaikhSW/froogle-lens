/**
 * Header Component
 * Represents header section of  web app.
 * Displays  logo and title at top of page.
 */

import React from 'react'
import Link from '@mui/joy/Link'

/**
 * Header Component
 *
 * @param {Object} props - Properties object for component.
 * @param {React.ReactNode} props.logo - Logo element to display in header.
 * @param {string} props.title - Title of web app.
 * @returns {JSX.Element} Rendered header component.
 */
export default function Header({
  logo,
  title,
}: {
  logo: React.ReactNode
  title: string
}) {
  return (
    // Flex layout and styling
    <header className="flex items-center justify-center p-4 mt-4">
      {/* Container for header content */}
      <div className="flex items-center fixed w-screen justify-center space-x-2 p-2 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/10 z-50">
        <div>{logo}</div>
        <Link
          level="h4"
          fontFamily={'inherit'}
          fontWeight={900}
          textTransform={'uppercase'}
          underline="none"
          href="#"
          sx={{
            color: 'white',
          }}
        >
          {title}
        </Link>
      </div>
    </header>
  )
}
