import { useContext } from "react";
import { countRemainingYarns } from "../helpers";
import YarnTile from "./YarnTile";
import NewYarn from "./NewYarn";
import { StateContext } from "./Provider";

function Settings() {
  const {
    state: { yarns, grid, selectedYarn },
    dispatch,
  } = useContext(StateContext);
  return (
    <>
      <h2 className="text-2xl mb-3">Yarn settings</h2>
      <ul className="flex justify-start flex-wrap">
        {yarns.map(
          (yarn, index) =>
            yarn && (
              <YarnTile
                yarnIndex={index}
                yarn={yarn}
                isSelected={selectedYarn === index}
                dispatch={dispatch}
                remainingCount={countRemainingYarns(index, yarn.number, grid)}
              />
            )
        )}
        {<NewYarn dispatch={dispatch} />}
      </ul>
    </>
  );
}

export default Settings;
