const goButton = document.getElementById("go");
const nextButton = document.getElementById("next");
const resultsDiv = document.querySelector(".results");
const guessDiv = document.querySelector(".guess");
const guessTextBox = document.getElementById("guess");
const currentGuessParagraphs = document.querySelectorAll(".currentGuess");
const previousGuessParagraph = document.getElementById("previousGuess");
const pastGuessesParagraph = document.getElementById("pastGuesses");
const hideAtTheBeginning = document.querySelectorAll(".hideAtTheBeginning");
const scoreSpan = document.getElementById("score");
const explanationParagraph = document.getElementById("explanation");
const chat = document.getElementById("chatOutput");

let guessArray = ["rock"];

document.body.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    submitGuess();
  }
});

async function submitGuess() {
  if (guessTextBox.value) {
    const userGuess = guessTextBox.value;
    const previousGuess = guessArray[0];

    const apiURL = `http://localhost:3000/api/whatbeatsrock/${previousGuess}/${userGuess}`;
    const response = await fetch(apiURL);

    // const explanationParagraph =

    const data = await response.json();

    console.log(data);

    chat.innerText = data.explanation;

    //show new screen
    guessDiv.style.display = "none";
    resultsDiv.style.display = "block";
    //add stuff to text box

    // lose
    if (data.winner.toLowerCase() != userGuess) {
      alert("YOU LOSE... haha");
      return;
    }
    guessArray.unshift(userGuess);
    //erase text box
    guessTextBox.value = "";
    //change paragraphs
    console.log(currentGuessParagraphs);
    for (let i = 0; i < currentGuessParagraphs.length; i++) {
      currentGuessParagraphs[i].innerText = guessArray[0];
    }
    previousGuessParagraph.innerText = guessArray[1];
    pastGuessesParagraph.innerText = `${guessArray[0]} 🤜 ${pastGuessesParagraph.innerText}`;
    //hide at the beginning
    for (let i = 0; i < hideAtTheBeginning.length; i++) {
      hideAtTheBeginning[i].style.display = "block";
    }
    //update score
    scoreSpan.innerText = guessArray.length - 1;
  }
}

goButton.addEventListener("click", () => {
  submitGuess();
});

nextButton.addEventListener("click", () => {
  guessDiv.style.display = "block";
  resultsDiv.style.display = "none";
});

document.body.addEventListener("keypress", (event) => {
  console.log(`you typed ${event.key}`);
});

guessTextBox.addEventListener("keypress", () => {
  if (guessTextBox.value.length > 0) {
    goButton.disabled = false;
  } else {
    goButton.disabled = true;
  }
});
