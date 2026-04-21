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
    case "−":
      return subtract(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    case "%":
      return num1 / 100;
    default:
      return num2;
  }
}

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const historyDisplay = document.querySelector("#history");

let currentInput = "";
let firstNumber = "";
let operator = null;
let shouldResetDisplay = false;

// Update display
function updateDisplay(value) {
  display.style.opacity = 0;

  setTimeout(() => {
    display.textContent = value || "0";
    display.style.opacity = 1;
  }, 80);
}

// Button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    button.classList.add("pop");
    setTimeout(() => button.classList.remove("pop"), 150);

    // ignore special buttons here
    if (
      button.classList.contains("clear") ||
      button.classList.contains("equals") ||
      button.classList.contains("delete")
    ) {
      return;
    }

    // reset after equals
    if (shouldResetDisplay) {
      currentInput = "";
      shouldResetDisplay = false;
    }

    if (value === "%") {
      if (currentInput === "") return;

      currentInput = (parseFloat(currentInput) / 100).toString();
      updateDisplay(currentInput);
      return;
    }

    // operators
    if (["+", "−", "×", "÷"].includes(value)) {
      if (currentInput === "" && operator) {
        operator = value;
        return;
      }

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

    // decimal
    if (value === ".") {
      if (currentInput.includes(".")) return;
      if (currentInput === "") currentInput = "0";
    }

    currentInput += value;
    updateDisplay(currentInput);
  });
});

// CLEAR
clearButton.addEventListener("click", () => {
  currentInput = "";
  firstNumber = "";
  operator = null;
  shouldResetDisplay = false;
  historyDisplay.textContent = "";
  updateDisplay("0");
});

// DELETE
deleteButton.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || "0");
});

// EQUALS
equalsButton.addEventListener("click", () => {
  if (!firstNumber || !operator || !currentInput) return;

  const expression = `${firstNumber} ${operator} ${currentInput}`;
  const result = operate(operator, firstNumber, currentInput);

  historyDisplay.textContent = `${expression} =`;
  updateDisplay(result);

  currentInput = result.toString();
  firstNumber = "";
  operator = null;
  shouldResetDisplay = true;
});

// KEYBOARD SUPPORT
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    if (shouldResetDisplay) {
      currentInput = "";
      shouldResetDisplay = false;
    }
    currentInput += e.key;
  }

  if (e.key === "%") {
    if (currentInput === "") return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay(currentInput);
    return;
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
      "-": "−",
      "*": "×",
      "/": "÷",
    };

    buttons.forEach((btn) => {
      if (btn.textContent === map[e.key]) btn.click();
    });

    return;
  }

  updateDisplay(currentInput);
});
