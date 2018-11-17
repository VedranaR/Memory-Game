const cards = document.querySelectorAll(".memory-card");

let timer = () => {};

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
  if (lockBoard) {
    return;
  }

  if (this === firstCard) {
    return;
  }

  this.classList.add("flip");

  if (!hasFlippedCard) {
    //first click, no card has been clicked before
    hasFlippedCard = true;
    firstCard = this;
  } else {
    //second click
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.img === secondCard.dataset.img;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  //it's a match!
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 16);
    card.style.order = randomPosition;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));

//Changes the body color on mouse move
const game = document.querySelector(".memory-game");

game.addEventListener("mousemove", changeColor);

function changeColor(e) {
  e.target.parentElement.parentElement.style.backgroundColor = `rgba(${
    e.offsetX
  }, ${e.offsetY}, 120, 0.3)`;
}

document.getElementById("repeat").addEventListener("mousedown", e => {
  window.location.reload();
});
