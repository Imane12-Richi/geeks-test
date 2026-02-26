const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/* =====================================
   TASK 1 — Greeting Function
===================================== */
function greet(name) {
  return `Hello, ${name}! Welcome to your daily Node.js challenge.`;
}

/* =====================================
   TASK 2 — Colorful Message
===================================== */
function showColorfulMessage() {
  console.log(
    chalk.blue.bold('\n✨ Daily Motivation ✨') +
    chalk.green('\nKeep coding and improving every day!\n')
  );
}

/* =====================================
   TASK 3 — Read File
===================================== */
function readFileContent() {
  const filePath = path.join(__dirname, 'files', 'file-data.txt');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(chalk.red('Error reading file:'), err.message);
      return;
    }

    console.log(chalk.yellow('\n📄 File Content:\n'));
    console.log(data);
  });
}

/* =====================================
   CHALLENGE — Integrating Everything
===================================== */

console.log('\n===== DAILY CHALLENGE START =====\n');

// Greeting
const message = greet('Ali');
console.log(message);

// Colorful message
showColorfulMessage();

// Read file
readFileContent();