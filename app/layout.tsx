import type { Metadata } from 'next'
import { Inter, Roboto, Poppins, Lato, Playfair_Display, Nunito_Sans, DM_Serif_Display, Cormorant_Garamond, Inria_Serif } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['vietnamese'], weight: '400' })
const poppins = Poppins({ weight: '400', subsets: ["latin"] })
const lato = Lato({ weight: '400', subsets: ["latin"] })
const playfairDisplay = Playfair_Display({ subsets: ["latin"] })
const nunitoSans = Nunito_Sans({ subsets: ["cyrillic"] })
const dmSerifDisplay = DM_Serif_Display({ weight: "400", subsets: ['latin'] })
const cormorantGaramond = Cormorant_Garamond({ weight: '400', subsets: ['latin', 'vietnamese', 'cyrillic', 'cyrillic-ext'] })
const inriaSerif = Inria_Serif({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eventune',
  description: 'Experience any gigs you want',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-[#121212]`}>{children}</body>
        {/* <body className={`${roboto.className}`}>{children}</body> */}
        {/* <body className={`${poppins.className} bg-black`}>{children}</body> */}
        {/* <body className={`${lato.className} bg-black`}>{children}</body> */}
        {/* <body className={`${playfairDisplay.className}`}>{children}</body> */}
        {/* <body className={`${nunitoSans.className} bg-black`}>{children}</body> */}
        {/* <body className={`${dmSerifDisplay.className} bg-black`}>{children}</body> */}
        {/* <body className={`${cormorantGaramond.className} bg-black`}>{children}</body> */}
        {/* <body className={`${inriaSerif.className} bg-black tracking-wider`}>{children}</body> */}
      </html>
    </ClerkProvider>

  )
}
