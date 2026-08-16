// Pokémon Destiny - Pixel Art Sprites

class SpriteSheet {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
    }

    getImageData() {
        return this.canvas.getContext('2d').getImageData(0, 0, this.width, this.height);
    }

    drawPixel(x, y, r, g, b, a = 255) {
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
        this.ctx.fillRect(x, y, 1, 1);
    }
}

// Create Player Character Sprite (32x32)
function createPlayerSprite() {
    const sheet = new SpriteSheet(32, 32);
    const ctx = sheet.ctx;

    // Head (skin color - peach)
    ctx.fillStyle = '#f4a460';
    ctx.fillRect(12, 4, 8, 8);

    // Hair (black)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(11, 3, 10, 3);
    ctx.fillRect(10, 5, 12, 2);

    // Eyes (white and black)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(13, 6, 2, 2);
    ctx.fillRect(17, 6, 2, 2);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(13, 7, 1, 1);
    ctx.fillRect(18, 7, 1, 1);

    // Mouth (red)
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(14, 9, 4, 1);

    // Body (blue shirt)
    ctx.fillStyle = '#1e90ff';
    ctx.fillRect(10, 12, 12, 8);

    // Arms (skin)
    ctx.fillStyle = '#f4a460';
    ctx.fillRect(8, 13, 2, 6);
    ctx.fillRect(22, 13, 2, 6);

    // Legs (black pants)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(11, 20, 3, 8);
    ctx.fillRect(18, 20, 3, 8);

    // Shoes (red)
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(11, 28, 3, 3);
    ctx.fillRect(18, 28, 3, 3);

    return sheet.canvas;
}

// Create Professor Oak Sprite (32x40)
function createProfessorOakSprite() {
    const sheet = new SpriteSheet(32, 40);
    const ctx = sheet.ctx;

    // Head (skin - older)
    ctx.fillStyle = '#ddb892';
    ctx.fillRect(11, 2, 10, 8);

    // Hair (white)
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(10, 1, 12, 4);
    ctx.fillRect(9, 4, 14, 2);

    // Beard (white)
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(10, 8, 12, 2);

    // Eyes (black)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(13, 5, 1, 1);
    ctx.fillRect(18, 5, 1, 1);

    // Body (brown jacket)
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(9, 10, 14, 12);

    // Shirt (white under jacket)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(11, 11, 10, 3);

    // Arms (skin)
    ctx.fillStyle = '#ddb892';
    ctx.fillRect(7, 12, 2, 8);
    ctx.fillRect(23, 12, 2, 8);

    // Legs (gray pants)
    ctx.fillStyle = '#666666';
    ctx.fillRect(10, 22, 3, 10);
    ctx.fillRect(19, 22, 3, 10);

    // Shoes (black)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(10, 32, 3, 4);
    ctx.fillRect(19, 32, 3, 4);

    return sheet.canvas;
}

// Create Lancet Sprite - Steel Type Pokémon (24x28)
function createLancetSprite() {
    const sheet = new SpriteSheet(24, 28);
    const ctx = sheet.ctx;

    // Body (metallic steel color - silver/gray)
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(7, 8, 10, 10);

    // Armor plates (darker steel)
    ctx.fillStyle = '#a9a9a9';
    ctx.fillRect(6, 8, 1, 10);
    ctx.fillRect(17, 8, 1, 10);
    ctx.fillRect(7, 7, 10, 1);
    ctx.fillRect(7, 18, 10, 1);

    // Head (steel)
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(8, 4, 8, 4);

    // Eyes (glowing blue)
    ctx.fillStyle = '#4dd0e1';
    ctx.fillRect(9, 5, 1, 1);
    ctx.fillRect(14, 5, 1, 1);

    // Spear-like tail (sharp point)
    ctx.fillStyle = '#a9a9a9';
    ctx.fillRect(12, 18, 2, 4);
    ctx.fillStyle = '#808080';
    ctx.fillRect(11, 20, 4, 1);
    ctx.fillRect(12, 21, 2, 2);
    ctx.fillStyle = '#696969';
    ctx.fillRect(12, 23, 2, 3);

    // Small feet
    ctx.fillStyle = '#696969';
    ctx.fillRect(9, 18, 2, 1);
    ctx.fillRect(13, 18, 2, 1);

    return sheet.canvas;
}

