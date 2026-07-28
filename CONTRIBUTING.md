# Guide de contribution

Merci de vouloir contribuer à ce projet. Ce document explique comment proposer un changement, comment signaler un problème, et les conventions à suivre.

## Avant de commencer

- Node.js 24 (LTS) et npm installés.
- `npm install` puis `npm test` pour vérifier que tout passe déjà sur votre machine avant de commencer à modifier quoi que ce soit.

## Structure du projet

Voir la section [Structure du projet](README.md#structure-du-projet) du README avant toute contribution — comprendre où va chaque type de code (feature vs shared) évite le genre d'aller-retour qu'on a eu en développant ce projet.

## Ouvrir une issue

Chaque issue doit obligatoirement suivre cette structure — les issues qui ne la respectent pas pourront être fermées ou renvoyées pour complément :

```markdown
### Titre
Un résumé court et spécifique du problème ou de la demande.
(Éviter : "bug dans le formulaire" — préférer : "Le champ Rang accepte les nombres négatifs")

### Description
Que se passe-t-il ? Quel est le comportement attendu vs le comportement observé ?
Si c'est un bug : étapes pour reproduire, capture d'écran si pertinent.
Si c'est une nouvelle fonctionnalité : pourquoi est-elle utile, pour quel cas d'usage.

### Comment le résoudre
Une piste de solution, même approximative : quel fichier est probablement concerné,
quelle formule ou quel composant, ou une proposition de comportement correct.
Si vous ne savez pas, dites-le explicitement — mais donnez au moins l'intuition
de la cause probable si vous en avez une.
```

Des modèles pré-remplis sont disponibles automatiquement lors de la création d'une issue sur GitHub (voir `.github/ISSUE_TEMPLATE/`).

## Proposer une modification (Pull Request)

1. Créez une branche depuis `main` : `git checkout -b fix/nom-court-descriptif` ou `feature/nom-court-descriptif`.
2. Faites vos changements.
3. Si vous touchez une formule de calcul (`scoring.js`, `year1.scoring.js`, `year2.scoring.js`), ajoutez ou mettez à jour les tests correspondants dans le fichier `*.test.js` associé — une formule sans test ne sera pas acceptée.
4. Vérifiez localement avant de pousser :
```bash
   npm test
   npm run build
```
5. Ouvrez une Pull Request vers `main`, en décrivant ce qui a changé et pourquoi. Référencez l'issue concernée si applicable (`Fixes #12`).
6. Le workflow CI doit passer (tests + build) avant qu'une PR puisse être fusionnée.

## Conventions de code

- Une fonction de calcul utilisée par une seule année reste dans le dossier de sa feature. Une fonction partagée entre les deux années va dans `shared/utils/scoring.js`.
- La validation des champs (plages de valeurs, entiers positifs, années) passe par `shared/utils/validators.js` — ne dupliquez pas cette logique dans un composant.
- Les composants d'UI génériques (champs de formulaire, jauges, bannières de résultat) vivent dans `shared/components/` et ne doivent pas contenir de logique métier spécifique à une année.

## Mise à jour annuelle

Pour le cas le plus courant — adapter le projet à une nouvelle session du concours — suivez la section correspondante du [README](README.md#comment-contribuer-pour-une-nouvelle-année).