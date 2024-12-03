// Select the DOM elements
const numberInput = document.getElementById("number-input"); // Input field for user to enter a decimal number
const convertBtn = document.getElementById("convert-btn"); // Button to trigger conversion
const result = document.getElementById("result"); // Element to display the result
const animationContainer = document.getElementById("animation-container"); // Container for showing animation steps

// Data for the animation of the recursive function call stack
const animationData = [
  {
    inputVal: 5, // Input value for the function at this recursion level
    addElDelay: 1000, // Delay in milliseconds to add the element to the container
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.', // Explanation message
    showMsgDelay: 15000, // Delay to display the message
    removeElDelay: 20000, // Delay to remove the element
  },
  {
    inputVal: 2,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    addElDelay: 2000,
    msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];

// Recursive function to convert a decimal number to binary
const decimalToBinary = (input) => {
  // Base case: Return "0" or "1" if input is 0 or 1
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    // Recursive case: Divide by 2 and concatenate the remainder
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

// Function to show the call stack animation
const showAnimation = () => {
  result.innerText = "Call Stack Animation"; // Inform user that animation is starting

  // Iterate through animationData to manage the animation steps
  animationData.forEach((obj) => {
    // Add the stack frame element with a delay
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    // Show the explanation message for the stack frame after a delay
    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    // Remove the stack frame element after a delay
    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  // After the animation ends, show the final binary result
  setTimeout(() => {
    result.textContent = decimalToBinary(5); // Hardcoded for demo purpose
  }, 20000);
};

// Function to validate user input and handle the conversion
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value); // Convert user input to an integer

  // Input validation: Ensure the input is a valid, non-negative number
  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  // If input is 5, trigger the animation
  if (inputInt === 5) {
    showAnimation();
    return;
  }

  // Otherwise, display the binary result directly
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = ""; // Clear the input field
};

// Add an event listener to the button to trigger the conversion
convertBtn.addEventListener("click", checkUserInput);

// Add an event listener to handle "Enter" key press for the input field
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
