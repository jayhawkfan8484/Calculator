function add(a, b) { return parseFloat(a) + parseFloat(b) }
function subtract(a, b) { return a - b }
function multiply(a, b) { return a * b }
function divide(a, b) { return a / b }
function operate(a, b, operator) {
  if (operator === '+') return add(a, b);
  else if (operator === '-') return subtract(a, b);
  else if (operator === '*') return multiply(a, b);
  else if (operator === '/') return divide(a, b);
  else return 'error';
}

const values = {
  a: '',
  b: '',
  operator: '',
  varText: '',
  ansText: ''
}

const answer = document.querySelector('.display-answer');
const display = document.querySelector('.display-vars');
const buttons = document.querySelector('.btn-container');

// Event Listeners
buttons.addEventListener('click', getVariables);
buttons.addEventListener('mouseover', highlight);
buttons.addEventListener('mouseout', unhighlight);
document.addEventListener('keydown', addKeyboard);

function getVariables(e) {

  let number = e.target.dataset.number;
  let operator = e.target.dataset.operator;
  console.log(e.target.dataset);

  //If number button is pushed, add it to values
  if (!operator) {
    updateState(number);
  }
  //If operator is pushed
  if (!number) {
    if (operator === '=') {
      extractValues(values.varText);
    } else {
      updateState(operator);
    }
  }
}

function extractValues(string) {
  let operators = ['+', '-', '*', '/'];

  operators.forEach(ele => {
    if (string.indexOf(ele) != -1) {
      index = string.indexOf(ele);
      values.operator = ele;
    }
  });

  values.a = string.slice(0, index);
  values.b = string.slice(index + 1);


  values.ansText = operate(values.a, values.b, values.operator);
  answer.textContent = values.ansText;
}

function updateState(val) {
  if (val === 'clear' || val === 'Escape') {
    values.varText = '';
    answer.textContent = '';
  } else if (val === 'del' || val === 'Backspace' || val ===
    'Delete') {
    values.varText = values.varText.slice(0, -1);
  } else {
    values.varText += val;
  }
  display.textContent = values.varText;
}

function highlight(e) {
  e.target.classList.add('toggle');
}

function unhighlight(e) {
  e.target.classList.remove('toggle');
}

function addKeyboard(e) {
  const acceptedKeys = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                         '/', '*', '+', '-', '.', 'Escape', 'Backspace', 'Delete'];

  if (e.key === 'Enter') {
    extractValues(values.varText);
  } else if (acceptedKeys.includes(e.key)) {
    updateState(e.key);
  }
}