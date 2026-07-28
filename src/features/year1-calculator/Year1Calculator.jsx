import React, { useMemo, useState } from 'react'
import FormField from '../../shared/components/FormField'
import FormSection from '../../shared/components/FormSection'
import ScoreGauge from '../../shared/components/ScoreGauge'
import ResultBanner from '../../shared/components/ResultBanner'
import { computeM, computeB1, computeB2 } from '../../shared/utils/scoring'
import { isValidGrade, isValidPositiveInt, isValidYear } from '../../shared/utils/validators'
import {
  computeRi,
  computeR,
  computeMg,
  computeML,
  computeScoreA,
  computeGlobalYear1,
  getBandYear1,
} from './year1.scoring'
import { Info } from 'lucide-react'

const initialState = {
  contestYear: 2025,
  l1: '',
  l2: '',
  rang1: '',
  effectif1: '',
  rang2: '',
  effectif2: '',
  birthYear: '',
  bacAvg: '',
  sessionControle: false,
  fr1: '',
  fr2: '',
  en1: '',
  en2: '',
  scoreE: '',
}

function FieldError({ children }) {
  if (!children) return null
  return <p className="text-xs text-red-600 dark:text-red-400 mt-1">{children}</p>
}

export default function Year1Calculator() {
  const [f, setF] = useState(initialState)
  const [results, setResults] = useState(null)

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setF((prev) => ({ ...prev, [key]: value }))
    setResults(null) 
  }
  
  const errors = useMemo(() => {
    const e = {}

    if (f.l1 !== '' && !isValidGrade(f.l1)) e.l1 = 'Doit être compris entre 0 et 20.'
    if (f.l2 !== '' && !isValidGrade(f.l2)) e.l2 = 'Doit être compris entre 0 et 20.'

    if (f.rang1 !== '' && !isValidPositiveInt(f.rang1)) e.rang1 = 'Doit être un entier positif.'
    if (f.effectif1 !== '' && !isValidPositiveInt(f.effectif1)) e.effectif1 = 'Doit être un entier positif.'
    if (
      isValidPositiveInt(f.rang1) &&
      isValidPositiveInt(f.effectif1) &&
      Number(f.rang1) > Number(f.effectif1)
    ) {
      e.rang1 = 'Le rang ne peut pas dépasser l\'effectif.'
    }

    if (f.rang2 !== '' && !isValidPositiveInt(f.rang2)) e.rang2 = 'Doit être un entier positif.'
    if (f.effectif2 !== '' && !isValidPositiveInt(f.effectif2)) e.effectif2 = 'Doit être un entier positif.'
    if (
      isValidPositiveInt(f.rang2) &&
      isValidPositiveInt(f.effectif2) &&
      Number(f.rang2) > Number(f.effectif2)
    ) {
      e.rang2 = 'Le rang ne peut pas dépasser l\'effectif.'
    }

    if (f.birthYear !== '' && !isValidYear(f.birthYear)) e.birthYear = 'Année invalide.'
    if (!f.sessionControle && f.bacAvg !== '' && !isValidGrade(f.bacAvg)) {
      e.bacAvg = 'Doit être compris entre 0 et 20.'
    }

    ;['fr1', 'fr2', 'en1', 'en2'].forEach((key) => {
      if (f[key] !== '' && !isValidGrade(f[key])) e[key] = 'Doit être compris entre 0 et 20.'
    })

    if (f.scoreE !== '' && !isValidGrade(f.scoreE, { min: 0, max: 100 })) {
      e.scoreE = 'Doit être compris entre 0 et 100.'
    }

    return e
  }, [f])

  const mgPreview = useMemo(() => computeMg(f.l1, f.l2), [f.l1, f.l2])

  const requiredFilled =
    f.l1 !== '' &&
    f.l2 !== '' &&
    f.rang1 !== '' &&
    f.effectif1 !== '' &&
    f.rang2 !== '' &&
    f.effectif2 !== '' &&
    f.birthYear !== '' &&
    (f.sessionControle || f.bacAvg !== '') &&
    f.fr1 !== '' &&
    f.fr2 !== '' &&
    f.en1 !== '' &&
    f.en2 !== ''

  const hasErrors = Object.keys(errors).length > 0
  const canCalculate = requiredFilled && !hasErrors

  const handleCalculate = () => {
    if (!canCalculate) return

    const mg = computeMg(f.l1, f.l2)
    const M = computeM(mg)
    const Ri1 = computeRi(f.rang1, f.effectif1)
    const Ri2 = computeRi(f.rang2, f.effectif2)
    const R = computeR(Ri1, Ri2)
    const B1 = computeB1(f.birthYear, f.contestYear, 22)
    const B2 = computeB2(f.bacAvg, f.sessionControle)
    const ML = computeML(f.fr1, f.fr2, f.en1, f.en2)
    const scoreA = computeScoreA({ M, R, ML, B1, B2 })
    const bandA = scoreA === null ? null : getBandYear1(scoreA)
    const scoreGlobal = scoreA === null ? null : computeGlobalYear1(scoreA, f.scoreE)
    const bandGlobal = scoreGlobal === null ? null : getBandYear1(scoreGlobal)

    setResults({ mg, M, R, B1, B2, ML, scoreA, bandA, scoreGlobal, bandGlobal })
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
      <div className="space-y-4">
        <FormSection
  title="Moyenne & classement en licence"
  description="Prenez en compte uniquement les deux premières années de la licence (système LMD)."
>
      <FormField
        label="Année du concours"
        type="number"
        value={f.contestYear}
        onChange={update('contestYear')}
      />

      <div className="mt-4">
        <p className="text-xs font-semibold text-ink/60 dark:text-white/55 mb-2">Moyenne générale (Mg)</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormField
              label="L1 (1ère année)"
              suffix="/ 20"
              type="number"
              step="0.01"
              min="0"
              max="20"
              placeholder="ex. 13.20"
              value={f.l1}
              onChange={update('l1')}
            />
            <FieldError>{errors.l1}</FieldError>
          </div>
          <div>
            <FormField
              label="L2 (2ème année)"
              suffix="/ 20"
              type="number"
              step="0.01"
              min="0"
              max="20"
              placeholder="ex. 13.90"
              value={f.l2}
              onChange={update('l2')}
            />
            <FieldError>{errors.l2}</FieldError>
          </div>
        </div>
        {mgPreview !== null && (
          <p className="text-xs text-ink/45 dark:text-white/40 mt-3">
            Moyenne générale (Mg) calculée :{' '}
            <span className="font-mono font-medium text-ink/70 dark:text-white/70">
              {mgPreview.toFixed(2)} / 20
            </span>
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div className="rounded-lg bg-ink/[0.03] dark:bg-white/[0.04] p-3">
          <p className="text-xs font-semibold text-ink/60 dark:text-white/55 mb-2">
            Classement — 1ère année de licence
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FormField label="Rang" type="number" min="1" placeholder="ex. 5" value={f.rang1} onChange={update('rang1')} />
              <FieldError>{errors.rang1}</FieldError>
            </div>
            <div>
              <FormField label="Effectif" type="number" min="1" placeholder="ex. 120" value={f.effectif1} onChange={update('effectif1')} />
              <FieldError>{errors.effectif1}</FieldError>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-ink/[0.03] dark:bg-white/[0.04] p-3">
          <p className="text-xs font-semibold text-ink/60 dark:text-white/55 mb-2">
            Classement — 2ème année de licence
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FormField label="Rang" type="number" min="1" placeholder="ex. 8" value={f.rang2} onChange={update('rang2')} />
              <FieldError>{errors.rang2}</FieldError>
            </div>
            <div>
              <FormField label="Effectif" type="number" min="1" placeholder="ex. 118" value={f.effectif2} onChange={update('effectif2')} />
              <FieldError>{errors.effectif2}</FieldError>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-start mt-4 text-xs text-ink/50 dark:text-white/45 bg-ink/[0.03] dark:bg-white/[0.04] rounded-lg p-3">
        <Info size={14} className="shrink-0 mt-0.5" />
        <p>
          Étudiants provenant d'un institut préparatoire aux études d'ingénieurs disposant d'une seule
          moyenne de 2ème année : vous pouvez la saisir également comme moyenne de 1ère année, conformément
          à la note officielle.
        </p>
      </div>
    </FormSection>

        <FormSection title="Bonifications">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <FormField
                label="Année de naissance"
                type="number"
                placeholder="ex. 2001"
                value={f.birthYear}
                onChange={update('birthYear')}
                hint="B1 = 5 si année de naissance ≥ année du concours − 22"
              />
              <FieldError>{errors.birthYear}</FieldError>
            </div>
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
          title="Moyennes des langues (ML)"
          description="Français et Anglais, ou autre matière équivalente (techniques de communication, droits de l'homme...)."
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormField label="Français — 1ère année" suffix="/ 20" type="number" step="0.01" min="0" max="20" value={f.fr1} onChange={update('fr1')} />
              <FieldError>{errors.fr1}</FieldError>
            </div>
            <div>
              <FormField label="Français — 2ème année" suffix="/ 20" type="number" step="0.01" min="0" max="20" value={f.fr2} onChange={update('fr2')} />
              <FieldError>{errors.fr2}</FieldError>
            </div>
            <div>
              <FormField label="Anglais (ou autre) — 1ère année" suffix="/ 20" type="number" step="0.01" min="0" max="20" value={f.en1} onChange={update('en1')} />
              <FieldError>{errors.en1}</FieldError>
            </div>
            <div>
              <FormField label="Anglais (ou autre) — 2ème année" suffix="/ 20" type="number" step="0.01" min="0" max="20" value={f.en2} onChange={update('en2')} />
              <FieldError>{errors.en2}</FieldError>
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Score E (optionnel)"
          description="Score spécifique à chaque filière et établissement, noté sur 100. Il est publié sur csingenieur.inscription.tn avant la date limite de dépôt des dossiers. Renseignez-le ici uniquement si vous le connaissez déjà, pour obtenir le Score Global."
        >
          <FormField
            label="Score E"
            suffix="/ 100"
            type="number"
            step="0.01"
            min="0"
            max="100"
            placeholder="ex. 72"
            value={f.scoreE}
            onChange={update('scoreE')}
          />
          <FieldError>{errors.scoreE}</FieldError>
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

      <div className="lg:sticky lg:top-24 space-y-4">
        {results ? (
          <>
            <div className="rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-wider text-ink/40 dark:text-white/40 mb-1">Résultat</p>
              <ScoreGauge score={results.scoreA} band={results.bandA} domainMax={100} sizeLabel="Score A / 100" />
              <div className="mt-4">
                <ResultBanner band={results.bandA} />
              </div>
            </div>

            {f.scoreE !== '' && results.scoreGlobal !== null && (
              <div className="rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-wider text-ink/40 dark:text-white/40 mb-1">Score Global</p>
                <ScoreGauge score={results.scoreGlobal} band={results.bandGlobal} domainMax={100} sizeLabel="Score Global / 100" />
                <div className="mt-4">
                  <ResultBanner band={results.bandGlobal} />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-ink/15 dark:border-white/15 p-5 text-center text-sm text-ink/40 dark:text-white/40">
            Cliquez sur « Calculer » pour voir votre score.
          </div>
        )}
      </div>
    </div>
  )
}