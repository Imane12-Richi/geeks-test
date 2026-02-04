//exercice 1 
const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);

//exercice 2

function displayStudentInfo({first, last}) {
    return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({first: 'Elie', last:'Schoppik'}));

//exercice 3 
const users = { user1: 18273, user2: 92833, user3: 90315 };

// Part 1: convert object to array
const usersArray = Object.entries(users);
console.log(usersArray);

// Part 2: multiply ID by 2
const updatedUsersArray = usersArray.map(([key, id]) => [key, id * 2]);
console.log(updatedUsersArray);

//exercice 4 

class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member);

//exercice 5 

class Dog {
  constructor(name) {
    this.name = name;
  }
}

// Option 2 is correct
class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
}

//exercice 6 
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



