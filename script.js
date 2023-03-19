// Selectors
const calculator = document.getElementById('calculator');
const display = document.getElementById('display');

// State
let firstOperand = null;
let operator = null;
let secondOperand = null;
let result = null;

// Functions
function resetState() {
  firstOperand = null;
  operator = null;
  secondOperand = null;
  result = null;
  display.value = '';
}

function calculate() {
  const first = parseFloat(firstOperand);
  const second = parseFloat(secondOperand);

  switch (operator) {
    case '+':
      result = first + second;
      break;
    case '-':
      result = first - second;
      break;
    case '*':
      result = first * second;
      break;
    case '/':
      result = first / second;
      break;
    default:
      break;
  }

  display.value = result;
}

function handleNumberClick(event) {
  const value = event.target.value;

  if (!firstOperand) {
    firstOperand = value;
    display.value = firstOperand;
  } else if (operator && !secondOperand) {
    secondOperand = value;
    display.value = secondOperand;
  } else if (secondOperand) {
    secondOperand += value;
    display.value = secondOperand;
  }
}

function handleOperatorClick(event) {
  const value = event.target.value;

  if (!operator) {
    operator = value;
  } else if (firstOperand && operator && secondOperand) {
    calculate();
    firstOperand = result;
    operator = value;
    secondOperand = null;
  } else if (firstOperand && operator && !secondOperand) {
    operator = value;
  }
}

function handleEqualClick() {
  if (firstOperand && operator && secondOperand) {
    calculate();
    firstOperand = result;
    operator = null;
    secondOperand = null;
  }
}

function handleClearClick() {
  resetState();
}

function handleDecimalClick() {
  if (secondOperand && !secondOperand.includes('.')) {
    secondOperand += '.';
    display.value = secondOperand;
  } else if (!secondOperand) {
    secondOperand = '0.';
    display.value = secondOperand;
  }
}

// Event Listeners
calculator.addEventListener('click', (event) => {
  if (event.target.classList.contains('number')) {
    handleNumberClick(event);
  } else if (event.target.classList.contains('operator')) {
    handleOperatorClick(event);
  } else if (event.target.classList.contains('equal')) {
    handleEqualClick();
  } else if (event.target.classList.contains('clear')) {
    handleClearClick();
  } else if (event.target.classList.contains('decimal')) {
    handleDecimalClick();
  }
});