// Create Mega Lancet Sprite - Steel/Dragon (28x32)
function createMegaLancetSprite() {
    const sheet = new SpriteSheet(28, 32);
    const ctx = sheet.ctx;

    // Larger body (steel/dragon hybrid)
    ctx.fillStyle = '#4f6f7f';
    ctx.fillRect(6, 8, 16, 12);

    // Dragon spikes on back
    ctx.fillStyle = '#2c5f9f';
    ctx.fillRect(8, 6, 2, 2);
    ctx.fillRect(13, 6, 2, 2);
    ctx.fillRect(18, 6, 2, 2);

    // Enhanced armor
    ctx.fillStyle = '#708090';
    ctx.fillRect(5, 8, 1, 12);
    ctx.fillRect(22, 8, 1, 12);

    // Head (larger)
    ctx.fillStyle = '#4f6f7f';
    ctx.fillRect(7, 3, 14, 5);

    // Glowing eyes (enhanced)
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(9, 4, 2, 2);
    ctx.fillRect(17, 4, 2, 2);

    // Enhanced spear tail (longer and sharper)
    ctx.fillStyle = '#2c5f9f';
    ctx.fillRect(12, 20, 3, 5);
    ctx.fillStyle = '#1a3a5f';
    ctx.fillRect(11, 25, 5, 1);
    ctx.fillRect(12, 26, 3, 3);
    ctx.fillStyle = '#0d2040';
    ctx.fillRect(12, 29, 3, 2);

    // Dragon wings (small)
    ctx.fillStyle = '#2c5f9f';
    ctx.fillRect(5, 12, 1, 6);
    ctx.fillRect(22, 12, 1, 6);

    return sheet.canvas;
}

// Create Hazel Sprite - Girl character (28x36)
function createHazelSprite() {
    const sheet = new SpriteSheet(28, 36);
    const ctx = sheet.ctx;

    // Head
    ctx.fillStyle = '#f4a460';
    ctx.fillRect(10, 2, 8, 8);

    // Blonde hair
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(9, 1, 10, 3);
    ctx.fillRect(8, 3, 12, 3);

    // Ponytail
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(19, 4, 2, 5);

    // Eyes (blue)
    ctx.fillStyle = '#4dd0e1';
    ctx.fillRect(11, 5, 1, 1);
    ctx.fillRect(15, 5, 1, 1);

    // Smile
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(12, 7, 4, 1);

    // Body (pink/purple shirt)
    ctx.fillStyle = '#ff69b4';
    ctx.fillRect(9, 10, 10, 10);

    // Arms (skin)
    ctx.fillStyle = '#f4a460';
    ctx.fillRect(7, 11, 2, 8);
    ctx.fillRect(19, 11, 2, 8);

    // Legs (blue jeans)
    ctx.fillStyle = '#1e90ff';
    ctx.fillRect(10, 20, 3, 10);
    ctx.fillRect(15, 20, 3, 10);

    // Shoes (white)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 30, 3, 4);
    ctx.fillRect(15, 30, 3, 4);

    // Accessories (bag strap)
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(19, 12, 2, 6);

    return sheet.canvas;
}

// Create Mega Raichu Y Sprite (40x40)
function createMegaRaichuSprite() {
    const sheet = new SpriteSheet(40, 40);
    const ctx = sheet.ctx;

    // Main body (yellow/orange)
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(12, 14, 16, 14);

    // Head
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(14, 6, 12, 8);

    // Ears (pointed)
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(10, 3, 3, 5);
    ctx.fillRect(27, 3, 3, 5);

    // Ear insides (pink)
    ctx.fillStyle = '#ff69b4';
    ctx.fillRect(11, 4, 1, 3);
    ctx.fillRect(28, 4, 1, 3);

    // Eyes (black)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(15, 8, 2, 2);
    ctx.fillRect(23, 8, 2, 2);

    // Cheek spots (red)
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(10, 10, 2, 2);
    ctx.fillRect(28, 10, 2, 2);

    // Mouth (black line)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(17, 12, 6, 1);

    // Mega spikes (blue surround effect)
    ctx.fillStyle = '#4dd0e1';
    ctx.fillRect(8, 8, 2, 3);
    ctx.fillRect(30, 8, 2, 3);
    ctx.fillRect(7, 16, 2, 6);
    ctx.fillRect(31, 16, 2, 6);

    // Tail (large, electric)
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(23, 26, 3, 8);
    ctx.fillStyle = '#ffed4e';
    ctx.fillRect(24, 34, 1, 4);

    // Feet
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(14, 28, 3, 3);
    ctx.fillRect(23, 28, 3, 3);

    return sheet.canvas;
}

// Create Pokédex sprite (small item)
function createPokedexSprite() {
    const sheet = new SpriteSheet(16, 20);
    const ctx = sheet.ctx;

    // Body (red)
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(2, 2, 12, 14);

    // Screen (black)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(3, 3, 10, 6);

    // Screen glow (green)
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(4, 4, 8, 4);

    // Buttons (yellow)
    ctx.fillStyle = '#ffed4e';
    ctx.fillRect(4, 10, 2, 2);
    ctx.fillRect(7, 10, 2, 2);

    return sheet.canvas;
}

// Store all sprites globally
const SPRITES = {
    player: createPlayerSprite(),
    professorOak: createProfessorOakSprite(),
    lancet: createLancetSprite(),
    megaLancet: createMegaLancetSprite(),
    hazel: createHazelSprite(),
    megaRaichu: createMegaRaichuSprite(),
    pokedex: createPokedexSprite()
};
