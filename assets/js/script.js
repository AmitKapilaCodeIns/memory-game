const tilesContainer = document.querySelector(".tiles");
const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "cyan",
    "magenta",
    "lime",
    "teal",
];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

// Game state
let revealedCount = 0; // Number of tiles player has revealed
let activeTile = null; // The tile div currently clicked on while looking for a match
let awaitingEndOfMove = false; // It is true during the time the player waits for 2 unmatched tiles to be flipped back

function buildTile(color) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color", color); // Record miscellaneous data
    element.setAttribute("data-revealed", "false"); // Record miscellaneous data

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed"); // Get the value of data-revealed
        if (
            awaitingEndOfMove ||
            revealed === "true" ||
            element === activeTile
        ) {
            return; // exit buildTile function
        }
        element.style.backgroundColor = color; // Show the color

        if (!activeTile) {
            activeTile = element; // Assign the clicked tile to activeTile
            return; // exit buildTile function
        }

        const colorToMatch = activeTile.getAttribute("data-color"); // Get the color of the first tile
        if (colorToMatch === color) {
            activeTile.setAttribute("data-revealed", "true"); // Mark the first tile as revealed
            element.setAttribute("data-revealed", "true"); // Mark the second tile as revealed
            awaitingEndOfMove = false; // Allow the player to click again
            activeTile = null; // Allow a first tile to be clicked.
            revealedCount += 2; // Increase the count of revealed tiles

            if (revealedCount === tileCount) {
                alert("You win! Refresh the page to play again.");
            }
            return; // exit buildTile function
        }

        // At this point, we are not awaitingEndOfMove and there is an active tile
        awaitingEndOfMove = true; // prevents any other tile from being clicked

        setTimeout(() => {
            element.style.backgroundColor = null; // Hide this 2nd tile
            activeTile.style.backgroundColor = null; // Hide the active first tile

            awaitingEndOfMove = false; // Allow the player to click again
            activeTile = null; // Allow a first tile to be clicked.
        }, 2000); // 1 second delay before hiding the tiles
    });

    return element;
}

// Build up tiles
for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length); // length will get smaller after each splice
    const color = colorsPicklist[randomIndex];
    const tile = buildTile(color);
    colorsPicklist.splice(randomIndex, 1); // Remove the color at current index from the list
    tilesContainer.appendChild(tile); // Append the tile to the tiles container
}
