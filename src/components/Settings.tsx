import { useContext } from "react";
import { countRemainingYarns } from "../helpers";
import YarnTile from "./YarnTile";
import NewYarn from "./NewYarn";
import { StateContext } from "./Provider";

function Settings({ className }: { className?: string }) {
  const {
    state: { yarns, grid, selectedYarn },
    dispatch,
  } = useContext(StateContext);
  return (
    <div className={className}>
      <h2 className="text-xl ">Yarn settings</h2>
      <ul className="flex justify-start flex-wrap">
        {yarns.map(
          (yarn, index) =>
            yarn && (
              <YarnTile
                key={index}
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
    </div>
  );
}

export default Settings;
