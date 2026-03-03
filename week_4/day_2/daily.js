// ===== DevBlog Architecture - Single File =====

// Étape 1: Vérifier ou créer les utilisateurs
const usersData = [
  {
    username: "CodeMaster",
    bio: "Full-stack developer and tech enthusiast.",
    socialLinks: { twitter: "https://twitter.com/CodeMaster", github: "https://github.com/CodeMaster" }
  },
  {
    username: "DevQueen",
    bio: "Front-end wizard and UX lover.",
    socialLinks: { twitter: "https://twitter.com/DevQueen", github: "https://github.com/DevQueen" }
  },
  {
    username: "TechGuru",
    bio: "Backend specialist and cloud advocate.",
    socialLinks: { twitter: "https://twitter.com/TechGuru", github: "https://github.com/TechGuru" }
  }
];

const authors = {};

usersData.forEach(user => {
  let existing = db.users.findOne({ username: user.username });
  if (!existing) {
    const result = db.users.insertOne(user);
    authors[user.username] = result.insertedId;
  } else {
    authors[user.username] = existing._id;
  }
});

// Étape 2: Créer un post avec référence à l'auteur et commentaires embedded
db.posts.insertOne({
  title: "Why I Love MongoDB",
  body: "Schema flexibility is a game changer...",
  authorId: authors["CodeMaster"],
  tags: ["NoSQL", "Database", "Tech"],
  comments: [
    {
      user: "CodeMaster",
      text: "Great article! Very clear.",
      date: new Date()
    },
    {
      user: "DevQueen",
      text: "This helped me a lot, thanks!",
      date: new Date()
    },
    {
      user: "TechGuru",
      text: "Excellent write-up, love the examples.",
      date: new Date()
    }
  ]
});

// Étape 3: Vérifier les collections
print("=== Users Collection ===");
printjson(db.users.find().toArray());

print("=== Posts Collection ===");
printjson(db.posts.find().toArray());