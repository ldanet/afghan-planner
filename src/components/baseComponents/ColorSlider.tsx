import { useRef } from "react";
import {
  ColorSliderStateOptions,
  useColorSliderState,
} from "@react-stately/color";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useLocale } from "@react-aria/i18n";
import { useFocusRing } from "@react-aria/focus";
import { useColorSlider } from "@react-aria/color";

const TRACK_THICKNESS = 28;
const THUMB_SIZE = 20;

type Props = {
  className?: string;
} & Omit<ColorSliderStateOptions, "locale">;

function ColorSlider(props: Props) {
  let { locale } = useLocale();
  let state = useColorSliderState({ ...props, locale });
  let trackRef = useRef<HTMLDivElement>(null);
  let inputRef = useRef<HTMLInputElement>(null);

  // Default label to the channel name in the current locale
  let label = props.label || state.value.getChannelName(props.channel, locale);

  let { trackProps, thumbProps, inputProps, labelProps, outputProps } =
    useColorSlider(
      {
        ...props,
        label,
        trackRef,
        inputRef,
      },
      state
    );

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div className="flex flex-col items-center w-80">
      {/* Create a flex container for the label and output element. */}
      <div className="flex self-stretch">
        <label {...labelProps}>{label}</label>
        <output {...outputProps} style={{ flex: "1 0 auto", textAlign: "end" }}>
          {state.value.formatChannelValue(props.channel, locale)}
        </output>
      </div>
      {/* The track element holds the visible track line and the thumb. */}
      <div
        {...trackProps}
        ref={trackRef}
        style={{
          ...trackProps.style,
          height: TRACK_THICKNESS,
          width: "100%",
          borderRadius: 4,
        }}
      >
        <div
          {...thumbProps}
          style={{
            ...thumbProps.style,
            top: TRACK_THICKNESS / 2,
            border: "2px solid white",
            boxShadow: "0 0 0 1px black, inset 0 0 0 1px black",
            width: isFocusVisible ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            height: isFocusVisible ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            borderRadius: "50%",
            boxSizing: "border-box",
            background: state.getDisplayColor().toString("css"),
          }}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...inputProps} {...focusProps} />
          </VisuallyHidden>
        </div>
      </div>
    </div>
  );
}

export default ColorSlider;
