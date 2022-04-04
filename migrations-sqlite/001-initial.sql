-- adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/8/migrations-sqlite/001-initial.sql

-- Up

CREATE TABLE Bricks (
  id VARCHAR(4) PRIMARY KEY,
  name TEXT NOT NULL,
  price DOUBLE(4, 2) NOT NULL,
  stock INT NOT NULL,
  count INT NOT NULL,
  src TEXT NOT NULL
);

INSERT INTO Bricks VALUES
( 1, 'Double Brick 3x2', 0.67, 500, 0, '/bricks/lego_pieces/piece1.png'),
( 2, 'Brick 2x2', 0.77, 500, 0, '/bricks/lego_pieces/piece2.png'),
( 3, 'Brick 2x4', 0.45, 500, 0, '/bricks/lego_pieces/piece3.png'),
( 4, 'Brick 4x9', 1.57, 500, 0, '/bricks/lego_pieces/piece4.png'),
( 5, 'Technic Brick 1x6', 2.34, 500, 0, '/bricks/lego_pieces/piece5.png'),
( 6, 'Plate 12x12', 1.98, 500, 0, '/bricks/lego_pieces/piece6.png'),
( 7, 'Block 5x5', 0.88, 500, 0, '/bricks/lego_pieces/piece7.png'),
( 8, 'Brick 2x1', 0.35, 500, 0, '/bricks/lego_pieces/piece8.png'),
( 9, 'Block 3x6', 0.51, 500, 0, '/bricks/lego_pieces/piece9.png'),
( 10, 'Brick 2x6', 0.72, 500, 0, '/bricks/lego_pieces/piece10.png'),
( 11, 'Single Brick 3x2', 0.63, 500, 0, '/bricks/lego_pieces/piece11.png'),
( 12, 'Block 2x6', 0.71, 500, 0, '/bricks/lego_pieces/piece12.png'),
( 13, 'Brick 1x3', 0.49, 500, 0, '/bricks/lego_pieces/piece13.png'),
( 14, 'Block 2x5', 1.52, 500, 0, '/bricks/lego_pieces/piece14.png'),
( 15, 'Long Brick 1x5', 1.34, 500, 0, '/bricks/lego_pieces/piece15.png'),
( 16, 'Extended Brick 1x5', 0.98, 500, 0, '/bricks/lego_pieces/piece16.png'),
( 17, 'Brick 1x5 (Thin)', 0.48, 500, 0, '/bricks/lego_pieces/piece17.png'),
( 18, 'Brick 1x7', 0.25, 500, 0, '/bricks/lego_pieces/piece18.png'),
( 19, 'Brick 1x9', 0.58, 500, 0, '/bricks/lego_pieces/piece19.png'),
( 20, 'Double Brick 2x2', 0.78, 500, 0, '/bricks/lego_pieces/piece20.png'),
( 21, 'Single Brick 3x2', 0.61, 500, 0, '/bricks/lego_pieces/piece21.png'),
( 22, 'Brick 2x4 (Thin)', 0.79, 500, 0, '/bricks/lego_pieces/piece22.png'),
( 23, 'Brick 2x5 (Thin)', 0.41, 500, 0, '/bricks/lego_pieces/piece23.png'),
( 24, 'Brick 2x8 (Thin)', 1.58, 500, 0, '/bricks/lego_pieces/piece24.png'),
( 25, 'Technic Brick Lining', 1.04, 500, 0, '/bricks/lego_pieces/piece25.png'),
( 26, 'Brick 2x16 (Thin)', 0.68, 500, 0, '/bricks/lego_pieces/piece26.png'),
( 27, '2 Block Plate', 0.77, 500, 0, '/bricks/lego_pieces/piece27.png'),
( 28, 'Brick Wall 1x4x4', 0.95, 500, 0, '/bricks/lego_pieces/piece28.png'),
( 29, 'Block Wall (Transparent)', 0.56, 500, 0, '/bricks/lego_pieces/piece29.png'),
( 30, 'Brick Wall 1x4x4 (Brown)', 0.61, 500, 0, '/bricks/lego_pieces/piece30.png'),
( 31, 'Brick Wall 1x4x4 (Plated)', 0.24, 500, 0, '/bricks/lego_pieces/piece31.png'),
( 32, 'Long Piece 1x10', 0.85, 500, 0, '/bricks/lego_pieces/piece32.png'),
( 33, 'Split Piece 1x10', 0.48, 500, 0, '/bricks/lego_pieces/piece33.png'),
( 34, 'Brick Strip 1x8', 1.22, 500, 0, '/bricks/lego_pieces/piece34.png'),
( 35, 'Brick Strip 1x12', 2.01, 500, 0, '/bricks/lego_pieces/piece35.png'),
( 36, 'Flat Plate 2x6', 1.54, 500, 0, '/bricks/lego_pieces/piece36.png'),
( 37, 'Triangular Block', 0.71, 500, 0, '/bricks/lego_pieces/piece37.png');

-- Down

DROP TABLE Bricks;