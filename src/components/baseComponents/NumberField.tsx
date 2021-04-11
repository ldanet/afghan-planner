import React, { useRef } from "react";
import { useNumberFieldState } from "@react-stately/numberfield";
import { useLocale } from "@react-aria/i18n";
import { useButton } from "@react-aria/button";
import { useNumberField } from "@react-aria/numberfield";
import { AriaNumberFieldProps } from "@react-types/numberfield";
import Input from "./Input";
import Button from "./Button";

type Props = {
  className?: string;
  labelClassName?: string;
} & AriaNumberFieldProps;

function NumberField({ className, labelClassName, ...props }: Props) {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = useRef<HTMLInputElement>(null);
  const decrementRef = useRef<HTMLButtonElement>(null);
  const incrementRef = useRef<HTMLButtonElement>(null);
  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  const { buttonProps: incrementProps } = useButton(
    incrementButtonProps,
    incrementRef
  );
  const { buttonProps: decrementProps } = useButton(
    decrementButtonProps,
    decrementRef
  );

  return (
    <div className={className}>
      <label className={labelClassName} {...labelProps}>
        {props.label}
      </label>
      <div className="flex flex-row space-x-2" {...groupProps}>
        <Button {...decrementProps} ref={decrementRef}>
          -
        </Button>
        <Input className="flex-1" {...inputProps} ref={inputRef} />
        <Button {...incrementProps} ref={incrementRef}>
          +
        </Button>
      </div>
    </div>
  );
}

export default NumberField;
