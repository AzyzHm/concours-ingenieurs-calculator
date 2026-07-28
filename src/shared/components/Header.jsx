import React from 'react'
import { Sun, Moon, GraduationCap } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-ink/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0 h-10 w-10 rounded-lg bg-brand text-white flex items-center justify-center">
            <GraduationCap size={20} strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-lg sm:text-xl font-semibold text-ink dark:text-white leading-tight truncate">
              Sélection Ingénieurs : Session 2026
            </h1>
            <p className="text-xs text-ink/50 dark:text-white/50 truncate">
              Concours spécifiques d'entrée en établissements de formation d'ingénieurs
            </p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
          className="shrink-0 h-10 w-10 rounded-lg border border-ink/15 dark:border-white/15 flex items-center justify-center text-ink/70 dark:text-white/70 hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
