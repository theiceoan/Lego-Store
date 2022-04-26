-- Up

ALTER TABLE Bricks ADD COLUMN file TEXT;

-- Down

CREATE TABLE Bricks2 (
  id VARCHAR(4) PRIMARY KEY,
  name TEXT NOT NULL,
  price DOUBLE(4, 2) NOT NULL,
  stock INT NOT NULL,
  count INT NOT NULL,
  src TEXT NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO Bricks2 (id, name, price, stock, count, src, description)
SELECT id, name, price, stock, count, src, description FROM Bricks;

DROP TABLE Bricks;

ALTER TABLE Bricks2 RENAME TO Bricks;