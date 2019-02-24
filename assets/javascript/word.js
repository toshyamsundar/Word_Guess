$(document).ready(function() {
  //An array of words
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

  var gameRules = [
    "Press any key to start the game",
    "Press keys A to Z to guess the word",
    "Do not press any key more than once",
    "You get 10 chances to guess the word correctly",
    "If you guess correctly, your win",
    "Otherwise, you lose",
    "If you can't do it yourself, press SPACE-BAR for a hint and just once",
    "Of course, you lose a chance. Help isn't free",
    "NOW CLOSE THIS & START PLAYING!!"
  ];

  var winCount = 0;
  var lossCount = 0;
  var guessCount = 10;
  var correctGuessCount = 0;
  var guessChars = [];
  var randWord = "";
  var randWordIndex = -1;
  var startFlag = true;
  var errMessage = "";
  var hintFlag = false;

  // Function to generate a random word from the array
  function genRandWord() {
    randWordIndex = Math.floor(Math.random() * randWords.length + 1);
    randWord = randWords[randWordIndex];

    // Loop through the word to display empty boxes on the webpage
    for (var i = 0; i < randWord.length; i++) {
      var spanElem = $("<span>");
      spanElem.addClass("letter");
      // Set the attribute value to the key pressed
      spanElem.attr("rand-letter", randWord[i]);
      $("#randWord").append(spanElem);
    }
  }

  // This function is called when a letter present in the random word is pressed
  function correctGuessKey(guessKey) {
    //Loop through each <span> element and fill the box where the attribute values matches the key pressed
    $("#randWord")
      .children("span")
      .each(function() {
        if ($(this).attr("rand-letter") === guessKey) {
          $(this).text($(this).attr("rand-letter"));
          // Increment the correctGuessCount inside this loop to keep track of the number of characters filled
          correctGuessCount++;
        }
      });
  }

  // This function is called when a letter not present in the randam word is pressed
  function wrongGuessKey(guessKey) {
    // This adds new element for each incorrect letter
    var spanElem = $("<span>");
    spanElem.addClass("wrongLetter");
    spanElem.text(guessKey);
    $("#guessChars").append(spanElem);
  }

  // This function is to update the counters at the top of the webpage
  function updateCounters() {
    $("#winCount").text(winCount);
    $("#lossCount").text(lossCount);
    $("#guessCount").text(guessCount);
  }

  // This function is to initialize all the variables and empty out the elements
  // at the start of the game or user decides to play again
  function initGame() {
    guessChars = [];
    correctGuessCount = 0;
    randWord = "";
    randWordIndex = -1;
    errMessage = "";
    hintFlag = false;

    $("#guessChars").empty();
    $("#footer").text("Press SPACE-BAR for HINT");
    $("#randWord").empty();

    if (!startFlag) {
      $("#footer").text("Press any key to play again!");
      startFlag = true;
    }
  }

  function addElem(elTag, elClass, elText) {
    var newElem = $(elTag);
    newElem.text(elText);
    $(elClass).append(newElem);
  }

  // This function is to displays a modal to show the results
  // It automatically closes after 3 seconds.
  function showResult(result) {
    var sound = new Audio();

    // Play a different sound in case of lose and win
    // Display differnt messages as well
    if (result === "lose") {
      sound.src = "./assets/sound/Loser.mp3";
      $(".modal-title").text("Loser!!");
      addElem("<p>", ".modal-body", "Beat me if you can!");
    } else {
      sound.src = "./assets/sound/WooHoo.mp3";
      $(".modal-title").text("You Win!!");
      addElem("<p>", ".modal-body", "Beat me again if you can!");
    }
    // Show the dialog & play the sound
    $("#overlay").modal("show");
    sound.play();

    // Hide the dialog after 3 seconds
    setTimeout(function() {
      $("#overlay").modal("hide");
      $(".modal-body").empty();
    }, 3000);
  }

  // This function is to display error messages
  function showError(err) {
    $(".modal-title").text("Read the rules, Genius!");
    addElem("<p>", ".modal-body", err);
    $("#overlay").modal("show");

    // Hide the dialog after 2 seconds
    setTimeout(function() {
      $("#overlay").modal("hide");
      $(".modal-body").empty();
    }, 2000);
  }

  // This function will give when SPACE-BAR is pressed
  function showHint() {
    $("#footer").text("Isn't it easy-peasy now?");
    // Pick a letter randomly fro hint
    var hintKey = randWord[Math.floor(Math.random() * randWord.length + 1)];
    guessCount--;
    updateCounters();
    correctGuessKey(hintKey);
    hintFlag = true;
  }

  // This function is to display the rules of the game
  function showRules() {
    $(".modal-title").text("Rules!");
    for (var i = 0; i < gameRules.length; i++) {
      addElem("<p>", ".modal-body", gameRules[i]);
    }

    $("#overlay").modal("show");

    // Hide the dialog after 25 seconds
    setTimeout(function() {
      $("#overlay").modal("hide");
      $(".modal-body").empty();
    }, 25000);
  }

  // Call the function to display the rules as soon as the page loads
  showRules();

  // This function is called everytime a key is pressed by the user
  $(document).keyup(function(e) {
    var guessKey = e.key.toUpperCase();
    var guessKeyCode = e.keyCode;

    if (startFlag) {
      // This section is executed only at the beginning of the game
      // when the user is asked to press any key to start
      initGame();
      updateCounters();
      genRandWord();
      startFlag = false;
      $(".modal-body").empty();
    } else {
      // Checking if the pressed key is only alphabets
      if (guessKeyCode >= 65 && guessKeyCode <= 90) {
        // Checking if the pressed key has been pressed already
        if (!guessChars.includes(guessKey)) {
          // Checking if the pressed key is present in the random word
          if (randWord.includes(guessKey)) {
            // Call the function correctGuessKey to fill the boxes on the page
            correctGuessKey(guessKey);

            // Check if all the boxes have been filled
            if (correctGuessCount === randWord.length) {
              winCount++;
              guessCount = 10;

              showResult("win");
              updateCounters();
              initGame();
            }
          } else {
            // Call the function wrongGuessKey to display the letters on the Webpage
            wrongGuessKey(guessKey);
            // Decrement the available guess counter
            guessCount--;
            updateCounters();
            // Check if the user has run out of chances
            if (guessCount === 0) {
              lossCount++;
              guessCount = 10;
              showResult("lose");
              updateCounters();
              initGame();
            }
          }
          // Add each key pressed to the array that is used to check if the key has been pressed already
          guessChars.push(guessKey);
        } else {
          // When a key has been pressed already
          errMessage = "The key " + guessKey + " has been pressed already";
          showError(errMessage);
        }
      } else if (guessKeyCode === 32) {
        // Show hint key just once
        if (!hintFlag) {
          showHint();
          hintFlag = true;
        } else {
          showError("One hint is too many");
        }
      } else {
        // When a non-alphabet is pressed
        errMessage = "Press any key between A and Z";
        showError(errMessage);
      }
    }
  });
});
