-- 1. Fetch the last 2 customers in alphabetical order (A-Z) – exclude 'id'
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 2;


-- 2. Delete all purchases made by Scott
DELETE FROM purchases
WHERE customer_id = (
    SELECT id
    FROM customers
    WHERE first_name = 'Scott'
);


-- 3. Does Scott still exist in the customers table?
SELECT *
FROM customers
WHERE first_name = 'Scott';


-- 4. Find all purchases including Scott's order 
-- (customer name will appear empty if the customer was deleted)
-- Use LEFT JOIN

SELECT purchases.id, purchases.item, purchases.quantity,
       customers.first_name, customers.last_name
FROM purchases
LEFT JOIN customers
ON purchases.customer_id = customers.id;


-- 5. Find all purchases but exclude Scott's order
-- Use INNER JOIN

SELECT purchases.id, purchases.item, purchases.quantity,
       customers.first_name, customers.last_name
FROM purchases
INNER JOIN customers
ON purchases.customer_id = customers.id;