# Portfolio Technique - Ethan Tomaso

## 🚀 Vue d'ensemble

Portfolio professionnel développé avec React et TailwindCSS, présentant une interface moderne et interactive. Le site inclut une séquence de démarrage unique, un système de traduction intégré (FR/EN), et des visualisations de compétences innovantes.

## 🛠 Stack Technique

### Frontend
- **React** - Framework principal
- **TailwindCSS** - Styling et composants UI
- **Lucide Icons** - Iconographie cohérente
- **React Hooks personnalisés** - Gestion d'état et animations

### Fonctionnalités Clés
- Système de traduction FR/EN
- Animations et transitions fluides
- Visualisation interactive des compétences (Skills Universe)
- Séquence de démarrage personnalisée (Boot Screen)
- Design responsive et adaptatif

## 📂 Structure du Projet

```
src/
├── components/
│   ├── AnimatedBackground/
│   ├── BootScreen/
│   │   ├── CodeRain.js
│   │   ├── Terminal.js
│   │   ├── Header.js
│   │   └── index.js
│   ├── Education/
│   ├── Experience/
│   ├── Navigation/
│   ├── Projects/
│   └── SkillUniverse/
├── data/
│   ├── content.js      # Contenu multilingue
│   ├── education.js    # Données formation
│   ├── experience.js   # Données expérience
│   ├── projects.js     # Données projets
│   └── skills.js       # Structure compétences
├── hooks/
│   └── useOnScreen.js  # Hook visibilité
└── App.js
```

## 🎯 Fonctionnalités Principales

### Boot Screen
- Animation de démarrage style terminal
- Effet de "code rain" en arrière-plan
- Sélection de langue interactive
- Easter eggs et références geek

### Skills Universe
- Visualisation interactive des compétences
- Navigation hiérarchique
- Indicateurs de niveau de maîtrise
- Animations fluides entre les transitions

### Sections Dynamiques
- **Formation** : Carousel chronologique avec navigation
- **Expérience** : Timeline interactive
- **Projets** : Cards avec liens vers les repositories

## 🔧 Installation et Développement

```bash
# Cloner le repository
git clone [url-du-repo]

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 🎨 Personnalisation

### Thème
Le thème est basé sur TailwindCSS avec une palette de couleurs personnalisée :
- Primary: Purple (#6B46C1)
- Background: Dark (#111827)
- Accents: Blue (#3B82F6)

### Contenu
Toutes les données sont externalisées dans le dossier `data/` :
- Modifier `content.js` pour les traductions
- Ajuster `skills.js` pour la structure des compétences
- Mettre à jour `education.js` et `experience.js` pour le parcours

## 🔍 Points Techniques Notables

### Performance
- Lazy loading des composants lourds
- Optimisation des animations avec CSS transforms
- Gestion efficace des états avec React hooks

### Accessibilité
- Support complet du clavier
- Textes alternatifs pour les images
- Structure sémantique HTML

### SEO
- Meta tags dynamiques
- Structure de données structurées
- URLs propres et descriptives

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints adaptés :
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📬 Contact

Ethan Tomaso - ethan.tomaso@gmail.com

Lien du projet : [https://github.com/votre-username/portfolio] 