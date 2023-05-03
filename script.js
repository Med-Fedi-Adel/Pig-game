'use strict';

//Selecting elements by Id
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;

//Stating the game
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore = 0;
  playing = true;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
};
init();

//Initial state
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
  document.querySelector('#current--' + activePlayer).textContent = 0;
  currentScore = 0;
  activePlayer = (activePlayer + 1) % 2;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.setAttribute('src', 'dice-' + dice + '.png');

    //3.Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector('#current--' + activePlayer).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];
    //2. Check if player's score >=100
    if (scores[activePlayer] >= 50) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');

      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('player--active');
    } else {
      // Switch to the newt player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
