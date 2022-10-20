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

  let player1 = Player;
  let player2 = Player;

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
  let current_marker = player1.marker;
  for (let i = 0; i < singleGrid.length; i++) {
    singleGrid[i].addEventListener("click", function (e) {
      if (count % 2 !== 0) {
        current_marker = player2.marker;

        // let rand = Math.floor(Math.random() * 8);
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
      for (let x = 0; x < winning_combos.length; x++) {
        let innerArrayLen = winning_combos[x].length;
        let theWinner;
        if (
          gameboard[winning_combos[x][0]] == player1.marker &&
          gameboard[winning_combos[x][1]] == player1.marker &&
          gameboard[winning_combos[x][2]] == player1.marker
        ) {
          theWinner = player1;
        } else if (
          gameboard[winning_combos[x][0]] == player2.marker &&
          gameboard[winning_combos[x][1]] == player2.marker &&
          gameboard[winning_combos[x][2]] == player2.marker
        ) {
          theWinner = player2;
        }
        if (theWinner) {
          inner.classList.add("disable", "d-none");
          winnerMsg.innerHTML = `${theWinner.name} is the winner!`;
          secWinner.classList.remove("d-none");
        }
      }

      count++;
    });
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
