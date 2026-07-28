# Sélection Ingénieurs 2026 — Calculateur de scores

## Vue d'ensemble

Cette application React (Vite + Tailwind) permet de calculer les scores de sélection pour les concours spécifiques d'entrée en établissements de formation d'ingénieurs, en 1ère et 2ème année. Elle est pensée pour refléter les critères officiels de la Direction Générale des Études Technologiques (MESRS) et peut être mise à jour d'une année à l'autre selon les règles, documents et maquettes publiés.

## Structure du projet

Le code source est organisé en trois grandes catégories :
```text
src/
features/ # Une fonctionnalité = un dossier
  year1-calculator/
    Year1Calculator.jsx
    year1.scoring.js
    year1.scoring.test.js
  year2-calculator/
    Year2Calculator.jsx
    year2.scoring.js
    year2.scoring.test.js
  documents/
    Documents.jsx
shared/ # Réutilisé par plusieurs features
  components/ # FormField, FormSection, ScoreGauge, ResultBanner, Header, Navigation
  context/ # ThemeContext
  utils/
    scoring.js # Formules communes (computeM, computeB1, computeB2)
    scoring.test.js
    validators.js # Validation des champs (grade, année, entier positif)
    validators.test.js
App.jsx
public/
    docs/ # PDF officiels — commités au dépôt, servis tels quels
```

**Règle générale** : une fonction de calcul utilisée par une seule année reste dans le dossier de sa feature (`year1.scoring.js` / `year2.scoring.js`). Une fonction utilisée par les deux années va dans `shared/utils/scoring.js`.

## Comment l'exécuter

Prérequis : Node.js 24 (LTS) et npm.

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

## Tests

Les fonctions de calcul et de validation sont testées avec [Vitest](https://vitest.dev/).

```bash
npm test
```

Chaque module de scoring (`shared/utils/scoring.js`, `year1.scoring.js`, `year2.scoring.js`) a son fichier de test associé (`*.test.js`) dans le même dossier. Toute nouvelle formule ou tout changement de barème doit être accompagné d'un test correspondant.

## Intégration et déploiement continus

Trois workflows GitHub Actions tournent sur ce dépôt :

- **`ci.yml`** — exécute les tests et vérifie que le build passe, sur chaque push et pull request vers `main`.
- **`docker-publish.yml`** — construit et publie l'image Docker sur Docker Hub , déclenché après un run réussi de `CI` sur `main`.
- **`pages-deploy.yml`** — déploie une version statique de l'application sur GitHub Pages, déclenché après un run réussi de `CI` sur `main`.

## Docker

```bash
docker build -t concours-ingenieurs-calculator .
docker run -d -p 80:80 concours-ingenieurs-calculator
```

Les documents PDF sont inclus directement dans l'image (`public/docs/`) — aucune configuration de volume n'est nécessaire.

## Comment contribuer pour une nouvelle année

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour le détail complet. En résumé, pour mettre à jour le projet pour une nouvelle session :

1. Mettez à jour les formules de calcul dans `shared/utils/scoring.js`, `year1.scoring.js` ou `year2.scoring.js` selon la feature concernée, si les critères changent. Ajoutez ou mettez à jour les tests correspondants.
2. Ajustez les formulaires, libellés et mise en page dans `Year1Calculator.jsx`, `Year2Calculator.jsx` et les composants partagés.
3. Ajoutez ou remplacez les documents officiels dans `public/docs/` et référez-les dans `Documents.jsx`.
4. Mettez à jour les textes généraux, métadonnées et année concernée dans `index.html`, `App.jsx` et ce `README.md` si nécessaire.

L'objectif est de conserver une structure claire et réutilisable, afin que chaque nouvelle année demande surtout des ajustements de contenu et de mise en page, plutôt qu'une refonte complète.