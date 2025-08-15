# Qual é a conta? - Jogo de Raciocínio Matemático

Um jogo educativo interativo para desenvolver o raciocínio lógico e matemático dos alunos através das 4 operações básicas.

## 🎮 Sobre o Jogo

O **Qual é a conta?** é um jogo web educativo que desafia os jogadores a usar cartas numeradas com as operações matemáticas básicas (+, -, ×, ÷) para formar um número alvo gerado pelos dados. Com regras flexíveis e múltiplos níveis de dificuldade, é perfeito para uso em sala de aula.

### ✨ Principais Características

- **Interface Moderna**: Design atrativo com plano de fundo matemático e gradientes
- **Múltiplas Telas**: Tela inicial, instruções, seleção de dificuldade e jogo
- **Três Níveis de Dificuldade**: Fácil, Normal e Difícil
- **Modo Avançado**: Desafio extra que exige uso de todas as cartas
- **Regras Flexíveis**: Não é obrigatório usar todas as cartas (modo normal)
- **Nova Carta**: Possibilidade de adicionar cartas extras
- **Sistema de Pontuação**: 1 ponto por carta utilizada
- **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🎯 Como Jogar

1. **Escolha a Dificuldade**: Selecione entre Fácil, Normal ou Difícil
2. **Observe o Alvo**: Os dados mostram o número que você deve formar
3. **Use as Cartas**: Combine os números das cartas com operações matemáticas
4. **Crie a Expressão**: Digite sua expressão matemática no campo de entrada
5. **Verifique**: Clique em "Verificar" para ver se acertou
6. **Ganhe Pontos**: Receba 1 ponto para cada carta utilizada
7. **Nova Rodada**: Continue jogando com novos desafios

### 🎚️ Níveis de Dificuldade

- **🟢 Fácil**: Cartas de 1 a 15, números alvo até 50 (2 dados)
- **🟡 Normal**: Cartas de 1 a 20, números alvo até 99 (2 dados)
- **🔴 Difícil**: Cartas de 1 a 20, números alvo até 299 (3 dados - centenas, dezenas, unidades)

### ⚡ Modo Avançado

- **Desafio Extra**: Toggle para ativar o modo avançado
- **Regra Especial**: Deve usar TODAS as cartas disponíveis para pontuar
- **Maior Dificuldade**: Ideal para jogadores experientes

## 🆕 Funcionalidades Principais

### Sistema de Pontuação
- **1 ponto por carta**: Cada carta utilizada na expressão vale 1 ponto
- **Feedback Visual**: Mostra quantos pontos foram ganhos
- **Controle Manual**: Professor pode anotar pontuação no quadro

### Funcionalidades Extras
- **Nova Carta**: Botão para adicionar uma carta extra quando necessário
- **Limpar Expressão**: Botão para resetar o campo de entrada
- **Atalhos de Teclado**: 
  - `Enter`: Verificar expressão
  - `Escape`: Limpar expressão
  - `Ctrl + Enter`: Nova rodada

### Validação Inteligente
- **Verificação de Cartas**: Confirma se os números usados estão disponíveis
- **Modo Avançado**: Valida se todas as cartas foram utilizadas
- **Cálculo Automático**: Avalia expressões matemáticas complexas
- **Feedback Claro**: Mensagens de sucesso ou erro detalhadas

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno com gradientes, animações e plano de fundo matemático
- **JavaScript ES6+**: Lógica completa do jogo e interatividade
- **Design Responsivo**: Media queries para diferentes dispositivos

## 📁 Estrutura do Projeto

```
qual-e-a-conta/
├── index.html          # Página principal com todas as telas
├── style.css           # Estilos modernos e responsivos
├── script.js           # Lógica completa do jogo
└── README.md           # Documentação do projeto
```

## 🚀 Como Usar

1. **Abrir o Jogo**: Abra o arquivo `index.html` em qualquer navegador moderno
2. **Sem Instalação**: Funciona offline após o primeiro carregamento
3. **Compatibilidade**: Testado em Chrome, Firefox, Safari e Edge

## 🎓 Uso Educacional

