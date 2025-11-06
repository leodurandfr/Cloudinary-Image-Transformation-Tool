# Système de Gradients Multiples - Guide Complet

## Vue d'ensemble

Le nouvel système de gradients permet d'ajouter **plusieurs gradients indépendants** sur une même image, chacun avec ses propres paramètres configurables. Chaque gradient est appliqué via une transformation chaînée Cloudinary.

## Fonctionnalités

### ✅ Contrôle individuel de chaque gradient
- Ajoutez autant de gradients que nécessaire
- Chaque gradient est indépendant et configurable
- Suppression individuelle de chaque gradient
- Ordre d'application respecté (du premier au dernier)

### ✅ Options par gradient

#### 1. **Côtés disponibles**

| Côté | Direction | Syntaxe Cloudinary | Description |
|------|-----------|-------------------|-------------|
| **Haut** | ↑ | `e_gradient_fade,y_{intensity}` | Fade depuis le haut vers le bas |
| **Bas** | ↓ | `e_gradient_fade,y_-{intensity}` | Fade depuis le bas vers le haut |
| **Gauche** | ← | `e_gradient_fade,x_{intensity}` | Fade depuis la gauche vers la droite |
| **Droite** | → | `e_gradient_fade,x_-{intensity}` | Fade depuis la droite vers la gauche |
| **Horizontal** | ↔ | `e_gradient_fade:symmetric,x_{intensity}` | Fade symétrique gauche ET droite |
| **Vertical** | ↕ | `e_gradient_fade:symmetric,y_{intensity}` | Fade symétrique haut ET bas |

#### 2. **Intensité du fade**
- **Plage** : 0 à 1
- **Pas** : 0.05
- **Défaut** : 0.5 (50%)
- **Description** : Détermine la profondeur du gradient dans l'image

**Exemples :**
- `0.2` → Gradient léger sur 20% de l'image
- `0.5` → Gradient moyen sur 50% de l'image
- `1.0` → Gradient complet sur 100% de l'image

## Interface utilisateur

### Ajouter un gradient

1. Cliquez sur le bouton **"➕ Ajouter un gradient"**
2. Un nouveau gradient apparaît avec les paramètres par défaut :
   - Côté : Haut
   - Intensité : 0.5

### Configurer un gradient

1. **Sélectionner le côté** : Cliquez sur un bouton de direction
2. **Ajuster l'intensité** : Déplacez le slider de 0 à 1
3. L'aperçu se met à jour en temps réel

### Supprimer un gradient

Cliquez sur le bouton **"🗑️ Supprimer"** du gradient concerné

### Badge de comptage

Le badge à côté du titre affiche le nombre de gradients actifs (ex: **Gradient Fade 3**)

## Exemples d'utilisation

### Exemple 1 : Vignette simple (4 côtés)

**Objectif** : Créer un effet de vignette complet

**Configuration :**
- Gradient #1 : Haut, Intensité 0.3
- Gradient #2 : Bas, Intensité 0.3
- Gradient #3 : Gauche, Intensité 0.3
- Gradient #4 : Droite, Intensité 0.3

**URL générée :**
```
/e_gradient_fade,y_0.3/e_gradient_fade,y_-0.3/e_gradient_fade,x_0.3/e_gradient_fade,x_-0.3/
```

### Exemple 2 : Vignette symétrique (2 gradients)

**Objectif** : Même effet de vignette, optimisé

**Configuration :**
- Gradient #1 : Horizontal, Intensité 0.3
- Gradient #2 : Vertical, Intensité 0.3

**URL générée :**
```
/e_gradient_fade:symmetric,x_0.3/e_gradient_fade:symmetric,y_0.3/
```

### Exemple 3 : Fade directionnel

**Objectif** : Effet cinématique avec fade haut et bas

**Configuration :**
- Gradient #1 : Haut, Intensité 0.5
- Gradient #2 : Bas, Intensité 0.5

**URL générée :**
```
/e_gradient_fade,y_0.5/e_gradient_fade,y_-0.5/
```

### Exemple 4 : Gradient asymétrique

**Objectif** : Fade plus prononcé sur un côté

**Configuration :**
- Gradient #1 : Gauche, Intensité 0.7
- Gradient #2 : Droite, Intensité 0.2

