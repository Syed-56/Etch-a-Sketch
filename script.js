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
let currentMode = 'classic'; // Default mode

function createGrid(size) {
  console.log("Creating grid of size:", size);
  location.href = '#canvas-container';
  const button = document.querySelector('#tools #classic-button');
  button.classList.add('active');
  const canvas = document.getElementById('canvas');
  canvas.innerHTML = ""; // Clear previous grid
  
  for (let i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
  
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      const colorPicker = document.getElementById('colorPicker');
      cell.addEventListener('mouseover', () => {
        if (currentMode === 'classic') {
          cell.style.backgroundColor = colorPicker.value;
        }
        else if (currentMode === 'rainbow') {
          cell.style.backgroundColor = getRandomColor();
        }
        else if (currentMode === 'eraser') {
          cell.style.backgroundColor = 'white';
        }
      });
  
      row.appendChild(cell);
    }
  
    canvas.appendChild(row);
  }
  
  console.log(`Created ${size}x${size} grid using Flexbox.`);  
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function clearGrid() {
  const boxes = document.querySelectorAll('.cell');
  boxes.forEach((box) => {
    box.style.backgroundColor = 'white';
  });
}

function setMode() {
  const toolButtons = document.querySelectorAll('#tools button');

  toolButtons.forEach(button => {
    button.addEventListener('click', () => {
      if(button.id === 'changeSize-button') {
        currentMode = 'classic';
        return;
      }
      toolButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });


  document.getElementById('clear-button').addEventListener('click', () => {
    currentMode = 'clear';
  });
  
  document.getElementById('eraser-button').addEventListener('click', () => {
    currentMode = 'eraser';
  });
  
  document.getElementById('classic-button').addEventListener('click', () => {
    currentMode = 'classic';
  });
  
  document.getElementById('rainbow-button').addEventListener('click', () => {
    currentMode = 'rainbow';
  });  
  document.getElementById('changeSize-button').addEventListener('click', () => {
    location.href = '#size-container';
    currentMode = 'classic';
  });
}

setMode();