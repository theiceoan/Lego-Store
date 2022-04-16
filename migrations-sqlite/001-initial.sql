-- adapted from https://github.com/portsoc/staged-simple-message-board/blob/master/stages/8/migrations-sqlite/001-initial.sql

-- Up

CREATE TABLE Bricks (
  id VARCHAR(4) PRIMARY KEY,
  name TEXT NOT NULL,
  price DOUBLE(4, 2) NOT NULL,
  stock INT NOT NULL,
  count INT NOT NULL,
  src TEXT NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO Bricks VALUES
( 1, 'Double Brick 3x2', 0.67, 500, 0, '/bricks/lego_pieces/piece1.png', 'Utility piece, useful for all lego sets.'),
( 2, 'Brick 2x2', 0.77, 500, 0, '/bricks/lego_pieces/piece2.png', 'Utility piece, useful for all lego sets.'),
( 3, 'Brick 2x4', 0.45, 500, 0, '/bricks/lego_pieces/piece3.png', 'Only needed for large lego sets'),
( 4, 'Brick 4x9', 1.57, 500, 0, '/bricks/lego_pieces/piece4.png', 'Long piece, useful for tower sets'),
( 5, 'Technic Brick 1x6', 2.34, 500, 0, '/bricks/lego_pieces/piece5.png', 'Unique piece, useful for tower sets'),
( 6, 'Plate 12x12', 1.98, 500, 0, '/bricks/lego_pieces/piece6.png', 'Utility base piece, useful for all lego sets'),
( 7, 'Block 5x5', 0.88, 500, 0, '/bricks/lego_pieces/piece7.png', 'Only needed for large lego sets'),
( 8, 'Brick 2x1', 0.35, 500, 0, '/bricks/lego_pieces/piece8.png', 'Block piece'),
( 9, 'Block 3x6', 0.51, 500, 0, '/bricks/lego_pieces/piece9.png', 'twin brick, useful for bridge sets'),
( 10, 'Brick 2x6', 0.72, 500, 0, '/bricks/lego_pieces/piece10.png', 'twin block, useful for bridge sets'),
( 11, 'Single Brick 3x2', 0.63, 500, 0, '/bricks/lego_pieces/piece11.png', '3-joint brick, useful for all long sets'),
( 12, 'Block 2x6', 0.71, 500, 0, '/bricks/lego_pieces/piece12.png', '3-joint block, useful for all long sets'),
( 13, 'Brick 1x3', 0.49, 500, 0, '/bricks/lego_pieces/piece13.png', '4-joint brick, useful for extended sets'),
( 14, 'Block 2x5', 1.52, 500, 0, '/bricks/lego_pieces/piece14.png', '4-joint block, useful for extended sets'),
( 15, 'Long Brick 1x5', 1.34, 500, 0, '/bricks/lego_pieces/piece15.png', '4-joint brick, useful for extended sets'),
( 16, 'Extended Brick 1x5', 0.98, 500, 0, '/bricks/lego_pieces/piece16.png', 'multi-layer 5-joint brick'),
( 17, 'Brick 1x5 (Thin)', 0.48, 500, 0, '/bricks/lego_pieces/piece17.png', 'multi-layer, thin 6-joint brick'),
( 18, 'Brick 1x7', 0.25, 500, 0, '/bricks/lego_pieces/piece18.png', 'multi-layer, 7-joint brick'),
( 19, 'Brick 1x9', 0.58, 500, 0, '/bricks/lego_pieces/piece19.png', 'thin, unique 10-joint brick'),
( 20, 'Double Brick 2x2', 0.78, 500, 0, '/bricks/lego_pieces/piece20.png', 'Utility piece, useful for all lego sets'),
( 21, 'Single Brick 3x2', 0.61, 500, 0, '/bricks/lego_pieces/piece21.png', 'Box brick, useful for buildings'),
( 22, 'Brick 2x4 (Thin)', 0.79, 500, 0, '/bricks/lego_pieces/piece22.png', 'Rectangular brick (short), useful for medium sized sets'),
( 23, 'Brick 2x5 (Thin)', 0.41, 500, 0, '/bricks/lego_pieces/piece23.png', 'Rectangular brick (long), useful for long sets'),
( 24, 'Brick 2x8 (Thin)', 1.58, 500, 0, '/bricks/lego_pieces/piece24.png', '2-level piece, useful for bridges'),
( 25, 'Technic Brick Lining', 1.04, 500, 0, '/bricks/lego_pieces/piece25.png', 'Brick lining piece for joining multiple pieces together'),
( 26, 'Brick 2x16 (Thin)', 0.68, 500, 0, '/bricks/lego_pieces/piece26.png', 'Brick joint, useful for joining multiple pieces'),
( 27, '2 Block Plate', 0.77, 500, 0, '/bricks/lego_pieces/piece27.png', 'Utility base piece, dual block'),
( 28, 'Brick Wall 1x4x4', 0.95, 500, 0, '/bricks/lego_pieces/piece28.png', 'Lego wall, useful for castle lego sets'),
( 29, 'Block Wall (Transparent)', 0.56, 500, 0, '/bricks/lego_pieces/piece29.png', 'Transparent lego wall, useful for castle lego sets'),
( 30, 'Brick Wall 1x4x4 (Brown)', 0.61, 500, 0, '/bricks/lego_pieces/piece30.png', 'Brown lego wall, useful for castle lego sets'),
( 31, 'Brick Wall 1x4x4 (Plated)', 0.24, 500, 0, '/bricks/lego_pieces/piece31.png', 'Plated Brick wall, useful for castle sets'),
( 32, 'Long Piece 1x10', 0.85, 500, 0, '/bricks/lego_pieces/piece32.png', 'Long joining piece, needed for larger sets'),
( 33, 'Split Piece 1x10', 0.48, 500, 0, '/bricks/lego_pieces/piece33.png', 'Middle split joint piece, needed for larger sets'),
( 34, 'Brick Strip 1x8', 1.22, 500, 0, '/bricks/lego_pieces/piece34.png', 'Brick strip base piece, for joining sets'),
( 35, 'Brick Strip 1x12', 2.01, 500, 0, '/bricks/lego_pieces/piece35.png', 'Double layer thin base piece, for joining the sets'),
( 36, 'Flat Plate 2x6', 1.54, 500, 0, '/bricks/lego_pieces/piece36.png', 'Flat plate for medium-sized sets'),
( 37, 'Triangular Block', 0.71, 500, 0, '/bricks/lego_pieces/piece37.png','Triangular block, not a commonly needed block');

-- Down

DROP TABLE Bricks;