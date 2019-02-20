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
  var guessChars = [];
  var randWord = "";
  var randWordIndex = -1;
  var startFlag = true;

  function genRandWord() {
    winCount = 0;
    lossCount = 0;
    guessCount = 10;
    guessChars = [];
    $("#winCount").text(winCount);
    $("#lossCount").text(lossCount);
    $("#guessCount").text(guessCount);
    $("#guessChars").empty();
    $("#footer").empty();

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

  $(document).keyup(function(e) {
    if (startFlag) {
      genRandWord();
      startFlag = false;
    } else {
      if (randWord.includes(e.key.toUpperCase())) {
        $("#randWord")
          .children("span")
          .each(function() {
            console.log("Attribute: " + $(this).attr("rand-letter"));
            console.log("Key Pressed: " + e.key.toUpperCase());
            if ($(this).attr("rand-letter") === e.key.toUpperCase()) {
              $(this).text($(this).attr("rand-letter"));
            }
          });
      } else {
        console.log("Incorrect Key: " + e.key.toUpperCase());
        var spanElem = $("<span>");
        spanElem.addClass("wrongLetter");
        spanElem.text(e.key.toUpperCase());
        $("#guessChars").append(spanElem);
      }
    }
  });
});
