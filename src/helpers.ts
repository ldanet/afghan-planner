import { Row, Yarn } from "./types";

export const countRemainingYarns = (
  index: number,
  total: number,
  grid: Row[]
) =>
  grid.reduce((remaining, row) => {
    return row !== null
      ? remaining -
          ((row &&
            row.reduce<number>((count, cell) => {
              return cell === index ? count + 1 : count;
            }, 0)) ||
            0)
      : remaining;
  }, total);

export const getSelectedYarn = (selectedIndex: number, yarns: Yarn[]) =>
  yarns[selectedIndex] ?? null;
