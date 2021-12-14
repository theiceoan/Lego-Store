-- CREATE DATABASE app_eng_cw;

-- CREATE TABLE part_categories (
--     id INT PRIMARY KEY,
--     name VARCHAR(200)
-- );

-- CREATE TABLE minifigs (
--     fig_num VARCHAR(20) PRIMARY KEY,
--     name VARCHAR(250),
--     num_parts INT
-- );

-- CREATE TABLE themes (
--     id INT PRIMARY KEY,
--     name VARCHAR(40),
--     parent_id INT UNIQUE,
--     FOREIGN KEY (parent_id) REFERENCES themes(parent_id)
-- );

-- CREATE TABLE sets (
--     set_num VARCHAR(20) PRIMARY KEY,
--     name VARCHAR(256),
--     year INT,
--     theme_id INT,
--     num_parts INT,
--     FOREIGN KEY (theme_id) REFERENCES themes(id)
-- );

-- CREATE TABLE parts (
--     part_num VARCHAR(20) PRIMARY KEY,
--     name VARCHAR(250),
--     part_cat_id INT,
--     FOREIGN KEY (part_cat_id) REFERENCES part_categories(id)
-- );

-- CREATE TABLE colors (
--     id INT PRIMARY KEY,
--     name VARCHAR(200),
--     rgk VARCHAR(6),
--     is_trans BOOL
-- );

-- CREATE TABLE elements (
--     element_id VARCHAR(10) PRIMARY KEY,
--     part_num VARCHAR(20),
--     color_id INT,
--     FOREIGN KEY (part_num) REFERENCES parts(part_num),
--     FOREIGN KEY (color_id) REFERENCES colors(id)
-- );

-- CREATE TABLE part_relationships (
--     rel_type VARCHAR(1),
--     child_part_num VARCHAR(20),
--     parent_part_num VARCHAR(20),
--     FOREIGN KEY (child_part_num) REFERENCES parts(part_num),
--     FOREIGN KEY (parent_part_num) REFERENCES parts(part_num)
-- );

-- CREATE TABLE inventories (
--     id INT PRIMARY KEY,
--     version INT,
--     set_num VARCHAR(20),
--     FOREIGN KEY (set_num) REFERENCES sets(set_num)
-- );

-- CREATE TABLE inventory_minifigs (
--     inventory_id INT,
--     fig_num VARCHAR(20),
--     quantity INT,
--     FOREIGN KEY (inventory_id) REFERENCES inventories(id),
--     FOREIGN KEY (fig_num) REFERENCES minifigs(fig_num)
-- );

-- CREATE TABLE inventory_sets (
--     inventory_id INT,
--     set_num VARCHAR(20),
--     quantity INT,
--     FOREIGN KEY (inventory_id) REFERENCES inventories(id)
-- );

-- CREATE TABLE inventory_parts (
--     inventory_id INT,
--     part_num VARCHAR(20),
--     color_id INT,
--     quantity INT,
--     is_spare BOOL,
--     FOREIGN KEY (part_num) REFERENCES parts(part_num),
--     FOREIGN KEY (color_id) REFERENCES colors(id),
--     FOREIGN KEY (inventory_id) REFERENCES inventories(id)

-- );