**URL générée :**
```
/e_gradient_fade,x_0.7/e_gradient_fade,x_-0.2/
```

### Exemple 5 : Cadre photo

**Objectif** : Créer un effet de cadre avec fade léger

**Configuration :**
- Gradient #1 : Horizontal, Intensité 0.15
- Gradient #2 : Vertical, Intensité 0.15

**URL générée :**
```
/e_gradient_fade:symmetric,x_0.15/e_gradient_fade:symmetric,y_0.15/
```

## Transformations chaînées

Chaque gradient est appliqué comme une transformation séparée, chaînée avec `/`. Cela permet :

1. ✅ **Indépendance** : Chaque gradient conserve ses propres paramètres
2. ✅ **Ordre préservé** : Les gradients s'appliquent dans l'ordre d'ajout
3. ✅ **Cumul d'effets** : Les gradients se superposent pour créer des effets complexes
4. ✅ **Flexibilité maximale** : Combinaison libre de n'importe quels côtés

## Architecture technique

### Structure des données

```javascript
gradients = [
  {
    id: 0,
    side: 'top',      // 'top' | 'bottom' | 'left' | 'right' | 'horizontal' | 'vertical'
    intensity: 0.5    // 0 à 1
  },
  {
    id: 1,
    side: 'horizontal',
    intensity: 0.3
  }
]
```

### Fonctions principales

| Fonction | Description |
|----------|-------------|
| `addGradient()` | Ajoute un nouveau gradient avec valeurs par défaut |
| `removeGradient(id)` | Supprime un gradient par son ID |
| `updateGradientSide(id, side)` | Met à jour le côté d'un gradient |
| `updateGradientIntensity(id, intensity)` | Met à jour l'intensité |
| `renderGradients()` | Re-rend l'interface des gradients |

### Génération d'URL

Dans `buildTransformUrl()`, chaque gradient génère une transformation :

```javascript
gradients.forEach(gradient => {
  let gradientParams = [];

  switch(gradient.side) {
    case 'top':
      gradientParams.push('e_gradient_fade');
      gradientParams.push(`y_${gradient.intensity}`);
      break;
    // ... autres cas
  }

  transforms.push(gradientParams.join(','));
});
```

## Avantages vs ancienne version

| Fonctionnalité | Ancienne version | Nouvelle version |
|----------------|------------------|------------------|
| Nombre de gradients | 1 seul (combiné X+Y) | ♾️ Illimité |
| Contrôle par côté | ❌ Non | ✅ Oui |
| Intensité variable par côté | ❌ Non | ✅ Oui |
| Interface | Sliders X/Y génériques | Cartes configurables individuelles |
| Suppression | Reset complet | Suppression individuelle |
| Flexibilité | ⭐⭐ | ⭐⭐⭐⭐⭐ |

## Cas d'usage avancés

### Portrait avec cadre élégant

```
Horizontal (0.1) + Vertical (0.1) = Cadre subtil sur tous les bords
```

### Image héro avec focus central

```
Horizontal (0.4) + Vertical (0.4) = Effet de spot central fort
```

### Transition cinématique

```
Haut (0.6) + Bas (0.6) = Effet letterbox cinéma
```

### Design asymétrique moderne

```
Gauche (0.8) + Haut (0.3) = Focus diagonal
```

## Conseils d'utilisation

1. 💡 **Commencez subtil** : Intensité de 0.2-0.3 pour un effet naturel
2. 💡 **Symétrie** : Utilisez "Horizontal" et "Vertical" pour des vignettes équilibrées
3. 💡 **Expérimentez** : L'aperçu temps réel permet de tester rapidement
4. 💡 **Ordre** : Les premiers gradients s'appliquent en premier (peut affecter le rendu final)
5. 💡 **Combinaison** : 2-4 gradients suffisent généralement pour des effets complexes

## Compatibilité Cloudinary

✅ Compatible avec toutes les versions de Cloudinary
✅ Utilise les transformations chaînées standard
✅ Pas de features expérimentales
✅ Syntaxe documentée officiellement

## Support

Pour plus d'informations sur `gradient_fade` :
- [Documentation Cloudinary officielle](https://cloudinary.com/documentation/effects_and_artistic_enhancements)
- [Support article](https://support.cloudinary.com/hc/en-us/articles/203585582)
