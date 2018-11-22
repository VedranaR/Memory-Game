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
};

begin();
