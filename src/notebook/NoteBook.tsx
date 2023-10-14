import { CodingNodeType } from "../components/CodingNode/CodingNode";
import { DescriptionNodeType } from "../components/DescriptionNode/DescriptionNode";

export type GrphBookNode = CodingNodeType | DescriptionNodeType;

export enum CellType {
  CODING = "code",
  DESCRIPTION = "markdown",
}

export type Cell = {
  cell_type: string;
  execution_count?: number | null;
  metadata: object;
  outputs?: Array<object>;
  source: Array<string>;
};

export type NoteBook = {
  cells: Array<Cell>;
  nbformat: number;
  nbformat_minor: number;
  metadata: object;
};