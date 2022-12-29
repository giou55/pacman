const canvas = document.querySelector("canvas");

let image = new Image();
image.src = "kon.png";
let imageSize = 60;

let boundaryWidth = 90;
let boundaryHeight = 90;

const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  constructor({ position }) {
    this.position = position;
    this.width = boundaryWidth;
    this.height = boundaryHeight;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.size = imageSize;
  }

  draw() {
    c.drawImage(image, this.position.x, this.position.y, imageSize, imageSize);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const boundaries = [];

const player = new Player({
  position: {
    x: boundaryWidth + (boundaryWidth - imageSize) / 2,
    y: boundaryHeight + (boundaryHeight - imageSize) / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

console.log(player.position.x);
console.log(player.position.y);

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastKey = "";

const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            position: {
              x: boundaryWidth * j,
              y: boundaryHeight * i,
            },
          })
        );
        break;
    }
  });
});

function animate() {
  reqAnim = window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  boundaries.forEach((boundary) => {
    boundary.draw();

    let distance = (boundaryWidth - imageSize) / 2;

    if (
      player.position.y + distance >= boundary.position.y + boundaryHeight &&
      player.position.x + distance >= boundary.position.x &&
      player.position.y + distance <= boundary.position.y + boundaryHeight &&
      player.position.x - distance <= boundary.position.x + boundaryWidth
    ) {
      console.log("colliding");
    }
  });

  player.update();
  player.velocity.y = 0;
  player.velocity.x = 0;

  if (keys.w.pressed && lastKey === "w") {
    player.velocity.y = -5;
  } else if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.s.pressed && lastKey === "s") {
    player.velocity.y = 5;
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 5;
  }
}

animate();

window.addEventListener("keydown", ({ key }) => {
  let distance = (boundaryWidth - imageSize) / 2;
  console.log(player.position.x - distance);
  console.log(player.position.y - distance);
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
