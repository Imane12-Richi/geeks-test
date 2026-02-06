//Exercise 1

function displayNumbersDivisible(divisor = 23) {
    let sum = 0;

    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            console.log(i);
            sum += i;
        }
    }

    console.log("Sum :", sum);
}

displayNumbersDivisible();
displayNumbersDivisible(3);
displayNumbersDivisible(45);

// Exercice 2 

const stock = { 
    banana: 6, 
    apple: 0,
    pear: 12,
    orange: 32,
    blueberry: 1
};

const prices = {    
    banana: 4, 
    apple: 2, 
    pear: 1,
    orange: 1.5,
    blueberry: 10
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let total = 0;

    for (let item of shoppingList) {
        if (stock[item] > 0) {
            total += prices[item];
            stock[item]--;
        }
    }

    return total;
}

console.log(myBill());

//exercice 3 

function changeEnough(itemPrice, amountOfChange) {
    const values = [0.25, 0.10, 0.05, 0.01];
    let total = 0;

    for (let i = 0; i < amountOfChange.length; i++) {
        total += amountOfChange[i] * values[i];
    }

    return total >= itemPrice;
}

console.log(changeEnough(4.25, [25, 20, 5, 0]));
console.log(changeEnough(14.11, [2, 100, 0, 0]));
console.log(changeEnough(0.75, [0, 0, 20, 5]));

//exercice 4

function hotelCost(nights) {
    return nights * 140;
}

function planeRideCost(destination) {
    if (destination === "London") return 183;
    if (destination === "Paris") return 220;
    return 300;
}

function rentalCarCost(days) {
    let cost = days * 40;
    if (days > 10) cost *= 0.95;
    return cost;
}

function totalVacationCost() {
    let nights;
    while (!nights || isNaN(nights)) {
        nights = prompt("How many nights?");
    }

    let destination;
    while (!destination || typeof destination !== "string") {
        destination = prompt("Destination?");
    }

    let days;
    while (!days || isNaN(days)) {
        days = prompt("How many days for car?");
    }

    const hotel = hotelCost(Number(nights));
    const plane = planeRideCost(destination);
    const car = rentalCarCost(Number(days));

    return hotel + plane + car;
}

console.log(totalVacationCost());


//exercice 5 

const div = document.getElementById("container");
console.log(div);

const lists = document.querySelectorAll(".list");

lists[0].children[1].textContent = "Richard";
lists[1].children[1].remove();

for (let list of lists) {
    list.children[0].textContent = "Ima";
}

lists.forEach(list => list.classList.add("student_list"));
lists[0].classList.add("university", "attendance");

div.style.backgroundColor = "lightblue";
div.style.padding = "10px";

lists[1].lastElementChild.style.display = "none";
lists[0].children[1].style.border = "1px solid black";

document.body.style.fontSize = "18px";

if (div.style.backgroundColor === "lightblue") {
    alert("Hello Ima and Richard");
}

//exercice 6 

const nav = document.getElementById("navBar");
nav.setAttribute("id", "socialNetworkNavigation");

const ul = nav.firstElementChild;

const li = document.createElement("li");
const text = document.createTextNode("Logout");
li.appendChild(text);
ul.appendChild(li);

console.log(ul.firstElementChild.textContent);
console.log(ul.lastElementChild.textContent);

//exercice 7 

const allBooks = [
    {
        title: "Harry Potter",
        author: "J.K. Rowling",
        image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
        alreadyRead: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
        alreadyRead: false
    }
];

const section = document.querySelector(".listBooks");

allBooks.forEach(book => {
    const div = document.createElement("div");

    const text = document.createElement("p");
    text.textContent = `${book.title} written by ${book.author}`;
    if (book.alreadyRead) text.style.color = "red";

    const img = document.createElement("img");
    img.src = book.image;
    img.style.width = "100px";

    div.appendChild(text);
    div.appendChild(img);
    section.appendChild(div);
});



