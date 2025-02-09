const cont = document.getElementsByClassName("container")[0];
const startButton = document.getElementsByClassName("start-container")[0];
const answer = document.getElementsByClassName("answer")[0];
const colorOptions = document.getElementsByClassName("option");
const gameStatus = document.getElementsByClassName("status")[0];
const score = document.getElementsByClassName("score")[0];
const reset = document.getElementsByClassName("reset")[0];
const quit = document.getElementsByClassName("quit")[0];
const answers = document.getElementsByClassName("options")[0];
const colors = [
  "rgb(1, 190, 254)", 
  "rgb(255, 221, 0)", 
  "rgb(255, 125, 0)", 
  "rgb(255, 0, 109)", 
  "rgb(173, 255, 2)", 
  "rgb(143, 0, 255)"
]
let current = "";
let scoreFig = 0;


/**
 * waitforme - delay a function for some millisecond
 * @param {Number} millisec : seconds to wait 
 * @returns a promise that delay for millisec
 */
function waitforme(millisec) {
  return new Promise(resolve => {
      setTimeout(() => { resolve('') }, millisec);
  })
}

function start() {
  randomColor();
  startButton.style.display = "none";
  answers.style.display = 'none';
  cont.style.display = "block";
}

function gameReset() {
  scoreFig = 0;
  score.innerHTML = scoreFig + '';
  start();
}

function gameQuit() {
  scoreFig = 0;
  score.innerHTML = scoreFig + '';
  cont.style.display = 'none';
  startButton.style.display = 'block';
  location.reload();
}


/**
 * randomColor - It display random color on the colorBox
 */
async function randomColor() {

  setOptions();

  answers.style.display = 'none';
  gameStatus.style.display = 'none';

  for (let color of colors) {
    await waitforme(1000);
    let rand = Math.floor(Math.random() * colors.length);
    current = colors[rand];
    answer.style.backgroundColor = current;
  }

  await waitforme(1000);
  answer.style.backgroundColor = "#131515";
  answers.style.display = 'block';

}

/**
 * shuffleColor - This function helps in shuffleling the Colors
 * @param {Array} arr : Array to be shuffled
 */
function shuffleColor(arr) {
  arr.sort(function (a, b) {
    return Math.random() - 0.5;
  });
}

/**
 * setOptions - It sets ramdom color to each
 * of the button options
 */

function setOptions() {
  shuffleColor(colors);

  for(item of colors) {
    colorOptions[colors.indexOf(item)].style.backgroundColor = item;
  }
}

/**
 * This is where the game functionality is handled
 * setting the score and moving to the next
 */

for(let colorOption of colorOptions) {
  colorOption.addEventListener('click', async function() {
    if(this.style.backgroundColor === current) {
      scoreFig += 1;
      score.innerHTML = scoreFig + '';
      answer.style.backgroundColor = current;
      gameStatus.style.display = 'block';
      gameStatus.innerHTML = "Correct 🎉";
      gameStatus.style.animation = 'fading 2s infinite';
      await waitforme(1000);
      randomColor();
    } 
    else {
      scoreFig -= 1;
      score.innerHTML = scoreFig + '';
      answer.style.backgroundColor = current;
      gameStatus.style.display = 'block';
      gameStatus.innerHTML = "Wrong 😔";
      gameStatus.style.animation = 'fading 2s infinite';
      await waitforme(1000)
      randomColor();
    }
  })
}
