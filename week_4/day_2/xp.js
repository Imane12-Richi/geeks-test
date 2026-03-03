// ===== Lab: Designing a Scalable System =====
// All exercises combined in one file

// Exercise 1: Profile Design (Embedding)
// --------------------------------------

// Insert a user with embedded address
db.users.insertOne({
  name: "Yasmine",
  email: "yasmine@tech.ma",
  address: {
    city: "Casablanca",
    country: "Morocco",
    postalCode: "20000"
  }
});

// Verify insertion
print("Users collection:");
printjson(db.users.find().toArray());


// Exercise 2: Transaction Design (Referencing)
// --------------------------------------------

// Step A: Copy Yasmine's _id from users collection
// Suppose the _id returned is "650f1b2e9f1c2b1a2d3f4567"
// Replace this with the actual _id from your database
const yasmineId = ObjectId("650f1b2e9f1c2b1a2d3f4567");

// Step B: Insert an order referencing Yasmine's _id
db.orders.insertOne({
  orderNumber: "ORD-99X",
  total: 1500,
  currency: "MAD",
  status: "Processing",
  userId: yasmineId
});

// Verify insertion
print("Orders collection:");
printjson(db.orders.find().toArray());

/* 
✅ Reflective Notes:

- Address is embedded because it's small and always needed with the user.
- Orders are referenced because a user can have hundreds of orders, 
  embedding would make the user document too large.
*/