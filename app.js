document.addEventListener("DOMContentLoaded", () => {
  const mainGrid = document.querySelector(".main-grid");
  const miniGrid = document.querySelector(".mini-grid");

  //Structure building Divs
  for (let i = 0; i < 200; i += 1) {
    let divs = document.createElement("DIV");
    mainGrid.appendChild(divs);
  }

  for (let i = 0; i < 10; i += 1) {
    let takenDivs = document.createElement("DIV");
    takenDivs.classList.add("taken", "bottom");
    mainGrid.appendChild(takenDivs);
  }

  for (let i = 0; i < 16; i += 1) {
    let miniGridDivs = document.createElement("DIV");
    miniGrid.appendChild(miniGridDivs);
  }

  let squares = Array.from(document.querySelectorAll(".main-grid div"));

  const scoreDisplay = document.querySelector("#score");

  const startBtn = document.querySelector("#start-button");

  const restartBtn = document.querySelector("#restart-button");

  const arrowUpBtn = document.querySelector("#arrow-up");

  const arrowLeftBtn = document.querySelector("#arrow-left");

  const arrowDownBtn = document.querySelector("#arrow-down");

  const arrowRightBtn = document.querySelector("#arrow-right");

  const width = 10;

  let nextRandomTetromino = 0;

  let timerId;

  let score = 0;

  let gameIsOver = false;

  // The Tetrominoes
  const lTetromino = [
    [0, 1, 2, width],
    [0, 1, width + 1, width * 2 + 1],
    [2, width, width + 1, width + 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
  ];

  const jTetromino = [
    [1, width + 1, width * 2 + 1, 2], // 1 / 11 / 21 / 2
    [width, width + 1, width + 2, width * 2 + 2], // 10 / 11 / 12 / 22
    [1, width + 1, width * 2 + 1, width * 2], //1 / 11 / 21 / 20
    [width, width * 2, width * 2 + 1, width * 2 + 2], // 10 / 20 / 21 / 22
  ];

  const zTetromino = [
    [0, 1, width + 1, width + 2], // 0 / 1 / 11 /12
    [1, width, width + 1, width * 2], // 1 / 10 / 11 / 20
    [0, 1, width + 1, width + 2],
    [1, width, width + 1, width * 2],
  ];

  const sTetromino = [
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
    jTetromino,
    sTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  const colors = [
    "rgb(253, 119, 4)",
    "rgb(0, 56, 179)",
    "rgb(87, 194, 2)",
    "rgb(217, 32, 46)",
    "rgb(179, 19, 192)",
    "rgb(243, 167, 0)",
    "rgb(107, 247, 245)",
  ];

  //Show up-next tetromino in mini-grid display
  const displaySquares = Array.from(
    document.querySelectorAll(".mini-grid div")
  );
  const displayWidth = 4;
  const displayIndex = 0;

  //the Tetrominos without rotations.
  const upNextTetrominoes = [
    [0, 1, 2, displayWidth + 2], //lTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //jTetromino
    [1, 2, displayWidth, displayWidth + 1], //sTetromino
    [0, 1, displayWidth + 1, displayWidth + 2], //zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
    [0, 1, displayWidth, displayWidth + 1], //oTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
  ];

  // display the shape in the mini-grid display.
  function displayShape() {
    // remove any trace of a tretromino from the entire mini-grid
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
      square.classList.remove("tetromino-inset-shadow");
    });

    upNextTetrominoes[nextRandomTetromino].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[nextRandomTetromino];
      displaySquares[displayIndex + index].classList.add(
        "tetromino-inset-shadow"
      );
    });
  }

  let currentPosition = 4;
  let currentRotation = 0;

  //randomy select a Tetromino and its first rotation
  let randomTetromino = Math.floor(Math.random() * theTretrominoes.length);

  let currentTetromino = theTretrominoes[randomTetromino][currentRotation];
  //draw the tetromino
  function draw() {
    currentTetromino.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
      squares[currentPosition + index].style.backgroundColor =
        colors[randomTetromino];
      squares[currentPosition + index].classList.add("tetromino-inset-shadow");
    });
  }

  //undraw the Tetromino
  function undraw() {
    currentTetromino.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.backgroundColor = "";
      squares[currentPosition + index].classList.remove(
        "tetromino-inset-shadow"
      );
    });
  }

  // Button related.
  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      displayShape();
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandomTetromino = Math.floor(Math.random() * theTretrominoes.length);
    }
  });

  function spaceBarStartBtn() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      displayShape();
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandomTetromino = Math.floor(Math.random() * theTretrominoes.length);
    }
  }

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function moveDownFaster() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function freeze() {
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      currentTetromino.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );

      // create new tetromino
      randomTetromino = nextRandomTetromino;
      nextRandomTetromino = Math.floor(Math.random() * theTretrominoes.length);
      currentTetromino = theTretrominoes[randomTetromino][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = currentTetromino.some(
      (index) => (currentPosition + index) % width === 0
    );

    if (!isAtLeftEdge) {
      currentPosition -= 1;
    }

    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = currentTetromino.some(
      (index) => (currentPosition + index) % 10 === 9
    );

    if (!isAtRightEdge) {
      currentPosition += 1;
    }

    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }

    draw();
  }

  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === currentTetromino.length) {
      currentRotation = 0;
    }
    currentTetromino = theTretrominoes[randomTetromino][currentRotation];
  }

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
          squares[index].style.backgroundColor = "";
        });
        const squaresRemoved = squares.splice(i, width);

        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => mainGrid.appendChild(cell));
      }
    }
  }

  function gameOver() {
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      let gameOverInfo = document.createElement("h3");
      gameOverInfo.innerHTML = "Game Over!";
      gameOverInfo.classList.add("game-over");
      ////////////////////////////////////////////////
      let gameOverDiv = document.createElement("DIV");
      gameOverDiv.classList.add("over");
      gameOverDiv.appendChild(gameOverInfo);
      document.querySelector(".game-over").appendChild(gameOverDiv);
      //////////////////////////////////////////////
      clearInterval(timerId);
      gameIsOver = true;
      // create div .game-over then appendChild.
      // minigrid
    }
  }

  function restartGame() {
    if (document.querySelector(".over")) {
      document.querySelector(".over").remove();
    }
    scoreDisplay.innerHTML = 0;
    currentPosition = 4;
    gameIsOver = false;

    for (let i = 0; i < 200; i += 1) {
      if (
        squares[i].classList.contains("tetromino") &&
        squares[i].classList.contains("taken")
      ) {
        squares[i].classList.remove("tetromino", "taken");
        squares[i].style.backgroundColor = "";
      } else if (squares[i].classList.contains("tetromino")) {
        console.log("contem tetromino");
        squares[i].classList.remove("tetromino");
        squares[i].style.backgroundColor = "";
      } else if (squares[i].classList.contains("taken")) {
        console.log("contem taken");
        squares[i].classList.remove("taken");
        squares[i].style.backgroundColor = "";
      } else {
        console.log("do not have a class!");
      }
    }

    clearInterval(timerId);
    displayShape();
    draw();
    timerId = setInterval(moveDown, 1000);
    nextRandomTetromino = Math.floor(Math.random() * theTretrominoes.length);
    // clear all div from classes "tetromino" and "taken".
    // set Score to 0.
    // add event listener to the button restart.
    // create <h1> to hold the highest score reached.
    console.log("called.");
  }

  restartBtn.addEventListener("click", (e) => restartGame());

  arrowUpBtn.addEventListener("click", (e) => rotate());

  arrowLeftBtn.addEventListener("click", (e) => moveLeft());

  arrowDownBtn.addEventListener("click", (e) => moveDownFaster());

  arrowRightBtn.addEventListener("click", (e) => moveRight());

  const keyAnimation = (key) => {
    if (key === "ArrowRight") {
      document.getElementById("arrow-right").classList.add("active-button");

      setTimeout(() => {
        document
          .getElementById("arrow-right")
          .classList.remove("active-button");
      }, 250);
    } else if (key === "ArrowLeft") {
      document.getElementById("arrow-left").classList.add("active-button");

      setTimeout(() => {
        document.getElementById("arrow-left").classList.remove("active-button");
      }, 250);
    } else if (key === "ArrowDown") {
      document.getElementById("arrow-down").classList.add("active-button");

      setTimeout(() => {
        document.getElementById("arrow-down").classList.remove("active-button");
      }, 250);
    } else if (key === "ArrowUp") {
      document.getElementById("arrow-up").classList.add("active-button");

      setTimeout(() => {
        document.getElementById("arrow-up").classList.remove("active-button");
      }, 250);
    } else if (key === " ") {
      document.getElementById("start-button").classList.add("active-button");

      setTimeout(() => {
        document
          .getElementById("start-button")
          .classList.remove("active-button");
      }, 250);
    } else {
      return;
    }
  };

  document.addEventListener("keydown", (e) => {
    let key = e.key;
    console.log(key);
    console.log(e);
    if (gameIsOver === true) {
      console.log("Game Over...");
    } else {
      switch (key) {
        case "ArrowRight":
          moveRight();
          keyAnimation(key);
          break;
        case "ArrowLeft":
          moveLeft();
          keyAnimation(key);
          break;
        case "ArrowDown":
          moveDownFaster();
          keyAnimation(key);
          break;
        case "ArrowUp":
          rotate();
          keyAnimation(key);
          break;
        case " ":
          spaceBarStartBtn();
          keyAnimation(key);
          break;
        default:
          console.log(`the key is: ${key}`);
          break;
      }
    }
  });
});
