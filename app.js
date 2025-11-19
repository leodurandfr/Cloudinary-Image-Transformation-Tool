// Global state
let baseUrl = '';
let publicId = '';
let blocks = [];
let blockIdCounter = 0;

// Parse URL
function parseUrl(url) {
    if (!url) {
        baseUrl = '';
        publicId = '';
        return;
    }

    // Parse Chanel URLs
    if (url.includes('chanel.com/images')) {
        const parts = url.split('/images/');
        baseUrl = parts[0] + '/images/';

        // Extract remaining path
        const remaining = parts[1];
        const pathParts = remaining.split('/');

        // Check if there's a template prefix (like t_one///)
        // Handle both /t_one/// and //t_one/// cases
        // Find first non-empty part that starts with 't_'
        const templatePart = pathParts.find(part => part && part.startsWith('t_'));
        if (templatePart) {
            // Check if there's a leading slash (double slash case)
            const hasDoubleSlash = remaining.startsWith('/');
            if (hasDoubleSlash) {
                baseUrl += '/';
            }
            baseUrl += templatePart + '///';

            // Extract publicId: everything after the template part + ///
            const templatePrefix = (hasDoubleSlash ? '/' : '') + templatePart + '///';
            publicId = remaining.substring(templatePrefix.length);
        } else {
            // No template, publicId is the entire remaining path
            publicId = remaining;
        }
    }
    // Parse standard Cloudinary URLs
    else if (url.includes('res.cloudinary.com')) {
        const match = url.match(/(https:\/\/res\.cloudinary\.com\/[^\/]+\/[^\/]+\/[^\/]+\/)/);
        if (match) {
            baseUrl = match[1];
            // Extract everything after baseUrl as the publicId (including folder paths)
            publicId = url.substring(match[1].length);
        }
    }
    // Generic URL
    else {
        const urlParts = url.split('/');
        publicId = urlParts.pop();
        baseUrl = urlParts.join('/') + '/';
    }
}

// Add a new block
function addBlock(type) {
    const block = {
        id: blockIdCounter++,
        type: type,
        order: blocks.length,
        expanded: true,
        params: getDefaultParams(type)
    };
    blocks.push(block);
    renderBlocks();
    updatePreview();
}

// Get default parameters for a block type
function getDefaultParams(type) {
    switch(type) {
        case 'crop':
            return { mode: 'fill', width: '', height: '', aspectRatio: '', gravity: '' };
        case 'trim':
            return { tolerance: '', color: '' };
        case 'gradient':
            return { side: 'top', intensity: 0.5, strength: 20 };
        case 'effects':
            return { effects: [] };
        case 'quality':
            return { quality: 'auto' };
        case 'format':
            return { format: 'auto' };
        case 'dpr':
            return { dpr: '2.0' };
        default:
            return {};
    }
}

