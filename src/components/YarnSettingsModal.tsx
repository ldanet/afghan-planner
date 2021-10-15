import {
  Dispatch,
  useCallback,
  useState,
  useRef,
  InputHTMLAttributes,
} from "react";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { Color } from "@react-types/color";
import { parseColor } from "@react-stately/color";
import { Action } from "../reducer";
import { Yarn } from "../types";
import { useButton } from "@react-aria/button";
import { useTextField } from "@react-aria/textfield";
import Button from "./baseComponents/Button";
import Input from "./baseComponents/Input";
import ColorSlider from "./baseComponents/ColorSlider";

type BaseProps = {
  dispatch: Dispatch<Action>;
  isOpen: boolean;
  onClose: () => void;
};

type NewProps = { isNew: true; yarn: undefined };
type EditProps = { isNew?: false; yarn: Yarn; yarnIndex: number };

type Props = BaseProps & (NewProps | EditProps);

function YarnSettingsModal({ dispatch, onClose, isOpen, ...props }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>(props.yarn ? props.yarn.name : "");
  const [colour, setColour] = useState<Color>(
    props.yarn ? props.yarn.colour : parseColor("hsl(0,100%,50%)")
  );

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  let { overlayProps } = useOverlay(
    { isDismissable: true, isOpen, onClose },
    dialogRef
  );

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll({ isDisabled: !isOpen });
  let { modalProps } = useModal();

  // Get props for the dialog and its title
  let { dialogProps, titleProps } = useDialog({}, dialogRef);

  const onSave = useCallback(() => {
    dispatch(
      props.isNew
        ? { type: "addYarn", yarn: { name, colour, number: 0 } }
        : {
            type: "updateYarn",
            yarn: { name, colour, number: 0 },
            index: props.yarnIndex,
          }
    );
    onClose();
  }, [onClose, colour, dispatch, name, props]);

  const onCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const { inputProps, labelProps: nameLabelProps } = useTextField(
    { value: name, onChange: setName },
    nameInputRef
  );
  console.log("nameLabelProps: ", nameLabelProps);

  // Workaround for bug https://github.com/adobe/react-spectrum/issues/1760
  const nameInputProps = inputProps as InputHTMLAttributes<HTMLInputElement>;

  const { buttonProps: saveButtonProps } = useButton(
    { type: "submit" },
    saveButtonRef
  );
  const { buttonProps: cancelButtonProps } = useButton(
    { onPress: onCancel },
    cancelButtonRef
  );

  return (
    <div className="fixed z-50 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex justify-center items-center">
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={dialogRef}
          className="bg-white p-6"
        >
          <h3 {...titleProps} className="text-2xl mb-2">
            {props.isNew ? "Add yarn" : "Update yarn"}
          </h3>
          <form onSubmit={onSave}>
            <fieldset className="mb-3 border border-gray-300 p-4 pt-0">
              <legend className="text-lg">Yarn colour</legend>
              <div
                className="h-20 w-40 mx-auto"
                style={{ backgroundColor: colour.toString("css") }}
              />
              <ColorSlider channel="hue" value={colour} onChange={setColour} />
              <ColorSlider
                channel="saturation"
                value={colour}
                onChange={setColour}
              />
              <ColorSlider
                channel="lightness"
                value={colour}
                onChange={setColour}
              />
            </fieldset>
            <label
              className="block text-lg"
              htmlFor={nameInputProps.id}
              {...nameLabelProps}
            >
              Name
            </label>
            <Input className="mb-3" {...nameInputProps} />
            <div className="grid gap-3 grid-cols-2">
              <Button {...cancelButtonProps}>Cancel</Button>
              <Button {...saveButtonProps}>
                {props.isNew ? "Add" : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </FocusScope>
    </div>
  );
}

export default YarnSettingsModal;
