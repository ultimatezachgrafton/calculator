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

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)    

    }

    appendNumber(number) {
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
        if (isNan(prev || isNan(current))) return
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

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDigits = ''
        } else {
            integerDisplay = integerDigits.toLocaleString( 'en' , {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits =! null) {
            return `${integerDisplay}`//.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operator!= null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear')
const allClearButton = document.querySelector('[data-clear-all]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

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

// deleteButton.addEventListener('click', button => {
//     calculator.delete()
//     calculator.updateDisplay()
// })