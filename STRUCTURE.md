# Structure du Projet BioDive-Web

## 📋 Vue d'ensemble

BioDive-Web est une application web éducative interactive développée avec React et Vite. Elle propose un jeu de découverte de la biodiversité marine à travers des cartes de questions, des mini-jeux et un système de progression.

## 🎯 Technologies utilisées

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Langage**: JavaScript (ES6+)
- **Styling**: CSS modules + inline styles
- **Linting**: ESLint 9.39.1

## 📁 Structure des dossiers

```
biodive-web/
├── public/                    # Ressources statiques publiques
│   ├── images/               # Images et illustrations du jeu
│   └── sons/                 # Fichiers audio (effets sonores, musiques)
│
├── src/                      # Code source de l'application
│   ├── components/           # Composants React réutilisables
│   ├── constants/            # Constantes et configurations du jeu
│   ├── utils/                # Fonctions utilitaires
│   ├── assets/              # Assets compilés avec l'application
│   ├── *.jsx                # Composants React principaux
│   ├── *.css                # Feuilles de style
│   ├── *.js                 # Modules JavaScript utilitaires
│   └── catalogue_complet.json # Base de données des questions/cartes
│
├── tools/                    # Outils de développement et maintenance
│   ├── add-nom-scientifique.js
│   ├── catalogue-form-server.js
│   ├── catalogue-form.html
│   └── mettre à jour le catalogue.txt
│
├── index.html               # Point d'entrée HTML
├── vite.config.js          # Configuration Vite
├── eslint.config.js        # Configuration ESLint
├── package.json            # Dépendances et scripts npm
├── STRUCTURE.md            # Documentation de la structure (ce fichier)
└── README.md               # Documentation du projet
```

## 🎮 Architecture de l'application

### Composants principaux (`src/`)

#### 📄 Fichiers de configuration et utilitaires
- **`main.jsx`** - Point d'entrée de l'application React
- **`App.jsx`** - Composant racine, gère l'état global du jeu et la logique principale
- **`audioManager.js`** - Module de gestion des sons et effets audio
- **`catalogue_complet.json`** - Base de données JSON contenant toutes les cartes (faune, action, questions)

#### 🎴 Composants de cartes principaux
- **`CarteFaune.jsx`** - Affiche les cartes de questions sur la faune marine
- **`CarteAction.jsx`** - Gère les cartes d'action du jeu
- **`cartes.css`** - Styles communs pour les cartes

#### 🎯 Interface utilisateur principale
- **`EcranAccueil.jsx`** - Écran d'accueil du jeu
- **`EcranVictoire.jsx`** - Écran de fin de partie
- **`BarreInventaire.jsx`** - Affiche l'inventaire du joueur
- **`BarreProgression.jsx`** - Barre de progression dans le jeu
- **`DePlacement.jsx`** - Gestion des déplacements du joueur

#### 📷 Composants médias
- **`AlbumPhoto.jsx`** (dans components/) - Album de découvertes du joueur
- **`ImageOptimisee.jsx`** - Composant d'optimisation du chargement d'images

#### 🎨 Styles
- **`App.css`** - Styles du composant App principal
- **`index.css`** - Styles globaux de l'application
- **`album.css`** - Styles de l'album photo
- **`jeuAnagramme.css`** - Styles du mini-jeu anagramme
- **`miniJeuEpave.css`** - Styles du mini-jeu épave
- **`texteATrous.css`** - Styles du jeu texte à trous

### Composants secondaires (`src/components/`)

#### � Composants visuels et d'interface
- **`AnimationPoints.jsx`** - Animation d'affichage des points gagnés/perdus
- **`EffetBulles.jsx`** - Animation de bulles pour le plongeur
- **`BarreProgressionPlongeur.jsx`** - Barre de progression avec icône de plongeur animé
- **`ClubPlongee.jsx`** - Écran du club de plongée (point de départ)
- **`MessageBonus.jsx`** - Affichage des messages bonus flottants

#### �🎮 Mini-jeux
- **`JeuAnagramme.jsx`** - Mini-jeu de résolution d'anagrammes
- **`MiniJeuEpave.jsx`** - Mini-jeu d'exploration d'épave
- **`TexteATrous.jsx`** - Mini-jeu de texte à compléter
- **`CharadeInput.jsx`** - Composant de saisie pour charade

