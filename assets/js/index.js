"use strict";

// This is the main JavaScript file for the memory game.
const $rowContainer = $("main>.container>.row");

let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

$(".score").text(score);
restart();

/**
 * Starts a game of memory by fetching easy card data, shuffling the cards,
 */
async function easy() {
    $rowContainer.html("");
    await fetch("./data/cards.json") //Fetching the cards data from a local JSON file
        .then((response) => response.json()) //Parsing the JSON data
        .then((data) => {
            //Using the data to create the cards
            cards = [...data, ...data]; // spread operator to duplicate the array
            shuffleCards();
            generateCards();
        });
}

/**
 * Starts a game of memory with hard difficulty by fetching hard card data, shuffling the cards,
 * and generating the cards.
 */
async function hard() {
    $rowContainer.html("");
    await fetch("./data/cards-hard.json") //Fetching the cards data from a local JSON file
        .then((response) => response.json()) //Parsing the JSON data
        .then((data) => {
            //Using the data to create the cards
            cards = [...data, ...data]; // spread operator to duplicate the array
            shuffleCards();
            generateCards();
        });
}

/**
 * Restarts the game by resetting the board, score, and difficulty level.
 */
function restart() {
    resetBoard();

    score = 0;
    $(".score").text(score);
    $rowContainer.html("");
    easy();
}
