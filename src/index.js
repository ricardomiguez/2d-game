/**
 * App Initialization
 */

const tileDimensionInPixels = 64;

const numberOfContainerBlocksY = 7;

const numberOfContainerBlocksX = 10;

const container = document.querySelector(".container");

const character = document.querySelector(".character");

setContainerHeight(numberOfContainerBlocksY);
setContainerWidth(numberOfContainerBlocksX);

setCharacterHeight(1);
setCharacterWidth(1);

setCharacterInitialPositionY(0);
setCharacterInitialPositionX(0);

setCharacterInitialSprite();

/**
 * Grid Obstacles
 */

const containerHeight = Number(((getComputedStyle(container).height).match(/[0-9]/g)).join(""));

const containerWidth = Number(((getComputedStyle(container).width).match(/[0-9]/g)).join(""));

console.log("Container height: ", containerHeight);

console.log("Container width: ", containerWidth);

const grid = [
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
];

for(let y = 0; y < grid.length; y++) {
  for(let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === 1) {
      const obstacle = document.createElement("div");
      const obstaclePositionInPixelsX = x * tileDimensionInPixels;
      const obstaclePositionInPixelsY = y * tileDimensionInPixels;
      obstacle.style.left = obstaclePositionInPixelsX + "px";
      obstacle.style.top = obstaclePositionInPixelsY + "px";
      obstacle.classList.add("obstacle");
      container.appendChild(obstacle);
    }
  }
}

/**
 * Obstacles Initialization
 */

const obstacles = document.querySelectorAll(".obstacle");

setObstaclesHeight(1);
setObstaclesWidth(1);

/**
 * Movement and Collision Logic
 */

 document.addEventListener("keydown", (event) => {
  if (event.repeat) {
    return;
  }

  if (event.key === "ArrowUp") {
    if (isCurrentSprite("upArrow", "(1)")) {
      walkUp();
      // Get current row and update its position
      const i = upperRow();
      // Get current column
      const j = currentColumn();
      // If there isn't a boundary && if there isn't an object in this direction, update
      console.log(`[${i}, ${j}]`);
      if (i >= 0 && grid[i][j] === 0) {
        character.style.top = i * tileDimensionInPixels + "px";
        return;
      }
      return;
    }
    upArrowCharacterSprite();
    return;
  }

  if (event.key === "ArrowRight") {
    if (isCurrentSprite("leftArrow", "(-1)")) {
      walkRight();
      // Get current row
      const i = currentRow();
      // Get current column and update its position
      const j = rightSideColumn();
      // If there isn't a boundary && if there isn't an object in this direction, update
      console.log(`[${i}, ${j}]`);
      if (j < numberOfContainerBlocksX && grid[i][j] === 0) {
        character.style.left = j * tileDimensionInPixels + "px";
        return;
      }
      return;
    }
    rightArrowCharacterSprite();
    return;
  }

  if (event.key === "ArrowDown") {
    if (isCurrentSprite("downArrow", "(1)")) {
      walkDown();
      // Get current row and update its position
      const i = lowerRow();
      // Get current column
      const j = currentColumn();
      // If there isn't a boundary && if there isn't an object in this direction, update
      console.log(`[${i}, ${j}]`);
      if (i < numberOfContainerBlocksY && grid[i][j] === 0) {
        character.style.top = i * tileDimensionInPixels + "px";
        return;
      }
      return;
    }
    downArrowCharacterSprite();
    return;
  }

  if (event.key === "ArrowLeft") {
    if (isCurrentSprite("leftArrow", "(1)")) {
      walkLeft();
      // Get current row
      const i = currentRow();
      // Get current column  and update its position
      const j = leftSideColumn();
      // If there isn't a boundary && if there isn't an object in this direction, update
      console.log(`[${i}, ${j}]`);
      if (j >= 0 && grid[i][j] === 0) {
        character.style.left = j * tileDimensionInPixels + "px";
        return;
      }
      return;
    }
    leftArrowCharacterSprite();
    return;
  }
  return;
});

