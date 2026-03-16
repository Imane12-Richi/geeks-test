
-- Create First Table
CREATE TABLE FirstTab (
    id INTEGER,
    name VARCHAR(10)
);

-- Insert data into FirstTab
INSERT INTO FirstTab VALUES
(5,'Pawan'),
(6,'Sharlee'),
(7,'Krish'),
(NULL,'Avtaar');

-- Show FirstTab
SELECT * FROM FirstTab;


-- Create Second Table
CREATE TABLE SecondTab (
    id INTEGER
);

-- Insert data into SecondTab
INSERT INTO SecondTab VALUES
(5),
(NULL);

-- Show SecondTab
SELECT * FROM SecondTab;


-- =====================================
-- Q1
-- =====================================
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id 
    FROM SecondTab 
    WHERE id IS NULL
);


-- =====================================
-- Q2
-- =====================================
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id 
    FROM SecondTab 
    WHERE id = 5
);


-- =====================================
-- Q3
-- =====================================
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id 
    FROM SecondTab
);


-- =====================================
-- Q4
-- =====================================
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id 
    FROM SecondTab 
    WHERE id IS NOT NULL
);