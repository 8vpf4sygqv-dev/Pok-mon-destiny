// Pokémon Destiny - Main Game Logic

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dialogBox = document.getElementById('dialogBox');
const battleScreen = document.getElementById('battleScreen');
const actionBtn = document.getElementById('actionBtn');

// Game States
const GAME_STATES = {
    BEDROOM: 'bedroom',
    CITY: 'city',
    BATTLE: 'battle',
    DIALOGUE: 'dialogue',
    INTRO: 'intro'
};

// Game Object
const game = {
    state: GAME_STATES.INTRO,
    dialogueIndex: 0,
    playerX: 200,
    playerY: 300,
    hasMegaEvolved: false,
    hasPokedex: false,
    battleState: null,
    currentDialogue: [],
    nextState: null,
    canInteract: true,
    battleStarted: false,
    dialogueShown: false
};

// Dialogue sequences
const DIALOGUES = {
    intro: [
        "Welcome to Pokémon Destiny!",
        "You wake up in your bedroom...",
        "Today is the day you get your first Pokémon!"
    ],
    wakeUp: [
        "Wait... today is the day!",
        "I'm finally old enough to get my first Pokémon!",
        "Let me head to Professor Oak's lab..."
    ],
    professorOak: [
        "Welcome, trainer!",
        "I'm Professor Oak!",
        "I have great news...",
        "Unfortunately, all three starter Pokémon are already gone!",
        "But don't worry, I have something special for you!",
        "Meet Lancet - a rare Steel-type Pokémon!",
        "Lancet has a sharp spear-like tail and armor-like body.",
        "Take this Pokédex too - it will help your journey!",
        "Now go forth and explore Kanto!"
    ],
    beforeBattle: [
        "As you head towards the city...",
        "WHOOSH! A wild Mega Raichu Y appears!",
        "It's already in its Mega form!"
    ],
    hazelIntervenes: [
        "Wait! Don't give up!",
        "I'm Hazel! Let me help you!",
        "Together we can do this!",
        "Let's battle!"
    ],
    victoryCongrats: [
        "We did it! We won!",
        "Great job, trainer!",
        "Your Lancet is really powerful!",
        "I'm impressed by you two!",
        "Maybe we should travel together?",
        "Let's see what adventures await us in Kanto!"
    ]
};

// Input handling
const keys = {};

// Keyboard events
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === ' ') {
        e.preventDefault();
        handleAction();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Touch/Click events for D-pad
document.getElementById('upBtn').addEventListener('pointerdown', (e) => {
    e.preventDefault();
    keys['arrowup'] = true;
});
document.getElementById('upBtn').addEventListener('pointerup', (e) => {
    e.preventDefault();
    keys['arrowup'] = false;
});

document.getElementById('downBtn').addEventListener('pointerdown', (e) => {
    e.preventDefault();
    keys['arrowdown'] = true;
});
document.getElementById('downBtn').addEventListener('pointerup', (e) => {
    e.preventDefault();
    keys['arrowdown'] = false;
});

document.getElementById('leftBtn').addEventListener('pointerdown', (e) => {
    e.preventDefault();
    keys['arrowleft'] = true;
});
document.getElementById('leftBtn').addEventListener('pointerup', (e) => {
    e.preventDefault();
    keys['arrowleft'] = false;
});

document.getElementById('rightBtn').addEventListener('pointerdown', (e) => {
    e.preventDefault();
    keys['arrowright'] = true;
});
document.getElementById('rightBtn').addEventListener('pointerup', (e) => {
    e.preventDefault();
    keys['arrowright'] = false;
});

// Action button
actionBtn.addEventListener('click', handleAction);

function handleAction() {
    if (game.state === GAME_STATES.DIALOGUE) {
        game.dialogueIndex++;
        if (game.dialogueIndex >= game.currentDialogue.length) {
            advanceGameState();
        } else {
            updateDialogue();
        }
    } else if (game.state === GAME_STATES.BEDROOM) {
        // Check if near door
        if (game.playerY < 200 && game.playerX > canvas.width - 150) {
            startDialogueSequence(DIALOGUES.professorOak, GAME_STATES.CITY);
        }
    }
}

function updateDialogue() {
    if (game.dialogueIndex < game.currentDialogue.length) {
        dialogBox.textContent = game.currentDialogue[game.dialogueIndex];
        dialogBox.classList.remove('hidden');
    }
}

function startDialogueSequence(dialogueArray, nextState = null) {
    game.currentDialogue = dialogueArray;
    game.dialogueIndex = 0;
    game.state = GAME_STATES.DIALOGUE;
    game.nextState = nextState;
    updateDialogue();
}

function advanceGameState() {
    dialogBox.classList.add('hidden');
    
    if (game.nextState) {
        if (game.nextState === GAME_STATES.CITY) {
            game.state = GAME_STATES.CITY;
            game.playerX = 100;
            game.playerY = 400;
            game.hasPokedex = true;
            game.dialogueShown = false;
        } else if (game.nextState === GAME_STATES.BATTLE) {
            game.state = GAME_STATES.BATTLE;
            game.battleStarted = false;
            battleScreen.classList.remove('hidden');
        } else {
            game.state = game.nextState;
        }
    }
}

// Draw functions
function drawSprite(sprite, x, y, scale = 1) {
    if (!sprite) return;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, x, y, sprite.width * scale, sprite.height * scale);
}

