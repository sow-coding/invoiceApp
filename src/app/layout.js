import '../styles/globals.css'
import { leagueSpartan } from '@/fonts/font'



export const metadata = {
  title: 'Invoice app',
  description: 'Nothing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.variable}`}>
        {children}
      </body>
    </html>
  )
}
