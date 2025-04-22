const rowContainer = document.querySelector("main>.container>.row");

let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;
restart();

function easy() {
    rowContainer.innerHTML = "";
    fetch("./data/cards.json") //Fetching the cards data from a local JSON file
        .then((response) => response.json()) //Parsing the JSON data
        .then((data) => {
            //Using the data to create the cards
            cards = [...data, ...data]; // spread operator to duplicate the array
            shuffleCards();
            generateCards();
        });
}

function hard() {
    rowContainer.innerHTML = "";
    fetch("./data/cards-hard.json") //Fetching the cards data from a local JSON file
        .then((response) => response.json()) //Parsing the JSON data
        .then((data) => {
            //Using the data to create the cards
            cards = [...data, ...data]; // spread operator to duplicate the array
            shuffleCards();
            generateCards();
        });
}

function restart() {
    resetBoard();

    score = 0;
    document.querySelector(".score").textContent = score;
    rowContainer.innerHTML = "";
    easy();
}