// Move block up
function moveBlockUp(id) {
    const index = blocks.findIndex(b => b.id === id);
    if (index > 0) {
        [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
        blocks.forEach((block, i) => block.order = i);
        renderBlocks();
        updatePreview();
    }
}

// Move block down
function moveBlockDown(id) {
    const index = blocks.findIndex(b => b.id === id);
    if (index < blocks.length - 1) {
        [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
        blocks.forEach((block, i) => block.order = i);
        renderBlocks();
        updatePreview();
    }
}

// Remove block
function removeBlock(id) {
    blocks = blocks.filter(b => b.id !== id);
    blocks.forEach((block, i) => block.order = i);
    renderBlocks();
    updatePreview();
}

// Toggle block expansion
function toggleBlock(id) {
    const block = blocks.find(b => b.id === id);
    if (block) {
        block.expanded = !block.expanded;
        renderBlocks();
    }
}

// Update block parameters
function updateBlockParam(id, param, value) {
    const block = blocks.find(b => b.id === id);
    if (block) {
        block.params[param] = value;
        updatePreview();
    }
}

// Render all blocks
function renderBlocks() {
    const container = document.getElementById('blocksContainer');
    const countBadge = document.getElementById('blockCount');

    countBadge.textContent = blocks.length;

    if (blocks.length === 0) {
        container.innerHTML = `
            <div class="blocks-container-empty">
                <p>Aucune transformation active</p>
                <p style="font-size: 0.75rem; margin-top: 8px;">Cliquez sur un bloc ci-dessus pour commencer</p>
            </div>
        `;
        return;
    }

    container.innerHTML = blocks.map((block, index) => {
        const canMoveUp = index > 0;
        const canMoveDown = index < blocks.length - 1;
        const preview = generateBlockPreview(block);

        return `
            <div class="transformation-block">
                <div class="block-header" onclick="toggleBlock(${block.id})">
                    <div class="block-header-left">
                        <div class="block-order">${index + 1}</div>
                        <div class="block-title">${getBlockTitle(block.type)}</div>
                    </div>
                    <div class="block-controls" onclick="event.stopPropagation()">
                        <button class="block-control-btn" onclick="moveBlockUp(${block.id})" ${!canMoveUp ? 'disabled' : ''}>⬆</button>
                        <button class="block-control-btn" onclick="moveBlockDown(${block.id})" ${!canMoveDown ? 'disabled' : ''}>⬇</button>
                        <button class="block-control-btn danger" onclick="removeBlock(${block.id})">×</button>
                    </div>
                </div>
                <div class="block-content ${block.expanded ? 'expanded' : ''}">
                    ${renderBlockContent(block)}
                    ${preview ? `<div class="block-preview">${preview}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Get block title
function getBlockTitle(type) {
    const titles = {
        'crop': 'Crop/Resize',
        'trim': 'Trim',
        'gradient': 'Gradient Fade',
        'effects': 'Effects',
        'quality': 'Quality',
        'format': 'Format',
        'dpr': 'DPR'
    };
    return titles[type] || type;
}

// Render block content based on type
function renderBlockContent(block) {
    switch(block.type) {
        case 'crop':
            return renderCropContent(block);
        case 'trim':
            return renderTrimContent(block);
        case 'gradient':
            return renderGradientContent(block);
        case 'effects':
            return renderEffectsContent(block);
        case 'quality':
            return renderQualityContent(block);
        case 'format':
            return renderFormatContent(block);
        case 'dpr':
            return renderDprContent(block);
        default:
            return '<p>Bloc non configuré</p>';
    }
}

// Render crop block content
function renderCropContent(block) {
    return `
        <div class="form-group">
            <label>Mode de crop</label>
            <select onchange="updateBlockParam(${block.id}, 'mode', this.value)">
                <option value="">Aucun</option>
                <option value="fill" ${block.params.mode === 'fill' ? 'selected' : ''}>Fill</option>
                <option value="crop" ${block.params.mode === 'crop' ? 'selected' : ''}>Crop</option>
                <option value="scale" ${block.params.mode === 'scale' ? 'selected' : ''}>Scale</option>
                <option value="fit" ${block.params.mode === 'fit' ? 'selected' : ''}>Fit</option>
                <option value="pad" ${block.params.mode === 'pad' ? 'selected' : ''}>Pad</option>
            </select>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Largeur</label>
                <input type="number" value="${block.params.width}" onchange="updateBlockParam(${block.id}, 'width', this.value)" placeholder="800">
            </div>
            <div class="form-group">
                <label>Hauteur</label>
                <input type="number" value="${block.params.height}" onchange="updateBlockParam(${block.id}, 'height', this.value)" placeholder="600">
            </div>
        </div>
        <div class="form-group">
            <label>Aspect Ratio</label>
            <input type="text" value="${block.params.aspectRatio}" onchange="updateBlockParam(${block.id}, 'aspectRatio', this.value)" placeholder="16:9 ou 1.5">
        </div>
        <div class="form-group">
            <label>Gravité</label>
            <select onchange="updateBlockParam(${block.id}, 'gravity', this.value)">
                <option value="">Aucune</option>
                <optgroup label="Gravité automatique">
                    <option value="auto" ${block.params.gravity === 'auto' ? 'selected' : ''}>Auto - Automatique</option>
                    <option value="auto:subject" ${block.params.gravity === 'auto:subject' ? 'selected' : ''}>Auto:Subject - Sujet principal</option>
                    <option value="auto:classic" ${block.params.gravity === 'auto:classic' ? 'selected' : ''}>Auto:Classic - Classique</option>
                    <option value="auto:face" ${block.params.gravity === 'auto:face' ? 'selected' : ''}>Auto:Face - Auto sur visage</option>
                    <option value="auto:faces" ${block.params.gravity === 'auto:faces' ? 'selected' : ''}>Auto:Faces - Auto sur visages</option>
                </optgroup>
                <optgroup label="Détection de contenu">
                    <option value="face" ${block.params.gravity === 'face' ? 'selected' : ''}>Face - Visage</option>
                    <option value="faces" ${block.params.gravity === 'faces' ? 'selected' : ''}>Faces - Plusieurs visages</option>
                </optgroup>
                <optgroup label="Positions compass">
                    <option value="center" ${block.params.gravity === 'center' ? 'selected' : ''}>Center - Centre</option>
                    <option value="north" ${block.params.gravity === 'north' ? 'selected' : ''}>North - Haut</option>
                    <option value="south" ${block.params.gravity === 'south' ? 'selected' : ''}>South - Bas</option>
                    <option value="east" ${block.params.gravity === 'east' ? 'selected' : ''}>East - Droite</option>
                    <option value="west" ${block.params.gravity === 'west' ? 'selected' : ''}>West - Gauche</option>
                    <option value="north_east" ${block.params.gravity === 'north_east' ? 'selected' : ''}>North East - Haut Droite</option>
                    <option value="north_west" ${block.params.gravity === 'north_west' ? 'selected' : ''}>North West - Haut Gauche</option>
                    <option value="south_east" ${block.params.gravity === 'south_east' ? 'selected' : ''}>South East - Bas Droite</option>
                    <option value="south_west" ${block.params.gravity === 'south_west' ? 'selected' : ''}>South West - Bas Gauche</option>
                </optgroup>
            </select>
        </div>
    `;
}

// Render trim block content
function renderTrimContent(block) {
    return `
        <div class="form-group">
            <label>Tolérance (0-100)</label>
            <input type="number" value="${block.params.tolerance}" onchange="updateBlockParam(${block.id}, 'tolerance', this.value)" placeholder="10" min="0" max="100">
        </div>
        <div class="form-group">
            <label>Couleur (optionnel)</label>
            <input type="text" value="${block.params.color}" onchange="updateBlockParam(${block.id}, 'color', this.value)" placeholder="white, #FF0000">
        </div>
    `;
}

// Render gradient block content
function renderGradientContent(block) {
    return `
        <div class="form-group">
            <label>Côté</label>
            <select onchange="updateBlockParam(${block.id}, 'side', this.value)">
                <option value="top" ${block.params.side === 'top' ? 'selected' : ''}>⬆ Haut</option>
                <option value="bottom" ${block.params.side === 'bottom' ? 'selected' : ''}>⬇ Bas</option>
                <option value="left" ${block.params.side === 'left' ? 'selected' : ''}>⬅ Gauche</option>
                <option value="right" ${block.params.side === 'right' ? 'selected' : ''}>➡ Droite</option>
                <option value="horizontal" ${block.params.side === 'horizontal' ? 'selected' : ''}>↔ Horizontal</option>
                <option value="vertical" ${block.params.side === 'vertical' ? 'selected' : ''}>↕ Vertical</option>
            </select>
        </div>
        <div class="form-group">
            <label>Intensité: ${block.params.intensity}</label>
            <input type="range" min="0" max="1" step="0.05" value="${block.params.intensity}" onchange="updateBlockParam(${block.id}, 'intensity', this.value); renderBlocks()">
        </div>
    `;
}

// Render effects block content
function renderEffectsContent(block) {
    return `
        <div class="form-group">
            <label>
                <input type="checkbox" ${block.params.effects.includes('grayscale') ? 'checked' : ''} onchange="toggleEffect(${block.id}, 'grayscale', this.checked)">
                Grayscale
            </label>
        </div>
        <div class="form-group">
            <label>
                <input type="checkbox" ${block.params.effects.includes('sharpen') ? 'checked' : ''} onchange="toggleEffect(${block.id}, 'sharpen', this.checked)">
                Sharpen
            </label>
        </div>
        <div class="form-group">
            <label>
                <input type="checkbox" ${block.params.effects.includes('upscale') ? 'checked' : ''} onchange="toggleEffect(${block.id}, 'upscale', this.checked)">
                Upscale
            </label>
        </div>
    `;
}

// Toggle effect in effects block
function toggleEffect(blockId, effect, enabled) {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
        if (enabled) {
            if (!block.params.effects.includes(effect)) {
                block.params.effects.push(effect);
            }
        } else {
            block.params.effects = block.params.effects.filter(e => e !== effect);
        }
        updatePreview();
    }
}

// Render quality block content
function renderQualityContent(block) {
    return `
        <div class="form-group">
            <label>Qualité</label>
            <select onchange="updateBlockParam(${block.id}, 'quality', this.value)">
                <option value="auto" ${block.params.quality === 'auto' ? 'selected' : ''}>Auto</option>
                <option value="auto:best" ${block.params.quality === 'auto:best' ? 'selected' : ''}>Auto:Best</option>
                <option value="auto:good" ${block.params.quality === 'auto:good' ? 'selected' : ''}>Auto:Good</option>
                <option value="auto:eco" ${block.params.quality === 'auto:eco' ? 'selected' : ''}>Auto:Eco</option>
            </select>
        </div>
    `;
}

// Render format block content
function renderFormatContent(block) {
    return `
        <div class="form-group">
            <label>Format</label>
            <select onchange="updateBlockParam(${block.id}, 'format', this.value)">
                <option value="auto" ${block.params.format === 'auto' ? 'selected' : ''}>Auto</option>
                <option value="jpg" ${block.params.format === 'jpg' ? 'selected' : ''}>JPEG</option>
                <option value="png" ${block.params.format === 'png' ? 'selected' : ''}>PNG</option>
                <option value="webp" ${block.params.format === 'webp' ? 'selected' : ''}>WebP</option>
                <option value="avif" ${block.params.format === 'avif' ? 'selected' : ''}>AVIF</option>
            </select>
        </div>
    `;
}

// Render DPR block content
function renderDprContent(block) {
    return `
        <div class="form-group">
            <label>Device Pixel Ratio</label>
            <select onchange="updateBlockParam(${block.id}, 'dpr', this.value)">
                <option value="1.0" ${block.params.dpr === '1.0' ? 'selected' : ''}>1.0</option>
                <option value="1.5" ${block.params.dpr === '1.5' ? 'selected' : ''}>1.5</option>
                <option value="2.0" ${block.params.dpr === '2.0' ? 'selected' : ''}>2.0</option>
                <option value="3.0" ${block.params.dpr === '3.0' ? 'selected' : ''}>3.0</option>
                <option value="auto" ${block.params.dpr === 'auto' ? 'selected' : ''}>Auto</option>
            </select>
        </div>
    `;
}

// Generate block preview (URL part)
function generateBlockPreview(block) {
    const transforms = generateBlockTransforms(block);
    return transforms.length > 0 ? transforms.join(',') : null;
}

// Generate transforms for a block
function generateBlockTransforms(block) {
    const transforms = [];

    switch(block.type) {
        case 'crop':
            if (block.params.mode) transforms.push(`c_${block.params.mode}`);
            if (block.params.width) transforms.push(`w_${block.params.width}`);
            if (block.params.height) transforms.push(`h_${block.params.height}`);
            if (block.params.aspectRatio) transforms.push(`ar_${block.params.aspectRatio}`);
            if (block.params.gravity) transforms.push(`g_${block.params.gravity}`);
            break;

        case 'trim':
            let trimParts = ['e_trim'];
            if (block.params.tolerance || block.params.color) {
                let params = [];
                if (block.params.tolerance) params.push(block.params.tolerance);
                if (block.params.color) params.push(block.params.color);
                trimParts.push(params.join(':'));
            }
            transforms.push(trimParts.join(':'));
            break;

        case 'gradient':
            switch(block.params.side) {
                case 'top':
                    transforms.push('e_gradient_fade', `y_${block.params.intensity}`);
                    break;
                case 'bottom':
                    transforms.push('e_gradient_fade', `y_-${block.params.intensity}`);
                    break;
                case 'left':
                    transforms.push('e_gradient_fade', `x_${block.params.intensity}`);
                    break;
                case 'right':
                    transforms.push('e_gradient_fade', `x_-${block.params.intensity}`);
                    break;
                case 'horizontal':
                    transforms.push('e_gradient_fade:symmetric', `x_${block.params.intensity}`);
                    break;
                case 'vertical':
                    transforms.push('e_gradient_fade:symmetric', `y_${block.params.intensity}`);
                    break;
            }
            break;

        case 'effects':
            block.params.effects.forEach(effect => {
                transforms.push(`e_${effect}`);
            });
            break;

        case 'quality':
            if (block.params.quality) transforms.push(`q_${block.params.quality}`);
            break;

        case 'format':
            if (block.params.format) transforms.push(`f_${block.params.format}`);
            break;

        case 'dpr':
            if (block.params.dpr) transforms.push(`dpr_${block.params.dpr}`);
            break;
    }

    return transforms;
}

// Build full transformation URL
function buildTransformUrl() {
    if (!baseUrl || !publicId) return '';

    const transformComponents = blocks
        .sort((a, b) => a.order - b.order)
        .map(block => generateBlockTransforms(block))
        .filter(transforms => transforms.length > 0)
        .map(transforms => transforms.join(','));

    if (transformComponents.length === 0) {
        return baseUrl + publicId;
    }

    return baseUrl + transformComponents.join('/') + '/' + publicId;
}

// Update preview
function updatePreview() {
    const url = buildTransformUrl();
    const urlOutput = document.getElementById('urlOutput');
    const previewContainer = document.getElementById('previewContainer');

    urlOutput.textContent = url || 'Aucune URL générée';

    if (url && baseUrl && publicId) {
        previewContainer.innerHTML = `<img src="${url}" alt="Preview" onerror="this.src=''; this.alt='Erreur de chargement'">`;
    } else {
        previewContainer.innerHTML = `<p style="color: #adb5bd;">Collez une URL d'image pour voir l'aperçu</p>`;
    }
}

// Copy URL to clipboard
function copyUrl() {
    const urlText = document.getElementById('urlOutput').textContent;
    navigator.clipboard.writeText(urlText).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = '✓ Copié !';
        setTimeout(() => {
            btn.textContent = '📋 Copier l\'URL';
        }, 2000);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderBlocks();
});