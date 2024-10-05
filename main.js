let board = [];
let start = [];
let end = [];

const BOARD = {
  PATH: 0,
  WALL: 1,
  START: 2,
  END: 3,
  WAY: 4,
};

function createBoard(row, col) {
  board = Array.from({ length: row })
    .fill()
    .map(() => Array.from({ length: col }).fill(0));
  start = [];
  end = [];
  return board;
}

function addWall(row, col) {
  if (![BOARD.WALL, BOARD.WAY, BOARD.PATH].includes(board[row][col])) {
    return alert("Invalid position");
  }
  board[row][col] = board[row][col] === BOARD.WALL ? BOARD.PATH : BOARD.WALL;
  return board;
}

function addStart(row, col) {
  if (board[row][col] !== BOARD.PATH && board[row][col] !== BOARD.START) {
    return alert("Invalid position");
  }

  if (board[row][col] === BOARD.END) {
    return alert("Start point cannot be the end point");
  }
  if (
    start.length == BOARD.START &&
    (start[BOARD.PATH] != row || start[1] != col)
  ) {
    return alert("Only one start point is allowed");
  }

  if (board[row][col] === BOARD.START) {
    board[row][col] = BOARD.PATH;
    start = [];
  } else {
    board[row][col] = BOARD.START;
    start = [row, col];
  }

  return board;
}

function addEnd(row, col) {
  if (board[row][col] !== BOARD.PATH && board[row][col] !== BOARD.END) {
    return alert("Invalid position");
  }

  if (board[row][col] === BOARD.START) {
    return alert("End point cannot be the start point");
  }

  if (end.length == BOARD.START && (end[BOARD.PATH] != row || end[1] != col)) {
    return alert("Only one end point is allowed");
  }

  if (board[row][col] === BOARD.END) {
    board[row][col] = BOARD.PATH;
    end = [];
  } else {
    board[row][col] = BOARD.END;
    end = [row, col];
  }

  return board;
}

function findPath() {
  console.log("IN FIND PATH");
  if (start.length === 0 || end.length === 0) {
    return alert("There should be a start and end point");
  }

  const visited = Array.from({ length: board.length })
    .fill()
    .map(() => Array.from({ length: board[0].length }).fill(false));

  const parents = Array.from({ length: board.length })
    .fill()
    .map(() =>
      Array.from({ length: board[0].length }).fill({
        r: -1,
        c: -1,
      })
    );

  const neighbors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const queue = [{ r: 0, c: 0, d: 1 }];
  visited[0][0] = true;
  let reached_end = false;

  while (queue.length > 0) {
    const { r, c, d } = queue.shift();
    const rows = board.length;
    const cols = board[0].length;

    if (board[r][c] === BOARD.END) {
      reached_end = true;
      break;
    }
    for (const neighbor of neighbors) {
      const [R, C] = [r + neighbor[0], c + neighbor[1]];

      if (
        R >= 0 &&
        C >= 0 &&
        R < rows &&
        C < cols &&
        board[R][C] !== BOARD.WALL &&
        !visited[R][C]
      ) {
        visited[R][C] = true;
        queue.push({ r: R, c: C, d: d + 1 });
        parents[R][C] = { r, c };
      }
    }
  }

  if (!reached_end) {
    console.log(board);
    return alert("No path found");
  }

  let path_end = parents[end[0]][end[1]];
  while (path_end.r !== -1 && path_end.c !== -1) {
    board[path_end.r][path_end.c] = BOARD.WAY;
    path_end = parents[path_end.r][path_end.c];
  }
  board[start[0]][start[1]] = BOARD.START;
  return board;
}
