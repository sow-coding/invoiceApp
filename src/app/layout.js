"use client"
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import { leagueSpartan } from '@/fonts/font'

/*export const metadata = {
  title: 'Invoice app',
  description: 'Nothing',
}*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.variable}`}>
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  )
}