function drawBedroom() {
    // Sky blue background
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grass ground
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

    // Simple bedroom elements
    // Bed (brown)
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(50, canvas.height * 0.3, 200, 120);
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(60, canvas.height * 0.35, 180, 100);

    // Window
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(canvas.width - 150, 30, 120, 100);
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(canvas.width - 150, 30, 120, 100);
    ctx.strokeRect(canvas.width - 135, 45, 55, 55);
    ctx.strokeRect(canvas.width - 75, 45, 55, 55);

    // Door
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(canvas.width - 120, canvas.height * 0.3, 100, 200);
    ctx.fillStyle = '#ffed4e';
    ctx.fillRect(canvas.width - 40, canvas.height * 0.55, 20, 20);

    // Draw player
    drawSprite(SPRITES.player, game.playerX, game.playerY, 2);

    // Instructions
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Your Bedroom', 20, 30);
    ctx.font = '12px Arial';
    ctx.fillText('Go to the door (right side)', 20, 50);
    ctx.fillText('and press SPACE', 20, 70);
}

function drawLabScene() {
    // Sky
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grass
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

    // Professor Oak's Lab building
    ctx.fillStyle = '#a0522d';
    ctx.fillRect(canvas.width - 300, canvas.height * 0.15, 280, 300);
    
    // Roof
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(canvas.width - 300, canvas.height * 0.15, 280, 40);

    // Door
    ctx.fillStyle = '#654321';
    ctx.fillRect(canvas.width - 220, canvas.height * 0.4, 100, 120);
    ctx.fillStyle = '#ffed4e';
    ctx.fillRect(canvas.width - 200, canvas.height * 0.55, 25, 25);

    // Windows
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(canvas.width - 280, canvas.height * 0.3, 60, 60);
    ctx.fillRect(canvas.width - 180, canvas.height * 0.3, 60, 60);

    // Draw player
    drawSprite(SPRITES.player, game.playerX, game.playerY, 2);
    
    // Draw professor
    drawSprite(SPRITES.professorOak, canvas.width - 350, canvas.height * 0.3, 2);

    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.fillText("Professor Oak's Lab", 20, 30);
}

function drawCityScene() {
    // Sky
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grass
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

    // Buildings
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(50, canvas.height * 0.2, 150, 250);
    ctx.fillStyle = '#4169e1';
    ctx.fillRect(canvas.width - 200, canvas.height * 0.25, 170, 230);

    // Path
    ctx.fillStyle = '#d2b48c';
    ctx.fillRect(0, canvas.height * 0.55, canvas.width, 30);

    // Draw player
    drawSprite(SPRITES.player, game.playerX, game.playerY, 2);

    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('On the Road to the City...', 20, 30);
    ctx.font = '12px Arial';
    ctx.fillText('Move forward (right) to continue', 20, 50);
}

