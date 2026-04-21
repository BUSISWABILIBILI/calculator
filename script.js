function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) return "Error";
  return num1 / num2;
}

function operate(operator, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
  }
}

const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");

let currentInput = "";
let firstNumber = "";
let operator = null;

// Update screen
function updateDisplay(value) {
  display.textContent = value || "0";
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (
      button.classList.contains("clear") ||
      button.classList.contains("equals") ||
      button.classList.contains("delete")
    ) {
      return;
    }

    if (["+", "-", "*", "÷"].includes(value)) {
      if (currentInput === "") return;

      firstNumber = currentInput;
      operator = value;
      currentInput = "";
      return;
    }

    if (value === ".") {
      if (currentInput.includes(".")) return;
      if (currentInput === "") currentInput = "0";
    }

    currentInput += value;
    updateDisplay(currentInput);
  });
});

clearButton.addEventListener("click", () => {
  currentInput = "";
  firstNumber = "";
  operator = null;
  updateDisplay("0");
});

deleteButton.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
});

equalsButton.addEventListener("click", () => {
  if (firstNumber === "" || operator === null || currentInput === "") return;

  const result = operate(operator, firstNumber, currentInput);

  updateDisplay(result);

  currentInput = result.toString();
  firstNumber = "";
  operator = null;
});
