-- Create database
CREATE DATABASE bootcamp;

-- Use database
USE bootcamp;

-- Create students table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE
);

-- Insert all students (efficient way: multiple rows)
INSERT INTO students (first_name, last_name, birth_date) VALUES
('Marc','Benichou','1998-11-02'),
('Yoan','Cohen','2010-12-03'),
('Lea','Benichou','1987-07-27'),
('Amelia','Dux','1996-04-07'),
('David','Grez','2003-06-14'),
('Omer','Simpson','1980-10-03');

-- Insert yourself (example)
INSERT INTO students (first_name, last_name, birth_date)
VALUES ('YourFirstName','YourLastName','2000-01-01');

-- Fetch all data
SELECT * FROM students;

-- Fetch only first and last names
SELECT first_name, last_name FROM students;

-- Student with id = 2
SELECT first_name, last_name
FROM students
WHERE id = 2;

-- Student with last_name Benichou AND first_name Marc
SELECT first_name, last_name
FROM students
WHERE last_name = 'Benichou'
AND first_name = 'Marc';

-- Students with last_name Benichou OR first_name Marc
SELECT first_name, last_name
FROM students
WHERE last_name = 'Benichou'
OR first_name = 'Marc';

-- First names containing letter 'a'
SELECT first_name, last_name
FROM students
WHERE first_name LIKE '%a%';

-- First names starting with 'a'
SELECT first_name, last_name
FROM students
WHERE first_name LIKE 'a%';

-- First names ending with 'a'
SELECT first_name, last_name
FROM students
WHERE first_name LIKE '%a';

-- First names where second to last letter is 'a'
SELECT first_name, last_name
FROM students
WHERE first_name LIKE '%a_';

-- Students with id = 1 AND 3
SELECT first_name, last_name
FROM students
WHERE id IN (1,3);

-- Students born on or after 01/01/2000
SELECT *
FROM students
WHERE birth_date >= '2000-01-01';