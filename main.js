// Global variables
const body = document.querySelector('body');
const height = 16;
const width = 16;

// Create a container for the grid of specified width/height
const gridContainer = createGrid(height, width);

// Style the grid container
gridContainer.style.cssText = `
	display: grid;
	height: 960px;
	width: 960px;
	grid-template-columns: repeat(${width}, 1fr);
	grid-template-rows: repeat(${height}, 1fr);
	border: 10px solid #01243B;
	margin: 1em auto;
`;

// Append the grid container to the DOM
body.appendChild(gridContainer);

// Style the grid items
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

/**
 * Create a grid container that is the multiple of row and column.
 * @param {Number} row The width of the grid
 * @param {Number} column The height of the grid
 * @returns gridContainer
 */
function createGrid(row, column) {
	const gridContainer = document.createElement('div');

	for (let y = 0; y < column; y++) {
		for (let x = 0; x < row; x++) {
			gridContainer.appendChild(document.createElement('div'));
		}
	}

	return gridContainer;
}
