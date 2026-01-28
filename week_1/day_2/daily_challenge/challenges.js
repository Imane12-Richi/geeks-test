// ====== Daily Challenge 1
const planets = [
  { name: "Mercury", color: "gray", moons: 0 },
  { name: "Venus", color: "orange", moons: 0 },
  { name: "Earth", color: "blue", moons: 1 },
  { name: "Mars", color: "red", moons: 2 },
  { name: "Jupiter", color: "brown", moons: 4 },
  { name: "Saturn", color: "goldenrod", moons: 3 },
  { name: "Uranus", color: "lightblue", moons: 2 },
  { name: "Neptune", color: "purple", moons: 2 }
];

const section = document.querySelector(".listPlanets");

for (let i = 0; i < planets.length; i++) {
  const planetDiv = document.createElement("div");
  planetDiv.classList.add("planet");
  planetDiv.style.backgroundColor = planets[i].color;

  for (let j = 0; j < planets[i].moons; j++) {
    const moonDiv = document.createElement("div");
    moonDiv.classList.add("moon");
    moonDiv.style.left = 20 * (j + 1) + "px";
    moonDiv.style.top = 20 * (j + 1) + "px";
    planetDiv.appendChild(moonDiv);
  }

  section.appendChild(planetDiv);
}

// ====== Daily Challenge 2
let input = prompt("Enter several words separated by commas");

let words = input.split(",").map(word => word.trim());

let maxLength = 0;
for (let i = 0; i < words.length; i++) {
  if (words[i].length > maxLength) {
    maxLength = words[i].length;
  }
}

let stars = "*".repeat(maxLength + 4);
console.log(stars);

for (let i = 0; i < words.length; i++) {
  let spaces = " ".repeat(maxLength - words[i].length);
  console.log("* " + words[i] + spaces + " *");
}

console.log(stars);

// ====== Daily Challenge 3
