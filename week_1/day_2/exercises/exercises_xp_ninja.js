// ===== Exercise 1
let randomNumber = Math.floor(Math.random() * 100) + 1;

for (let i = 0; i <= randomNumber; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// ===== Exercise 2
function capitalize(str) {
  let evenCaps = "";
  let oddCaps = "";

  for (let i = 0; i < str.length; i++) {
    evenCaps += (i % 2 === 0) ? str[i].toUpperCase() : str[i];
    oddCaps += (i % 2 !== 0) ? str[i].toUpperCase() : str[i];
  }

  return [evenCaps, oddCaps];
}


// ===== Exercise 3

// ===== Exercise 4

// ===== Exercise ...