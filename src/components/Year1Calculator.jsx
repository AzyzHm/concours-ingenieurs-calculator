import React, { useMemo, useState } from 'react'
import FormField from './FormField'
import FormSection from './FormSection'
import ScoreGauge from './ScoreGauge'
import ResultBanner from './ResultBanner'
import {
  computeM,
  computeRi,
  computeR,
  computeB1,
  computeB2,
  computeML,
  computeScoreA,
  computeGlobalYear1,
  getBandYear1,
} from '../utils/scoring'
import { Info } from 'lucide-react'

const initialState = {
  contestYear: 2025,
  mg: '',
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

export default function Year1Calculator() {
  const [f, setF] = useState(initialState)

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setF((prev) => ({ ...prev, [key]: value }))
  }

  const results = useMemo(() => {
    const M = computeM(f.mg)
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
    return { M, R, B1, B2, ML, scoreA, bandA, scoreGlobal, bandGlobal }
  }, [f])

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
      <div className="space-y-4">
        <FormSection
          title="Moyenne & classement en licence"
          description="Prenez en compte uniquement les deux premières années de la licence (système LMD)."
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              label="Moyenne générale (Mg)"
              suffix="/ 20"
              type="number"
              step="0.01"
              min="0"
              max="20"
              placeholder="ex. 13.45"
              value={f.mg}
              onChange={update('mg')}
            />
            <FormField
              label="Année du concours"
              type="number"
              value={f.contestYear}
              onChange={update('contestYear')}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg bg-ink/[0.03] dark:bg-white/[0.04] p-3">
              <p className="text-xs font-semibold text-ink/60 dark:text-white/55 mb-2">1ère année de licence</p>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Rang" type="number" min="1" placeholder="ex. 5" value={f.rang1} onChange={update('rang1')} />
                <FormField label="Effectif" type="number" min="1" placeholder="ex. 120" value={f.effectif1} onChange={update('effectif1')} />
              </div>
            </div>
            <div className="rounded-lg bg-ink/[0.03] dark:bg-white/[0.04] p-3">
              <p className="text-xs font-semibold text-ink/60 dark:text-white/55 mb-2">2ème année de licence</p>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Rang" type="number" min="1" placeholder="ex. 8" value={f.rang2} onChange={update('rang2')} />
                <FormField label="Effectif" type="number" min="1" placeholder="ex. 118" value={f.effectif2} onChange={update('effectif2')} />
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
            <FormField
              label="Année de naissance"
              type="number"
              placeholder="ex. 2001"
              value={f.birthYear}
              onChange={update('birthYear')}
              hint="B1 = 5 si année de naissance ≥ année du concours − 22"
            />
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
            <FormField label="Français — 1ère année" suffix="/ 20" type="number" step="0.01" min="0" max="20" value={f.fr1} onChange={update('fr1')} />
            <FormField label="Français — 2ème année" suffix="/ 20" type="number" step="0.01" min="0" max="20" value={f.fr2} onChange={update('fr2')} />
            <FormField label="Anglais (ou autre) — 1ère année" suffix="/ 20" type="number" step="0.01" min="0" max="20" value={f.en1} onChange={update('en1')} />
            <FormField label="Anglais (ou autre) — 2ème année" suffix="/ 20" type="number" step="0.01" min="0" max="20" value={f.en2} onChange={update('en2')} />
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
        </FormSection>
      </div>

      <div className="lg:sticky lg:top-24 space-y-4">
        <div className="rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-wider text-ink/40 dark:text-white/40 mb-1">Résultat</p>
          <ScoreGauge score={results.scoreA} band={results.bandA} domainMax={100} sizeLabel="Score A / 100" />
          <div className="mt-4">
            <ResultBanner band={results.bandA} />
          </div>
        </div>

        {f.scoreE !== '' && (
          <div className="rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-wider text-ink/40 dark:text-white/40 mb-1">Score Global</p>
            <ScoreGauge score={results.scoreGlobal} band={results.bandGlobal} domainMax={100} sizeLabel="Score Global / 100" />
            <div className="mt-4">
              <ResultBanner band={results.bandGlobal} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
