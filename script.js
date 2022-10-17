"use strict";

let gameBoardModule = (function () {
  let gameboard = ["x", "o", "x", "x", "x", "o", "x", "o", "o"];

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

  // play function
  function play(e) {
    if (e.target.innerHTML) {
      // spot is already marked
      console.log("Sorry! This spot is already marked.");
    } else {
      // this spot can be marked
      e.target.innerHTML = "x";
    }
  }

  // reset the game
  function reset() {
    gameboard = [];
    render();
    for (let i = 0; i < singleGrid.length; i++) {
      singleGrid[i].innerHTML = "";
    }
  }

  // return
  return {
    reset,
  };
})();

// Player
let Player = (name, marker = "x") => {
  //   let { test } = gameBoard;
  return { marker };
};

let player1 = Player("Ouma", "x");
let player2 = Player("Odin", "o");
