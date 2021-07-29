import { Dispatch } from "react";
import { countRemainingYarns } from "../helpers";
import { Action } from "../reducer";
import { Row, Yarn } from "../types";
import GrannyTile from "./GrannyTile";
import NewYarn from "./NewYarn";

type Props = {
  yarns: Yarn[];
  selectedYarn: number | null;
  dispatch: Dispatch<Action>;
  grid: Row[];
};

function Settings({ yarns, grid, selectedYarn, dispatch }: Props) {
  return (
    <>
      <h2 className="text-2xl mb-3">Granny yarns settings</h2>
      <ul className="flex justify-start flex-wrap">
        {yarns.map(
          (granny, index) =>
            granny && (
              <GrannyTile
                yarnIndex={index}
                yarn={granny}
                isSelected={selectedYarn === index}
                dispatch={dispatch}
                remainingCount={countRemainingYarns(
                  index,
                  granny.number,
                  grid
                )}
              />
            )
        )}
        {<NewYarn dispatch={dispatch} />}
      </ul>
    </>
  );
}

export default Settings;
