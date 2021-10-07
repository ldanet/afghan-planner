import { Dispatch, useRef } from "react";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { OverlayContainer } from "@react-aria/overlays";
import { useButton } from "@react-aria/button";
import YarnSettingsModal from "./YarnSettingsModal";
import { Yarn } from "../types";
import { Action } from "../reducer";
import Button from "./baseComponents/Button";
import classNames from "classnames";

type Props = {
  yarn: Yarn;
  dispatch: Dispatch<Action>;
  isSelected: boolean;
  yarnIndex: number;
  remainingCount: number;
};

function YarnTile({
  yarn,
  isSelected,
  dispatch,
  yarnIndex,
  remainingCount,
}: Props) {
  let state = useOverlayTriggerState({});
  let editButtonRef = useRef<HTMLButtonElement>(null);
  let deleteButtonRef = useRef<HTMLButtonElement>(null);
  let selectButtonRef = useRef<HTMLButtonElement>(null);

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
        dispatch({ type: "updateYarn", yarn: null, index: yarnIndex }),
    },
    deleteButtonRef
  );
  let { buttonProps: selectButtonProps } = useButton(
    {
      onPress: () =>
        dispatch({ type: "selectYarn", index: isSelected ? null : yarnIndex }),
    },
    selectButtonRef
  );

  return (
    yarn && (
      <li
        className={classNames(
          "flex space-x-4 m-2 items-center border p-2 b",
          isSelected ? "bg-red-100 border-red-300" : "border-gray-300"
        )}
      >
        <button
          {...selectButtonProps}
          aria-label="Select yarn"
          className="w-8 h-8"
          style={{ backgroundColor: yarn.colour.toString("css") }}
          ref={selectButtonRef}
        />
        {yarn.name && <p>{yarn.name}</p>}
        {yarn.number > 0 && (
          <div>
            {remainingCount} / {yarn.number} remaining
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
            <YarnSettingsModal
              yarnIndex={yarnIndex}
              isOpen={state.isOpen}
              onClose={state.close}
              yarn={yarn}
              dispatch={dispatch}
            />
          </OverlayContainer>
        )}
      </li>
    )
  );
}

export default YarnTile;
