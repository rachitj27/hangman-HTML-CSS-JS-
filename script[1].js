var wordInput = document.getElementById("wordInput")
var submitButton = document.getElementById("submitButton")
var randomButton = document.getElementById("randomButton")
var submitPar = document.getElementById("submitParagraph")
var submitSection = document.getElementById("submitSection")
var imageBox = document.getElementById("image")
var imageSection = document.getElementById("imageSection")
var blankBox = document.getElementById("blankSection")
var letterBox = document.getElementById("letterSection")
var messageParagraphh = document.getElementById("messageParagraph")
var randomWords = ["dave","code","computer","pencil","javascript","King","phone"]
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var word = []

var incorrectGuessCount = 0
randomButton.addEventListener("click", selectRandom)
submitButton.addEventListener("click", submitWord)
wordInput.addEventListener('keypress', checkWithinAlphabets)

function checkWithinAlphabets(e) {
  console.log(e.keyCode);
  if (e.charCode > 64 && e.charCode < 91 || e.charCode > 96 && e.charCode < 123){
    
  } 
  else {
    e.preventDefault();
  }
}

function submitWord() {
  if (wordInput.value == "") {
    submitPar.innerHTML = "Please Type in a Word"
  }
  else {
    word = wordInput.value
    showDisplay()
  }
}
function showDisplay() {
  blankBox.innerHTML = ""
  letterBox.innerHTML = ""
  submitSection.style.display = "none"
  for (var i = 0; i < word.length; i++) {
    var underscore = document.createElement("p")
    underscore.innerHTML = " "
    underscore.classList.add("blank")
    blankBox.appendChild(underscore)
  }
  for (var i = 0; i < letters.length; i++) {
    var letterButtons = document.createElement("button")
    letterButtons.classList.add("letter")
    letterButtons.innerHTML = letters[i].toUpperCase()
    letterButtons.addEventListener("click", checkLetter)
    letterBox.appendChild(letterButtons)
  }

  imageSection.style.display = "block"
  imageBox.style.backgroundImage = `url("stages/${incorrectGuessCount}.png")`
}
function selectRandom () {
  var randomWordPosition = Math.floor(Math.random() * randomWords.length)

  word = randomWords[randomWordPosition]
  showDisplay()
}

function checkLetter () {
  gameOver = false
  var correctGuess = false
  var dashes = document.querySelectorAll(".blank")
  
  this.classList.add("guessed")
  this.removeEventListener("click", checkLetter)

  for (var i = 0; i < word.length; i++) {
    if (this.innerHTML.toUpperCase() == word[i].toUpperCase()) {
      dashes[i].innerHTML = this.innerHTML
      correctGuess = true
    }
  }

  if(!correctGuess){
    incorrectGuessCount++
    imageBox.style.backgroundImage = `url("stages/${incorrectGuessCount}.png")`
  }
  checkWon()
  checkOver()
}
function checkOver () {
  if (incorrectGuessCount == 7) {
    messageParagraph.innerHTML = "YOU'RE GARBAGE"
    
    disableLetterSelection()

    var dashes = document.querySelectorAll(".blank")
    for (var i = 0; i < word.length; i++) {
      if (dashes[i].innerHTML == " "){
        dashes[i].innerHTML = word[i].toUpperCase()
        dashes[i].style.color = "red"
      }
    }
  }
}
function checkWon () {
  var dashes = document.querySelectorAll(".blank")
  var allLettersGuessed = true

  for (var i = 0; i < word.length; i++) {
   if (dashes[i].innerHTML != word[i].toUpperCase()) {
    allLettersGuessed = false
   }
  }
  console.log(allLettersGuessed)
  if (allLettersGuessed){
    messageParagraph.innerHTML = "You're Goated"
    disableLetterSelection()
  }
}

function disableLetterSelection(){
  var letterButtons = document.querySelectorAll(".letter")

  for (var i = 0; i < letterButtons.length; i++) {
      letterButtons[i].classList.add("guessed")
      letterButtons[i].removeEventListener("click", checkLetter)
  }
}