function drawBattleBackground() {
    // Galaxy/Space theme
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 150; i++) {
        const x = (i * 73) % canvas.width;
        const y = (i * 127) % canvas.height;
        const size = (i % 3) + 0.5;
        ctx.fillRect(x, y, size, size);
    }

    // Gradient effect
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width);
    gradient.addColorStop(0, 'rgba(100,50,200,0.3)');
    gradient.addColorStop(1, 'rgba(20,10,60,0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBattle() {
    drawBattleBackground();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw enemy (Mega Raichu)
    drawSprite(SPRITES.megaRaichu, centerX + 80, centerY - 120, 2);

    // Draw player's Pokémon (Lancet or Mega Lancet)
    if (game.hasMegaEvolved) {
        drawSprite(SPRITES.megaLancet, centerX - 150, centerY - 40, 2);
    } else {
        drawSprite(SPRITES.lancet, centerX - 140, centerY - 20, 2);
    }

    // Draw Hazel
    drawSprite(SPRITES.hazel, centerX - 180, centerY + 60, 2);

    // Text
    ctx.fillStyle = '#ffff00';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Wild Mega Raichu Y!', centerX - 100, 50);

    if (!game.battleStarted) {
        game.battleStarted = true;
        startDialogueSequence(DIALOGUES.hazelIntervenes, GAME_STATES.BATTLE);
    }
}

function update() {
    // Handle player movement
    if (game.state === GAME_STATES.BEDROOM || game.state === GAME_STATES.CITY) {
        const speed = 3;
        if (keys['arrowup'] || keys['w']) game.playerY -= speed;
        if (keys['arrowdown'] || keys['s']) game.playerY += speed;
        if (keys['arrowleft'] || keys['a']) game.playerX -= speed;
        if (keys['arrowright'] || keys['d']) game.playerX += speed;

        // Boundary check
        game.playerX = Math.max(0, Math.min(canvas.width - 40, game.playerX));
        game.playerY = Math.max(0, Math.min(canvas.height - 50, game.playerY));

        // Check for interactions
        checkInteractions();
    }
}

function checkInteractions() {
    if (game.state === GAME_STATES.CITY && game.playerX > canvas.width - 350) {
        // Reached the lab
        if (!game.dialogueShown) {
            game.dialogueShown = true;
            startDialogueSequence(DIALOGUES.beforeBattle, GAME_STATES.BATTLE);
        }
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw appropriate scene
    switch(game.state) {
        case GAME_STATES.BEDROOM:
            drawBedroom();
            break;
        case GAME_STATES.CITY:
            drawCityScene();
            break;
        case GAME_STATES.BATTLE:
            drawBattle();
            break;
        case GAME_STATES.DIALOGUE:
            if (game.nextState === GAME_STATES.CITY) {
                drawLabScene();
            } else if (game.nextState === GAME_STATES.BEDROOM) {
                drawBedroom();
            }
            break;
        case GAME_STATES.INTRO:
            drawBedroom();
            break;
    }
}

// Battle menu handling
document.getElementById('attackBtn').addEventListener('click', () => {
    handleBattleAction('attack');
});

document.getElementById('megaBtn').addEventListener('click', () => {
    handleBattleAction('mega');
});

document.getElementById('itemBtn').addEventListener('click', () => {
    handleBattleAction('item');
});

document.getElementById('runBtn').addEventListener('click', () => {
    handleBattleAction('run');
});

function handleBattleAction(action) {
    if (action === 'mega' && !game.hasMegaEvolved) {
        game.hasMegaEvolved = true;
        const battleText = document.getElementById('battleText');
        battleText.textContent = 'Lancet is Mega Evolving!';
        
        setTimeout(() => {
            battleText.textContent = 'Lancet Mega Evolved into Mega Lancet!';
            setTimeout(() => {
                battleText.textContent = 'Mega Lancet used Dragon Steel Attack!';
                setTimeout(() => {
                    battleText.textContent = 'Mega Raichu Y was defeated!';
                    setTimeout(() => {
                        battleScreen.classList.add('hidden');
                        startDialogueSequence(DIALOGUES.victoryCongrats, GAME_STATES.CITY);
                    }, 1500);
                }, 1500);
            }, 1500);
        }, 1500);
    } else if (action === 'attack') {
        const battleText = document.getElementById('battleText');
        battleText.textContent = 'Lancet used a Steel attack!';
    } else if (action === 'item') {
        const battleText = document.getElementById('battleText');
        battleText.textContent = 'Used a Potion!';
    } else if (action === 'run') {
        const battleText = document.getElementById('battleText');
        battleText.textContent = 'Escape failed!';
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
window.addEventListener('load', () => {
    gameLoop();
    // Start with intro dialogue
    setTimeout(() => {
        startDialogueSequence(DIALOGUES.intro, GAME_STATES.BEDROOM);
    }, 300);
});