#### 🃏 Composants de cartes spécialisés
- **`CarteHeader.jsx`** - En-tête des cartes
- **`CarteActionButton.jsx`** - Boutons des cartes action
- **`CarteActionEffet.jsx`** - Effets visuels des cartes action
- **`CarteChoixOptions.jsx`** - Affichage des options de choix multiples
- **`CarteFauneReponse.jsx`** - Affichage des réponses aux questions faune
- **`CarteOuiNonButtons.jsx`** - Boutons Oui/Non pour cartes
- **`CarteVraiFauxButtons.jsx`** - Boutons Vrai/Faux pour quiz

#### 🖼️ Composants visuels
- **`VignetteEspece.jsx`** - Vignette d'affichage d'une espèce dans l'album

### Fichiers utilitaires (`src/`)

#### 📦 Constants (`src/constants/`)
- **`gameConstants.js`** - Constantes du jeu (faces de dé, dictionnaires, messages, configuration)

#### 🛠️ Utils (`src/utils/`)
- **`inventaireUtils.js`** - Fonctions de gestion de l'inventaire et des points
- **`miniJeuUtils.js`** - Fonctions utilitaires pour les mini-jeux d'anagrammes

## 🗂️ Structure des données

### catalogue_complet.json
Le fichier `catalogue_complet.json` contient deux catégories principales :

#### 1. **Cartes Faune** (Questions sur la biodiversité)
Chaque carte contient :
- `ID` : Identifiant unique (ex: "faune_01")
- `QUESTION` : Texte de la question
- `REPONSE` : Réponse correcte
- `EXPLICATIONS` : Explications pédagogiques
- `NOM` : Nom commun de l'espèce
- `NOM_SCIENTIFIQUE` : Nom scientifique
- `@images` : Fichier image associé
- `TYPE` : Type de question (VRAI OU FAUX, ANAGRAMME, QCM, etc.)
- `CATEGORIE` : Catégorie (faune, biologie, etc.)
- `POINTS` : Points attribués

#### 2. **Cartes Action** (Actions de jeu)
Contiennent les événements et actions spéciales du jeu.

## 🛠️ Outils de développement (`tools/`)

- **`add-nom-scientifique.js`** - Script pour ajouter les noms scientifiques au catalogue
- **`catalogue-form-server.js`** - Serveur local pour gérer le formulaire d'édition du catalogue
- **`catalogue-form.html`** - Interface web pour éditer le catalogue de questions
- **`mettre à jour le catalogue.txt`** - Instructions pour la mise à jour du catalogue

## 🚀 Scripts disponibles

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualisation du build
npm run lint     # Vérification du code avec ESLint
```

## 🎯 Types de questions supportés

1. **VRAI OU FAUX** - Questions de type vrai/faux
2. **ANAGRAMME** - Résolution d'anagrammes
3. **QCM** - Questions à choix multiples
4. **TEXTE À TROUS** - Texte à compléter
5. **CHARADE** - Devinettes par charade

## 🎨 Thématique et design

L'application utilise un thème marin avec :
- Fond sous-marin (`fond2.svg`)
- Palette de couleurs bleues (#0288d1, #4caf50)
- Animations de bulles et effets aquatiques
- Icônes et visuels liés à la plongée sous-marine

## 📱 Fonctionnalités principales

1. **Système de progression** - Barre de progression avec icône de plongeur
2. **Inventaire** - Gestion des objets/découvertes du joueur
3. **Album photo** - Collection des espèces découvertes
4. **Mini-jeux interactifs** - Diverses mécaniques de jeu éducatives
5. **Gestion audio** - Sons et effets sonores
6. **Système de points** - Attribution de points selon les réponses

## 🔄 Flux de l'application

```
EcranAccueil
     ↓
  App.jsx (Game Loop)
     ↓
  ┌─── CarteFaune (Questions)
  │       ↓
  │    Mini-jeux (JeuAnagramme, TexteATrous, etc.)
  │       ↓
  ├─── CarteAction (Événements)
  │       ↓
  └─── Progression → BarreProgression
     ↓
EcranVictoire
```

## 📝 Notes de développement

- L'application utilise React Hooks (useState, useRef, useCallback, useMemo)
- Les styles sont mixtes : CSS modules + inline styles
- Images optimisées via composant `ImageOptimisee`
- Assets audio dans `/public/sons/`
- Images dans `/public/images/`

## 🔧 Configuration

- **Vite** : Configuration dans `vite.config.js`
- **ESLint** : Configuration dans `eslint.config.js`
- **React** : Version 19.2.0 avec support du Fast Refresh
