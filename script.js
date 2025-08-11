class QualEAConta {
    constructor() {
        this.cards = [];
        this.targetNumber = 0;
        this.dice1Value = 0;
        this.dice2Value = 0;
        this.dice3Value = 0;
        this.currentDifficulty = 'normal';
        this.isAdvancedMode = false;
        this.difficultySettings = {
            easy: {
                cardRange: [1, 15],
                targetMax: 50,
                name: 'Fácil',
                diceCount: 2
            },
            normal: {
                cardRange: [1, 20],
                targetMax: 99,
                name: 'Normal',
                diceCount: 2
            },
            hard: {
                cardRange: [1, 20],
                targetMax: 299,
                name: 'Difícil',
                diceCount: 3
            }
        };
        
        this.initializeElements();
        this.bindEvents();
        this.showScreen('home-screen');
    }
    
    initializeElements() {
        // Elementos das telas
        this.screens = {
            home: document.getElementById('home-screen'),
            instructions: document.getElementById('instructions-screen'),
            difficulty: document.getElementById('difficulty-screen'),
            game: document.getElementById('game-screen')
        };
        
        // Elementos do jogo
        this.dice1Element = document.getElementById('dice1-value');
        this.dice2Element = document.getElementById('dice2-value');
        this.dice3Element = document.getElementById('dice3-value');
        this.dice3Container = document.getElementById('dice3');
        this.targetDisplay = document.getElementById('target-display');
        this.cardsContainer = document.getElementById('cards-container');
        this.expressionInput = document.getElementById('expression');
        this.checkBtn = document.getElementById('check-btn');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.resultDisplay = document.getElementById('result-display');
        this.addCardBtn = document.getElementById('add-card-btn');
        this.clearExpressionBtn = document.getElementById('clear-expression-btn');
        this.currentDifficultyDisplay = document.getElementById('current-difficulty');
    }
    
    bindEvents() {
        // Navegação entre telas
        document.getElementById('play-btn').addEventListener('click', () => {
            this.showScreen('difficulty-screen');
        });
        
        document.getElementById('instructions-btn').addEventListener('click', () => {
            this.showScreen('instructions-screen');
        });
        
        document.getElementById('back-to-home').addEventListener('click', () => {
            this.showScreen('home-screen');
        });
        
        document.getElementById('back-to-home-from-difficulty').addEventListener('click', () => {
            this.showScreen('home-screen');
        });
        
        document.getElementById('back-to-difficulty').addEventListener('click', () => {
            this.showScreen('difficulty-screen');
        });
        
        // Seleção de dificuldade
        document.querySelectorAll('.select-difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.difficulty-card');
                const difficulty = card.dataset.difficulty;
                this.setDifficulty(difficulty);
                this.showScreen('game-screen');
                this.startNewGame();
            });
        });
        
        // Controles do jogo
        this.checkBtn.addEventListener('click', () => this.checkExpression());
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
        this.addCardBtn.addEventListener('click', () => this.addNewCard());
        this.clearExpressionBtn.addEventListener('click', () => this.clearExpression());
        
        // Toggle do modo avançado
        const advancedToggle = document.getElementById('advanced-mode-toggle');
        const advancedNotice = document.getElementById('advanced-mode-notice');
        
        advancedToggle.addEventListener('change', () => {
            this.isAdvancedMode = advancedToggle.checked;
            if (this.isAdvancedMode) {
                advancedNotice.style.display = 'block';
            } else {
                advancedNotice.style.display = 'none';
            }
        });
        
        // Input da expressão
        this.expressionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkExpression();
            }
        });
        
        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearExpression();
            } else if (e.ctrlKey && e.key === 'Enter') {
                this.startNewGame();
            }
        });
        
        // Permitir apenas números, operadores e parênteses
        this.expressionInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9+\-*/().\s]/g, '');
        });
    }
    
    showScreen(screenId) {
        // Esconder todas as telas
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Mostrar a tela selecionada
        document.getElementById(screenId).classList.add('active');
    }
    
    setDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        const settings = this.difficultySettings[difficulty];
        this.currentDifficultyDisplay.textContent = settings.name;
        
        // Atualizar badge de dificuldade com cor
        const badge = this.currentDifficultyDisplay.parentElement;
        badge.className = 'difficulty-badge';
        badge.classList.add(difficulty);
        
        // Mostrar/esconder terceiro dado conforme dificuldade
        if (settings.diceCount === 3) {
            this.dice3Container.style.display = 'flex';
        } else {
            this.dice3Container.style.display = 'none';
        }
    }
    
    startNewGame() {
        this.generateCards();
        this.rollDice();
        this.clearExpression();
        this.clearResult();
        this.updateDisplay();
    }
    
    generateCards() {
        const settings = this.difficultySettings[this.currentDifficulty];
        const [min, max] = settings.cardRange;
        
        // Gerar 5 números únicos dentro da faixa da dificuldade
        this.cards = [];
        const availableNumbers = [];
        for (let i = min; i <= max; i++) {
            availableNumbers.push(i);
        }
        
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            this.cards.push(availableNumbers.splice(randomIndex, 1)[0]);
        }
        
        this.cards.sort((a, b) => a - b);
    }
    
    rollDice() {
        const settings = this.difficultySettings[this.currentDifficulty];
        
        // Animação dos dados
        const dice1 = document.getElementById('dice1');
        const dice2 = document.getElementById('dice2');
        const dice3 = document.getElementById('dice3');
        
        dice1.classList.add('rolling');
        dice2.classList.add('rolling');
        if (settings.diceCount === 3) {
            dice3.classList.add('rolling');
        }
        
        setTimeout(() => {
            if (this.currentDifficulty === 'easy') {
                // Para fácil: números até 50
                this.dice1Value = Math.floor(Math.random() * 5) + 1; // 1-5
                this.dice2Value = Math.floor(Math.random() * 10); // 0-9
                this.targetNumber = this.dice1Value * 10 + this.dice2Value;
                
                // Garantir que não passe de 50
                if (this.targetNumber > 50) {
                    this.targetNumber = Math.floor(Math.random() * 50) + 1;
                    this.dice1Value = Math.floor(this.targetNumber / 10);
                    this.dice2Value = this.targetNumber % 10;
                }
            } else if (this.currentDifficulty === 'normal') {
                // Para normal: números até 99
                this.dice1Value = Math.floor(Math.random() * 9) + 1; // 1-9
                this.dice2Value = Math.floor(Math.random() * 10); // 0-9
                this.targetNumber = this.dice1Value * 10 + this.dice2Value;
            } else { // hard
                // Para difícil: números até 299 com 3 dados
                this.dice1Value = Math.floor(Math.random() * 3); // 0-2 (centenas)
                this.dice2Value = Math.floor(Math.random() * 10); // 0-9 (dezenas)
                this.dice3Value = Math.floor(Math.random() * 10); // 0-9 (unidades)
                this.targetNumber = this.dice1Value * 100 + this.dice2Value * 10 + this.dice3Value;
                
                // Garantir que seja pelo menos 100 para ser desafiador
                if (this.targetNumber < 100) {
                    this.targetNumber += 100;
                    this.dice1Value = Math.floor(this.targetNumber / 100);
                    this.dice2Value = Math.floor((this.targetNumber % 100) / 10);
                    this.dice3Value = this.targetNumber % 10;
                }
            }
            
            dice1.classList.remove('rolling');
            dice2.classList.remove('rolling');
            if (settings.diceCount === 3) {
                dice3.classList.remove('rolling');
            }
            
            this.updateDisplay();
        }, 600);
    }
    
    updateDisplay() {
        const settings = this.difficultySettings[this.currentDifficulty];
        
        // Atualizar dados
        this.dice1Element.textContent = this.dice1Value !== undefined ? this.dice1Value : '?';
        this.dice2Element.textContent = this.dice2Value !== undefined ? this.dice2Value : '?';
        
        if (settings.diceCount === 3) {
            this.dice3Element.textContent = this.dice3Value !== undefined ? this.dice3Value : '?';
        }
        
        this.targetDisplay.textContent = this.targetNumber || '--';
        
        // Atualizar cartas
        this.updateCardsDisplay();
    }
    
    updateCardsDisplay() {
        this.cardsContainer.innerHTML = '';
        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.textContent = card;
            cardElement.addEventListener('click', () => this.insertCardValue(card));
            
            // Animação de aparição
            setTimeout(() => {
                cardElement.classList.add('new');
                setTimeout(() => {
                    cardElement.classList.remove('new');
                }, 500);
            }, index * 100);
            
            this.cardsContainer.appendChild(cardElement);
        });
    }
    
    addNewCard() {
        const settings = this.difficultySettings[this.currentDifficulty];
        const [min, max] = settings.cardRange;
        
        // Gerar um novo número que não esteja nas cartas atuais
        let newCard;
        let attempts = 0;
        do {
            newCard = Math.floor(Math.random() * (max - min + 1)) + min;
            attempts++;
        } while (this.cards.includes(newCard) && attempts < 50);
        
        // Se não conseguir um número único, usar qualquer número da faixa
        if (attempts >= 50) {
            newCard = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        this.cards.push(newCard);
        this.cards.sort((a, b) => a - b);
        this.updateCardsDisplay();
        
        // Feedback visual
        this.showResult(`Nova carta adicionada: ${newCard}`, 'success');
        setTimeout(() => {
            this.clearResult();
        }, 2000);
    }
    
    insertCardValue(value) {
        const currentExpression = this.expressionInput.value;
        const cursorPosition = this.expressionInput.selectionStart;
        
        const newExpression = currentExpression.slice(0, cursorPosition) + 
                             value + 
                             currentExpression.slice(cursorPosition);
        
        this.expressionInput.value = newExpression;
        this.expressionInput.focus();
        this.expressionInput.setSelectionRange(cursorPosition + value.toString().length, cursorPosition + value.toString().length);
    }
    
    checkExpression() {
        const expression = this.expressionInput.value.trim();
        
        if (!expression) {
            this.showResult('Por favor, digite uma expressão matemática.', 'error');
            return;
        }
        
        try {
            // Validar se a expressão usa apenas cartas disponíveis
            const validation = this.validateExpression(expression);
            
            if (!validation.isValid) {
                this.showResult(validation.message, 'error');
                return;
            }
            
            // Calcular o resultado
            const result = this.evaluateExpression(expression);
            
            if (result === this.targetNumber) {
                const cardsUsed = this.countCardsUsed(expression);
                const points = cardsUsed;
                this.showResult(`🎉 Parabéns! Você acertou! ${expression} = ${result} (${points} ${points === 1 ? 'ponto' : 'pontos'})`, 'success');
            } else {
                this.showResult(`❌ Quase lá! ${expression} = ${result}, mas o alvo é ${this.targetNumber}`, 'error');
            }
            
        } catch (error) {
            this.showResult('Expressão inválida. Verifique a sintaxe.', 'error');
        }
    }
    
    countCardsUsed(expression) {
        const numbersInExpression = expression.match(/\d+/g);
        if (!numbersInExpression) return 0;
        
        const numbers = numbersInExpression.map(num => parseInt(num));
        const cardsCopy = [...this.cards];
        let cardsUsed = 0;
        
        for (let num of numbers) {
            const index = cardsCopy.indexOf(num);
            if (index !== -1) {
                cardsCopy.splice(index, 1);
                cardsUsed++;
            }
        }
        
        return cardsUsed;
    }
    
    validateExpression(expression) {
        // Extrair todos os números da expressão
        const numbersInExpression = expression.match(/\d+/g);
        
        if (!numbersInExpression) {
            return { isValid: false, message: 'A expressão deve conter números.' };
        }
        
        // Converter para números
        const numbers = numbersInExpression.map(num => parseInt(num));
        
        // Verificar se todos os números estão nas cartas disponíveis
        const cardsCopy = [...this.cards];
        
        for (let num of numbers) {
            const index = cardsCopy.indexOf(num);
            if (index === -1) {
                return { 
                    isValid: false, 
                    message: `O número ${num} não está disponível nas cartas.` 
                };
            }
            cardsCopy.splice(index, 1);
        }
        
        // Verificar modo avançado
        if (this.isAdvancedMode) {
            if (cardsCopy.length > 0) {
                return {
                    isValid: false,
                    message: 'No modo avançado, você deve usar TODAS as cartas disponíveis.'
                };
            }
        }
        
        return { isValid: true };
    }
    
    evaluateExpression(expression) {
        // Função segura para avaliar expressões matemáticas
        const cleanExpression = expression.replace(/\s/g, '');
        
        // Verificar se contém apenas números, operadores e parênteses
        if (!/^[0-9+\-*/().]+$/.test(cleanExpression)) {
            throw new Error('Caracteres inválidos na expressão');
        }
        
        // Usar Function constructor para avaliar de forma mais segura que eval
        try {
            const result = Function('"use strict"; return (' + cleanExpression + ')')();
            
            // Verificar se o resultado é um número válido
            if (typeof result !== 'number' || !isFinite(result)) {
                throw new Error('Resultado inválido');
            }
            
            // Arredondar para evitar problemas de ponto flutuante
            return Math.round(result * 1000000) / 1000000;
            
        } catch (error) {
            throw new Error('Erro na avaliação da expressão');
        }
    }
    
    showResult(message, type) {
        this.resultDisplay.textContent = message;
        this.resultDisplay.className = `result-display ${type}`;
        
        // Scroll suave para o resultado
        this.resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    clearExpression() {
        this.expressionInput.value = '';
        this.expressionInput.focus();
    }
    
    clearResult() {
        this.resultDisplay.textContent = '';
        this.resultDisplay.className = 'result-display';
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new QualEAConta();
});

// Adicionar funcionalidades extras
document.addEventListener('DOMContentLoaded', () => {
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        // Ctrl + Enter para nova rodada
        if (e.ctrlKey && e.key === 'Enter') {
            const newGameBtn = document.getElementById('new-game-btn');
            if (newGameBtn && !newGameBtn.disabled) {
                newGameBtn.click();
            }
        }
        
        // Escape para limpar expressão
        if (e.key === 'Escape') {
            const clearBtn = document.getElementById('clear-expression-btn');
            if (clearBtn) {
                clearBtn.click();
            }
        }
    });
    
    // Melhorar a acessibilidade
    const expressionInput = document.getElementById('expression');
    if (expressionInput) {
        expressionInput.setAttribute('aria-label', 'Digite sua expressão matemática aqui');
    }
    
    // Adicionar tooltips
    const addCardBtn = document.getElementById('add-card-btn');
    if (addCardBtn) {
        addCardBtn.title = 'Adicionar uma nova carta se não conseguir formar o número alvo';
    }
    
    const clearBtn = document.getElementById('clear-expression-btn');
    if (clearBtn) {
        clearBtn.title = 'Limpar a expressão atual (Esc)';
    }
    
    const newGameBtn = document.getElementById('new-game-btn');
    if (newGameBtn) {
        newGameBtn.title = 'Iniciar uma nova rodada (Ctrl+Enter)';
    }
});

