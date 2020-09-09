class Calculator { 
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;
    }

    appendNumber(number) {
        // Checks if the number currently displayed is the result of a previous calculation
        // If so, it will clear instead of appending 
        if (hasCalculated) {
            this.currentOperand = '';
            hasCalculated = false;
        }
        // Refuses to allow a second decimal point
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand + number;
    }

    chooseOperator(operator) {
        this.currentOperand === '' ? null : this.calculate();
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    calculate() {
        let calculation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev || isNaN(current))) return;
        switch (this.operator) {
            case '+' :
                calculation = prev + current;
                break;
            case '-' : 
                calculation = prev - current;
                break;
            case '*' :
                calculation = prev * current;
                break;
            case '/' :
                calculation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = calculation;
        this.operator = undefined;
        this.previousOperand = '';
        hasCalculated = true;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString().split('.');
        const integerDigits = parseFloat(stringNumber[0]);
        const decimalDigits = stringNumber[1];
        let integerDisplay;
        integerDisplay = isNaN(integerDigits) ? '' : integerDisplay = integerDigits.toLocaleString( 'en', { 
            maximumFractionDigits: 0
        });
        return decimalDigits !== undefined ? `${integerDisplay}.${decimalDigits}` : integerDisplay;
    }

    updateDisplay() {
        this.currentOperandTextElement.textContent = this.getDisplayNumber(this.currentOperand)
        if (this.operator !== undefined) {
            this.previousOperandTextElement.textContent =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`;
        } else {
            this.previousOperandTextElement.textContent = '';
        }
    }

    onKeyUp(event) {
        let keyPressed = event.key
        if (keyPressedNumbersAllowed.includes(keyPressed)) {
            this.appendNumber(keyPressed);
        } else if (keyPressedOperatorsAllowed.includes(keyPressed)) {
            this.chooseOperator(keyPressed);
        } else if (keyPressed === 'Enter') {
            this.calculate();
        } else if (this.operator === 'Backspace') {
            this.clear();
        }
    }
}