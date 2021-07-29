import { Row, Yarn } from "./types";

type State = {
  yarns: Yarn[];
  grid: Row[];
  height: number;
  width: number;

  selectedYarn: number | null;
};

export const initialState: State = {
  yarns: [],
  grid: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  height: 4,
  width: 4,
  selectedYarn: null,
};

export type Action =
  | { type: "addYarn"; yarn: Yarn }
  | { type: "setHeight"; height: number }
  | { type: "updateYarn"; index: number; yarn: Yarn }
  | { type: "setWidth"; width: number }
  | { type: "applyYarn"; x: number; y: number; yarn: number }
  | { type: "selectYarn"; index: number | null };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "addYarn":
      return {
        ...state,
        yarns: [...state.yarns, action.yarn],
      };
    case "updateYarn": {
      const yarns = [...state.yarns];
      yarns[action.index] = action.yarn;
      return { ...state, yarns };
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
    case "applyYarn": {
      const grid = state.grid.map((row, index) => {
        if (action.y === index) {
          const newRow = [...row];
          newRow[action.x] = action.yarn;
          return newRow;
        }
        return row;
      });
      return { ...state, grid };
    }
    case "selectYarn": {
      return { ...state, selectedYarn: action.index };
    }
    default:
      throw new Error(
        `Unknown action type. Dispatched action: ${JSON.stringify(action)}`
      );
  }
}
