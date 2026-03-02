const colors = [
  "red", "blue", "green", "yellow",
  "black", "purple", "orange", "pink"
];

let selectedColor = "black";

const colorsDiv = document.getElementById("colors");

colors.forEach(color => {
  const div = document.createElement("div");
  div.classList.add("color");
  div.style.backgroundColor = color;

  div.addEventListener("click", () => {
    selectedColor = color;
  });

  colorsDiv.appendChild(div);
});

const board = document.getElementById("board");

for (let i = 0; i < 400; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  board.appendChild(square);
}

let isDrawing = false;

document.addEventListener("mousedown", () => {
  isDrawing = true;
});

document.addEventListener("mouseup", () => {
  isDrawing = false;
});

document.querySelectorAll(".square").forEach(square => {

  square.addEventListener("mousedown", () => {
    square.style.backgroundColor = selectedColor;
  });

  square.addEventListener("mouseover", () => {
    if (isDrawing) {
      square.style.backgroundColor = selectedColor;
    }
  });

});