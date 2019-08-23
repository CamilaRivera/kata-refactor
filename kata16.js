
const calculateDirection = function( currentDirection, turn) {
  if (currentDirection["east"] === 1 ) {
    if (turn === "right") {
      return {"east": 0, "north": -1};
    }
    else {
      return {"east": 0, "north": 1};
    }
  }
  else if (currentDirection["north"] === 1 ) {
    if (turn === "right") {
      return {"east": 1, "north": 0};
    }
    else {
      return {"east": -1, "north": 0};
    }
  }
  else if (currentDirection["east"] === -1 ) {
    if (turn === "right") {
      return {"east": 0, "north": 1};
    }
    else {
      return {"east": 0, "north": -1};
    }
  }
  else if (currentDirection["north"] === -1 ) {
    if (turn === "right") {
      return {"east": -1, "north": 0};
    }
    else {
      return {"east": 1, "north": 0};
    }
  }
}

const blocksAway = function (directions) {
  const coordinates = {"east": 0, "north": 0};
  let direction = {"east": 0, "north": 0};

  if ( directions[0] === "left" ) {
    direction["north"] = 1;
    coordinates["north"] += directions[1];
  }
  else {
    direction["east"] = 1;
    coordinates["east"] += directions[1];
  }
  // Put your solution here
  for (let i = 2; i < directions.length; i = i + 2) {
    direction = calculateDirection(direction, directions[i]);
    coordinates["east"] += direction["east"] * directions[i + 1];
    coordinates["north"] += direction["north"] * directions[i + 1];
    coordinates["east"] = Math.max(coordinates["east"], 0);
    coordinates["north"] = Math.max(coordinates["north"], 0);
  }
  return coordinates;
};

// blocksAway2: Old solution
const blocksAway2 = function (directions) {
  // Put your solution here
  let goingNorth;
  let goingSouth;
  let goingEast;
  let goingWest;
  let east = 0;
  let north = 0;
  let coordinates = {};
  for (let i = 0; i < directions.length; i = i + 2) {
    if (i === 0 && directions[i] === "right") {
      east = directions[i + 1];
      goingEast = true;
    } else if (i === 0 && directions[i] === "left") {
      north = directions[i + 1];
      goingNorth = true;
    } else if (directions[i] === "left" && goingNorth === true) {
      east = east - directions[i + 1];
      if (east < 0) {
        east = 0;
      } if (north < 0) {
        north = 0;
      }
      goingWest = true;
      goingNorth = goingSouth = goingEast = false;
    } else if (directions[i] === "right" && goingNorth === true) {
      east = east + directions[i + 1];
      if (east < 0) {
        east = 0;
      } if (north < 0) {
        north = 0;
      }
      goingEast = true;
      goingNorth = goingSouth = goingWest = false;
    } else if (directions[i] === "left" && goingEast === true) {
      north = north + directions[i + 1];
      if (east < 0) {
        east = 0;
      } if (north < 0) {
        north = 0;
      }
      goingNorth = true;
      goingSouth = goingEast = goingWest = false;
    } else if (directions[i] === "right" && goingEast === true) {
      north = north - directions[i + 1];
      if (east < 0) {
        east = 0;
      } if (north < 0) {
        north = 0;
      }
      goingSouth = true;
      goingNorth = goingEast = goingWest = false;
    } else if (directions[i] === "right" && goingWest === true) {
      north = north + directions[i + 1];
      if (east < 0) {
        east = 0;
      } if (north < 0) {
        north = 0;
      }
      goingNorth = true;
      goingSouth = goingEast = goingWest = false;
    } else if (directions[i] === "left" && goingWest === true) {
      north = north - directions[i + 1];
      if (east < 0) {
        east = 0;
      } if (north < 0) {
        north = 0;
      }
      goingSouth = true;
      goingNorth = goingEast = goingWest = false;
    } else if (directions[i] === "left" && goingSouth === true) {
      east = east + directions[i + 1];
      if (east < 0) {
        east = 0;
      } if (north < 0) {
        north = 0;
      }
      goingEast = true;
      goingNorth = goingSouth = goingWest = false;
    } else if (directions[i] === "right" && goingSouth === true) {
      east = east - directions[i + 1];
      if (east < 0) {
        east = 0;
      } if (north < 0) {
        north = 0;
      }
      goingWest = true;
      goingNorth = goingSouth = goingEast = false;
    }


  }
  coordinates["east"] = east;
  coordinates["north"] = north;
  return coordinates;
};

console.log(blocksAway2(["right", 2, "left", 3, "left", 1]));
console.log(blocksAway2(["left", 1, "right", 1, "left", 1, "right", 1, "left", 1, "right", 1]));
console.log(blocksAway2(["left", 3, "right", 1, "right", 3, "right", 1])); // I think the coordinates should be {east: 0 north: 0} instead of the result in compass {east: 2, north: 0} 




console.log(blocksAway(["right", 2, "left", 3, "left", 1]));
console.log(blocksAway(["left", 1, "right", 1, "left", 1, "right", 1, "left", 1, "right", 1]));
console.log(blocksAway(["left", 3, "right", 1, "right", 3, "right", 1])); // I think the coordinates should be {east: 0 north: 0} instead of the result in compass {east: 2, north: 0} 

