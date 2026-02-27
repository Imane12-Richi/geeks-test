

// Create GET Form
const getTitle = document.createElement("h2");
getTitle.textContent = "Exercise 1 - GET Form";
document.body.appendChild(getTitle);

const getForm = document.createElement("form");
getForm.method = "GET";
getForm.action = ""; // same page

getForm.innerHTML = `
  <label>Name:</label><br>
  <input type="text" name="name"><br><br>

  <label>Message:</label><br>
  <textarea name="message" rows="4" cols="30"></textarea><br><br>

  <input type="submit" value="Send (GET)">
`;

document.body.appendChild(getForm);


// Create POST Form
const postTitle = document.createElement("h2");
postTitle.textContent = "Exercise 2 - POST Form";
document.body.appendChild(postTitle);

const postForm = document.createElement("form");
postForm.method = "POST";
postForm.action = ""; // same page

postForm.innerHTML = `
  <label>Name:</label><br>
  <input type="text" name="name"><br><br>

  <label>Message:</label><br>
  <textarea name="message" rows="4" cols="30"></textarea><br><br>

  <input type="submit" value="Send (POST)">
`;

document.body.appendChild(postForm);


/*************************************************
 * EXERCISE 3 — JSON MARIO
 *************************************************/

const marioGame = {
  detail: "An amazing game!",
  characters: {
    mario: {
      description: "Small and jumpy. Likes princesses.",
      height: 10,
      weight: 3,
      speed: 12,
    },
    bowser: {
      description: "Big and green, Hates princesses.",
      height: 16,
      weight: 6,
      speed: 4,
    },
    princessPeach: {
      description: "Beautiful princess.",
      height: 12,
      weight: 2,
      speed: 2,
    }
  }
};

// Convert to JSON (minified)
const jsonMinified = JSON.stringify(marioGame);
console.log("Minified JSON:");
console.log(jsonMinified);

// Convert to JSON (pretty printed)
const jsonPretty = JSON.stringify(marioGame, null, 2);
console.log("Pretty JSON:");
console.log(jsonPretty);

// Add JSON output to page
const jsonTitle = document.createElement("h2");
jsonTitle.textContent = "Exercise 3 - JSON Output";
document.body.appendChild(jsonTitle);

const pre = document.createElement("pre");
pre.textContent = jsonPretty;
document.body.appendChild(pre);





debugger;