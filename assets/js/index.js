let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

fetch("./data/cards.json") //Fetching the cards data from a local JSON file
    .then((res) => res.json()) //Parsing the JSON data
    .then((data) => {
        //Using the data to create the cards
        cards = [...data, ...data]; // spread operator to duplicate the array
        shuffleCards();
    });

/**
 * Shuffles an array of cards using the Fisher-Yates algorithm.
 * This function modifies the array in place to randomize the order of its elements.
 *
 * @returns {void}
 */
function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}
