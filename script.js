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

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");

let currentInput = "";
let firstNumber = "";
let operator = null;
let shouldResetDisplay = false;

// Update screen
function updateDisplay(value) {
  display.textContent = value || "0";
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Skip special buttons
    if (
      button.classList.contains("clear") ||
      button.classList.contains("equals") ||
      button.classList.contains("delete")
    ) {
      return;
    }

    // Reset after equals
    if (shouldResetDisplay) {
      currentInput = "";
      shouldResetDisplay = false;
    }

    // Handle operators
    if (["+", "-", "*", "÷"].includes(value)) {
      // Prevent double operators
      if (currentInput === "" && operator !== null) {
        operator = value;
        return;
      }

      // Chain operations
      if (firstNumber !== "" && currentInput !== "") {
        const result = operate(operator, firstNumber, currentInput);
        updateDisplay(result);
        firstNumber = result.toString();
      } else {
        firstNumber = currentInput;
      }

      operator = value;
      currentInput = "";
      return;
    }

    // Handle decimal
    if (value === ".") {
      if (currentInput.includes(".")) return;
      if (currentInput === "") currentInput = "0";
    }

    currentInput += value;
    updateDisplay(currentInput);
  });
});

// Clear
clearButton.addEventListener("click", () => {
  currentInput = "";
  firstNumber = "";
  operator = null;
  shouldResetDisplay = false;
  updateDisplay("0");
});

// Delete
deleteButton.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
});

// Equals
equalsButton.addEventListener("click", () => {
  if (firstNumber === "" || operator === null || currentInput === "") return;

  const result = operate(operator, firstNumber, currentInput);

  updateDisplay(result);

  currentInput = result.toString();
  firstNumber = "";
  operator = null;
  shouldResetDisplay = true;
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    currentInput += e.key;
  }

  if (e.key === ".") {
    if (!currentInput.includes(".")) currentInput += ".";
  }

  if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  }

  if (e.key === "Enter") {
    equalsButton.click();
    return;
  }

  if (["+", "-", "*", "/"].includes(e.key)) {
    const map = {
      "+": "+",
      "-": "-",
      "*": "*",
      "/": "÷",
    };

    buttons.forEach((btn) => {
      if (btn.textContent === map[e.key]) btn.click();
    });

    return;
  }

  updateDisplay(currentInput);
});
