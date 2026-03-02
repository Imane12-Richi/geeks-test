// filename: ecoMart.js

const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017"; // adapte si nécessaire
const client = new MongoClient(url);

// Database Name
const dbName = "ecoMart";

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const products = db.collection("products");

    // 1️ Inventory Setup: Insert 5 products
    await products.insertMany([
      { name: "Laptop", category: "Electronics", price: 1200, stock: 50 },
      { name: "Smartphone", category: "Electronics", price: 800, stock: 100 },
      { name: "Desk Lamp", category: "Home", price: 45, stock: 3 },              
      { name: "Notebook", category: "Stationery", price: 5, stock: 25 },
      { name: "Office Chair", category: "Home", price: 150, stock: 8 }           
    ]);
    console.log("Inserted 5 products into inventory");

    // 2️ Restock Needed: Find products with stock < 10
    const lowStock = await products.find({ stock: { $lt: 10 } }).toArray();
    console.log("\n Products needing restock (stock < 10):");
    console.log(lowStock);

    // 3️ Inflation Adjustment: Increase price of Electronics by 10%
    await products.updateMany(
      { category: "Electronics" },
      { $mul: { price: 1.1 } }
    );
    console.log("\n Increased price of Electronics by 10%");

    // 4️ Final Verification: Find the most expensive item
    const mostExpensive = await products.find().sort({ price: -1 }).limit(1).toArray();
    console.log("\n Most expensive product:");
    console.log(mostExpensive);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();