### Para Professores
- **Ferramenta Pedagógica**: Ideal para aulas de matemática
- **Diferentes Níveis**: Adapte a dificuldade conforme a turma
- **Sistema de Pontuação**: 1 ponto por carta utilizada
- **Controle Manual**: Professor anota pontuação no quadro
- **Rodadas Ilimitadas**: Use durante toda a aula
- **Modo Avançado**: Desafio extra para alunos avançados

### Estratégias de Ensino
- **Trabalho Individual**: Cada aluno resolve no seu ritmo
- **Competições**: Organize torneios entre grupos
- **Demonstrações**: Use no quadro interativo para explicações
- **Exercícios Dirigidos**: Crie desafios específicos
- **Progressão de Dificuldade**: Comece no fácil e avance gradualmente

### Benefícios Pedagógicos
- **Raciocínio Lógico**: Desenvolve pensamento estratégico
- **Operações Básicas**: Pratica +, -, ×, ÷ de forma divertida
- **Resolução de Problemas**: Estimula diferentes abordagens
- **Flexibilidade**: Regras adaptáveis ao nível dos alunos
- **Engajamento**: Interface atrativa mantém interesse

## 🎨 Design e Interface

### Plano de Fundo Matemático
- **Símbolos Matemáticos**: Padrão sutil com operadores e símbolos
- **Gradientes Modernos**: Tons de azul e roxo
- **Transparência**: Elementos flutuantes que não interferem na jogabilidade

### Elementos Visuais
- **Cartas Interativas**: Design moderno com animações
- **Dados Animados**: Efeito de rolagem realista
- **Feedback Visual**: Cores e animações para sucesso/erro
- **Responsividade**: Layout adaptativo para todos os dispositivos

## 🔧 Personalização

O jogo pode ser facilmente personalizado:
- **Cores**: Modifique as variáveis CSS para alterar o tema
- **Dificuldades**: Ajuste os ranges de números no JavaScript
- **Regras**: Modifique a validação conforme necessário
- **Pontuação**: Altere o sistema de pontos se desejado

## 📱 Responsividade

O jogo foi desenvolvido com foco em responsividade:
- **Desktop**: Interface completa com todos os elementos visíveis
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Interface otimizada para toque e telas pequenas
- **Orientação**: Funciona em modo retrato e paisagem

## 🎯 Exemplos de Uso

### Exemplo Fácil (Alvo: 25)
- **Cartas**: 3, 7, 10, 12, 15
- **Solução**: `10 + 15 = 25` (2 pontos)
- **Alternativa**: `12 + 10 + 3 = 25` (3 pontos)

### Exemplo Normal (Alvo: 67)
- **Cartas**: 4, 8, 15, 18, 20
- **Solução**: `20 * 4 - 15 + 8 - 18 = 67` (5 pontos - modo avançado)

### Exemplo Difícil (Alvo: 187)
- **Dados**: 1, 8, 7 (centena, dezena, unidade)
- **Cartas**: 2, 9, 11, 16, 19
- **Solução**: `19 * 11 - 16 - 9 - 2 = 187` (5 pontos - modo avançado)

## 🔄 Atualizações Recentes

### Versão 2.0
- ✅ **Novo Nome**: "Qual é a conta?" (livre de direitos autorais)
- ✅ **Modo Difícil Aprimorado**: Terceiro dado para números até 299
- ✅ **Modo Avançado**: Toggle para exigir uso de todas as cartas
- ✅ **Sistema de Pontuação**: 1 ponto por carta utilizada
- ✅ **Plano de Fundo Matemático**: Design inspirado em símbolos matemáticos
- ✅ **Interface Melhorada**: Navegação mais intuitiva e feedback visual

## 📄 Licença

Este projeto foi desenvolvido para uso educacional. Livre para uso em escolas e instituições de ensino.

## 🤝 Contribuições

Sugestões e melhorias são sempre bem-vindas! Este jogo foi criado especificamente para atender às necessidades educacionais de professores de matemática.

---

**Desenvolvido para promover o aprendizado matemático de forma divertida e interativa!** 🧮✨

### 🎲 Divirta-se calculando!

