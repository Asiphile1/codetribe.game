// Getting the game board element from the DOM
const gameBoard = document.getElementById('gameBoard');

// Define the letters for the cards, I added two because Ineed the letters in pairs
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

let firstCard = null;    // Variable to store the first flipped card
let secondCard = null;   // Variable to store the second flipped card
let lockBoard = false;   // Variable to lock the board to prevent clicking while checking cards
let matchedPairs = 0;    // Variable to keep track of matched pairs

// Function to shuffle the cards array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create the game board
function createBoard() {
    shuffle(cards);  // this will shuffle the cards array
    cards.forEach((card) => {
        const cardElement = document.createElement('div');  // Create a div for each card
        cardElement.classList.add('card', 'hidden');        // Add the 'card' and 'hidden' classes
        cardElement.dataset.letter = card;                  // Here I'm setting a data attribute for the card letter
        cardElement.innerText = card;                       // Then set the inner text to the card letter
        cardElement.addEventListener('click', flipCard);    // After I'll add an event listener for the click event
        gameBoard.appendChild(cardElement);                 // Add the card to the game board
    });
}

// Function to handle card flip
function flipCard() {
    if (lockBoard) return;            // If the board is locked, exit the function
    if (this === firstCard) return;   // If the same card is clicked twice, exit the function

    this.classList.remove('hidden');  // Remove the 'hidden' class to reveal the card

    if (!firstCard) {                 // If no card is flipped yet
        firstCard = this;             // Set the first flipped card
        return;
    }

    secondCard = this;                // Set the second flipped card
    checkForMatch();                  // Check if the two cards match
}

// Function to check if two flipped cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.letter === secondCard.dataset.letter; // Compare the letters between the tiles
    isMatch ? disableCards() : unflipCards(); // If they match, disable the cards; if not, unflip them
}

// Function to handle matched cards
function disableCards() {
    firstCard.classList.add('matched'); // Add 'matched' class to the first card
    secondCard.classList.add('matched'); // Add 'matched' class to the second card
    firstCard.removeEventListener('click', flipCard); // Remove click event listener from the first card
    secondCard.removeEventListener('click', flipCard); // Remove click event listener from the second card
    matchedPairs++; // Increasing the matched pairs count

    // If all pairs are matched, display a winning message
    if (matchedPairs === cards.length / 2) {
        setTimeout(() => alert('YAY! You Won Asiphiles game!!'), 500); // This will be the prompt. Ilike adding promts 
    }

    resetBoard(); // Reset the board state
}

// Function to handle unmatched cards
function unflipCards() {
    lockBoard = true; // Lock the board to prevent further clicks
    setTimeout(() => {
        firstCard.classList.add('hidden'); // Add 'hidden' class back to the first card
        secondCard.classList.add('hidden'); // Add 'hidden' class back to the second card
        resetBoard(); // Reset the board state
    }, 1000); // Delay for 1 second before flipping the cards back. I'm readinng a book on why seconds are in thousands, very intresting.
}

// Function to reset the board state
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false]; // Reset variables
}

// Initialize the game board
createBoard();

// My understanding of JavaScript is improving but it is still a bit of a challenge.
// for starters, I feel like for every project I code I'm learning something new everytime.
// What I find helps is watching YouTube video's. 
// To think I've stopped watching TV, because of the YouTube chqnnels.
// the stuggle is real. I tell you, but we move.
