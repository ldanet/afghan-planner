import { Color } from "@react-types/color";

export type Square = {
  name: string;
  colour: Color;
  number: number;
} | null;
export type Cell = number | null;
export type Row = Cell[];
