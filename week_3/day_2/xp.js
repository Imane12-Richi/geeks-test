/*************************************************
  Exercise 1 : Giphy API (Fetch + Error Handling)
*************************************************/

const GIPHY_URL_1 =
  "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(GIPHY_URL_1)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Exercise 1 Result:");
    console.log(data);
  })
  .catch(error => {
    console.error("Exercise 1 Error:", error.message);
  });



/*************************************************
  Exercise 2 : Giphy API (10 gifs about sun)
*************************************************/

const GIPHY_URL_2 =
  "https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(GIPHY_URL_2)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Exercise 2 Result:");
    console.log(data);
  })
  .catch(error => {
    console.error("Exercise 2 Error:", error.message);
  });



/*************************************************
  Exercise 3 : Async / Await (No .then())
*************************************************/

async function getStarship() {
  try {
    const response = await fetch("https://www.swapi.tech/api/starships/9/");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Exercise 3 Result:");
    console.log(data.result);

  } catch (error) {
    console.error("Exercise 3 Error:", error.message);
  }
}

getStarship();



/*************************************************
  Exercise 4 : Analyze
*************************************************/

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  let result = await resolveAfter2Seconds();
  console.log(result);
}

asyncCall();

/*
Expected Output:

Immediately:
calling

After 2 seconds:
resolved

Explanation:
- asyncCall() runs.
- "calling" prints immediately.
- await pauses execution until the Promise resolves.
- After 2 seconds, "resolved" prints.
*/
