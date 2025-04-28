"use strict";

/**
 * Shuffles an array of cards using the Fisher-Yates algorithm.
 * This function modifies the array in place to randomize the order of its elements.
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @returns {void}
 */
function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [cards[currentIndex], cards[randomIndex]] = [
            cards[randomIndex],
            cards[currentIndex],
        ];
    }
}

/**
 * Generates card elements dynamically based on the `cards` array and appends them to the grid container.
 * Each card element is created with a front and back side, and an event listener is added to handle the flip action.
 *
 * @returns {void}
 */
function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
        <div class="front">
        <img class="front-image" src=${card.image} alt="image to remember"/>
        </div>
        <div class="back"></div>`;

        $rowContainer.append(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

/**
 * Handles the flip action for a card when it is clicked.
 * This function manages the game logic for flipping cards, checking for matches,
 * and updating the score. It prevents flipping more than two cards at a time
 * and ensures the same card cannot be flipped twice in a row.
 *
 * @returns {void}
 */
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;

    checkForMatch();
    checkAllCardsFlipped();
}

/**
 * Checks if the two flipped cards match by comparing their data attributes.
 * If they match, it disables the cards; otherwise, it unflips them after a delay.
 *
 * @returns {void}
 */
function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

/**
 * Disables the matched cards by removing the event listener for the flip action.
 * This prevents further interaction with the matched cards.
 *
 * @returns {void}
 */
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

/**
 * Unflips the cards if they do not match by removing the flipped class from both cards.
 * This function also resets the board after a delay to allow the player to see the cards before they are flipped back.
 *
 * @returns {void}
 */
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetBoard();
    }, 1500);
}

/**
 * Resets the board by clearing the first and second card variables and unlocking the board.
 *
 * @returns {void}
 */
function resetBoard() {
    if (firstCard !== null || secondCard !== null) {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }
}

/**
 * Checks if all cards have been flipped by verifying if every card element has the "flipped" class.
 * If all cards are flipped, it triggers a win condition.
 *
 * @returns {void}
 */
function checkAllCardsFlipped() {
    const allCards = document.querySelectorAll(".card");
    const allFlipped = Array.from(allCards).every((card) =>
        card.classList.contains("flipped")
    );

    if (allFlipped && currentLevel !== "hard") {
        setTimeout(() => {
            Swal.fire({
                title: "Winner!",
                text: `Congratulations! You've flipped all the cards in ${score} moves! .`,
                imageUrl: "assets/images/win.png",
                imageWidth: 512,
                imageHeight: 384,
                showCancelButton: true,
                confirmButtonColor: "#b3316cc7",
                cancelButtonColor: "#ff4000",
                imageAlt: "Winner image",
                confirmButtonText: "Next level?",
                cancelButtonText: "Exit",
            }).then((result) => {
                if (result.isConfirmed && currentLevel === "easy") {
                    score = 0;
                    $(".score").text(score);
                    medium();
                } else if (result.isConfirmed && currentLevel === "medium") {
                    score = 0;
                    $(".score").text(score);
                    hard();
                } else {
                    window.location.href = "../index.html";
                }
            });
        }, 500);
    }
}
