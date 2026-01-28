// ===== Exercise 1

function displayNumbersDivisible() {
  let sum = 0;

  for (let i = 0; i <= 500; i++) {
    if (i % 23 === 0) {
      console.log(i);
      sum += i;
    }
  }

  console.log("Sum :", sum);
}

displayNumbersDivisible();


function displayNumbersDivisible(divisor) {
  let sum = 0;
    for (let i = 0; i <= 500; i++) {
    if (i % 3 === 0) {
      console.log(i);
      sum += i;
    }
  }

  console.log("Sum :", sum);
}

displayNumbersDivisible();

// // ===== Exercise 2
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 


const shoppingList = ["banana", "orange", "apple"];
function myBill() {
   let total = 0;  
    for (let i = 0; i < shoppingList.length; i++) {
    let item = shoppingList[i];
    if (item in stock && stock[item] > 0) {
      total += prices[item];
    }
  }

  return total;
}
console.log(stock)
// console.log(myBill());
      



// ===== Exercise 3

function changeEnough(itemPrice, amountOfChange) {
  // Renommage des pièces pour que ce soit plus simple
  let [quart, dix, cinq, unCent] = amountOfChange;

  // Calcul du total en dollars
  let total = quart * 0.25 + dix * 0.10 + cinq * 0.05 + unCent * 0.01;

  // Vérifie si le total suffit pour acheter l'article
  return total >= itemPrice;
}

// Exemples d'utilisation
console.log(changeEnough(4.25, [4, 3, 2, 5]));   // true
console.log(changeEnough(14.11, [2, 100, 0, 50])); // false
console.log(changeEnough(0.75, [3, 0, 0, 0]));     // true


function changeEnough(itemPrice, amountOfChange) {
  let [quarters, dimes, nickels, pennies] = amountOfChange;
  let total = quarters * 0.25 + dimes * 0.10 + nickels * 0.05 + pennies * 0.01;

  return total >= itemPrice;
}

console.log(changeEnough(4.25, [25, 20, 5, 0])); // true


// ===== Exercise 4
// 1. Ajouter un fond bleu clair et du padding au <div>
const div = document.querySelector("div");
div.style.backgroundColor = "lightblue";
div.style.padding = "20px";

// 2. Ne pas afficher le <li> qui contient "Dan"
const lis = document.querySelectorAll("ul li");
lis[1].style.display = "none"; // Dan est le dernier li du premier ul

// 3. Ajouter une bordure au <li> qui contient "Richard"
lis[0].style.border = "2px solid black"; // Richard est le 2e li du ul

// 4. Changer la taille de police de tout le body
document.body.style.fontSize = "18px";

// ===== Exercise 5

// je récupère le div
const div = document.getElementById("container");
console.log(div);

// je récupère tous les ul
const uls = document.querySelectorAll("ul");

// je change Pete par Richard
uls[0].children[1].textContent = "Richard";

// je supprime le 2eme li du 2eme ul
uls[1].children[1].remove();

// je change le premier li de chaque ul par mon nom
for (let i = 0; i < uls.length; i++) {
  uls[i].children[0].textContent = "Ima";
}

// j'ajoute la class student_list aux deux ul
for (let i = 0; i < uls.length; i++) {
  uls[i].classList.add("student_list");
}

// j'ajoute university et attendance au premier ul
uls[0].classList.add("university", "attendance");

// je change le style du div
div.style.backgroundColor = "lightblue";
div.style.padding = "20px";

// je cache le li qui contient Dan
const lis = document.querySelectorAll("li");
for (let i = 0; i < lis.length; i++) {
  if (lis[i].textContent === "Dan") {
    lis[i].style.display = "none";
  }
}

// j'ajoute une bordure au li Richard
for (let i = 0; i < lis.length; i++) {
  if (lis[i].textContent === "Richard") {
    lis[i].style.border = "2px solid black";
  }
}

// je change la taille du texte du body
document.body.style.fontSize = "18px";

// BONUS : si le div est bleu clair j'affiche un message
if (div.style.backgroundColor === "lightblue") {
  const user1 = uls[0].children[0].textContent;
  const user2 = uls[1].children[0].textContent;
  alert("Hello " + user1 + " and " + user2);
}

// ===== Exercise 6
// je récupère le div
const div = document.getElementById("navBar");

// je change l'id du div
div.setAttribute("id", "socialNetworkNavigation");

// je récupère le ul
const ul = div.firstElementChild;

// je crée un li
const li = document.createElement("li");

// je crée le texte Logout
const text = document.createTextNode("Logout");

// j'ajoute le texte au li
li.appendChild(text);

// j'ajoute le li au ul
ul.appendChild(li);

// je récupère le premier li
const first = ul.firstElementChild;

// je récupère le dernier li
const last = ul.lastElementChild;

// j'affiche le texte du premier lien
console.log(first.textContent);

// j'affiche le texte du dernier lien
console.log(last.textContent);


//exerice 7 

// je crée le tableau des livres
const allBooks = [
  {
    title: "Harry Potter",
    author: "J.K Rowling",
    image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    alreadyRead: true
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    alreadyRead: false
  }
];

// je récupère la section
const section = document.querySelector(".listBooks");

// je boucle sur les livres
for (let i = 0; i < allBooks.length; i++) {

  // je crée un div pour chaque livre
  const div = document.createElement("div");

  // je crée le texte titre + auteur
  const text = document.createElement("p");
  text.textContent =
    allBooks[i].title + " written by " + allBooks[i].author;

  // je crée l'image
  const img = document.createElement("img");
  img.src = allBooks[i].image;
  img.style.width = "100px";

  // si le livre est déjà lu, le texte devient rouge
  if (allBooks[i].alreadyRead === true) {
    text.style.color = "red";
  }

  // j'ajoute le texte et l'image dans le div
  div.appendChild(text);
  div.appendChild(img);

  // j'ajoute le div dans la section
  section.appendChild(div);
}




