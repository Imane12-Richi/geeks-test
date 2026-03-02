// 1. Prompt user for input
const input = prompt("Enter several words separated by commas:");

// 2. Convert input string into array of trimmed words
const words = input.split(",").map(word => word.trim());

// 3. Find the length of the longest word
let maxLength = 0;

for (let i = 0; i < words.length; i++) {
  if (words[i].length > maxLength) {
    maxLength = words[i].length;
  }
}

// 4. Create the top and bottom border
const border = "*".repeat(maxLength + 4);

// 5. Print the frame
console.log(border);

for (let i = 0; i < words.length; i++) {
  const word = words[i];
  const spaces = " ".repeat(maxLength - word.length);
  console.log(`* ${word}${spaces} *`);
}

console.log(border);