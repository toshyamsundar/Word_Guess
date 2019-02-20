$(document).ready(function() {
  var randWords = [
    "SAILBOAT",
    "POPSICLE",
    "BRAIN",
    "BIRTHDAY",
    "CAKE",
    "SKIRT",
    "KNEE",
    "PINEAPPLE",
    "TUSK",
    "SPRINKLER",
    "MONEY",
    "SPOOL",
    "LIGHTHOUSE",
    "DOORMAT",
    "FACE",
    "FLUTE",
    "RUG",
    "SNOWBALL",
    "PURSE",
    "OWL",
    "GATE",
    "SUITCASE",
    "STOMACH",
    "DOGHOUSE",
    "PAJAMAS",
    "PEACH",
    "NEWSPAPER",
    "WATERING",
    "CAN",
    "HOOK",
    "SCHOOL",
    "BEAVER",
    "BEEHIVE",
    "BEACH",
    "ARTIST",
    "FLAGPOLE",
    "CAMERA",
    "HAIR",
    "DRYER",
    "MUSHROOM",
    "PRETZEL",
    "QUILT",
    "CHALK",
    "DOLLAR",
    "SODA",
    "CHIN",
    "SWING",
    "GARDEN",
    "TICKET",
    "BOOT",
    "CELLO",
    "RAIN",
    "CLAM",
    "PELICAN",
    "STINGRAY",
    "FUR",
    "BLOWFISH",
    "RAINBOW",
    "HAPPY",
    "FIST",
    "BASE",
    "STORM",
    "MITTEN",
    "NAIL",
    "SHEEP",
    "STOPLIGHT",
    "COCONUT",
    "CRIB",
    "HIPPOPOTAMUS",
    "RING",
    "SEESAW",
    "PLATE",
    "FISHING",
    "POLE",
    "CHEEK",
    "VIDEO",
    "CAMERA",
    "TELEPHONE",
    "SILVERWARE",
    "BARN",
    "SNOWFLAKE",
    "FLASHLIGHT",
    "POPSICLE",
    "MUFFIN",
    "SUNFLOWER",
    "SWIMMING",
    "TUSK",
    "RADISH",
    "PEANUT",
    "SPOOL",
    "POODLE",
    "POTATO",
    "FACE",
    "SHARK",
    "SNOWBALL",
    "WAIST",
    "SPOON",
    "GATE",
    "BOTTLE",
    "MAIL",
    "SHEEP",
    "LOBSTER",
    "ICE",
    "CRIB",
    "BUBBLE",
    "SEESAW",
    "PENCIL",
    "CHEESEBURGER",
    "CHAIR",
    "CORNER",
    "CHEEK",
    "POPCORN",
    "TELEPHONE",
    "SEAHORSE",
    "SNOWFLAKE",
    "SPINE",
    "DESK"
  ];

  var winCount = 0;
  var lossCount = 0;
  var guessCount = 10;
  var correctGuessCount = 0;
  var guessChars = [];
  var randWord = "";
  var randWordIndex = -1;
  var startFlag = true;

  function genRandWord() {
    console.log("RandWords Length: " + randWords.length);
    randWordIndex = Math.floor(Math.random() * randWords.length + 1);
    console.log("randWordIndex: " + randWordIndex);
    randWord = randWords[randWordIndex];

    console.log("Word: " + randWord);

    for (var i = 0; i < randWord.length; i++) {
      var spanElem = $("<span>");
      console.log("Inside Loop: " + randWord[i] + " " + i);
      spanElem.addClass("letter");
      spanElem.attr("rand-letter", randWord[i]);
      $("#randWord").append(spanElem);
    }
  }

  function correctGuessKey(guessKey) {
    $("#randWord")
      .children("span")
      .each(function() {
        console.log("Attribute: " + $(this).attr("rand-letter"));
        if ($(this).attr("rand-letter") === guessKey) {
          $(this).text($(this).attr("rand-letter"));
          correctGuessCount++;
        }
      });
  }

  function wrongGuessKey(guessKey) {
    var spanElem = $("<span>");
    spanElem.addClass("wrongLetter");
    spanElem.text(guessKey);
    $("#guessChars").append(spanElem);
  }

  function updateCounters() {
    $("#winCount").text(winCount);
    $("#lossCount").text(lossCount);
    $("#guessCount").text(guessCount);
  }

  function resetGame() {
    guessChars = [];
    correctGuessCount = 0;
    randWord = "";
    randWordIndex = -1;

    $("#guessChars").empty();
    $("#footer").empty();
    $("#randWord").empty();

    if (!startFlag) {
      $("#footer").text("Press any key to play again!");
      startFlag = true;
    }
  }

  $(document).keyup(function(e) {
    var guessKey = e.key.toUpperCase();
    if (startFlag) {
      updateCounters();
      resetGame();
      genRandWord();
      startFlag = false;
    } else {
      if (!guessChars.includes(guessKey)) {
        if (randWord.includes(guessKey)) {
          console.log("Correct Key: " + guessKey);
          correctGuessKey(guessKey);

          if (correctGuessCount === randWord.length) {
            winCount++;
            guessCount = 10;
            updateCounters();
            resetGame();
          }
        } else {
          console.log("Wrong Key: " + guessKey);
          wrongGuessKey(guessKey);
          guessCount--;
          updateCounters();
          if (guessCount === 0) {
            lossCount++;
            guessCount = 10;
            updateCounters();
            resetGame();
          }
        }
        guessChars.push(guessKey);
      } else {
        alert("The key " + guessKey + " has been pressed already");
      }
    }
  });
});
