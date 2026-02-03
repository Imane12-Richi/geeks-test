// ===== Exercise 1
let numbers = [123, 8409, 100053, 333333333, 7];

for (let i of numbers) {
    if(i % 3 === 0) {
        console.log(true)
    }else {
        console.log(false)
    }
}
// ===== Exercise 2

let guestList = {
    randy: "Germany",
    karla: "France",
    wendy: "Japan",
    norman: "England",
    sam: "Argentina"
}

let userName = prompt("enter your name : ")

if (userName in guestList) {
    console.log(`Hi! I'm ${userName}, and I'm from ${guestList[userName]}.`);
} else {
    console.log("Hi! I'm a guest.");
}

// ===== Exercise 3

let age = [20,5,12,43,98,55];
let sum = 0
for (let i of age){
    sum += i;
}
console.log("the sum of all age ", sum)

let maxAge = age[0]
for (let i = 0; i < age.length; i++){
    if(age[i] > maxAge){
        maxAge = age[i]
    }
}
console.log("the max age is : ", maxAge)

// ===== Exercise 4


// ===== Exercise ...
