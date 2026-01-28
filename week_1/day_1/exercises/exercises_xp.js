//===== Exercise 1
const people = ["Greg", "Mary", "Devon", "James"];//1
people.splice(0,1);
console.log(people)


people[3]="jason";               
console.log(people)

  const people = ["Greg", "Mary", "Devon", "James"];//3
 people.push("imane")
console.log(people)

 const people = ["Greg", "Mary", "Devon", "James"];//4
people.indexOf("Mary")
console.log(people.indexOf("Mary"))

 const people = ["Mary","Devon","Jason","Yourname"];//5
const array=people.slice(1,3);
console.log(array)

 const people = ["Mary","Devon","Jason","Yourname"];//6
const index = people.indexOf("Foo");
console.log(index)

 const people = ["Mary","Devon","Jason","Yourname"];//7
const last = people[people.length - 1]; // is not in the array
console.log(last)

//loops
 const people = ["Mary", "Devon", "Jason", "Yourname"];//1
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}
//===== Exercise 2

const people = ["Mary", "Devon", "Jason", "Yourname"];
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);  // afficher la personne
  if (people[i] === "Devon") {
    break;                 // sortir de la boucle
  }
}

 const colors = ["Black", "pink", "green", "reed","bleu"];//2
for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1} choice is ${colors[i]}`);
}
  
 suffixes = ["st", "nd", "rd", "th", "th"];
for (let i = 0; i < colors.length; i++) {
  console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}
//===== Exercise 3

 let number = prompt("Enter a number:");//1
console.log(typeof number);

  number = Number(number);//2
while (number < 10) {
  number = Number(prompt("Enter a new number:"));
}
//===== Exercise 4
const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {
    sarah: [3, 990],
    dan: [4, 1000],
    david: [1, 500],
  },
};

 console.log(building.numberOfFloors);//1

 console.log(  //2
  building.numberOfAptByFloor.firstFloor +
  building.numberOfAptByFloor.thirdFloor
);
  console.log(        //3
  building.nameOfTenants[1],
  building.numberOfRoomsAndRent.dan[0]
);

if (
  building.numberOfRoomsAndRent.sarah[1] +
  building.numberOfRoomsAndRent.david[1] >
  building.numberOfRoomsAndRent.dan[1]
) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
}
//exercice 6
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
};

let sentence = "";

for (let key in details) {
  sentence += key + " " + details[key] + " ";
}

console.log(sentence.trim());

//exercice 5
const family = {  //1
  father: "Ahmed",
  mother: "Fatima",
  daughter: "Ima",
  son: "Youssef"
};

for (let key in family) {  //2
  console.log(key);
}

for (let key in family) {  //3  
  console.log(family[key]);
}
//exercice 7
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

let secretName = [];

for (let i = 0; i < names.length; i++) {
  secretName.push(names[i][0]);
}

secretName.sort();

console.log(secretName.join(""));







