"use strict";

// Player
let Player = (name, marker = "x") => {
  //   let { test } = gameBoard;
  return { marker };
};

let player1 = Player("Ouma", "x");
let player2 = Player("Odin", "o");

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
  let singleGrid = document.querySelectorAll(".singleGrid");
  let grid = document.querySelector(".grid");
  let reset_btn = document.querySelector(".reset");
  let btn_x = document.querySelector("button.x");
  let btn_o = document.querySelector("button.o");

  // bind events

  reset_btn.addEventListener("click", reset);

  render();

  // render
  function render() {
    for (let i in gameboard) {
      singleGrid[i].innerHTML = gameboard[i];
    }
  }

  // if user chooses o, select it
  btn_o.addEventListener("click", function () {
    btn_o.classList.add("selected");
    btn_x.classList.remove("selected");
  });

  // if user chooses x, select it
  btn_x.addEventListener("click", function () {
    btn_x.classList.add("selected");
    btn_o.classList.remove("selected");
  });

  let count = 0;
  let current_marker = player1.marker;
  for (let i = 0; i < singleGrid.length; i++) {
    singleGrid[i].addEventListener("click", function () {
      if (count % 2 !== 0) {
        current_marker = player2.marker;
        singleGrid[i].innerHTML = current_marker;
        btn_x.classList.add("selected");
        btn_o.classList.remove("selected");
      } else {
        current_marker = player1.marker;
        singleGrid[i].innerHTML = current_marker;
        btn_o.classList.add("selected");
        btn_x.classList.remove("selected");
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
