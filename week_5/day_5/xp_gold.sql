

-- 1. Find how many films there are for each rating
SELECT rating, COUNT(*) AS total_films
FROM film
GROUP BY rating;

-- 2. List movies with rating G or PG-13
SELECT title, rating
FROM film
WHERE rating IN ('G','PG-13');

-- 3. Movies with rating G or PG-13, under 2 hours and rental_rate < 3
SELECT title, rating, length, rental_rate
FROM film
WHERE rating IN ('G','PG-13')
AND length < 120
AND rental_rate < 3
ORDER BY title ASC;

-- 4. Update a customer with your details (example)
UPDATE customer
SET first_name = 'Ima',
    last_name = 'User',
    email = 'ima@email.com'
WHERE customer_id = 1;

-- 5. Update the address of this customer
UPDATE address
SET address = '123 New Street Casablanca'
WHERE address_id = (
    SELECT address_id
    FROM customer
    WHERE customer_id = 1
);




-- 1. Update birth_dates for Lea and Marc Benichou
UPDATE students
SET birth_date = '1998-11-02'
WHERE first_name IN ('Lea','Marc')
AND last_name = 'Benichou';

-- 2. Change last name of David Grez to Guez
UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David'
AND last_name = 'Grez';



DELETE FROM students
WHERE first_name = 'Lea'
AND last_name = 'Benichou';



-- Count all students
SELECT COUNT(*) AS total_students
FROM students;

-- Count students born after 01/01/2000
SELECT COUNT(*) AS students_after_2000
FROM students
WHERE birth_date > '2000-01-01';


-- Add math_grade column
ALTER TABLE students
ADD COLUMN math_grade INT;

-- Add grades
UPDATE students
SET math_grade = 80
WHERE id = 1;

UPDATE students
SET math_grade = 90
WHERE id IN (2,4);

UPDATE students
SET math_grade = 40
WHERE id = 6;

-- Count students with grade > 83
SELECT COUNT(*) AS students_high_grade
FROM students
WHERE math_grade > 83;

-- Insert Omer Simpson
INSERT INTO students (first_name,last_name,birth_date,math_grade)
VALUES ('Omer','Simpson','2000-01-01',70);



SELECT first_name,
       last_name,
       COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name,last_name;



SELECT SUM(math_grade) AS total_grades
FROM students;




CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    item_id INT REFERENCES items(id),
    quantity_purchased INT
);


INSERT INTO purchases (customer_id,item_id,quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name='Scott' AND last_name='Scott'),
    (SELECT id FROM items WHERE name='fan'),
    1
);

-- Melanie Johnson bought ten large desks
INSERT INTO purchases (customer_id,item_id,quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name='Melanie' AND last_name='Johnson'),
    (SELECT id FROM items WHERE name='large desk'),
    10
);

-- Greg Jones bought two small desks
INSERT INTO purchases (customer_id,item_id,quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name='Greg' AND last_name='Jones'),
    (SELECT id FROM items WHERE name='small desk'),
    2
);


-- All purchases
SELECT *
FROM purchases;

-- Purchases joined with customers
SELECT *
FROM purchases
JOIN customers
ON purchases.customer_id = customers.id;

-- Purchases of customer with ID 5
SELECT *
FROM purchases
WHERE customer_id = 5;

-- Purchases for large desk AND small desk
SELECT *
FROM purchases
JOIN items
ON purchases.item_id = items.id
WHERE items.name IN ('large desk','small desk');

-- Customers who made a purchase
SELECT customers.first_name,
       customers.last_name,
       items.name
FROM purchases
JOIN customers
ON purchases.customer_id = customers.id
JOIN items
ON purchases.item_id = items.id;

-- Insert purchase without item reference
INSERT INTO purchases (customer_id,quantity_purchased)
VALUES (1,5);