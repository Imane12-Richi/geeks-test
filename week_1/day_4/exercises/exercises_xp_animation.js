// =========================
//  EXERCISE 1 — TIMER
// =========================

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("container");
  const clearButton = document.getElementById("clear");

  // -------------------------
  // Part I - Alert after 2s
  // -------------------------
  setTimeout(function () {
    alert("Hello World");
  }, 2000);


  // -------------------------
  // Part II - Add 1 paragraph after 2s
  // -------------------------
  setTimeout(function () {
    const p = document.createElement("p");
    p.textContent = "Hello World";
    container.appendChild(p);
  }, 2000);


  // -------------------------
  // Part III - Add paragraph every 2s
  // Stop at 5 OR button click
  // -------------------------
  let intervalId = setInterval(function () {

    const p = document.createElement("p");
    p.textContent = "Hello World";
    container.appendChild(p);

    if (container.children.length >= 5) {
      clearInterval(intervalId);
    }

  }, 2000);


  if (clearButton) {
    clearButton.addEventListener("click", function () {
      clearInterval(intervalId);
    });
  }

});


// =========================
//  EXERCISE 2 — MOVE BOX
// =========================

function myMove() {

  const element = document.getElementById("animate");
  const container = document.getElementById("container");

  let position = 0;
  const containerWidth = container.clientWidth;
  const boxWidth = element.clientWidth;

  const intervalId = setInterval(function () {

    if (position >= containerWidth - boxWidth) {
      clearInterval(intervalId);
    } else {
      position++;
      element.style.left = position + "px";
    }

  }, 1);

}