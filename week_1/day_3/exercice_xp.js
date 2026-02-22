
//  Exercise 1 : Location


const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
};

const { name, location: { country, city, coordinates: [lat, lng] } } = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);



//  Exercise 2 : Display Student Info


function displayStudentInfo(objUser){
    const { first, last } = objUser;
    return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({ first: 'Elie', last: 'Schoppik' }));



//  Exercise 3 : User & id


const users = { user1: 18273, user2: 92833, user3: 90315 };

// Part 1
const usersArray = Object.entries(users);
console.log(usersArray);

// Part 2
const multipliedUsers = Object.entries(users)
    .map(([user, id]) => [user, id * 2]);

console.log(multipliedUsers);



// Exercise 4 : Person class

class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member); // object



// Exercise 5 : Dog class


class Dog {
  constructor(name) {
    this.name = name;
  }
};

class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
}

const myDog = new Labrador("Rex", "Large");
console.log(myDog);


// ==========================
//  Exercise 6 : Challenges




// Object references
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5 };

object1.number = 4;

console.log(object2.number); // 4
console.log(object3.number); // 4
console.log(object4.number); // 5


// ==========================
// Classes Animal & Mammal
// ==========================

class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  sound(animalSound) {
    return `${animalSound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

const farmerCow = new Mammal("Lily", "cow", "brown and white");

console.log(farmerCow.sound("Moooo"));