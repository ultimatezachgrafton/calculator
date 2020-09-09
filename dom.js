const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-clear-all]');
const andyButton = document.querySelector('[data-andy]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const keyPressedNumbersAllowed = ['0','1','2','3','4','5','6','7','8','9', '.'];
const keyPressedOperatorsAllowed = ['/', '*', '-', '+'];

let hasCalculated = false;

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    })
 })

operatorButtons.forEach(button => { 
    button.addEventListener('click', () => {
    calculator.chooseOperator(button.textContent);
    calculator.updateDisplay();
    })
 })

equalsButton.addEventListener('click', button => {
     calculator.calculate();
     calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

andyButton.addEventListener('click', button => {
    location.href = "https://www.youtube.com/channel/UCZ9qFEC82qM6Pk-54Q4TVWA";
})

document.addEventListener('keyup', (event => {
    calculator.onKeyUp(event);
    calculator.updateDisplay();
}))