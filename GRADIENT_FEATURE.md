# Fonctionnalité Gradient Fade

## Description

Cette fonctionnalité permet d'ajouter des effets de gradient fade configurables sur les côtés des images Cloudinary.

## Options disponibles

### Types de gradient

1. **Standard** (`e_gradient_fade`)
   - Applique un gradient fade basique
   - Par défaut: fade le haut de l'image (50%)

2. **Symétrique** (`e_gradient_fade:symmetric`)
   - Applique un fade symétrique sur plusieurs côtés simultanément

3. **Symétrique avec padding** (`e_gradient_fade:symmetric_pad`)
   - Fade l'image vers le padding ajouté

### Paramètres de direction

#### Direction horizontale (X)
- **Valeurs positives** (0.1 à 1.0): Fade depuis la gauche
- **Valeurs négatives** (-0.1 à -1.0): Fade depuis la droite
- **Valeur 0**: Aucun fade horizontal

#### Direction verticale (Y)
- **Valeurs positives** (0.1 à 1.0): Fade depuis le haut
- **Valeurs négatives** (-0.1 à -1.0): Fade depuis le bas
- **Valeur 0**: Aucun fade vertical

## Exemples d'utilisation

### Exemple 1: Fade sur le côté gauche (50%)
```
e_gradient_fade,x_0.5
```

### Exemple 2: Fade sur le bas (30%)
```
e_gradient_fade,y_-0.3
```

### Exemple 3: Fade symétrique avec effet horizontal et vertical
```
e_gradient_fade:symmetric,x_0.4,y_0.4
```

### Exemple 4: Fade depuis la droite et le haut
```
e_gradient_fade,x_-0.6,y_0.6
```

## URL complète exemple

```
https://www.chanel.com/images/e_gradient_fade:symmetric,x_0.5,y_0.5/w_800/sample-image.jpg
```

Ceci appliquera un gradient fade symétrique de 50% sur tous les côtés de l'image.

## Interface utilisateur

L'interface permet de :
1. Sélectionner le type de gradient dans un menu déroulant
2. Ajuster la direction horizontale avec un slider (-1 à 1)
3. Ajuster la direction verticale avec un slider (-1 à 1)
4. Voir un aperçu en temps réel de l'effet appliqué

## Notes techniques

- Les valeurs sont comprises entre -1 et 1
- Une valeur de 0.5 correspond à 50% de l'image
- Les gradients peuvent être combinés avec d'autres transformations Cloudinary
- L'effet est appliqué avant les autres effets dans la chaîne de transformation
