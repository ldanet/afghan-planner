import { Row, Square } from "./types";

type State = {
  squares: Square[];
  grid: Row[];
  height: number;
  width: number;

  selectedSquare: number | null;
};

export const initialState: State = {
  squares: [],
  grid: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  height: 4,
  width: 4,
  selectedSquare: null,
};

export type Action =
  | { type: "addSquare"; square: Square }
  | { type: "setHeight"; height: number }
  | { type: "updateSquare"; index: number; square: Square }
  | { type: "setWidth"; width: number }
  | { type: "applySquare"; x: number; y: number; square: number }
  | { type: "selectSquare"; index: number | null };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "addSquare":
      return {
        ...state,
        squares: [...state.squares, action.square],
      };
    case "updateSquare": {
      const squares = [...state.squares];
      squares[action.index] = action.square;
      return { ...state, squares };
    }
    case "setHeight": {
      const grid =
        state.grid.length > action.height
          ? [...state.grid].slice(0, action.height - 1)
          : [...state.grid].concat(
              Array(action.height - state.grid.length).fill(null)
            );
      return { ...state, grid, height: action.height };
    }
    case "setWidth": {
      const grid = state.grid.map((row) => {
        if (row.length === action.width) return row;
        return row.length > action.width
          ? [...row].slice(0, action.width - 1)
          : [...row].concat(Array(action.width - row.length).fill(null));
      });
      return { ...state, grid, width: action.width };
    }
    case "applySquare": {
      const grid = state.grid.map((row, index) => {
        if (action.y === index) {
          const newRow = [...row];
          newRow[action.x] = action.square;
          return newRow;
        }
        return row;
      });
      return { ...state, grid };
    }
    case "selectSquare": {
      return { ...state, selectedSquare: action.index };
    }
    default:
      throw new Error(
        `Unknown action type. Dispatched action: ${JSON.stringify(action)}`
      );
  }
}
