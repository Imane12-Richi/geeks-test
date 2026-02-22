const form = document.getElementById("gif-form");
const input = document.getElementById("category");
const gifsContainer = document.getElementById("gifs");
const deleteAllBtn = document.getElementById("delete-all");

const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const searchTerm = input.value.trim();
  if (!searchTerm) return;

  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?tag=${searchTerm}&rating=g&api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const gifUrl = data.data.images.original.url;

    appendGif(gifUrl);

    input.value = "";

  } catch (error) {
    console.error("Error fetching GIF:", error.message);
  }
});


function appendGif(url) {
  const div = document.createElement("div");
  div.classList.add("gif-container");

  const img = document.createElement("img");
  img.src = url;
  img.width = 300;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "DELETE";

  deleteBtn.addEventListener("click", () => {
    div.remove();
  });

  div.appendChild(img);
  div.appendChild(deleteBtn);

  gifsContainer.appendChild(div);
}


// DELETE ALL button
deleteAllBtn.addEventListener("click", () => {
  gifsContainer.innerHTML = "";
});
