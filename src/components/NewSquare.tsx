import { Dispatch, useRef } from "react";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { OverlayContainer } from "@react-aria/overlays";
import { useButton } from "@react-aria/button";
import GrannySettingsModal from "./GrannySettingsModal";
import { Action } from "../reducer";
import Button from "./baseComponents/Button";

type Props = {
  dispatch: Dispatch<Action>;
};

function NewSquare({ dispatch }: Props) {
  let state = useOverlayTriggerState({});
  let openButtonRef = useRef<HTMLButtonElement>(null);

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  let { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    openButtonRef
  );

  return (
    <li className="flex items-center justify-items-center m-2">
      <Button {...openButtonProps} ref={openButtonRef}>
        Add new square
      </Button>
      {state.isOpen && (
        <OverlayContainer>
          <GrannySettingsModal
            isNew
            square={undefined}
            isOpen={state.isOpen}
            onClose={state.close}
            dispatch={dispatch}
          />
        </OverlayContainer>
      )}
    </li>
  );
}

export default NewSquare;
