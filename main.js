// Global variables
const body = document.querySelector('body');
const header = document.querySelector('header');
let height = 16;
let width = 16;

// Create a container for the grid of specified width/height
let gridContainer = createGrid(height, width);

function formatGrid(container) {
	// Style the grid container
	container.style.cssText = `
		display: grid;
		height: 960px;
		width: 960px;
		grid-template-columns: repeat(${width}, 1fr);
		grid-template-rows: repeat(${height}, 1fr);
		border: 10px solid #01243B;
		margin: 1em auto;
	`;
}

// Format the grid
formatGrid(gridContainer);

// Append the grid container to the DOM
body.appendChild(gridContainer);

// Format the grid items
formatGridItems();

/**
 * Create a grid container that is the multiple of row and column.
 * @param {Number} row The width of the grid
 * @param {Number} column The height of the grid
 * @returns gridContainer
 */
function createGrid(row = 16, column = 16) {
	const gridContainer = document.createElement('div');

	for (let y = 0; y < column; y++) {
		for (let x = 0; x < row; x++) {
			gridContainer.appendChild(document.createElement('div'));
		}
	}

	return gridContainer;
}

/**
 * Styles the grid container's children divs
 */
function formatGridItems() {
	const gridItems = document
		.querySelector('body div')
		.getElementsByTagName('div');

	for (let i = 0; i < gridItems.length; i++) {
		gridItems[i].style.cssText = `
			background: white;
		`;

		gridItems[i].addEventListener('mouseenter', () => {
			gridItems[i].style.cssText += `
				background: black;
			`;
		});
	}
}

// Create button and append to the top of the screen
const button = document.createElement('button');
button.textContent = 'Change grid size';
header.appendChild(button);

// Grab user input so the grid can be the size the user wants
button.addEventListener('click', () => {
	let temp = prompt(
		'Enter a number of squares per side you want the grid to be.'
	);
	temp = temp.trim();

	// Check if user input is a number and less than or equal to 100
	if (isNaN(temp) || temp > 100 || temp < 1) {
		alert('Please enter a valid number less than or equal to 100.');
		return;
	}

	// Remove the old grid and replace with the new grid
	height = temp;
	width = temp;
	body.removeChild(gridContainer);
	gridContainer = createGrid(height, width);
	body.appendChild(gridContainer);
	formatGrid(gridContainer);
	formatGridItems();
});
