// ===== Exercise 1
const person1 = {  //2
  fullName: "Sarah Smith",
  mass: 68,
  height: 1.65,
  bmi: function () {
    return this.mass / (this.height * this.height);
  }
};

const person2 = {
  fullName: "John Doe",
  mass: 85,
  height: 1.8,
  bmi: function () {
    return this.mass / (this.height * this.height);
  }
};

function compareBMI(p1, p2) {  //2
  if (p1.bmi() > p2.bmi()) {
    console.log(p1.fullName + " has the larger BMI");
  } else if (p2.bmi() > p1.bmi()) {
    console.log(p2.fullName + " has the larger BMI");
  } else {
    console.log("Both have the same BMI");
  }
}
compareBMI(person1, person2); //3


// ===== Exercise 2
function findAvg(gradesList) {
  let sum = 0;

  // Calculer la somme des notes 
  for (let i = 0; i < gradesList.length; i++) {
    sum += gradesList[i];
  }

  // Calculer la moyenne
  let average = sum / gradesList.length;

  // Afficher la moyenne
  console.log("Average:", average);

  // Vérifier si la moyenne est supérieure à 65
  if (average > 65) {
    console.log("You passed!");
  } else {
    console.log("You did not pass.");
  }
}

const myGrades = [70, 80, 65, 90, 50];
findAvg(myGrades);

// ===== Exercise 3

// ===== Exercise 4

// ===== Exercise ...