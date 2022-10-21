"use strict";

// Player
let Player = (name, marker) => {
  return { name, marker };
};

// gameBoard Module
let gameBoardModule = (function () {
  let gameboard = [];
  let winning_combos = [
    [0, 1, 2],
    [0, 4, 8],
    [2, 5, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [3, 4, 5],
    [6, 7, 8],
  ];

  // inherit players from createPlayer Module

  // cache the DOM
  let singleGrid = document.querySelectorAll(".singleGrid");
  let replay_btn = document.querySelector(".replay");
  let inner = document.querySelector(".tic .inner");
  let secWinner = document.querySelector(".winner");
  let winnerMsg = document.querySelector(".winner h1");
  let reset_btn = document.querySelector(".reset");
  let start = document.querySelector(".start");
  let player1_name = document.querySelector(".player1_name");
  let player2_name = document.querySelector(".player2_name");
  let player1_marker = document.querySelector(".player1_marker");
  let player2_marker = document.querySelector(".player2_marker");
  let ticSec = document.querySelector(".tic");
  let intro = document.querySelector(".intro");
  let btn_marker1 = document.querySelector("button.marker1");
  let btn_marker2 = document.querySelector("button.marker2");

  // bind events
  reset_btn.addEventListener("click", reset);
  replay_btn.addEventListener("click", replay);
  start.addEventListener("click", check);

  // render
  // function render() {
  //   for (let i in gameboard) {
  //     singleGrid[i].innerHTML = gameboard[i];
  //   }
  // }

  let player1 = Player("Ouma", "x");
  let player2 = Player("Odin", "o");

  function check() {
    if (
      player1_marker.value &&
      player1_name.value &&
      player2_name.value &&
      player2_marker.value &&
      player1_name.value !== player2_name.value &&
      player1_marker.value !== player2_marker.value
    ) {
      // create players
      player1 = Player(player1_name.value, player1_marker.value);
      player2 = Player(player2_name.value, player2_marker.value);
      btn_marker1.innerHTML = player1.marker;
      btn_marker2.innerHTML = player2.marker;
      ticSec.classList.remove("d-none");
      intro.classList.add("d-none");
    } else {
      alert("Names and markers must be unique, please try again.");
    }
  }

  let count = 0;
  let rand;
  let current_marker = player1.marker;
  for (let i = 0; i < singleGrid.length; i++) {
    singleGrid[i].addEventListener("click", function (e) {
      if (count % 2 !== 0) {
        current_marker = player2.marker;
        singleGrid[i].innerHTML = current_marker;
        singleGrid[i].disabled = true;
        btn_marker1.classList.add("selected");
        btn_marker2.classList.remove("selected");
      } else if (count % 2 == 0) {
        current_marker = player1.marker;
        singleGrid[i].innerHTML = current_marker;
        singleGrid[i].disabled = true;
        btn_marker2.classList.add("selected");
        btn_marker1.classList.remove("selected");
      }

      // Push results to gameboard array
      let clicked_index = indexInParent(singleGrid[i]);
      gameboard[clicked_index] = current_marker;

      // check for winning combos
      let theWinner;
      for (let x = 0; x < winning_combos.length; x++) {
        if (isWinner(x, player1)) {
          theWinner = player1;
        } else if (isWinner(x, player2)) {
          theWinner = player2;
        }
      }

      // check if there's a winner
      if (theWinner) {
        inner.classList.add("disable", "d-none");
        winnerMsg.innerHTML = `${theWinner.name} is the winner!`;
        secWinner.classList.remove("d-none");
      }

      // Check for a draw
      if (full(gameboard) && gameboard.length === 9 && !theWinner) {
        inner.classList.add("disable", "d-none");
        secWinner.classList.remove("d-none");
        winnerMsg.innerHTML = `It's a draw`;
      }

      count++;
    });
  }

  // function to check for winner
  function isWinner(x, player) {
    if (
      gameboard[winning_combos[x][0]] == player.marker &&
      gameboard[winning_combos[x][1]] == player.marker &&
      gameboard[winning_combos[x][2]] == player.marker
    ) {
      return true;
    } else {
      return false;
    }
  }

  // function to replay
  function replay() {
    secWinner.classList.add("d-none");
    inner.classList.remove("disable", "d-none");
    reset();
  }

  // reset the game
  function reset() {
    gameboard = [];
    for (let i = 0; i < singleGrid.length; i++) {
      singleGrid[i].innerHTML = "";
      singleGrid[i].disabled = false;
    }
    // reset count of clicks
    count = 0;
  }

  // return
  return {};
})();

function indexInParent(node) {
  let children = node.parentNode.childNodes;
  let num = 0;
  for (let i = 0; i < children.length; i++) {
    if (children[i] == node) return num;
    if (children[i].nodeType == 1) num++;
  }
  return -1;
}

// function to check for falsey values in array
function full(arr) {
  return !arr.includes(undefined);
}
