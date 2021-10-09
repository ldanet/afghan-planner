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
      <div className="flex-1 p-2 sm:p-4">
        <h1 className="text-center text-4xl mb-4">AADC Braid Planner</h1>
        <p className="mb-2">
          This page is a tool for creating designs for kute-uchi AADC flat
          braids with 15 loops.{" "}
        </p>
        <p className="mb-4">
          Click on the coloured square of a yarn to select it, then click on the
          braid or the loop arrangement to apply the yarn colour.
        </p>
        <h2 className="text-xl mb-2">Initial loop arrangement</h2>
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
        <Settings className="pt-4 mb-4 clear-both" />
        <h2>Links for more information about kute-uchi braiding:</h2>
        <ul>
          <li>
            <a
              className="underline text-red-800"
              href="http://web.archive.org/web/20190129055548/http://www.lmbric.net/ILh/ILh.html"
            >
              Illustrated instruction: Kute-uchi
            </a>{" "}
            from the L-M Braiding Research & Information Center
          </li>
          <li>
            <a
              className="underline text-red-800"
              href="http://kutebraider.blogspot.com/2017/07/kuteuchi-basic-4-movements.html"
            >
              Kute-uchi basic 4 movements
            </a>{" "}
            on Fumiyo's blog, which includes video instructions.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Braid;
