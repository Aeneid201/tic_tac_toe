"use strict";

// Player
let Player = (name, marker = "x") => {
  //   let { test } = gameBoard;
  return { name, marker };
};

let gameBoardModule = (function () {
  let gameboard = [];
  let winning_combos = [
    [0, 1, 2],
    [0, 4, 8],
    [2, 5, 8],
    [0, 3, 6],
    [1, 4, 7],
    [3, 4, 5],
    [6, 7, 8],
  ];

  // cache the DOM
  let tic = document.querySelector(".tic");
  let intro = document.querySelector(".intro");

  let singleGrid = document.querySelectorAll(".singleGrid");
  let reset_btn = document.querySelector(".reset");
  let btn_marker1 = document.querySelector("button.marker1");
  let btn_marker2 = document.querySelector("button.marker2");
  let start = document.querySelector(".start");
  let player1_name = document.querySelector(".player1_name");
  let player2_name = document.querySelector(".player2_name");
  let player1_marker = document.querySelector(".player1_marker");
  let player2_marker = document.querySelector(".player2_marker");

  // bind events
  reset_btn.addEventListener("click", reset);
  start.addEventListener("click", check);

  let player1, player2;
  function check() {
    if (
      player1_marker &&
      player1_name &&
      player2_name &&
      player2_marker &&
      player1_name !== player2_name &&
      player1_marker !== player2_marker
    ) {
      // create players
      player1 = Player(player1_name.value, player1_marker.value);
      player2 = Player(player2_name.value, player2_marker.value);

      console.log(player1, player2);

      tic.classList.remove("d-none");
      intro.classList.add("d-none");
    } else {
      alert("Names and markers must be unique, please try again.");
    }
  }

  render();

  // render
  function render() {
    for (let i in gameboard) {
      singleGrid[i].innerHTML = gameboard[i];
    }
  }

  // if user chooses o, select it
  btn_marker2.addEventListener("click", function () {
    btn_marker2.classList.add("selected");
    btn_marker1.classList.remove("selected");
  });

  // if user chooses x, select it
  btn_marker1.addEventListener("click", function () {
    btn_marker1.classList.add("selected");
    btn_marker2.classList.remove("selected");
  });

  let count = 0;
  let current_marker = player1.marker;
  for (let i = 0; i < singleGrid.length; i++) {
    singleGrid[i].addEventListener("click", function () {
      if (count % 2 !== 0) {
        current_marker = player2.marker;
        singleGrid[i].innerHTML = current_marker;
        btn_marker1.classList.add("selected");
        btn_marker2.classList.remove("selected");
      } else {
        current_marker = player1.marker;
        singleGrid[i].innerHTML = current_marker;
        btn_marker2.classList.add("selected");
        btn_marker1.classList.remove("selected");
      }

      let clicked_index = indexInParent(singleGrid[i]);
      gameboard[clicked_index] = current_marker;
      // check for winning combos
      count++;
    });
  }

  // reset the game
  function reset() {
    gameboard = [];
    render();
    for (let i = 0; i < singleGrid.length; i++) {
      singleGrid[i].innerHTML = "";

      // reset count of clicks
      count = 0;
    }
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
