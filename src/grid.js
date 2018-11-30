import Bricks from 'bricks.js';

export const initializeGrid = grid =>
  Bricks({
    container: grid,
    packed: 'packed',
    sizes: [
      { columns: 2, gutter: 10 },
      { mq: '600px', columns: 3, gutter: 10 },
      { mq: '800px', columns: 4, gutter: 10 },
      { mq: '1000px', columns: 5, gutter: 10 },
      { mq: '1130px', columns: 6, gutter: 12 },
    ],
  });

export const layoutInitialGrid = grid => grid.resize(true).pack();
