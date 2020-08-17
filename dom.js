class Calculator { 
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operator = undefined
    }

    appendNumber(number) {
        // Refuses to allow a second decimal point
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperator(operator) {
        if (this.currentOperand === '') return
        if (this.currentOperand !== '') {
            this.calculate()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate() {
        let calculation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev || isNaN(current))) return
        switch (this.operator) {
            case '+' :
                calculation = prev + current
                break
            case '-' : 
                calculation = prev - current
                break
            case '*' :
                calculation = prev * current
                break
            case '/' :
                calculation = prev / current
                break
            default:
                return
        }
        this.currentOperand= calculation
        this.operator = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // const?
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString( 'en' , {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            console.log(integerDisplay)
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operator != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    onKeyUp(event) {
        let keyName = event.key
        if (keyPressedNumbersAllowed.includes(keyName)) {
            this.appendNumber(keyName)
        }
        if (keyPressedOperatorsAllowed.includes(keyName)) {
            keyName == 'Enter' ? keyName = '=' : this.operator = keyName;
            console.log(keyName);
            // this.operator = keyName;
            this.calculate();
        }
        if (keyName == 'Backspace') {
            this.clear();
        }
        console.log(event)
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear-all]')
const andyButton = document.querySelector('[data-andy]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const keyPressedNumbersAllowed = ['0','1','2','3','4','5','6','7','8','9', '.'];
const keyPressedOperatorsAllowed = ['/', '*', '-', '+', 'Enter'];

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
 })

operatorButtons.forEach(button => { 
    button.addEventListener('click', () => {
    calculator.chooseOperator(button.innerText)
    calculator.updateDisplay()
    })
 })

equalsButton.addEventListener('click', button => {
     calculator.calculate()
     calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

andyButton.addEventListener('click', button => {
    location.href = "https://www.youtube.com/channel/UCZ9qFEC82qM6Pk-54Q4TVWA";
})

document.addEventListener('keyup', (event => {
    calculator.onKeyUp(event)
    calculator.updateDisplay()
}))