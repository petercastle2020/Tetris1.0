document.addEventListener("DOMContentLoaded", (e) => {
  const grid = document.querySelector(".grid");

  let squares = Array.from(document.querySelectorAll(".grid div"));

  const ScoreDisplay = document.querySelector("#score");

  const StartBtn = document.querySelector("#start-button");

  const width = 10;

  // The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2], // 1 / 11 / 21 / 2
    [width, width + 1, width + 2, width * 2 + 2], // 10 / 11 / 12 / 22
    [1, width + 1, width * 2 + 1, width * 2], //1 / 11 / 21 / 20
    [width, width * 2, width * 2 + 1, width * 2 + 2], // 10 / 20 / 21 / 22
  ];

  const zTetramino = [
    [0, width, width + 1, width * 2 + 1], // 0 / 10 / 11 // 21
    [width + 1, width + 2, width * 2, width * 2 + 1], // 11 / 12 / 20 // 21
    [0, width, width + 1, width * 2 + 1], // 0 / 10 / 11 // 21
    [width + 1, width + 2, width * 2, width * 2 + 1], // 11 / 12 / 20 // 21
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2], // 1 / 10 / 11 / 12
    [1, width + 1, width + 2, width * 2 + 1], // 1 / 11 / 12 / 21
    [width, width + 1, width + 2, width * 2 + 1], // 10 / 11 / 12 / 21
    [1, width, width + 1, width * 2 + 1], // 1 / 10 / 11 / 21
  ];

  const oTetromino = [
    [0, 1, width, width + 1], // 0 / 1 / 10 / 11
    [0, 1, width, width + 1], // 0 / 1 / 10 / 11
    [0, 1, width, width + 1], // 0 / 1 / 10 / 11
    [0, 1, width, width + 1], // 0 / 1 / 10 / 11
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1], // 1 / 11 / 21 / 31
    [width, width + 1, width + 2, width + 3], // 10 / 11 / 12 / 13
    [1, width + 1, width * 2 + 1, width * 3 + 1], // 1 / 11 / 21 / 31
    [width, width + 1, width + 2, width + 3], // 10 / 11 / 12 / 13
  ];

  const theTretrominoes = [
    lTetromino,
    zTetramino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  //randomy select a Tetromino and its first rotation
  let randomTetromino = Math.floor(Math.random() * theTretrominoes.length);

  let current = theTretrominoes[randomTetromino][currentRotation];
  //draw the tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
    });
  }
  //undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  document.getElementById("start-button").addEventListener("click", PP);

  function PP() {
    setInterval(draw(), 1000);
    currentPosition = 5;
  }
});
