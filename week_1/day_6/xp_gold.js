// ==== Exercice1 
//1  flat(4) adds "____" that means the result would be "____"
// mountain(4) adds "/" then loop four times "'" then adds "\" that means the result would be "/''''\"
// flat(4) adds "____" the result is "____/''''\____"

//2 
let landscape = () => {
  let result = "";

  let flat = x => {
    for(let count = 0; count < x; count++){
      result += "_";
    }
  }

  let mountain = x => {
    result += "/";
    for(let counter = 0; counter < x; counter++){
      result += "'";
    }
    result += "\\";
  }

  flat(4);
  mountain(4);
  flat(4);

  return result;
}

landscape(); 

// ==== Exercice2
const addTo = x => y => x + y;
const addToTen = addTo(10);
addToTen(3);
// the result is 13

// ==== Exercice3 
const curriedSum = (a) => (b) => a + b
curriedSum(30)(1)
// the result is 31

// ==== Exercice4
const curriedSumm = (a) => (b) => a + b
const Add5 = curriedSumm(5)
Add5(12)
// the result is 17

// ==== Exercice5

const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5 = (num) => num + 5;
compose(add1, add5)(10)
// the result is 16