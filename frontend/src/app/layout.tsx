import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "U'mwiza Rwanda - Supporting Families, Transforming Lives",
  description: 'A humanitarian organization supporting poor families, connecting sponsors, and providing scholarships to bright but disadvantaged children in Rwanda.',
  keywords: ['Rwanda', 'humanitarian', 'sponsorship', 'education', 'charity'],
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
