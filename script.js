const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let currentInput = "";
let previousInput = "";
let operator = "";
let result = null; // Store the result of previous operations

// Update display
const updateDisplay = (value) => {
  display.textContent = value || "0";
};

// Handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (!isNaN(value) || value === ".") {
      // Append numbers and decimal point
      if (value === "." && currentInput.includes(".")) return; // Prevent multiple decimals
      currentInput += value;
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Handle operator
      if (currentInput === "") return; // Do nothing if the current input is empty
      if (result !== null) {
        previousInput = result.toString();
        result = null;
      } else {
        previousInput = currentInput;
      }
      currentInput = "";
      operator = value;
    } else if (value === "=") {
      // Calculate result
      if (previousInput !== "" && currentInput !== "") {
        calculateResult();
        result = currentInput; // Store result for further operations
        updateDisplay(currentInput);
      }
    }
    updateDisplay(currentInput || previousInput);
  });
});

// Calculate result
const calculateResult = () => {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  if (!operator || isNaN(num1) || isNaN(num2)) return;

  switch (operator) {
    case "+":
      currentInput = (num1 + num2).toString();
      break;
    case "-":
      currentInput = (num1 - num2).toString();
      break;
    case "*":
      currentInput = (num1 * num2).toString();
      break;
    case "/":
      currentInput = num2 !== 0 ? (num1 / num2).toString() : "Error"; // Division by zero check
      break;
  }
};

// Handle clear button
clearButton.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operator = "";
  result = null;
  updateDisplay("0");
});
