// Get the display element
const display = document.querySelector('.display');

// Initialize variables to keep track of the current operator, previous result, and whether we are entering the second number in a pair
let currentOperator = '';
let previousResult = 0;
let isSecondNumber = false;
let isFirstInput = true;

// Get all the button elements
const buttons = document.querySelectorAll('.button');

// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the input from the button
    const input = button.textContent;

    // If the input is a number or decimal point, add it to the display
    if (!isNaN(input) || input === '.') {
      // If the display shows the previous result and we are entering the second number in a pair, replace the display
      if (display.textContent === String(previousResult) && isSecondNumber || isFirstInput === true) {
        display.textContent = input;
        isFirstInput = false;
      } else {
        display.textContent += input;
      }

      // Reset the isSecondNumber flag
      isSecondNumber = false;
    } else if (input === 'C') {  // If the input is 'C', clear the display and reset flags
      display.textContent = '0';
      isSecondNumber = false;
      previousResult = 0;
      currentOperator = '';
      isFirstInput = true;
    } else if (input === '=') {  // If the input is '=', evaluate the current operation
      // Extract the second number from the display
      const num2 = parseFloat(display.textContent);

      // Call the operate function to get the result
      const result = operate(previousResult, currentOperator, num2);

      // Display the result
      display.textContent = result;

      // Reset the current operator and previous result
      currentOperator = '';
      previousResult = result;

      // Set the isSecondNumber flag to true to allow chaining of operations
      isSecondNumber = true;
    } else if (input === 'Delete') {  // If the input is 'Delete', remove the last character from the display
      const currentInput = display.textContent;
      display.textContent = currentInput.slice(0, currentInput.length - 1);
      if (currentInput.length === 1 ) {
        display.textContent = '0';
      }
    } else {  // If the input is an operator, store it and evaluate the previous operation
      // Extract the first number from the display
      const num1 = parseFloat(display.textContent);

      // If this is the first operation, store the first number and operator
      if (currentOperator === '') {
        currentOperator = input;
        previousResult = num1;
      } else {  // Otherwise, evaluate the previous operation and update the previous result
        const result = operate(previousResult, currentOperator, num1);
        currentOperator = input;
        previousResult = result;
        display.textContent = result;
      }

      // Set the isSecondNumber flag to true to allow chaining of operations
      isSecondNumber = true;
      isFirstInput = true;
    }
  });
});



function operate(num1, operator, num2) {
    let result;
  
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        result = NaN;
    }
  
    return result;
  }

  