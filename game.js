// Pokémon Destiny - Main Game Logic

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dialogBox = document.getElementById('dialogBox');
const battleScreen = document.getElementById('battleScreen');
const actionBtn = document.getElementById('actionBtn');

// Control the canvas size
function resizeCanvas() {
    const size = Math.min(window.innerWidth, window.innerHeight);
    canvas.width = Math.min(800, size);
    canvas.height = Math.min(600, size * 0.75);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game States
const GAME_STATES = {
    BEDROOM: 'bedroom',
    CITY: 'city',
    BATTLE: 'battle',
    DIALOGUE: 'dialogue'
};

// Game Object
const game = {
    state: GAME_STATES.BEDROOM,
    dialogueIndex: 0,
    playerX: 16,
    playerY: 16,
    hasMegaEvolved: false,
    hasPokedex: false,
    battleState: null,
    currentDialogue: []
};

// Dialogue sequences
const DIALOGUES = {
    wakeUp: [
        "You wake up in your bedroom...",
        "Wait... today is the day!",
        "I'm finally old enough to get my first Pokémon!",
        "Let me head to Professor Oak's lab..."
    ],
    professorOak: [
        "Welcome, trainer!",
        "I'm Professor Oak, and I have great news...",
        "Unfortunately, all three starter Pokémon are gone!",
        "But don't worry, I have something special for you!",
        "Meet Lancet - a Steel-type Pokémon!",
        "Lancet is extremely rare and mighty!",
        "It has a sharp spear-like tail and armor-like body.",
        "Take this Pokédex too - it will help you on your journey!",
        "Good luck, trainer!"
    ],
    beforeBattle: [
        "As you head towards the city...",
        "WHOOSH! A wild Mega Raichu Y appears!",
        "It's already in its Mega form!"
    ],
    hazelIntervenes: [
        "Wait! Don't give up!",
        "I'm Hazel! Let me help you!",
        "Together with Lancet, we can do this!",
        "Let's battle!"
    ],
    victoryCongrats: [
        "We did it! We won the battle!",
        "Great job, trainer!",
        "Your Lancet is really powerful!",
        "I'm impressed by you two!",
        "Maybe we should travel together?",
        "Let's see what adventures await us in Kanto!"
    ]
};

// Input handling
const keys = {};
const touches = {};

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
document.getElementById('upBtn').addEventListener('pointerdown', () => keys['arrowup'] = true);
document.getElementById('upBtn').addEventListener('pointerup', () => keys['arrowup'] = false);
document.getElementById('downBtn').addEventListener('pointerdown', () => keys['arrowdown'] = true);
document.getElementById('downBtn').addEventListener('pointerup', () => keys['arrowdown'] = false);
document.getElementById('leftBtn').addEventListener('pointerdown', () => keys['arrowleft'] = true);
document.getElementById('leftBtn').addEventListener('pointerup', () => keys['arrowleft'] = false);
document.getElementById('rightBtn').addEventListener('pointerdown', () => keys['arrowright'] = true);
document.getElementById('rightBtn').addEventListener('pointerup', () => keys['arrowright'] = false);

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
    }
}

function updateDialogue() {
    if (game.dialogueIndex < game.currentDialogue.length) {
        dialogBox.textContent = game.currentDialogue[game.dialogueIndex];
        dialogBox.classList.remove('hidden');
    }
}

function showDialogue(dialogueArray, nextState = null) {
    game.currentDialogue = dialogueArray;
    game.dialogueIndex = 0;
    game.state = GAME_STATES.DIALOGUE;
    game.nextState = nextState;
    updateDialogue();
}

function advanceGameState() {
    dialogBox.classList.add('hidden');
    
    switch(game.state) {
        case GAME_STATES.DIALOGUE:
            if (game.nextState) {
                game.state = game.nextState;
            }
            break;
    }
}

// Draw functions
function drawSprite(sprite, x, y, scale = 2) {
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
    ctx.fillRect(50, canvas.height * 0.4, 150, 100);
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(55, canvas.height * 0.45, 140, 80);

    // Window
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(canvas.width - 120, 20, 100, 80);
    ctx.fillStyle = '#333';
    ctx.fillRect(canvas.width - 120, 20, 100, 80);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width - 110, 30, 40, 40);
    ctx.strokeRect(canvas.width - 65, 30, 40, 40);

    // Door
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(canvas.width - 80, canvas.height * 0.4, 60, 150);
    ctx.fillStyle = '#ffed4e';
    ctx.fillRect(canvas.width - 30, canvas.height * 0.6, 15, 15);

    // Draw player
    drawSprite(SPRITES.player, game.playerX, game.playerY, 2);

    // Text
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText('Your Bedroom', 20, 30);
}

