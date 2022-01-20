
let displayValueCharacterArray = []
let currentDisplayStringValue = ""
let firstNum;
let secondNum; 


const calculatorContainer = document.querySelector('.calculator-container')
const display = document.querySelector('.display')

const operationFunctions = {
    '+': (a, b) => Number(a) + Number(b),
    '-': (a, b) => Number(a) - Number(b),
    '*': (a, b) => Number(a) * Number(b),
    '/': (a, b) => Number(a) / Number(b)
};

function operate(operator, a, b){
    let fn = operationFunctions[operator]
    return fn(a, b)
}

function containerClickHandler (e) {
    if (e.target.tagName !== 'BUTTON') return

    const buttonDataValue = e.target.dataset.value;
    
    if (!isNaN(buttonDataValue)) handleClickedNumber(buttonDataValue);

}

function handleClickedNumber (integerString) {
    
    // If display is currently empty i.e. 0 and 0 button was pressed, do nothing
    if (displayValueCharacterArray.length === 0 && integerString === '0') return;
    // Max of 9 numbers allowed on calculator display
    if (displayValueCharacterArray.length === 9) return

    displayValueCharacterArray.push(integerString);
    currentDisplayStringValue = displayValueCharacterArray.join("");
    display.textContent = currentDisplayStringValue;



}

// function handleNumberButton (e) {

// }

calculatorContainer.addEventListener('click', containerClickHandler)
