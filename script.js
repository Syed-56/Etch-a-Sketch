const sizeContainer = document.getElementById('size-container');

const buttons = sizeContainer.querySelectorAll('#size-buttons button');
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const sizes = [16, 32, 64]; 
    const chosenSize = sizes[index];
    console.log(`Preset Button ${index + 1} clicked: size ${chosenSize}`);
    createGrid(chosenSize);
  });
});

const customButton = document.getElementById('custom-size-button');
customButton.addEventListener('click', (e) => {
  e.preventDefault(); // just in case
  const inputText = document.getElementById('gridBar');
  const value = inputText.value.trim();

  if (value === "") {
    alert("Grid size is required.");
    return;
  }

  const customSize = Number(value);
  if (isNaN(customSize) || customSize < 1 || customSize > 64) {
    alert("Please enter a number between 1 and 64.");
    return;
  }

  console.log("Creating custom grid of size:", customSize);
  createGrid(customSize);
});

function createGrid(size) {
  console.log("Creating grid of size:", size);
  location.href = '#canvas-container';
  // Your actual grid-building logic goes here
}
