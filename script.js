let currentInput = '0';

/**
 * Atualiza o visor da calculadora e ajusta o tamanho da fonte
 * para que números grandes não transbordem.
 */
function updateDisplay() {
    const display = document.getElementById('display');
    
    if (currentInput.length > 12) {
        display.style.fontSize = "1.8rem";
    } else {
        display.style.fontSize = "3.5rem";
    }
    
    display.innerText = currentInput;
}

/**
 * Adiciona números ao visor
 */
function appendNumber(num) {
    if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

/**
 * Adiciona operadores básicos (+, -, *, /)
 */
function appendOperator(op) {
    const lastChar = currentInput.slice(-1);
    // Impede a repetição de operadores seguidos
    if (['+', '-', '*', '/', '.', '**'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    updateDisplay();
}

/**
 * Limpa todo o visor
 */
function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

/**
 * Apaga o último caractere digitado (Backspace)
 */
function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

/**
 * Executa o cálculo da expressão atual
 */
function calculate() {
    try {
        // Resolve a string matemática. O eval interpreta '**' como potência automaticamente.
        let result = eval(currentInput);
        
        // Formata o resultado para não ter dízimas infinitas no visor
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(8));
        }
        
        currentInput = result.toString();
    } catch (e) {
        currentInput = "Erro";
    }
    updateDisplay();
}

/**
 * Alterna a largura da janela para o modo científico
 */
function toggleScientific() {
    const win = document.getElementById('calc-window');
    win.classList.toggle('scientific-active');
}

/**
 * Funções Científicas e Lógica de Porcentagem
 */
function scientific(func) {
    let val = parseFloat(currentInput);
    if (isNaN(val) && func !== 'pi') return;

    switch(func) {
        case 'sin': 
            currentInput = Math.sin(val).toFixed(4); 
            break;
        case 'cos': 
            currentInput = Math.cos(val).toFixed(4); 
            break;
        case 'tan': 
            currentInput = Math.tan(val).toFixed(4); 
            break;
        case 'sqrt': 
            currentInput = Math.sqrt(val).toFixed(4); 
            break;
        case 'pi': 
            currentInput = (Math.PI).toFixed(6); 
            break;
        case 'fact': 
            currentInput = factorial(parseInt(val)).toString(); 
            break;
        case 'percent': 
            // Lógica Contextual: 50 + 50% vira 50 + 25
            // Regex para separar o último número do resto da expressão
            let parts = currentInput.split(/([\+\-\*\/])/);
            
            if (parts.length >= 3) {
                let baseValue = parseFloat(parts[parts.length - 3]);
                let operator = parts[parts.length - 2];
                let percentOfBase = parseFloat(parts[parts.length - 1]);
                
                let calculatedValue = (baseValue * percentOfBase) / 100;
                
                // Reconstrói a string substituindo apenas a parte da porcentagem
                parts[parts.length - 1] = calculatedValue;
                currentInput = parts.join('');
            } else {
                // Se for um número isolado, apenas divide por 100
                currentInput = (val / 100).toString();
            }
            break;
    }
    updateDisplay();
}

/**
 * Função auxiliar para cálculo de Fatorial
 */
function factorial(n) {
    if (n < 0) return "Erro";
    if (n === 0) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}