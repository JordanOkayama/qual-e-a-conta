class QualEAConta {
    constructor() {
        // Configurações do jogo
        this.difficultySettings = {
            easy: {
                name: 'Fácil',
                cardRange: [1, 15],
                targetRange: [10, 50],
                diceCount: 2,
                timerDuration: 300 // 5 minutos
            },
            normal: {
                name: 'Normal',
                cardRange: [1, 20],
                targetRange: [10, 99],
                diceCount: 2,
                timerDuration: 180 // 3 minutos
            },
            hard: {
                name: 'Difícil',
                cardRange: [1, 20],
                targetRange: [100, 299],
                diceCount: 3,
                timerDuration: 90 // 1.5 minutos
            }
        };

        // Estado do jogo
        this.currentMode = null; // 'treino', 'arcade', 'timer'
        this.currentDifficulty = 'normal';
        this.currentScreen = 'home';
        this.gameState = {
            score: 0,
            lives: 3,
            timeLeft: 180, // será definido pela dificuldade
            target: 0,
            cards: [],
            expression: [],
            isAdvancedMode: false,
            timer: null
        };

        // Elementos DOM
        this.screens = {
            home: document.getElementById('home-screen'),
            gameModes: document.getElementById('game-modes-screen'),
            difficulty: document.getElementById('difficulty-screen'),
            game: document.getElementById('game-screen'),
            gameOver: document.getElementById('game-over-screen')
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('home');
    }

    bindEvents() {
        // Navegação principal
        document.getElementById('play-btn').addEventListener('click', () => {
            this.showScreen('game-modes');
        });

        document.getElementById('instructions-btn').addEventListener('click', () => {
            this.showScreen('instructions');
        });

        // Seleção de modos
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.dataset.mode;
                this.selectGameMode(mode);
            });
        });

        // Botões de voltar
        document.getElementById('back-to-home-from-modes').addEventListener('click', () => {
            this.showScreen('home');
        });

        document.getElementById('back-to-home-from-difficulty').addEventListener('click', () => {
            this.showScreen('game-modes');
        });

        document.getElementById('back-to-modes').addEventListener('click', () => {
            this.showScreen('game-modes');
        });

        // Game Over
        document.getElementById('new-game-btn-over').addEventListener('click', () => {
            this.startNewGame();
        });

        document.getElementById('back-to-home-over').addEventListener('click', () => {
            this.showScreen('home');
        });

        // Seleção de dificuldade
        document.querySelectorAll('.difficulty-card').forEach(card => {
            card.addEventListener('click', () => {
                const difficulty = card.dataset.difficulty;
                this.setDifficulty(difficulty);
                this.startGame();
            });
        });

        // Controles do jogo
        document.getElementById('add-card-btn').addEventListener('click', () => {
            this.addNewCard();
        });

        document.getElementById('check-expression-btn').addEventListener('click', () => {
            this.checkExpression();
        });

        document.getElementById('clear-expression-btn').addEventListener('click', () => {
            this.clearExpression();
        });

        // Botões de operação
        document.querySelectorAll('.op-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.addOperation(btn.dataset.op);
            });
        });

        // Toggle modo avançado
        document.getElementById('advanced-mode-toggle').addEventListener('change', (e) => {
            this.gameState.isAdvancedMode = e.target.checked;
            this.updateAdvancedModeDisplay();
        });

        document.getElementById("new-round-btn").addEventListener("click", () => {
            this.newRound();
        });

        // Drag and Drop
        this.setupCardClicks();
    }

    showScreen(screenId) {
        // Esconder todas as telas
        Object.values(this.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });

        // Mostrar a tela selecionada
        const targetScreen = this.screens[screenId] || document.getElementById(screenId + '-screen');
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }

    selectGameMode(mode) {
        this.currentMode = mode;
        
        if (mode === 'treino') {
            // Modo treino vai direto para seleção de dificuldade
            this.showScreen('difficulty');
        } else {
            // Modos arcade e timer também vão para seleção de dificuldade
            this.showScreen('difficulty');
        }
    }

    setDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        const settings = this.difficultySettings[difficulty];
        
        // Atualizar display de dificuldade
        const difficultyDisplay = document.getElementById('current-difficulty');
        if (difficultyDisplay) {
            difficultyDisplay.textContent = settings.name;
            difficultyDisplay.className = 'difficulty-badge ' + difficulty;
        }
    }

    startGame() {
        this.resetGameState();
        this.setupGameMode();
        this.showScreen('game');
        this.newRound();
    }

    resetGameState() {
        this.gameState = {
            score: 0,
            lives: this.currentMode === 'arcade' ? 3 : 0,
            timeLeft: this.currentMode === 'timer' ? this.difficultySettings[this.currentDifficulty].timerDuration : 0,
            target: 0,
            cards: [],
            expression: [],
            isAdvancedMode: false,
            timer: null
        };

        // Limpar timer anterior se existir
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
        }

        // Esconder o botão Nova Rodada por padrão
        const newRoundBtn = document.getElementById("new-round-btn");
        if (newRoundBtn) {
            newRoundBtn.style.display = "none";
        }
    }

    setupGameMode() {
        const scoreDisplay = document.getElementById('score-display');
        const livesDisplay = document.getElementById('lives-display');
        const timerDisplay = document.getElementById('timer-display');
        const advancedToggle = document.getElementById('advanced-toggle');

        // Esconder todos os displays primeiro
        [scoreDisplay, livesDisplay, timerDisplay, advancedToggle].forEach(el => {
            if (el) el.style.display = 'none';
        });

        switch (this.currentMode) {
            case 'treino':
                if (advancedToggle) advancedToggle.style.display = 'flex';
                if (document.getElementById('new-round-btn')) document.getElementById('new-round-btn').style.display = 'inline-block';
                break;
            
            case 'arcade':
                if (scoreDisplay) scoreDisplay.style.display = 'flex';
                if (livesDisplay) livesDisplay.style.display = 'flex';
                this.updateScoreDisplay();
                this.updateLivesDisplay();
                break;
            
            case 'timer':
                if (scoreDisplay) scoreDisplay.style.display = 'flex';
                if (timerDisplay) timerDisplay.style.display = 'flex';
                this.updateScoreDisplay();
                this.startTimer();
                break;
        }
    }

    startTimer() {
        this.updateTimerDisplay();
        this.gameState.timer = setInterval(() => {
            this.gameState.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.gameState.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    updateScoreDisplay() {
        const scoreElement = document.getElementById('current-score');
        if (scoreElement) {
            scoreElement.textContent = this.gameState.score;
        }
    }

    updateLivesDisplay() {
        const livesElement = document.getElementById('current-lives');
        if (livesElement) {
            livesElement.textContent = this.gameState.lives;
        }
    }

    updateTimerDisplay() {
        const timerElement = document.getElementById('current-timer');
        if (timerElement) {
            const minutes = Math.floor(this.gameState.timeLeft / 60);
            const seconds = this.gameState.timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    newRound() {
        this.generateTarget();
        this.generateCards();
        this.clearExpression();
        this.updateDisplay();
    }

    generateTarget() {
        const settings = this.difficultySettings[this.currentDifficulty];
        
        if (settings.diceCount === 3) {
            // Modo difícil com 3 dados
            const hundreds = Math.floor(Math.random() * 3); // 0-2
            const tens = Math.floor(Math.random() * 10); // 0-9
            const units = Math.floor(Math.random() * 10); // 0-9
            
            this.gameState.target = hundreds * 100 + tens * 10 + units;
            
            // Atualizar displays dos dados
            document.getElementById('dice1-value').textContent = hundreds;
            document.getElementById('dice2-value').textContent = tens;
            document.getElementById('dice3-value').textContent = units;
            document.getElementById('dice3').style.display = 'flex';
        } else {
            // Modo fácil/normal com 2 dados
            this.gameState.target = Math.floor(Math.random() * (settings.targetRange[1] - settings.targetRange[0] + 1)) + settings.targetRange[0];
            
            // Atualizar displays dos dados
            document.getElementById("dice1-value").textContent = Math.floor(this.gameState.target / 10);
            document.getElementById("dice2-value").textContent = this.gameState.target % 10;
            document.getElementById("dice3").style.display = "none";
        }
        
        document.getElementById('target-display').textContent = this.gameState.target;
    }

    generateCards() {
        const settings = this.difficultySettings[this.currentDifficulty];
        this.gameState.cards = [];
        
        // Gerar 5 cartas únicas
        while (this.gameState.cards.length < 5) {
            const card = Math.floor(Math.random() * (settings.cardRange[1] - settings.cardRange[0] + 1)) + settings.cardRange[0];
            if (!this.gameState.cards.includes(card)) {
                this.gameState.cards.push(card);
            }
        }
        
        this.renderCards();
    }

    renderCards() {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        this.gameState.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card clickable';
            cardElement.dataset.value = card;
            cardElement.dataset.index = index;
            cardElement.innerHTML = `<span class="card-number">${card}</span>`;
            
            // Adicionar evento de clique
            cardElement.addEventListener('click', () => {
                if (!this.isCardUsed(index)) {
                    this.addToExpression(card, 'card', index);
                }
            });
            
            container.appendChild(cardElement);
        });
    }

    addNewCard() {
        const settings = this.difficultySettings[this.currentDifficulty];
        let newCard;
        
        // Gerar uma nova carta que não existe
        do {
            newCard = Math.floor(Math.random() * (settings.cardRange[1] - settings.cardRange[0] + 1)) + settings.cardRange[0];
        } while (this.gameState.cards.includes(newCard));
        
        this.gameState.cards.push(newCard);
        this.renderCards();
    }

    setupCardClicks() {
        // A funcionalidade de clique agora é adicionada diretamente no renderCards()
        // Esta função pode ser usada para configurações adicionais se necessário
    }

    addOperation(operation) {
        this.addToExpression(operation, 'operation');
    }

    addToExpression(value, type, cardIndex = null) {
        this.gameState.expression.push({
            value: value,
            type: type,
            cardIndex: cardIndex
        });
        
        this.updateExpressionDisplay();
        this.updateCardsDisplay();
    }

    updateExpressionDisplay() {
        const display = document.getElementById('expression-display');
        const expressionText = this.gameState.expression.map(item => item.value).join(' ');
        display.textContent = expressionText || 'Clique nas cartas e use as operações';
    }

    updateCardsDisplay() {
        // Atualizar visual das cartas usadas
        document.querySelectorAll('.card').forEach((card, index) => {
            if (this.isCardUsed(index)) {
                card.classList.add('used');
                card.style.pointerEvents = 'none';
            } else {
                card.classList.remove('used');
                card.style.pointerEvents = 'auto';
            }
        });
    }

    isCardUsed(cardIndex) {
        return this.gameState.expression.some(item => item.cardIndex === cardIndex);
    }

    clearExpression() {
        this.gameState.expression = [];
        this.updateExpressionDisplay();
        this.updateCardsDisplay();
        this.clearResult();
    }

    checkExpression() {
        if (this.gameState.expression.length === 0) {
            this.showResult('❌ Monte uma expressão primeiro!', 'error');
            return;
        }

        const expressionText = this.gameState.expression.map(item => {
            return item.value === '×' ? '*' : item.value === '÷' ? '/' : item.value;
        }).join('');

        try {
            // Validar expressão
            const result = this.evaluateExpression(expressionText);
            
            if (result === this.gameState.target) {
                this.handleCorrectAnswer();
            } else {
                this.handleWrongAnswer(result);
            }
        } catch (error) {
            this.showResult('❌ Expressão inválida!', 'error');
        }
    }

    evaluateExpression(expression) {
        // Validar caracteres permitidos
        if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
            throw new Error('Caracteres inválidos');
        }
        
        // Usar Function constructor para avaliar de forma segura
        return Function('"use strict"; return (' + expression + ')')();
    }

    handleCorrectAnswer() {
        const cardsUsed = this.gameState.expression.filter(item => item.type === 'card').length;
        
        // Verificar modo avançado
        if (this.gameState.isAdvancedMode && cardsUsed !== this.gameState.cards.length) {
            this.showResult('⚡ Modo Avançado: Use TODAS as cartas!', 'warning');
            return;
        }
        
        // Calcular pontos
        const points = cardsUsed;
        this.gameState.score += points;
        
        this.showResult(`✅ Correto! +${points} ponto${points > 1 ? 's' : ''}`, 'success');
        
        if (this.currentMode !== 'treino') {
            this.updateScoreDisplay();
        }
        
        // Avanço automático para modos Arcade e Timer
            if (this.currentMode === 'arcade' || this.currentMode === 'timer') {
                setTimeout(() => {
                    this.newRound();
                }, 1500);
            } else if (this.currentMode === 'treino') {
                // Modo treino - permite continuar e mostra feedback
                this.showResult('✅ Correto! Clique em "Nova Carta" ou continue praticando!', 'success');
            }
    }

    handleWrongAnswer(result) {
        this.showResult(`❌ Incorreto! Resultado: ${result}`, 'error');
        
        if (this.currentMode === 'arcade') {
            this.gameState.lives--;
            this.updateLivesDisplay();
            
            if (this.gameState.lives <= 0) {
                setTimeout(() => {
                    this.endGame();
                }, 1500);
            }
        }
    }

    showResult(message, type) {
        const resultDisplay = document.getElementById('result-display');
        resultDisplay.textContent = message;
        resultDisplay.className = `result-display ${type}`;
        resultDisplay.style.display = 'block';
    }

    clearResult() {
        const resultDisplay = document.getElementById('result-display');
        resultDisplay.style.display = 'none';
    }

    updateAdvancedModeDisplay() {
        // Implementar feedback visual para modo avançado se necessário
    }

    endGame() {
        console.log("endGame() called");
        // Parar timer se existir
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
            console.log("Timer cleared in endGame()");
        }
        
        // Atualizar tela de game over
        document.getElementById('final-score').textContent = this.gameState.score;
        
        let details = '';
        if (this.currentMode === 'arcade') {
            details = 'Suas vidas acabaram!';
        } else if (this.currentMode === 'timer') {
            details = 'Tempo esgotado!';
        }
        document.getElementById('score-details').textContent = details;
        
        this.showScreen('game-over');
    }

    startNewGame() {
        this.startGame();
    }

    updateDisplay() {
        // Atualizar qualquer display necessário
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.game = new QualEAConta();
});

