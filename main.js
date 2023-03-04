const displayValue = document.querySelector('.display .content');
const numbers = document.querySelectorAll('.btn.number');
const operators = document.querySelectorAll('.btn.operator');
const clearButton = document.querySelector('.btn.clear');
const clearEverything = document.querySelector('.btn.clear-everything');
const backspace = document.querySelector('.btn.backspace');
const equals = document.querySelector('.btn.equals');
const signSwitch = document.querySelector('.btn.sign-switch');
const decimal = document.querySelector('.btn.decimal');

const Operation = {
    None: 0,
    Add: 1,
    Subtract: 2,
    Multiply: 3,
    Divide: 4
}
const State = {
    Reset: 0,
    Input: 1
}

let state = State.Reset;
let operation = Operation.None;
let storedNumber = 0;

operators.forEach(button => button.addEventListener('click', ev => onOperatorPressed(ev.target.innerText)));
numbers.forEach(button => button.addEventListener('click', ev => onNumberPressed(ev.target.innerText)));

clearButton.addEventListener('click', ev => { 
    displayValue.innerHTML = '0';
    state = State.Reset; 
});

clearEverything.addEventListener('click', ev => {
    displayValue.innerHTML = '0';
    state = State.Reset;
    storedNumber = 0;
});

backspace.addEventListener('click', ev => {
    if(displayValue.innerText.length > 1) {
        displayValue.innerHTML = displayValue.innerText.substring(0, displayValue.innerText.length - 1);
        if(displayValue.innerText[displayValue.innerText.length - 1] === '.') displayValue.innerHTML = displayValue.innerText.substring(0, displayValue.innerText.length - 1);
    }
    else displayValue.innerHTML = '0';
});

equals.addEventListener('click', ev => {
    executeOperation();
    operation = Operation.None;
});

signSwitch.addEventListener('click', ev => displayValue.innerHTML = Number(displayValue.innerText) * -1);

decimal.addEventListener('click', ev => {
    if(displayValue.innerText.includes('.')) return;
    displayValue.innerHTML = displayValue.innerText + '.0';
    validateLength();
})

function onNumberPressed(numberString) { //TODO create correct functionality for the number presses
    if(state === State.Reset) {
        displayValue.innerHTML = numberString;
        state = State.Input;
    }    
    else if(Number(displayValue.innerText) === 0) displayValue.innerHTML = numberString;
    else displayValue.innerHTML = displayValue.innerText + numberString;   


    validateLength();
}

function onOperatorPressed(operator) {
    if(operation !== Operation.None && state !== State.Reset) executeOperation();
    else storedNumber = Number(displayValue.innerText);
    
    switch(operator) {
        case '+':
            operation = Operation.Add;
            state = State.Reset;
            break;
        case '-':
            operation = Operation.Subtract;
            state = State.Reset;
            break;
        case '*':
            operation = Operation.Multiply;
            state = State.Reset;
            break;
        case '\u{00F7}':
            operation = Operation.Divide;
            state = State.Reset;
            break;
    }
}

function executeOperation() {
    const displayNumber = Number(displayValue.innerText);

    switch(operation) {
        case Operation.Add:
            storedNumber += displayNumber;
            break;
        case Operation.Subtract:
            storedNumber -= displayNumber;
            break;
        case Operation.Multiply:
            storedNumber *= displayNumber;
            break;
        case Operation.Divide:
            storedNumber /= displayNumber;
            break;
        default:
            break;
    }

    displayValue.innerHTML = storedNumber;
    
}

function validateLength() {
    if(displayValue.innerText.length > 8) displayValue.innerHTML = 'Too large';
}

