//Font Awesome icon classes to shuffle and add
let icons = [
  "html5",
  "html5",
  "js-square",
  "js-square",
  "react",
  "react",
  "angular",
  "angular",
  "css3-alt",
  "css3-alt",
  "sass",
  "sass",
  "vuejs",
  "vuejs",
  "grunt",
  "grunt"
];

let memoryGame = document.getElementById("memory-game"),
  star1 = document.getElementById("star1"),
  star2 = document.getElementById("star2"),
  star3 = document.getElementById("star3"),
  fullStar = ["fas", "fa-star"],
  emptyStar = ["far", "fa-star"],
  moves = document.getElementById("moves"),
  timer = document.getElementById("timer"),
  restart = document.getElementById("restart"),
  text = document.getElementById("text"),
  modal = document.getElementById("mymodal");

let openCards = [],
  second = 0,
  pairs = 8,
  numberOfMoves = 0,
  match = 0,
  time,
  score = 0;

//Fisher–Yates shuffle algorithm
let shuffle = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

//function that starts the game
let begin = () => {
  modal.style.display = "none";
  //shuffling the icons
  let shuffledIcons = shuffle(icons);

  //empty all the cards
  for (let x = 0; x < shuffledIcons.length; x++) {
    let id = "memory-card" + (x + 1);
    let card = document.getElementById(id);
    card.classList.remove("open", "show", "match");
    let iconClass = card.firstChild.classList.item(1);
    card.firstChild.classList.remove(iconClass);
  }

  //reset every game parameter
  match = 0;
  numberOfMoves = 0;
  moves.innerText = "0";

  resetTimer(time);
  second = 0;
  timer.textContent = `${second}`;
  startTimer();

  //make tiles and push icons
  for (let x = 0; x < shuffledIcons.length; x++) {
    let id = "memory-card" + (x + 1);
    let card = document.getElementById(id);
    card.addEventListener("mousedown", checkMatch);
    let iconClass = "fa-" + shuffledIcons[x];
    card.firstChild.classList.add(iconClass);
  }
};

let modalDisplay = (score, numberOfMoves) => {
  text.textContent = `For earning the score of ${score} in ${second} seconds, with ${numberOfMoves} moves, we congratulate You!`;
  modal.style.display = "flex";
};

//functionality of the restart button
//in the upper right corner of the game
let restartGame = () => {
  fillTheStar(star3);
  fillTheStar(star2);
  fillTheStar(star1);

  begin();
};

//starts the timer on window load
let startTimer = () => {
  time = setInterval(() => {
    timer.textContent = `${second}`;
    second += 1;
  }, 1000);
};

let resetTimer = time => {
  if (time) {
    clearInterval(time);
  }
};

//functions responsible for replacing
//stars with empty ones
let emptyTheStar = star => {
  star.classList.remove(...fullStar);
  star.classList.add(...emptyStar);
};

let fillTheStar = star => {
  star.classList.remove(...emptyStar);
  star.classList.add(...fullStar);
};

//calculating rating for the player based upon
//the number of moves
let playerRating = numberOfMoves => {
  if (numberOfMoves === 20) {
    emptyTheStar(star3);
  } else if (numberOfMoves === 25) {
    emptyTheStar(star2);
  } else if (numberOfMoves === 30) {
    emptyTheStar(star1);
  }
  let emptyStars = document.querySelectorAll(".far").length;
  return (score = 3 - emptyStars);
};

//a function to check if flipped cards are matching
let checkMatch = e => {
  let clickedCard = e.target;

  if (clickedCard.classList.contains("open", "show")) {
    return true;
  }

  //let cardIcon = clickedCard.classList.item(1);
  clickedCard.classList.add("open", "show");
  openCards.push(clickedCard); //pushing card into arr with other open cards to operate on

  if (openCards.length === 2) {
    //checking if icons match
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      for (let i = 0; i < openCards.length; i++) {
        openCards[i].classList.add("match");
      }
      // add 1 to match counter
      match++;

      //empty the openCards array
      openCards = [];
    } else {
      setTimeout(() => {
        for (let i = 0; i < openCards.length; i++) {
          openCards[i].classList.remove("show", "open");
        }

        //empty the openCards array
        openCards = [];
      }, 500);
    }

    //increment the moves - needed to calculate the rating
    numberOfMoves++;
    moves.textContent = numberOfMoves;

    playerRating(numberOfMoves);
  }

  finished(numberOfMoves, match);
};

//function that executes when all cards are matched
let finished = (numberOfMoves, match) => {
  if (pairs === match) {
    modalDisplay(score, numberOfMoves);
  }
};

window.onload = begin();
