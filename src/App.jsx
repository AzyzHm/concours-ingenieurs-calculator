import React, { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Year1Calculator from './components/Year1Calculator'
import Year2Calculator from './components/Year2Calculator'
import Documents from './components/Documents'

function SectionTitle({ children }) {
  return (
    <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink dark:text-white mb-5">
      {children}
    </h2>
  )
}

export default function App() {
  const [tab, setTab] = useState('year1')

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-paper dark:bg-ink transition-colors">
        <Header />
        <Navigation active={tab} onChange={setTab} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {tab === 'year1' && (
            <>
              <SectionTitle>Concours d'entrée en 1ère année</SectionTitle>
              <Year1Calculator />
            </>
          )}
          {tab === 'year2' && (
            <>
              <SectionTitle>Concours d'entrée en 2ème année</SectionTitle>
              <Year2Calculator />
            </>
          )}
          {tab === 'docs' && (
            <>
              <SectionTitle>Documents utiles</SectionTitle>
              <Documents />
            </>
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}
