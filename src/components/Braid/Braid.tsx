import { MouseEvent, useContext, useEffect } from "react";
import { StateContext } from "../Provider";
import Settings from "../Settings";
import "./braid.css";
import BraidSVG from "./BraidSVG";

const NUMBERS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
];

const mapClassNameToThread = (className: string) => {
  const [num, layer] = className.split("-");
  return {
    index: NUMBERS.findIndex((i) => num === i),
    layer: layer === "t" ? ("top" as const) : ("bottom" as const),
  };
};

const shankClassnames = "border border-black inline-block w-6 h-6 rounded-full";

const Braid = () => {
  const { state, dispatch } = useContext(StateContext);
  const { braid, yarns } = state;

  useEffect(() => {
    braid.top.forEach((yarn, index) => {
      const colour = yarns[yarn]?.colour.toString("css");
      if (colour)
        document.documentElement.style.setProperty(
          `--${NUMBERS[index]}-t`,
          colour
        );
    });
    braid.bottom.forEach((yarn, index) => {
      const colour = yarns[yarn]?.colour.toString("css");
      if (colour)
        document.documentElement.style.setProperty(
          `--${NUMBERS[index]}-b`,
          colour
        );
    });
  }, [braid, yarns]);

  const handleBraidClick = (event: MouseEvent) => {
    event.persist();
    console.log("event: ", event.target);
    const { index, layer } = mapClassNameToThread(
      (event.target as Element).getAttribute("class") || ""
    );
    if (index >= 0) {
      dispatch({
        type: "applyYarnToBraid",
        index,
        layer,
      });
    }
  };

  const handleShankClick = (layer: "top" | "bottom", index: number) =>
    dispatch({ type: "applyYarnToBraid", index, layer });

  return (
    <div className="flex flex-row h-full">
      <BraidSVG handleClick={handleBraidClick} />
      <div className="space-y-1 flex-1 p-2">
        <h1 className="text-center text-4xl mb-4">Braid Planner</h1>
        <div className="max-w-md relative">
          {/* left hand  */}
          <div className="float-left mr-4">
            <div className="space-x-1">
              {braid.top.slice(0, 8).map((yarn, i) => (
                <button
                  className={shankClassnames}
                  style={{
                    backgroundColor: yarns[yarn]?.colour.toString("css"),
                  }}
                  onClick={() => handleShankClick("top", i)}
                  key={i}
                  aria-label={`loop number ${i + 1}, top shank`}
                />
              ))}
            </div>
            <div className="space-x-1">
              {braid.bottom.slice(0, 8).map((yarn, i) => (
                <button
                  className={shankClassnames}
                  style={{
                    backgroundColor: yarns[yarn]?.colour.toString("css"),
                  }}
                  onClick={() => handleShankClick("bottom", i)}
                  key={i}
                  aria-label={`loop number ${i + 1}, bottom shank`}
                />
              ))}
            </div>
          </div>
          {/* right hand  */}
          <div className="float-right">
            <div className="space-x-1">
              {braid.top.slice(-7).map((yarn, i) => (
                <button
                  className={shankClassnames}
                  style={{
                    backgroundColor: yarns[yarn]?.colour.toString("css"),
                  }}
                  onClick={() => handleShankClick("top", i + 8)}
                  key={i}
                  aria-label={`loop number ${i + 9}, top shank`}
                />
              ))}
            </div>
            <div className="space-x-1">
              {braid.bottom.slice(-7).map((yarn, i) => (
                <button
                  className={shankClassnames}
                  style={{
                    backgroundColor: yarns[yarn]?.colour.toString("css"),
                  }}
                  onClick={() => handleShankClick("bottom", i + 8)}
                  key={i}
                  aria-label={`loop number ${i + 9}, bottom shank`}
                />
              ))}
            </div>
          </div>
        </div>
        <Settings className="pt-4 clear-both" />
      </div>
    </div>
  );
};

export default Braid;
