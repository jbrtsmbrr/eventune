import Header from '@/components/common/Header'
import React from 'react'
import Footer from './Footer'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  )
}

export default MainLayout