-- Create database
CREATE DATABASE public;

-- Use the database
USE public;

-- Create table items
CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    price INT
);

-- Create table customers
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

-- Insert items
INSERT INTO items (name, price) VALUES
('Small Desk', 100),
('Large Desk', 300),
('Fan', 80);

-- Insert customers
INSERT INTO customers (first_name, last_name) VALUES
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');

-- Fetch all items
SELECT * FROM items;

-- Fetch items with price above 80 (80 not included)
SELECT * FROM items
WHERE price > 80;

-- Fetch items with price below 300 (300 included)
SELECT * FROM items
WHERE price <= 300;

-- Fetch customers whose last name is Smith
SELECT * FROM customers
WHERE last_name = 'Smith';

-- Fetch customers whose last name is Jones
SELECT * FROM customers
WHERE last_name = 'Jones';

-- Fetch customers whose first name is not Scott
SELECT * FROM customers
WHERE first_name <> 'Scott';