document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");

  let squares = Array.from(document.querySelectorAll(".grid div"));

  const ScoreDisplay = document.querySelector("#score");

  const StartBtn = document.querySelector("#start-button");

  const width = 10;

  //The Tetrominoes
  // const lTetromino = [[1, width + 1, width * 2 + 1, 2]]; // 1 / 11 / 21 / 2

  // console.log(lTetromino);
});

// function addDivs() {
//   // create 200 divs;
//   for (let i = 0; i < 200; i += 1) {
//     // Create divs
//     let div = document.createElement("div");

//     //  Append Divs into parent container
//     document.querySelector(".grid").appendChild(div);
//   }
// }

// addDivs();

// let PP = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
// ];
