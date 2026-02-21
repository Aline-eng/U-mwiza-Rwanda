import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "U'mwiza Rwanda — Supporting Families, Transforming Lives",
  description: 'A humanitarian organization supporting poor families, connecting sponsors, and providing scholarships to bright but disadvantaged children in Rwanda.',
  keywords: ['Rwanda', 'humanitarian', 'sponsorship', 'education', 'charity', 'Africa'],
  themeColor: '#020617',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
