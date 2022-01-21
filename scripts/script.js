
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
        clearValueCharacterArray();
        currentDisplayStringValue = "";
        firstOperand = null;
        secondOperand = null;
        lastKnownOperator = null;
        clearOperatorButtonBorders();
    }, 
    negate: () => {
        if (displayValueCharacterArray.length === 0 || displayValueCharacterArray[0] === '0') return
        if (displayValueCharacterArray[0] !== '-'){
            displayValueCharacterArray.unshift('-');
            updateDisplay()
        } else {
            displayValueCharacterArray.splice(0, 1);
            updateDisplay()
        };     
    },
    percent: () => {
        if (displayValueCharacterArray.length === 0 || displayValueCharacterArray[0] === '0') return;
        let currValue = Number(displayValueCharacterArray.join(''));
        currValue = currValue / 100;
        displayValueCharacterArray = String(currValue).split('');
        updateDisplay();

    }
}

function operate(a, b){

    let operationFunction = mathOperationFunctions[lastKnownOperator];
    return operationFunction(a, b);
}

function clearOperatorButtonBorders(){
    let operatorButtons = document.querySelectorAll('.operator')
    operatorButtons.forEach((btn) => btn.style.border = '')
}

function clearValueCharacterArray(){
    displayValueCharacterArray.splice(0, displayValueCharacterArray.length);
};

function updateDisplay() {
    currentDisplayStringValue = displayValueCharacterArray.join('');
    display.textContent = currentDisplayStringValue;
};

function containerClickHandler (e) {
    if (e.target.tagName !== 'BUTTON') return

    const buttonDataValue = e.target.dataset.value;
    
    if (!isNaN(buttonDataValue)) handleClickedNumber(buttonDataValue);
    else if (buttonDataValue in mathOperationFunctions || buttonDataValue === 'evaluate') handleClickedOperator(e.target);
    else transformingFunctions[buttonDataValue]()

};

function handleClickedNumber (integerString) {

    let currValueLength = displayValueCharacterArray.length
    
    // If first operand doesn't exist and 0 button was pressed, do nothing
    if (currValueLength === 0 && !firstOperand && integerString === '0') return;
    // If 0 has already been pressed as the secondOperand, don't keep adding 0s 
    if (displayValueCharacterArray[0] === '0' && integerString === '0') return;
    // If 0 had already been pressed as the secondOperand but now a number greater than 0 has been pressed, remove the 0 and use the number greater than 0 instead
    if (displayValueCharacterArray[0] === '0' && integerString > 0) displayValueCharacterArray.splice(0, 1)
    // Max 10 characters allowed if number is negative otherwise 9
    if ((displayValueCharacterArray[0] === '-' && currValueLength === 10) || (displayValueCharacterArray[0] !== '-' && currValueLength === 9)) return

    displayValueCharacterArray.push(integerString);
    updateDisplay()

};

function handleClickedOperator(pressedOperator) {

    // If equal sign was pushed but lastKnownOperator is null, do nothing
    if (pressedOperator.dataset.value === 'evaluate' && !lastKnownOperator) return

    /*
    User enters a full number for first time and then user pushes an operator 
    1. Save the full number in number type form into firstOperand
    2. Save the pushed operator in lastKnownOperator
    3. Clear the displayArray to prepare for a second operand. (edge case: what if user pushes 0 as second operand? Can make a condition to check if firstOperand is truthy then 0 can be a possible secondOperand)
    */
    if (!firstOperand && !lastKnownOperator){
        pressedOperator.style.border = '2px solid white';
        firstOperand = Number(currentDisplayStringValue);
        lastKnownOperator = pressedOperator.dataset.value;
        clearValueCharacterArray();
        // Last operation was an equal sign, so we have a firstOperand and just need to save the operatorSign that was pushed
    } else if (firstOperand && !lastKnownOperator){
        pressedOperator.style.border = '2px solid white';
        lastKnownOperator = pressedOperator.dataset.value;
        clearValueCharacterArray();
    } else {
        clearOperatorButtonBorders();
        if (pressedOperator.dataset.value !== 'evaluate') pressedOperator.style.border = '2px solid white';
        secondOperand = Number(currentDisplayStringValue);
        let calculationResult = operate(firstOperand, secondOperand)

        clearValueCharacterArray()
        displayValueCharacterArray = String(calculationResult).split('');
        updateDisplay();
        clearValueCharacterArray();

        firstOperand = calculationResult;
        secondOperand = null;
        pressedOperator.dataset.value === 'evaluate' ? lastKnownOperator = null : lastKnownOperator = pressedOperator.dataset.value;

    }
}

calculatorContainer.addEventListener('click', containerClickHandler)


// To do:


// When an operator is clicked:
    // If second operand exists:
            // Perform and save result of operation (based on last known operator) with firstOperand and secondOperand
            // 



// Possible input patterns:
    // User begins enter number for the FIRST time:
        // Equal sign is pressed -> do nothing. 
        // An operator sign is pressed:
            // Convert string number to number type and save it in firstOperand.  
            // Save operator that was pressed into lastKnownOperator variable


// Additional functionality
    // 1. When an operator button is pushed, add a border until the operation is complete
    // 2. Add functionality to convert long numbers into scientific notation so that they fit on display



    /*


        
    User enters another full number and pushes an operator for the second time
        1. We know if we should evaluate two numbers if firstOperand exists
        2. 

    */

        // Bugs:
        // A number + 0 is wrong