/**
 * Functions - Initialization
 */

 function setContainerHeight(numberOfTiles) {
  const containerHeightInPixels = numberOfTiles * tileDimensionInPixels;
  container.style.height = containerHeightInPixels + "px";
}

function setContainerWidth(numberOfTiles) {
  const containerWidthInPixels = numberOfTiles * tileDimensionInPixels;
  container.style.width = containerWidthInPixels + "px";
}

function setCharacterHeight(numberOfTiles) {
  const characterHeightInPixels = numberOfTiles * tileDimensionInPixels;
  character.style.height = characterHeightInPixels + "px";
}

function setCharacterWidth(numberOfTiles) {
  const characterWidthInPixels = numberOfTiles * tileDimensionInPixels;
  character.style.width = characterWidthInPixels + "px";
}

function setCharacterInitialPositionY(y) {
  const initialPositionInPixelsY = y * tileDimensionInPixels;
  character.style.top = initialPositionInPixelsY + "px";
}

function setCharacterInitialPositionX(x) {
  const initialPositionInPixelsX = x * tileDimensionInPixels;
  character.style.left = initialPositionInPixelsX + "px";
}

function setCharacterInitialSprite() {
  character.style.transform = "scaleX(1)";
  character.style.content = "url('public/sprites/downArrow.png')";
}

function setObstaclesHeight(numberOfTiles) {
  const obstacleHeightInPixels = numberOfTiles * tileDimensionInPixels;
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].style.height = obstacleHeightInPixels + "px";
  }
}

function setObstaclesWidth(numberOfTiles) {
  const obstacleWidthInPixels = numberOfTiles * tileDimensionInPixels;
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].style.width = obstacleWidthInPixels + "px";
  }
}

/**
 * Functions - Movement and Collision
 */

function currentRow() {
  return Number(getComputedStyle(character).top.match(/[0-9]/g).join("")) / tileDimensionInPixels;
}

function currentColumn() {
  return Number(getComputedStyle(character).left.match(/[0-9]/g).join("")) / tileDimensionInPixels;
}

function upperRow() {
  return currentRow() - 1;
}

function lowerRow() {
  return currentRow() + 1;
}

function rightSideColumn() {
  return currentColumn() + 1;
}

function leftSideColumn() {
  return currentColumn() - 1;
}

/**
 * Functions - Sprites Usage While Character Moving
 */

function downArrowCharacterSprite() {
  character.style.transform = "scaleX(1)";
  character.style.content = "url('public/sprites/downArrow.png')";
}

function upArrowCharacterSprite() {
  character.style.transform = "scaleX(1)";
  character.style.content = "url('public/sprites/upArrow.png')";
}

function leftArrowCharacterSprite() {
  character.style.transform = "scaleX(1)";
  character.style.content = "url('public/sprites/leftArrow.png')";
}

function rightArrowCharacterSprite() {
  character.style.transform = "scaleX(-1)";
  character.style.content = "url('public/sprites/leftArrow.png')";
}

function isCurrentSprite(sprite, scaleX) {
  if (character.style.content.includes(sprite) && character.style.transform.includes(scaleX)) {
    return true
  }

  return false;
}

function walkDown() {
  character.style.transform = "scaleX(1)";
  character.style.content = "url('public/sprites/walkDown.png')";
  setTimeout(() => {
    downArrowCharacterSprite();
  }, 250);
}

function walkUp() {
  character.style.transform = "scaleX(1)";
  character.style.content = "url('public/sprites/walkUp.png')";
  setTimeout(() => {
    upArrowCharacterSprite();
  }, 250);
}

function walkLeft() {
  character.style.transform = "scaleX(1)";
  character.style.content = "url('public/sprites/walkLeft.png')";
  setTimeout(() => {
    leftArrowCharacterSprite();
  }, 250);
}

function walkRight() {
  character.style.transform = "scaleX(-1)";
  character.style.content = "url('public/sprites/walkLeft.png')";
  setTimeout(() => {
    rightArrowCharacterSprite();
  }, 250);
}
