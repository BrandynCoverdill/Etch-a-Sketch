// Global variables
const body = document.querySelector('body');
const header = document.querySelector('header');
let height = 16;
let width = 16;
let color = 'rainbow';

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
		background: black;
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
		.querySelector('body > div')
		.getElementsByTagName('div');

	for (let i = 0; i < gridItems.length; i++) {
		gridItems[i].style.cssText = `
			background: white;
			opacity: 1;
		`;

		// Remove background: #${Math.floor... to have it grayscale}
		gridItems[i].addEventListener('mouseenter', () => {
			// If rainbow is selected, run the following line so the grid is rainbow
			switch (color) {
				case 'rainbow':
					gridItems[i].style.cssText += `
						background: #${Math.floor(Math.random() * 16777215).toString(16)};
					`;
					gridItems[i].style.opacity -= 0.1;
					break;

				case 'grayscale':
					gridItems[i].style.opacity -= 0.1;
					break;

				default:
					console.log('error in switch statement for mouseenter event...');
					break;
			}
		});
	}
}

// Create button and append to the top of the screen for changing grid size
const changeGridSizeBtn = document.createElement('button');
changeGridSizeBtn.textContent = 'Change grid size';
changeGridSizeBtn.style.cssText = `
	padding: .5em 1em;
	font-weight: bold;
	cursor: pointer;
`;
header.appendChild(changeGridSizeBtn);

// Add div with two buttons where the user can choose grayscale or rainbow
const colorOptionsDiv = document.createElement('div');
const grayscaleBtn = document.createElement('button');
const rainbowBtn = document.createElement('button');

grayscaleBtn.textContent = 'Change to Rainbow';
rainbowBtn.textContent = 'Change to Grayscale';

colorOptionsDiv.style.cssText = `
	display: flex;
	flex-wrap: wrap;
	gap: 1em;
	justify-content: center;
	margin-block-start: 1em;
`;

grayscaleBtn.style.cssText = `
	padding: .5em 1em;
	font-weight: bold;
	cursor: pointer;
`;

rainbowBtn.style.cssText = `
	padding: .5em 1em;
	font-weight: bold;
	cursor: pointer;
`;

header.appendChild(colorOptionsDiv);
colorOptionsDiv.appendChild(grayscaleBtn);
colorOptionsDiv.appendChild(rainbowBtn);

// On refresh, disable grayscale and enable rainbow
window.onload = function () {
	rainbowBtn.removeAttribute('disabled');
	grayscaleBtn.setAttribute('disabled', true);
	color = 'rainbow';
};

// @todo: add events for button to disable the other button
rainbowBtn.addEventListener('click', () => {
	color = 'grayscale';
	rainbowBtn.toggleAttribute('disabled');
	grayscaleBtn.toggleAttribute('disabled');
});

grayscaleBtn.addEventListener('click', () => {
	color = 'rainbow';
	rainbowBtn.toggleAttribute('disabled');
	grayscaleBtn.toggleAttribute('disabled');
});

// Grab user input so the grid can be the size the user wants
changeGridSizeBtn.addEventListener('click', () => {
	let temp = prompt(
		'Enter a number of squares per side you want the grid to be.'
	);
	temp = temp.trim();

	// Check if user input is a number and less than or equal to 100
	if (isNaN(temp) || temp > 100 || temp < 1) {
		alert('Please enter a valid number less than or equal to 100.');
		return;
	}
	height = temp;
	width = temp;

	// Remove the old grid and replace with the new grid
	body.removeChild(gridContainer);
	gridContainer = createGrid(height, width);
	formatGrid(gridContainer);
	body.appendChild(gridContainer);
	formatGridItems();
});
