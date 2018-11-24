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

//Defined jQuery selectors
let $container = $(".flex-container"),
  $scorePanel = $(".score-panel"),
  $rating = $(".fa-star"),
  $moves = $(".moves"),
  $timer = $(".timer"),
  $restart = $(".restart"),
  $memoryGame = $(".memory-game");

//setting values of the variables
let openCards = [],
  second = 0,
  waitTime = 500,
  pairs = icons.length / 2,
  moves = 0, //integer, different from jQuery selector
  match = 0;

//shuffling func from Stackoverflow
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

//func that starts the game - activated on window load
let begin = () => {
  //shuffle the icons (again)
  icons = shuffle(icons);
  $memoryGame.empty();

  match = 0;
  moves = 0;
  $moves.text("0");

  //make tiles and push icons
  for (let x = 0; x < icons.length; x++) {
    $memoryGame.append(
      $(
        '<li class = "memory-card"><i class = "fab fa-' +
          icons[x] +
          '"</i></li>'
      )
    );
  }

  checkMatch();
};

let playerRating = (moves){
  let rating;
  if(15 < moves > 20){
    $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    rating = 3;
  } else if (20 < moves < 25) {
    $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
    rating = 2;
  } else if (moves > 25) {
    $rating.eq(0).removeClass('fa-star').addClass('fa-star-o');
    rating = 1;
  }
}

//a func to check if flipped cards are matching
let checkMatch = () => {
  $memoryGame.find(".memory-card").bind("click", () => {
    let $this = $(this);

    if ($this.hasClass("show") || $this.hasClass("match")) {
      return true;
    } //provifnes

    let card = $this.content.innerHTML;
    $this.addClass("open show");
    openCards.push(card); //pushing card into arr with other open cards to operate on

    if (openCards.length > 1) {
      //checking if HTMLs match
      if (card === openCards[0]) {
        $memoryGame.find(".open").addClass("match");
        setTimeout(() => {
          $memoryGame.find(".open").removeClass("open show");
        }, waitTime);
        match++;
      } else {
        $memoryGame.find(".open").addClass("notmatch");
        setTimeout(() => {
          $memoryGame.find(".open").removeClass("open show");
        }, waitTime / 2);
      }

      //empty the openCards array
      openCards = [];

      //increment the moves - needed to calculate the rating
      moves++;
    }

    if (pairs === match) {
    }
  });
};
