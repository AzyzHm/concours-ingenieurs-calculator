# Sélection Ingénieurs 2026 — Calculateur de scores

## Vue d'ensemble

Cette application React (Vite + Tailwind) permet de calculer les scores de sélection pour les concours spécifiques d'entrée en établissements de formation d'ingénieurs, en 1ère et 2ème année. Elle est pensée pour refléter les critères officiels de la Direction Générale des Études Technologiques (MESRS) et peut être mise à jour d'une année à l'autre selon les règles, documents et maquettes publiés.

## Comment l'exécuter

Prérequis : Node.js et npm.

```bash
npm install
npm run dev
```

Puis ouvrez l'URL affichée par Vite (généralement http://localhost:5173).

Pour une version de production :

```bash
npm run build
npm run preview
```

## Comment contribuer pour une nouvelle année

Pour mettre à jour le projet pour une nouvelle session :

1. Mettez à jour les formules de calcul dans [scoring.js](src/utils/scoring.js) si les critères changent.
2. Ajustez les formulaires, libellés et mise en page dans [Year1Calculator.jsx](src/components/Year1Calculator.jsx), [Year2Calculator.jsx](src/components/Year2Calculator.jsx) et les composants associés.
3. Ajoutez ou remplacez les documents officiels dans [docs](public/docs) et référez-les dans [Documents.jsx](src/components/Documents.jsx).
4. Mettez à jour les textes généraux, métadonnées et année concernée dans [index.html](index.html), [App.jsx](src/App.jsx) et [README.md](README.md) si nécessaire.

L'objectif est de conserver une structure claire et réutilisable, afin que chaque nouvelle année demande surtout des ajustements de contenu et de mise en page, plutôt qu'une refonte complète.
