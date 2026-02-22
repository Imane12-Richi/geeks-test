/*************************************************
  DAILY CHALLENGE 1
*************************************************/

// Function 1: makeAllCaps
function makeAllCaps(words) {
  return new Promise((resolve, reject) => {
    if (!words.every(word => typeof word === "string")) {
      reject("Error: Not all items are strings.");
    } else {
      resolve(words.map(word => word.toUpperCase()));
    }
  });
}

// Function 2: sortWords
function sortWords(words) {
  return new Promise((resolve, reject) => {
    if (words.length > 4) {
      resolve(words.sort());
    } else {
      reject("Error: Array length must be greater than 4.");
    }
  });
}

/************* TESTS *************/

//  contains number
makeAllCaps([1, "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

// length not > 4
makeAllCaps(["apple", "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

//  valid case
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));



/*************************************************
  DAILY CHALLENGE 2
*************************************************/

const morse = `{
  "0": "-----","1": ".----","2": "..---","3": "...--",
  "4": "....-","5": ".....","6": "-....","7": "--...",
  "8": "---..","9": "----.",
  "a": ".-","b": "-...","c": "-.-.","d": "-..",
  "e": ".","f": "..-.","g": "--.","h": "....",
  "i": "..","j": ".---","k": "-.-","l": ".-..",
  "m": "--","n": "-.","o": "---","p": ".--.",
  "q": "--.-","r": ".-.","s": "...","t": "-",
  "u": "..-","v": "...-","w": ".--","x": "-..-",
  "y": "-.--","z": "--..",
  ".": ".-.-.-",",": "--..--","?": "..--..",
  "!": "-.-.--","-": "-....-","/": "-..-.",
  "@": ".--.-.","(": "-.--.",")": "-.--.-"
}`;

// Convert JSON string → JS object
function toJs() {
  return new Promise((resolve, reject) => {
    const morseJS = JSON.parse(morse);

    if (Object.keys(morseJS).length === 0) {
      reject("Error: Morse object is empty.");
    } else {
      resolve(morseJS);
    }
  });
}

// Translate user input → Morse
function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const userInput = prompt("Enter a word or sentence:").toLowerCase();
    const translation = [];

    for (let char of userInput) {
      if (char === " ") {
        translation.push("\n");
      } else if (morseJS[char]) {
        translation.push(morseJS[char]);
      } else {
        reject(`Error: Character "${char}" does not exist.`);
        return;
      }
    }

    resolve(translation);
  });
}

// Join and display on page
function joinWords(morseTranslation) {
  const output = morseTranslation.join("\n");
  document.body.innerHTML += `<pre>${output}</pre>`;
}

// Chain functions
toJs()
  .then(morseJS => toMorse(morseJS))
  .then(morseTranslation => joinWords(morseTranslation))
  .catch(error => console.log(error));
