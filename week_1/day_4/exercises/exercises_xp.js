// ===== Exercise 1

function funcOne() {
    let a = 5;
    if (a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}

funcOne();


let a = 0;

function funcTwo() {
    a = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a}`);
}

funcThree();
funcTwo();
funcThree();


function funcFour() {
    window.a = "hello";
}

function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

funcFour();
funcFive();


let b = 1;

function funcSix() {
    let b = "test";
    alert(`inside the funcSix function ${b}`);
}

funcSix();


let c = 2;

if (true) {
    let c = 5;
    alert(`in the if block ${c}`);
}

alert(`outside of the if block ${c}`);




// ===== Exercise 2


const winBattle = () => true;

const experiencePoints = winBattle() ? 10 : 1;

console.log(experiencePoints);


// ===== Exercise 3

const isString = value => typeof value === "string";

console.log(isString('hello')); 
console.log(isString([1, 2, 4, 0]));


// ===== Exercise 5 

function kgToGrams(weight) {
    return weight * 1000;
}
console.log(kgToGrams(2));

const kgToGramsExpr = function (weight) {
    return weight * 1000;
};
console.log(kgToGramsExpr(3));

const kgToGramsArrow = weight => weight * 1000;
console.log(kgToGramsArrow(4));



//exercice 4

const sum = (a, b) => a + b;

console.log(sum(3, 5));



// ===== Exercise 5 

function convertKg(kg) {
    return kg * 1000;
}
convertKg(1);

let convertKgExpr = function(kg) {
    return kg * 1000;
};
convertKgExpr(2);

let convertKgArrow = (kg) => kg * 1000;
convertKgArrow(3);

// ===== Exercise 6
(function(children, partner, location, job) {
    document.body.innerHTML =
        `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
})(2, "Sara", "Rabat", "Web Developer");

// ===== Exercise 7
(function(userName) {
    const navbar = document.getElementById("navbar");

    const userDiv = document.createElement("div");

    userDiv.innerHTML = `
        <img src="https://via.placeholder.com/40" alt="profile">
        <span>Welcome, ${userName}</span>
    `;

    navbar.appendChild(userDiv);
})("John");

// ===== Exercise 8
function makeJuice(size) {
    function addIngredients(ing1, ing2, ing3) {
        document.body.innerHTML =
            `The client wants a ${size} drink juice, containing ${ing1}, ${ing2}, ${ing3}.`;
    }

    addIngredients("banana", "strawberry", "mango");
}

makeJuice("large");

// ===== part 2
function makeJuice(size) {
    let ingredients = [];

    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }

    function displayJuice() {
        document.body.innerHTML =
            `The client wants a ${size} drink juice, containing ${ingredients.join(", ")}.`;
    }

    addIngredients("banana", "strawberry", "mango");
    addIngredients("apple", "orange", "kiwi");

    displayJuice();
}

makeJuice("medium");




