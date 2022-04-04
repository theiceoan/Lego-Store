-- adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/8/migrations-sqlite/001-initial.sql
CREATE TABLE Bricks (
  id VARCHAR(4) PRIMARY KEY,
  name TEXT NOT NULL,
  price DOUBLE(4, 2) NOT NULL,
  stock INT NOT NULL,
--   src TEXT NOT NULL
);

INSERT INTO Bricks (id, name, price, stock) VALUES
( 1, 'Brick 3x2', 0.67, 500),
( 2, 'Brick 2x2', 0.77, 500),
( 3, 'Brick 2x4', 0.45, 500),
( 4, 'Brick 4x9', 1.57, 500),
( 5, 'Technic Brick 1x6', 2.34, 500)
( 6, 'Plate 12x12', 1.98, 500),
( 7, 'Block 5x5', 0.88, 500),
( 8, 'Brick 2x1', 0.35, 500),
( 9, 'Block 3x6', 0.51, 500),
( 10, 'Brick 2x6', 0.72, 500);

DROP TABLE Bricks;