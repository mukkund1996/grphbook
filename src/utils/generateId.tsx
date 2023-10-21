import uuidv4 from "uuidv4";

export enum CELL_PREFIX {
  CODING_CELL_PREFIX = "codingCell",
  DESCRIPTION_CELL_PREFIX = "descriptionCell",
}

export const generateNodeId = (type: CELL_PREFIX) => `${type}_${uuidv4()}`;
export const generateEdgeId = (from: string, to: string): string =>
  `${from}_${to}`;
