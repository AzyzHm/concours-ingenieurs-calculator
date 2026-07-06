import React from 'react'
import { FileText, Download, FileWarning } from 'lucide-react'

const DOCUMENTS = [
  {
    title: 'Critères de sélection Session 2025',
    description:
      "Document officiel de la Direction Générale des Etudes Technologiques détaillant les formules de calcul des scores pour l'entrée en 1ère et 2ème année.",
    file: 'PREAVIS_2025.pdf',
    available: true,
  },
  {
    title: "Annexe à la demande de candidature au concours spécifique d'accès en première année des établissements de formation d'ingénieurs - Session 2025",
    description: "Formulaire officiel à remplir et à soumettre pour la candidature au concours spécifique d'accès en première année des établissements de formation d'ingénieurs.",
    file: 'ANNEXE.pdf',
    available: true,
  },
  {
    title: "Communique Concours Specifiques Ingenieurs 2025/2026",
    description: 'Communiqué officiel de la Direction Générale des Etudes Technologiques concernant les concours spécifiques d\'accès en première année des établissements de formation d\'ingénieurs pour la session 2025/2026.',
    file: 'CS_2025.pdf',
    available: true,
  },
  {
    title: 'Résultats du concours 2025',
    description: 'Liste des candidats admis et leurs scores au concours spécifique 2025.',
    file: 'Resultat_CS2025.pdf',
    available: true,
  },
]

export default function Documents() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-white/[0.03] divide-y divide-ink/10 dark:divide-white/10 overflow-hidden">
        {DOCUMENTS.map((doc) => (
          <div key={doc.file} className="p-4 sm:p-5 flex items-start gap-4">
            <div className="shrink-0 h-10 w-10 rounded-lg bg-brand/10 dark:bg-red-400/10 text-brand dark:text-red-400 flex items-center justify-center">
              {doc.available ? <FileText size={18} /> : <FileWarning size={18} />}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-sm sm:text-base font-semibold text-ink dark:text-white">
                {doc.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink/55 dark:text-white/50 mt-0.5">{doc.description}</p>
              {!doc.available && (
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1.5">
                  Fichier à déposer dans <code className="font-mono">public/docs/{doc.file}</code>
                </p>
              )}
            </div>
            {doc.available ? (
              <a
                href={`${import.meta.env.BASE_URL}docs/${doc.file}`}
                download={doc.file}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-brand text-white text-sm font-medium px-3 py-2 hover:bg-brand-dark transition-colors"
              >
                <Download size={15} />
                <span className="hidden sm:inline">Télécharger</span>
              </a>
            ) : (
              <span className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-ink/5 dark:bg-white/10 text-ink/35 dark:text-white/35 text-sm font-medium px-3 py-2 cursor-not-allowed">
                <Download size={15} />
                <span className="hidden sm:inline">Indisponible</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}