// =============================
// Exercise 1 : Dog age to Human years
// =============================

const data = [
  { name: 'Butters', age: 3, type: 'dog' },
  { name: 'Cuty', age: 5, type: 'rabbit' },
  { name: 'Lizzy', age: 6, type: 'dog' },
  { name: 'Red', age: 1, type: 'cat' },
  { name: 'Joey', age: 3, type: 'dog' },
  { name: 'Rex', age: 10, type: 'dog' },
];

// 1) Using a loop
let sumHumanYears = 0;

for (let i = 0; i < data.length; i++) {
  if (data[i].type === 'dog') {
    sumHumanYears += data[i].age * 7;
  }
}

console.log("Sum with loop:", sumHumanYears);


// 2) Using reduce()
const sumReduce = data.reduce((total, animal) => {
  if (animal.type === 'dog') {
    return total + animal.age * 7;
  }
  return total;
}, 0);

console.log("Sum with reduce:", sumReduce);


// =============================
// Exercise 2 : Email
// =============================

const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';

// Remove whitespace in one line
const cleanEmail = userEmail3.trim();

console.log("Clean email:", cleanEmail);


// =============================
// Exercise 3 : Employees #3
// =============================

const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor' },
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor' }
];

const usersObject = {};

users.forEach(user => {
  const { firstName, lastName, role } = user; // destructuring
  const fullName = `${firstName} ${lastName}`;
  usersObject[fullName] = role;
});

console.log("Users object:", usersObject);


// =============================
// Exercise 4 : Array to Object
// =============================

const letters = ['x', 'y', 'z', 'z'];


// 1) Using for loop
const countLetters = {};

for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  countLetters[letter] = (countLetters[letter] || 0) + 1;
}

console.log("With loop:", countLetters);


// 2) Using reduce()
const countReduce = letters.reduce((acc, letter) => {
  acc[letter] = (acc[letter] || 0) + 1;
  return acc;
}, {});

console.log("With reduce:", countReduce);