let targetNumber = (crypto.getRandomValues(new Uint8Array(1))[0] % 10) + math.random(0, 10);
let playerMoney = Number(localStorage.getItem("Money")) || 0;
let hintPrice = 10;
let autoGuessPrice = 50;
let autoGuess = false;
if (playerMoney < 0) {
  localStorage.setItem("Money", 0);
  playerMoney = 0;
}
const splashText = [
  "Welcome to the Number Guessing Game!",
  "Can you guess the number?",
  "Think you're lucky? Try your luck!",
  "Ready to test your guessing skills?",
  "The number is out there, can you find it?",
  "Let the guessing begin!",
];
if (!localStorage.getItem("autoGuessOwned")) {
  localStorage.setItem("autoGuessOwned", false);
}

// Get a random index from the array
const randomIndex = Math.floor(Math.random() * splashText.length);

// Set the title to the random splash text
document.title = `${document.title} - ${splashText[randomIndex]}`;
document.querySelector(".Title").innerText = document.title;
// for a later thing
// import { webhookUtil } from "./lib/webhook";
// const webhook = new webhookUtil();
document.querySelector("#money").innerText = `Money: ${playerMoney}`;
/**
 *
 * @param {Number} newMoney The money to put into the player's bank account (lloll)
 */
const changeMoney = (newMoney) => {
  playerMoney = newMoney;
  document.querySelector("#money").innerText = `Money: ${playerMoney}`;
  localStorage.setItem("Money", newMoney);
};
/**
 *
 * @param {Number} guessNumber The number that the user inputted into the box
 */
const onSubmit = (guessNumber) => {
  if (isNaN(guessNumber)) return false;
  if (guessNumber === targetNumber) {
    document.getElementById(
      "result"
    ).innerHTML = `You guessed it! The number was ${targetNumber}.`;
    playerMoney += 2;
    targetNumber = (crypto.getRandomValues(new Uint8Array(1))[0] % 10) + 1;
    changeMoney(playerMoney);
    return true;
  } else if (guessNumber < targetNumber) {
    document.querySelector("#result").innerText = "Higher";
    return false;
  } else {
    document.querySelector("#result").innerText = "Lower";
    return false;
  }
};
document
  .getElementById("buy-auto-guess-button")
  .addEventListener("click", () => {
    if (
      playerMoney >= autoGuessPrice ||
      localStorage.getItem("autoGuessOwned")
    ) {
      if (!localStorage.getItem("autoGuessOwned")) {
        playerMoney -= autoGuessPrice;
        localStorage.setItem("autoGuessOwned", true);
      }
      changeMoney(playerMoney);
      autoGuess = true;
      document.getElementById("auto-guess").innerHTML = "Auto Guess is active";
      localStorage.setItem("autoGuessOwned", true);
    }
  });
const autoGuessFunc = () => {
  if (!autoGuess) return;
  let guess = Math.floor(Math.random() * 10) + 1;
  document.getElementById(
    "auto-guess-number"
  ).innerText = `Auto Guesser is at: ${guess}`;
  onSubmit(guess);
};
let aids;
aids = setInterval(() => {
  if (autoGuess) {
    clearInterval(aids);
    setInterval(() => {
      if (!autoGuess) return;
      autoGuessFunc();
    }, 300);
  }
}, 400);

document.getElementById("buy-hint-button").addEventListener("click", () => {
  if (playerMoney >= hintPrice) {
    playerMoney -= hintPrice;
    changeMoney(playerMoney);
    document.getElementById("hint").innerHTML = `The number is ${
      targetNumber > 5 ? "greater" : "less"
    } than 5.`;
  } else {
    alert("Not enough money to buy hint.");
  }
});
document.getElementById("guess-input").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    document.getElementById("guess-button").click();
  }
});

document.getElementById("guess-button").addEventListener("click", () => {
  let guess = Number(document.getElementById("guess-input").value);
  onSubmit(guess);
});
