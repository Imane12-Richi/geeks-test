// filename: academy.js

const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017"; // ou ton URI MongoDB
const client = new MongoClient(url);

// Database Name
const dbName = "globalTechAcademy";

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    const students = db.collection("students");

    // 1️ Exercise 1: Insert students
    await students.insertMany([
      { name: "Yassine", age: 19, city: "Rabat", major: "AI" },
      { name: "Sophia", age: 26, city: "Paris", major: "Cybersecurity" },
      { name: "Kaito", age: 22, city: "Tokyo", major: "Web Dev" },
      { name: "Elena", age: 31, city: "Madrid", major: "Data Science" },
      { name: "Marcus", age: 24, city: "New York", major: "AI" }
    ]);
    console.log("Inserted 5 students");

    // 2️ Exercise 2 - Task A: Young Pros Filter (age 18-25)
    const youngPros = await students.find({ age: { $gte: 18, $lte: 25 } }).toArray();
    console.log("\n Young Pros (18-25):");
    console.log(youngPros);

    // 2️ Exercise 2 - Task B: Yassine relocation
    await students.updateOne(
      { name: "Yassine" },
      { $set: { city: "Casablanca" } }
    );
    console.log("\nYassine relocated to Casablanca");

    // 2️ Exercise 2 - Task C: Sophia graduation
    await students.deleteOne({ name: "Sophia" });
    console.log("Sophia removed from registry");

    //  Boss Level: Update AI → Generative AI
    await students.updateMany(
      { major: "AI" },
      { $set: { major: "Generative AI" } }
    );
    console.log("Updated 'AI' majors to 'Generative AI'");

    //  Show final state of students collection
    const allStudents = await students.find().toArray();
    console.log("\n Current students in the Academy:");
    console.log(allStudents);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();