# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a client-side web application for building and previewing Cloudinary image transformations. It provides a visual interface where users can create complex Cloudinary transformation URLs through a drag-and-drop block system.

## Core Architecture

### State Management (app.js)

The application uses a simple global state pattern with reactive rendering:

- **Global State Variables**:
  - `baseUrl`: The base portion of the Cloudinary URL (parsed from input)
  - `publicId`: The image filename/identifier
  - `blocks`: Array of transformation blocks, each with `id`, `type`, `order`, `expanded`, and `params`
  - `blockIdCounter`: Auto-incrementing ID for new blocks

- **State Flow**:
  1. User inputs URL → `parseUrl()` extracts `baseUrl` and `publicId`
  2. User adds transformation blocks → `blocks` array updated
  3. User modifies block parameters → specific block's `params` updated
  4. Any state change → `renderBlocks()` + `updatePreview()` called

### URL Parsing Strategy (app.js:8-52)

The `parseUrl()` function handles three URL types:

1. **Chanel URLs** (special handling for `chanel.com/images`):
   - Extracts template prefixes like `t_one///`
   - Handles both single and double slash cases

2. **Standard Cloudinary URLs** (`res.cloudinary.com`):
   - Pattern matches the base URL structure
   - Extracts public ID from the end

3. **Generic URLs**:
   - Splits on `/`, uses last segment as public ID

### Transformation Block System

Each block type represents a Cloudinary transformation category:

- **crop**: Resize/crop with modes (fill, crop, scale, fit, pad), dimensions, aspect ratio, gravity
- **trim**: Auto-trim with tolerance and color options
- **gradient**: Gradient fades (top, bottom, left, right, horizontal, vertical)
- **effects**: Boolean toggles for grayscale, sharpen, upscale
- **quality**: Quality settings (auto, auto:best, auto:good, auto:eco)
- **format**: Output format (auto, jpg, png, webp, avif)
- **dpr**: Device pixel ratio

### URL Generation (app.js:473-488)

The `buildTransformUrl()` function:
1. Sorts blocks by `order` field
2. Converts each block to Cloudinary transformation parameters via `generateBlockTransforms()`
3. Joins block transformations with `/` separators
4. Appends the public ID
5. Format: `baseUrl + transform1,param1,param2/transform2,param1/publicId`

**Important**: Transformation order matters in Cloudinary. Blocks are applied in sequence based on their `order` property.

### Block Parameter Mapping (app.js:405-471)

Each block type maps to specific Cloudinary transformation syntax:
- Crop: `c_mode`, `w_width`, `h_height`, `ar_ratio`, `g_gravity`
- Trim: `e_trim:tolerance:color`
- Gradient: `e_gradient_fade`, with `x_` or `y_` intensity based on direction
- Effects: `e_effect_name` for each enabled effect
- Quality: `q_quality_value`
- Format: `f_format`
- DPR: `dpr_value`

## File Structure

```
/
├── index.html          # Main HTML structure, references external CSS/JS
├── app.js             # All application logic and state management
├── styles.css         # Complete styling (responsive, two-column layout)
└── cloudinary-docs/   # Cloudinary API documentation references
    ├── transformation_reference.md
    ├── image_transformations.md
    ├── resizing_and_cropping.md
    ├── face_detection_based_transformations.md
    └── background_removal.md
```

## Key Implementation Details

### No Build System
This is a vanilla JavaScript application with no build step, bundler, or package manager. All code runs directly in the browser.

### Event Handling Pattern
All interactive elements use inline `onclick`/`onchange` handlers that call global functions. This simple pattern avoids event delegation complexity.

### Live Preview System (app.js:490-503)
- Updates on any state change via `updatePreview()`
- Generates full URL and displays it in the output area
- Renders image with `<img>` tag using constructed URL
- Falls back to placeholder text if URL is invalid

### Responsive Layout (styles.css:374-383)
- Two-column layout: controls on left, preview on right
- Preview section is sticky on desktop
- Collapses to single column on screens < 1024px

## Cloudinary Transformation Syntax

Reference the `cloudinary-docs/` directory for comprehensive documentation. Key concepts:

- Transformations are chained with `/` in URLs
- Parameters within a transformation are joined with `,`
- Order of transformations affects the final result
- The app generates URLs like: `baseUrl/c_fill,w_800,h_600/e_grayscale/publicId`

## Common Tasks

### Adding a New Block Type

1. Add button in HTML palette (index.html:38-46)
2. Add case in `getDefaultParams()` (app.js:69-88)
3. Add case in `getBlockTitle()` (app.js:183-194)
4. Add case in `renderBlockContent()` (app.js:197-216)
5. Create render function (e.g., `renderNewBlockContent()`)
6. Add case in `generateBlockTransforms()` (app.js:405-471) to map params to Cloudinary syntax

### Modifying URL Parsing

Edit `parseUrl()` function (app.js:8-52). Test with different URL formats, especially:
- Cloudinary URLs with transformations already present
- Custom domain URLs
- URLs with template prefixes

### Testing Transformations

Use the live preview by:
1. Pasting a valid Cloudinary image URL
2. Adding transformation blocks
3. Observing the generated URL and rendered preview
4. Copying the URL to test in production

## Development Workflow

Since there's no build system:
1. Edit files directly
2. Refresh browser to see changes
3. Use browser DevTools for debugging
4. Test with various Cloudinary URLs

## Browser Compatibility

Uses modern JavaScript features:
- ES6 arrow functions
- Template literals
- Array methods (map, filter, find, forEach)
- Clipboard API for copy functionality
