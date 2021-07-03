import { Dispatch, useRef } from "react";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { OverlayContainer } from "@react-aria/overlays";
import { useButton } from "@react-aria/button";
import GrannySettingsModal from "./GrannySettingsModal";
import { Square } from "../types";
import { Action } from "../reducer";
import Button from "./baseComponents/Button";

type Props = {
  square: Square;
  dispatch: Dispatch<Action>;
  isSelected: boolean;
  squareIndex: number;
  remainingCount: number;
};

function GrannyTile({
  square,
  isSelected,
  dispatch,
  squareIndex,
  remainingCount,
}: Props) {
  let state = useOverlayTriggerState({});
  let editButtonRef = useRef<HTMLButtonElement>(null);
  let deleteButtonRef = useRef<HTMLButtonElement>(null);

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  let { buttonProps: editButtonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    editButtonRef
  );
  let { buttonProps: deleteButtonProps } = useButton(
    {
      onPress: () =>
        dispatch({ type: "updateSquare", square: null, index: squareIndex }),
    },
    deleteButtonRef
  );

  return (
    square && (
      <li className="flex space-x-4 m-2 items-center border-gray-300 border p-2">
        <div
          className="w-8 h-8"
          style={{ backgroundColor: square.colour.toString("css") }}
        />
        {square.name && <p>{square.name}</p>}
        {square.number > 0 && (
          <div>
            {remainingCount} / {square.number} remaining
          </div>
        )}
        <Button {...editButtonProps} ref={editButtonRef}>
          Edit
        </Button>
        <Button {...deleteButtonProps} ref={deleteButtonRef}>
          Delete
        </Button>
        {state.isOpen && (
          <OverlayContainer>
            <GrannySettingsModal
              squareIndex={squareIndex}
              isOpen={state.isOpen}
              onClose={state.close}
              square={square}
              dispatch={dispatch}
            />
          </OverlayContainer>
        )}
      </li>
    )
  );
}

export default GrannyTile;
