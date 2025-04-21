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
    });

console.log(cards);