function drawLabScene() {
    // Sky
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grass
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

    // Professor Oak's Lab building (simple)
    ctx.fillStyle = '#a0522d';
    ctx.fillRect(canvas.width - 250, canvas.height * 0.2, 220, 250);
    
    // Roof
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(canvas.width - 250, canvas.height * 0.2, 220, 30);

    // Door
    ctx.fillStyle = '#654321';
    ctx.fillRect(canvas.width - 180, canvas.height * 0.45, 80, 100);

    // Window
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(canvas.width - 240, canvas.height * 0.35, 50, 50);

    // Draw player and professor
    drawSprite(SPRITES.player, game.playerX, game.playerY, 2);
    drawSprite(SPRITES.professorOak, canvas.width - 300, canvas.height * 0.35, 2);

    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
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
    ctx.fillRect(50, canvas.height * 0.25, 120, 200);
    ctx.fillStyle = '#4169e1';
    ctx.fillRect(canvas.width - 170, canvas.height * 0.3, 140, 180);

    // Path
    ctx.fillStyle = '#d2b48c';
    ctx.fillRect(0, canvas.height * 0.55, canvas.width, 20);

    // Draw player
    drawSprite(SPRITES.player, game.playerX, game.playerY, 2);

    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText('On the road to the city...', 20, 30);
}

function drawBattleBackground() {
    // Galaxy/Space theme
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Stars
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 100; i++) {
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

function update() {
    // Handle player movement
    if (game.state === GAME_STATES.BEDROOM || game.state === GAME_STATES.CITY) {
        if (keys['arrowup'] || keys['w']) game.playerY -= 2;
        if (keys['arrowdown'] || keys['s']) game.playerY += 2;
        if (keys['arrowleft'] || keys['a']) game.playerX -= 2;
        if (keys['arrowright'] || keys['d']) game.playerX += 2;

        // Boundary check
        game.playerX = Math.max(0, Math.min(canvas.width - 32, game.playerX));
        game.playerY = Math.max(0, Math.min(canvas.height - 32, game.playerY));

        // Check for interactions
        checkInteractions();
    }
}

function checkInteractions() {
    if (game.state === GAME_STATES.BEDROOM) {
        // Door interaction
        if (game.playerX > canvas.width - 120 && game.playerX < canvas.width - 50 &&
            game.playerY > canvas.height * 0.35) {
            showDialogue(DIALOGUES.wakeUp, GAME_STATES.CITY);
        }
    }
    
    if (game.state === GAME_STATES.CITY && game.playerX > canvas.width - 350) {
        // Reached the lab
        showDialogue(DIALOGUES.professorOak);
        game.hasPokedex = true;
        setTimeout(() => {
            game.state = GAME_STATES.CITY;
            game.playerX = 100;
            showDialogue(DIALOGUES.beforeBattle, GAME_STATES.BATTLE);
        }, 1000);
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
            drawLabScene();
            break;
    }
}

function drawBattle() {
    drawBattleBackground();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw enemy (Mega Raichu)
    drawSprite(SPRITES.megaRaichu, centerX + 100, centerY - 100, 2);

    // Draw player's Pokémon (Lancet or Mega Lancet)
    if (game.hasMegaEvolved) {
        drawSprite(SPRITES.megaLancet, centerX - 150, centerY - 50, 2);
    } else {
        drawSprite(SPRITES.lancet, centerX - 140, centerY - 30, 2);
    }

    // Draw Hazel
    drawSprite(SPRITES.hazel, centerX - 180, centerY + 80, 2);

    // Text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('Wild Mega Raichu Y!', centerX - 80, 40);

    if (!game.battleStarted) {
        game.battleStarted = true;
        showDialogue(DIALOGUES.hazelIntervenes, GAME_STATES.BATTLE);
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
                battleText.textContent = 'Lancet used a powerful Dragon Steel attack!';
                setTimeout(() => {
                    battleText.textContent = 'Mega Raichu Y was defeated!';
                    setTimeout(() => {
                        battleScreen.classList.add('hidden');
                        showDialogue(DIALOGUES.victoryCongrats, GAME_STATES.CITY);
                    }, 1500);
                }, 1500);
            }, 1500);
        }, 1500);
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();

// Initial state
setTimeout(() => {
    showDialogue(['Welcome to Pokémon Destiny!', 'You wake up in your bedroom...'], GAME_STATES.BEDROOM);
}, 500);
