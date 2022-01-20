
let displayValueCharacterArray = [];
let currentDisplayStringValue = "";
let firstOperand = null;
let secondOperand = null;
let lastKnownOperator = null;
const calculatorContainer = document.querySelector('.calculator-container');
const display = document.querySelector('.display');

const mathOperationFunctions = {
    '+': (a, b) => Number(a) + Number(b),
    '-': (a, b) => Number(a) - Number(b),
    '*': (a, b) => Number(a) * Number(b),
    '/': (a, b) => Number(a) / Number(b),
};

const transformingFunctions = {
    clear: () => {
        display.textContent = '0';
        displayValueCharacterArray.splice(0, displayValueCharacterArray.length);
        currentDisplayStringValue = "";
        firstOperand = null;
        secondOperand = null;
        lastKnownOperator = null;
    }, 
    negate: () => {
        if (displayValueCharacterArray.length === 0) return
        if (displayValueCharacterArray[0] !== '-'){
            displayValueCharacterArray.unshift('-');
            updateDisplay()
        } else {
            displayValueCharacterArray.splice(0, 1);
            updateDisplay()

        };     
    },
}

function operate(operator, a, b){
    let fn = mathOperationFunctions[operator];
    return fn(a, b);
}

function updateDisplay() {
    currentDisplayStringValue = displayValueCharacterArray.join('');
    display.textContent = currentDisplayStringValue;
};

function containerClickHandler (e) {
    if (e.target.tagName !== 'BUTTON') return

    const buttonDataValue = e.target.dataset.value;
    
    if (!isNaN(buttonDataValue)) handleClickedNumber(buttonDataValue);
    else if (buttonDataValue in mathOperationFunctions) console.log(buttonDataValue);
    else transformingFunctions[buttonDataValue]()

};

function handleClickedNumber (integerString) {

    let currValueLength = displayValueCharacterArray.length
    
    // If display is currently empty i.e. 0 and 0 button was pressed, do nothing
    if (currValueLength === 0 && integerString === '0') return;
    // Max 10 characters allowed if number is negative otherwise 9
    if ((displayValueCharacterArray[0] === '-' && currValueLength === 10) || (displayValueCharacterArray[0] !== '-' && currValueLength === 9)) return

    displayValueCharacterArray.push(integerString);
    updateDisplay()

};

calculatorContainer.addEventListener('click', containerClickHandler)


