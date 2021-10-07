import { parseColor } from "@react-stately/color";
import { Row, Yarn } from "./types";

type State = {
  yarns: Yarn[];
  grid: Row[];
  braid: { top: number[]; bottom: number[] };
  height: number;
  width: number;

  selectedYarn: number | null;
};

const defaultYarns: Yarn[] = [
  {
    name: "Red",
    colour: parseColor("hsl(332,99%,38%)"),
    number: 0,
  },
  {
    name: "Black",
    colour: parseColor("hsl(0,0%,9%)"),
    number: 0,
  },
  {
    name: "Purple",
    colour: parseColor("hsl(278,53%,52%)"),
    number: 0,
  },
  {
    name: "White",
    colour: parseColor("hsl(45,11%,93%)"),
    number: 0,
  },
];

const defaultBraidLayer = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3];

export const initialState: State = {
  yarns: defaultYarns,
  grid: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  braid: { top: defaultBraidLayer, bottom: defaultBraidLayer },
  height: 4,
  width: 4,
  selectedYarn: null,
};

export type Action =
  | { type: "addYarn"; yarn: Yarn }
  | { type: "setHeight"; height: number }
  | { type: "updateYarn"; index: number; yarn: Yarn }
  | { type: "setWidth"; width: number }
  | { type: "applyYarnToGrid"; x: number; y: number; yarn: number }
  | {
      type: "applyYarnToBraid";
      index: number;
      layer: "top" | "bottom" | "both";
      yarn: number;
    }
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
    case "applyYarnToGrid": {
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
    case "applyYarnToBraid": {
      const { layer, index, yarn } = action;
      const braid = Object.assign({}, state.braid);
      if (layer === "top" || layer === "both") {
        braid.top = [...state.braid.top];
        braid.top[index] = yarn;
      }
      if (layer === "bottom" || layer === "both") {
        braid.bottom = [...state.braid.bottom];
        braid.bottom[index] = yarn;
      }
      return { ...state, braid };
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
