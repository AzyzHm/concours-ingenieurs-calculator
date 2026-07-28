import React, { useMemo, useState } from 'react'
import FormField from '../../shared/components/FormField'
import FormSection from '../../shared/components/FormSection'
import ScoreGauge from '../../shared/components/ScoreGauge'
import ResultBanner from '../../shared/components/ResultBanner'
import { computeM, computeB1, computeB2 } from '../../shared/utils/scoring'
import { isValidGrade, isValidYear } from '../../shared/utils/validators'
import { computeScoreYear2, getBandYear2 } from './year2.scoring'

const initialState = {
  contestYear: 2025,
  l1: '',
  l2: '',
  l3: '',
  m1: '',
  birthYear: '',
  bacAvg: '',
  sessionControle: false,
  redoublant: false,
}

function FieldError({ children }) {
  if (!children) return null
  return <p className="text-xs text-red-600 dark:text-red-400 mt-1">{children}</p>
}

export default function Year2Calculator() {
  const [f, setF] = useState(initialState)
  const [results, setResults] = useState(null)

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setF((prev) => ({ ...prev, [key]: value }))
    setResults(null)
  }

  const errors = useMemo(() => {
    const e = {}
    ;['l1', 'l2', 'l3', 'm1'].forEach((key) => {
      if (f[key] !== '' && !isValidGrade(f[key])) e[key] = 'Doit être compris entre 0 et 20.'
    })
    if (f.birthYear !== '' && !isValidYear(f.birthYear)) e.birthYear = 'Année invalide.'
    if (!f.sessionControle && f.bacAvg !== '' && !isValidGrade(f.bacAvg)) {
      e.bacAvg = 'Doit être compris entre 0 et 20.'
    }
    return e
  }, [f])

  const mgPreview = useMemo(() => {
    const values = [f.l1, f.l2, f.l3, f.m1]
    if (values.some((v) => !isValidGrade(v))) return null
    return (Number(f.l1) + Number(f.l2) + Number(f.l3) + Number(f.m1)) / 4
  }, [f.l1, f.l2, f.l3, f.m1])

  const requiredFilled =
    f.l1 !== '' &&
    f.l2 !== '' &&
    f.l3 !== '' &&
    f.m1 !== '' &&
    f.birthYear !== '' &&
    (f.sessionControle || f.bacAvg !== '')

  const hasErrors = Object.keys(errors).length > 0
  const canCalculate = requiredFilled && !hasErrors

  const handleCalculate = () => {
    if (!canCalculate) return

    const mg = mgPreview
    const M = computeM(mg)
    const B1 = computeB1(f.birthYear, f.contestYear, 24)
    const B2 = computeB2(f.bacAvg, f.sessionControle)
    const C = f.redoublant ? 0.8 : 1
    const score = computeScoreYear2({ M, B1, B2, C })
    const band = score === null ? null : getBandYear2(score)

    setResults({ mg, M, B1, B2, C, score, band })
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
      <div className="space-y-4">
        <FormSection
          title="Moyennes de la licence et du master"
          description="Moyennes des sessions principales, hors stages : L1, L2, L3 et 1ère année de mastère (M1). Le score utilise leur moyenne arithmétique."
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <FormField label="L1" suffix="/ 20" type="number" step="0.01" min="0" max="20" placeholder="ex. 12.5" value={f.l1} onChange={update('l1')} />
              <FieldError>{errors.l1}</FieldError>
            </div>
            <div>
              <FormField label="L2" suffix="/ 20" type="number" step="0.01" min="0" max="20" placeholder="ex. 13.1" value={f.l2} onChange={update('l2')} />
              <FieldError>{errors.l2}</FieldError>
            </div>
            <div>
              <FormField label="L3" suffix="/ 20" type="number" step="0.01" min="0" max="20" placeholder="ex. 12.9" value={f.l3} onChange={update('l3')} />
              <FieldError>{errors.l3}</FieldError>
            </div>
            <div>
              <FormField label="M1 (mastère 1ère année)" suffix="/ 20" type="number" step="0.01" min="0" max="20" placeholder="ex. 14.0" value={f.m1} onChange={update('m1')} />
              <FieldError>{errors.m1}</FieldError>
            </div>
          </div>
          {mgPreview !== null && (
            <p className="text-xs text-ink/45 dark:text-white/40 mt-3">
              Moyenne générale (Mg) calculée : <span className="font-mono font-medium text-ink/70 dark:text-white/70">{mgPreview.toFixed(2)} / 20</span>
            </p>
          )}
        </FormSection>

        <FormSection title="Bonifications">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <FormField
                label="Année de naissance"
                type="number"
                placeholder="ex. 1999"
                value={f.birthYear}
                onChange={update('birthYear')}
                hint="B1 = 5 si année de naissance ≥ année du concours − 24"
              />
              <FieldError>{errors.birthYear}</FieldError>
            </div>
            <FormField
              label="Année du concours"
              type="number"
              value={f.contestYear}
              onChange={update('contestYear')}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div>
              <FormField
                label="Moyenne du bac"
                suffix="/ 20"
                type="number"
                step="0.01"
                min="0"
                max="20"
                placeholder="ex. 14.2"
                value={f.bacAvg}
                onChange={update('bacAvg')}
                disabled={f.sessionControle}
              />
              <FieldError>{errors.bacAvg}</FieldError>
            </div>
          </div>
          <label className="flex items-center gap-2 mt-3 text-sm text-ink/70 dark:text-white/70">
            <input
              type="checkbox"
              checked={f.sessionControle}
              onChange={update('sessionControle')}
              className="h-4 w-4 rounded border-ink/30 text-brand focus:ring-brand"
            />
            Bac obtenu en session de contrôle (B2 = 0)
          </label>
        </FormSection>

        <FormSection
          title="Coefficient de redoublement (C)"
          description="C = 1 pour les non-redoublants, C = 0.8 pour les redoublants (un redoublement au maximum pris en compte)."
        >
          <label className="flex items-center gap-2 text-sm text-ink/70 dark:text-white/70">
            <input
              type="checkbox"
              checked={f.redoublant}
              onChange={update('redoublant')}
              className="h-4 w-4 rounded border-ink/30 text-brand focus:ring-brand"
            />
            Le candidat a redoublé (une fois au maximum)
          </label>
        </FormSection>

        <button
          type="button"
          onClick={handleCalculate}
          disabled={!canCalculate}
          className="w-full rounded-lg bg-brand text-white text-sm font-semibold px-4 py-3 hover:bg-brand-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Calculer
        </button>
        {!canCalculate && (
          <p className="text-xs text-ink/45 dark:text-white/40 text-center">
            Renseignez tous les champs requis correctement pour calculer le score.
          </p>
        )}
      </div>

      <div className="lg:sticky lg:top-24">
        {results ? (
          <div className="rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-wider text-ink/40 dark:text-white/40 mb-1">Résultat</p>
            <ScoreGauge score={results.score} band={results.band} domainMax={140} sizeLabel="Score" />
            <div className="mt-4">
              <ResultBanner band={results.band} />
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-ink/15 dark:border-white/15 p-5 text-center text-sm text-ink/40 dark:text-white/40">
            Cliquez sur « Calculer » pour voir votre score.
          </div>
        )}
      </div>
    </div>
  )
}