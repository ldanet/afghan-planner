import { Dispatch } from "react";
import { countRemainingSquares } from "../helpers";
import { Action } from "../reducer";
import { Row, Square } from "../types";
import GrannyTile from "./GrannyTile";
import NewSquare from "./NewSquare";

type Props = {
  squares: Square[];
  selectedSquare: number | null;
  dispatch: Dispatch<Action>;
  grid: Row[];
};

function Settings({ squares, grid, selectedSquare, dispatch }: Props) {
  return (
    <>
      <h2 className="text-2xl mb-3">Granny squares settings</h2>
      <ul className="flex justify-start flex-wrap">
        {squares.map(
          (granny, index) =>
            granny && (
              <GrannyTile
                squareIndex={index}
                square={granny}
                isSelected={selectedSquare === index}
                dispatch={dispatch}
                remainingCount={countRemainingSquares(
                  index,
                  granny.number,
                  grid
                )}
              />
            )
        )}
        {<NewSquare dispatch={dispatch} />}
      </ul>
    </>
  );
}

export default Settings;
