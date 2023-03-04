const displayValue = document.querySelector('.display .content');

const numbers = document.querySelectorAll('.btn.number');


numbers.forEach(button => button.addEventListener('click', ev => onNumberPressed(ev.target.innerText)));

function onNumberPressed(numberString) {
    displayValue.innerHTML = numberString;   
}

