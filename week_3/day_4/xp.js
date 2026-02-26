// ==============> exercice 1
// products.js
const products = [
  { name: "Laptop", price: 999.99, category: "Electronics" },
  { name: "Headphones", price: 49.99, category: "Electronics" },
  { name: "Coffee Maker", price: 79.99, category: "Kitchen" },
  { name: "Running Shoes", price: 129.99, category: "Footwear" },
  { name: "Backpack", price: 59.99, category: "Accessories" },
];

module.exports = products;

// shop.js
const products = require("./products");

function findProduct(productName) {
  const product = products.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );

  if (product) {
    console.log(`\n✅ Product Found:`);
    console.log(`   Name     : ${product.name}`);
    console.log(`   Price    : $${product.price.toFixed(2)}`);
    console.log(`   Category : ${product.category}`);
  } else {
    console.log(`\n❌ Product "${productName}" not found.`);
  }
}

findProduct("Laptop");
findProduct("Backpack");
findProduct("Coffee Maker");
findProduct("Tablet");

// ==============> exercice 2
// data.js
const persons = [
  { name: "Alice", age: 25, location: "New York" },
  { name: "Bob", age: 30, location: "London" },
  { name: "Charlie", age: 22, location: "Paris" },
  { name: "Diana", age: 35, location: "Tokyo" },
  { name: "Eve", age: 28, location: "Sydney" },
];

export default persons;

// app.js
import persons from "./data.js";

function calculateAverageAge(people) {
  const totalAge = people.reduce((sum, person) => sum + person.age, 0);
  const average = totalAge / people.length;
  return average.toFixed(2);
}

console.log("👥 Persons List:");
persons.forEach((person) => {
  console.log(`   - ${person.name}, Age: ${person.age}, Location: ${person.location}`);
});

const avgAge = calculateAverageAge(persons);
console.log(`\n📊 Average Age: ${avgAge}`);


// ==============> exercice 3
// fileManager.js


const fs = require("fs");

function readFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`❌ Error reading file "${filePath}":`, err.message);
      return;
    }
    console.log(`📖 Content of "${filePath}":\n   ${data}`);
  });
}

function writeFile(filePath, content) {
  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error(`❌ Error writing to file "${filePath}":`, err.message);
      return;
    }
    console.log(`✅ Successfully wrote to "${filePath}"`);
  });
}

module.exports = { readFile, writeFile };


// app.js
const { readFile, writeFile } = require("./fileManager");

readFile("Hello World.txt");

writeFile("Bye World.txt", "Writing to the file");

setTimeout(() => {
  readFile("Bye World.txt");
}, 100);


//==============> exercice 4

// todo.js
export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(taskName) {
    const task = { id: this.tasks.length + 1, name: taskName, completed: false };
    this.tasks.push(task);
    console.log(`✅ Task added: "${taskName}"`);
  }

  markComplete(taskName) {
    const task = this.tasks.find((t) => t.name.toLowerCase() === taskName.toLowerCase());
    if (task) {
      task.completed = true;
      console.log(`☑️  Task marked as complete: "${taskName}"`);
    } else {
      console.log(`❌ Task not found: "${taskName}"`);
    }
  }

  listTasks() {
    console.log("\n📋 Todo List:");
    if (this.tasks.length === 0) {
      console.log("   No tasks found.");
      return;
    }
    this.tasks.forEach((task) => {
      const status = task.completed ? "✅ Done" : "⏳ Pending";
      console.log(`   [${task.id}] ${task.name} - ${status}`);
    });
  }
}

// app.js
import { TodoList } from "./todo.js";

const myList = new TodoList();

myList.addTask("Buy groceries");
myList.addTask("Read a book");
myList.addTask("Go for a walk");
myList.addTask("Study Node.js");

myList.markComplete("Buy groceries");
myList.markComplete("Go for a walk");

myList.listTasks();



// //==============> exercice 5
// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };

// app.js
const _ = require("lodash");
const { add, multiply } = require("./math");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("🔢 Numbers Array:", numbers);

console.log("\n➕ Addition Results:");
console.log(`   add(5, 3)   = ${add(5, 3)}`);
console.log(`   add(10, 20) = ${add(10, 20)}`);

console.log("\n✖️  Multiplication Results:");
console.log(`   multiply(4, 3)  = ${multiply(4, 3)}`);
console.log(`   multiply(6, 7)  = ${multiply(6, 7)}`);

console.log("\n🔧 Lodash Utility Results:");
console.log(`   Sum of array      : ${_.sum(numbers)}`);
console.log(`   Max value         : ${_.max(numbers)}`);
console.log(`   Min value         : ${_.min(numbers)}`);
console.log(`   Mean (average)    : ${_.mean(numbers)}`);
console.log(`   Chunk by 3        :`, _.chunk(numbers, 3));
console.log(`   Uniq [1,1,2,2,3]  :`, _.uniq([1, 1, 2, 2, 3]));



//==============> exercice 6


import chalk from 'chalk';

console.log(chalk.blue('Hello, this is a blue message!'));
console.log(chalk.red.bold('This is a bold red message!'));
console.log(chalk.green.underline('This is an underlined green message!'));
console.log(chalk.yellow.bgBlack('Yellow text with black background'));
console.log(chalk.magentaBright('Bright magenta message'));


//==============> exercice 7
// copy-file.js
import fs from 'fs';

fs.readFile('source.txt', 'utf8', (err, data) => {
    if (err) throw err;
    fs.writeFile('destination.txt', data, (err) => {
        if (err) throw err;
        console.log('File has been copied to destination.txt');
    });
});


// read-directory.js
import fs from 'fs';

const directoryPath = './';

fs.readdir(directoryPath, (err, files) => {
    if (err) throw err;
    files.forEach(file => console.log(file));
});