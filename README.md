# Portfolio — D. Nayerehoua

Portfolio personnel de **Diarrassouba Nayerehoua**, développeur web.

---

## Aperçu

Site vitrine one-page présentant les compétences, projets et coordonnées du développeur. Entièrement réalisé en **HTML / CSS / JavaScript vanille**, sans framework ni dépendance à installer.

---

## Structure du projet

```
portfolio_v1/
├── index.html          # Page principale (structure HTML)
├── css/
│   └── styles.css      # Tous les styles (variables, layout, responsive)
├── js/
│   └── main.js         # Interactions (menu mobile, animations, formulaire)
├── images/
│   ├── img_profile-2.png       # Photo de profil
│   ├── ph_profile.webp         # Photo alternative
│   ├── web_developement.svg    # Icône développement web
│   ├── design.svg              # Icône design
│   ├── machine-learning.svg    # Icône machine learning
│   └── scr.jpg                 # Capture d'écran projet
└── README.md
```

---

## Sections

| Section | Description |
|---|---|
| **Accueil** | Présentation rapide avec photo de profil et boutons d'action |
| **Compétences** | Liste des technologies maîtrisées |
| **À propos** | Description du profil et domaines d'expertise |
| **Projets** | Présentation des projets réalisés |
| **Contact** | Formulaire de contact et coordonnées |

---

## Technologies utilisées

- **HTML5** — Structure sémantique
- **CSS3** — Variables CSS, Grid, Flexbox, animations, responsive design
- **JavaScript (ES6+)** — Manipulation du DOM, animations au scroll, menu mobile
- **Google Fonts** — Police Montserrat
- **Remix Icon** — Bibliothèque d'icônes (CDN)

---

## Lancer le projet

Aucune installation requise. Il suffit d'ouvrir `index.html` dans un navigateur :

```bash
# Option 1 — Ouvrir directement
Double-cliquer sur index.html

# Option 2 — Serveur local avec Python
python -m http.server 5000
# puis ouvrir http://localhost:5000

# Option 3 — Serveur local avec Node.js
npx serve .
# puis ouvrir http://localhost:3000
```

---

## Personnalisation

### Modifier le contenu
Tout le contenu (nom, description, compétences, projets, contact) se trouve dans **`index.html`**.

### Modifier les couleurs
Les couleurs sont centralisées dans les variables CSS au début de **`css/styles.css`** :

```css
:root {
    --primary: #7ACAFF;       /* Couleur principale */
    --primary-dark: #5bb8f0;  /* Variante sombre */
    --primary-light: #e8f4fc; /* Variante claire */
    --text: #1a1a2e;          /* Couleur du texte */
}
```

### Remplacer la photo de profil
Remplacer le fichier `images/img_profile-2.png` par votre propre photo en conservant le même nom, ou mettre à jour le chemin dans `index.html` :

```html
<img src="images/votre-photo.png" alt="Votre nom">
```

---

## Responsive

Le site est adapté aux trois tailles d'écran principales :

| Breakpoint | Cible |
|---|---|
| `> 1024px` | Desktop |
| `≤ 1024px` | Tablette |
| `≤ 768px` | Mobile |
| `≤ 480px` | Petit mobile |

---

## Auteur

**Diarrassouba Nayerehoua** — Développeur Web
