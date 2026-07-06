import React from 'react'
import { BAND_STYLES } from '../utils/scoring'

export default function ResultBanner({ band }) {
  if (!band) {
    return (
      <div className="rounded-lg border border-dashed border-ink/15 dark:border-white/15 px-4 py-3 text-sm text-ink/40 dark:text-white/40">
        Renseignez les champs pour voir l'évaluation du dossier.
      </div>
    )
  }
  const styles = BAND_STYLES[band.key]
  return (
    <div className={`rounded-lg border px-4 py-3 flex items-start gap-3 ${styles.bg} ${styles.border}`}>
      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${styles.dot}`} />
      <div>
        <p className={`text-sm font-semibold ${styles.text}`}>{band.label}</p>
        <p className={`text-sm ${styles.text} opacity-90`}>{band.message}</p>
      </div>
    </div>
  )
}
