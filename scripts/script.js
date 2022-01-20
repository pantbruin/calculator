
let displayValueCharacterArray = []
let currentDisplayStringValue = ""
let firstNum = null
let secondNum = null
let lastKnownOperator = null
const calculatorContainer = document.querySelector('.calculator-container')
const display = document.querySelector('.display')

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
        firstNum = null;
        secondNum = null;
        lastKnownOperator = null;
    }, 
}

function operate(operator, a, b){
    let fn = mathOperationFunctions[operator];
    return fn(a, b);
}

function containerClickHandler (e) {
    if (e.target.tagName !== 'BUTTON') return

    const buttonDataValue = e.target.dataset.value;
    
    if (!isNaN(buttonDataValue)) handleClickedNumber(buttonDataValue);
    else if (buttonDataValue in mathOperationFunctions) console.log(buttonDataValue);
    else transformingFunctions[buttonDataValue]()

}

function handleClickedNumber (integerString) {
    
    // If display is currently empty i.e. 0 and 0 button was pressed, do nothing
    if (displayValueCharacterArray.length === 0 && integerString === '0') return;
    // Max of 9 numbers allowed on calculator display
    if (displayValueCharacterArray.length === 9) return

    displayValueCharacterArray.push(integerString);
    currentDisplayStringValue = displayValueCharacterArray.join("");
    display.textContent = currentDisplayStringValue;

};

calculatorContainer.addEventListener('click', containerClickHandler)


