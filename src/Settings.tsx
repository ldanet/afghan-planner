import React, { Dispatch } from "react";
import { Square, Row, Action } from "./reducer";

type Props = {
  squares: Square[];
  selectedSquare: number | null;
  dispatch: Dispatch<Action>;
  grid: Row[];
};

function Settings({ squares, grid, selectedSquare, dispatch }: Props) {
  return (
    <>
      <ul className>
        {squares.map(
          (granny) =>
            granny && (
              <li >
                {granny.name || "Square"}
              </li>
            )
        )}
      </ul>
    </>
  );
}

export default Settings;
