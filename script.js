let currentInput = '0';

function updateDisplay() {
    const display = document.getElementById('display');
    // Previne que o texto saia do visor
    if (currentInput.length > 12) {
        display.style.fontSize = "1.8rem";
    } else {
        display.style.fontSize = "3.5rem";
    }
    display.innerText = currentInput;
}

function appendNumber(num) {
    if (currentInput === '0') currentInput = num;
    else currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/', '.'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

function calculate() {
    try {
        // eval é funcional para este escopo de projeto
        let result = eval(currentInput);
        currentInput = Number.isInteger(result) ? result.toString() : result.toFixed(4).toString();
    } catch {
        currentInput = "Erro";
    }
    updateDisplay();
}

// Expansão da Janela
function toggleScientific() {
    const win = document.getElementById('calc-window');
    win.classList.toggle('scientific-active');
}

// Funções Científicas
function scientific(func) {
    let val = parseFloat(currentInput);
    if (isNaN(val) && func !== 'pi') return;

    switch(func) {
        case 'sin': currentInput = Math.sin(val).toFixed(4); break;
        case 'cos': currentInput = Math.cos(val).toFixed(4); break;
        case 'tan': currentInput = Math.tan(val).toFixed(4); break;
        case 'sqrt': currentInput = Math.sqrt(val).toFixed(4); break;
        case 'pi': currentInput = Math.PI.toFixed(6); break;
        case 'percent': currentInput = (val / 100).toString(); break;
        case 'fact': currentInput = factorial(parseInt(val)).toString(); break;
    }
    updateDisplay();
}

function factorial(n) {
    if (n < 0) return "Erro";
    if (n === 0) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}