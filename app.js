document.addEventListener("DOMContentLoaded", (e) => {
  const grid = document.querySelector(".grid");

  let squares = Array.from(document.querySelectorAll(".grid div"));

  const scoreDisplay = document.querySelector("#score");

  const startBtn = document.querySelector("#start-button");

  const width = 10;

  let nextRandomTetromino = 0;

  let timerId;

  let score = 0;

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

  const colors = ["blue", "gray", "red", "black", "brown"];

  //Show up-next tetromino in mini-grid display
  const displaySquares = Array.from(
    document.querySelectorAll(".mini-grid div")
  );
  const displayWidth = 4;
  const displayIndex = 0;

  //the Tetrominos without rotations.
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
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
    });

    upNextTetrominoes[nextRandomTetromino].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[nextRandomTetromino];
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
    });
  }

  //undraw the Tetromino
  function undraw() {
    currentTetromino.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.backgroundColor = "";
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
          squqres[index].style.backgroundColor = "";
        });
        const squaresRemoved = squares.splice(i, width);

        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  function gameOver() {
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML = "End";
      clearInterval(timerId);
    }
  }

  document.addEventListener("keydown", (e) => {
    let key = e.key;

    switch (key) {
      case "ArrowRight":
        moveRight();
        break;
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowDown":
        moveDownFaster();
        break;
      case "ArrowUp":
        rotate();
        break;
      case " ":
        spaceBarStartBtn();
        break;
      default:
        console.log(`the key is: ${key}`);
        break;
    }
  });
});
