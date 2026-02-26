// ==============> exercice 1
// file-info.js
import fs from 'fs';
import path from 'path';

const filePath = path.join('./data', 'example.txt');

export function showFileInfo() {
    const exists = fs.existsSync(filePath);
    console.log(`File exists: ${exists}`);

    if (exists) {
        const stats = fs.statSync(filePath);
        console.log(`File size: ${stats.size} bytes`);
        console.log(`Created at: ${stats.birthtime}`);
    }
}
// app.js
import { showFileInfo } from './file-info.js';

showFileInfo();
// ==============> exercice 2


// fetch-data.js
import axios from 'axios';

export async function fetchPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data;
        posts.forEach(post => console.log(post.title));
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// app.js
import { fetchPosts } from './fetch-data.js';

fetchPosts();
// ==============> exercice 3

// date-operations.js
import { format, addDays } from 'date-fns';

export function showDateOperations() {
    const now = new Date();
    const futureDate = addDays(now, 5);
    const formattedDate = format(futureDate, 'yyyy-MM-dd HH:mm:ss');
    console.log(`Date after 5 days: ${formattedDate}`);
}

// app.js
import { showDateOperations } from './date-operations.js';

showDateOperations();
// ==============> exercice 4
// users.js
import { faker } from '@faker-js/faker';
import readlineSync from 'readline-sync';

const users = [];

export function addRandomUser() {
    const user = {
        name: faker.person.fullName(),
        street: faker.location.street(),
        country: faker.location.country()
    };
    users.push(user);
    console.log('Random user added:', user);
}

export function addUserFromPrompt() {
    const name = readlineSync.question('Enter your name: ');
    const street = readlineSync.question('Enter your street: ');
    const country = readlineSync.question('Enter your country: ');

    const user = { name, street, country };
    users.push(user);
    console.log('User added from prompt:', user);
}

export function showUsers() {
    console.log('All users:', users);
}

// app.js
import { addRandomUser, addUserFromPrompt, showUsers } from './users.js'

addRandomUser();
addUserFromPrompt();
showUsers();
// ==============> exercice 5

export function returnNumbers(str) {
    const numbers = str.match(/\d/g);
    return numbers ? numbers.join('') : '';
}

console.log(returnNumbers('k5k3q2g5z6x9bn')); // Output: 532569
// ==============> exercice 6


import readlineSync from 'readline-sync';

const fullName = readlineSync.question('Enter your full name (e.g., John Doe): ');

const nameRegex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

if (nameRegex.test(fullName)) {
    console.log('Valid full name');
} else {
    console.log('Invalid full name');
}