import {Edge} from "reactflow";
import {CELL_PREFIX, generateEdgeId, generateNodeId} from "../utils/generateId";
import { Cell, CellType, GrphBookNode, NoteBook } from "./NoteBook";

export const importNotebook = (notebook: NoteBook): {nodes: Array<GrphBookNode>; edges: Array<Edge>} => {
  // Joining the nodes together to iterate and return
  const nodes = _extractNodesFromCells(notebook.cells);
  const edges = generateEdgesFromNodes(nodes);
  return {
    nodes,
    edges,
  };
};

export const generateEdgesFromNodes = (nodes: Array<GrphBookNode>): Array<Edge> => {
  let edges: Array<Edge> = [];
  for (const [i, node] of nodes.entries()) {
    if (i + 1 < nodes.length) {
      const from = node.id;
      const to = nodes[i + 1].id;
      edges.push({
        id: generateEdgeId(from, to),
        source: from,
        target: to,
      });
    }
  }
  return edges;
};

const _extractNodesFromCells = (cells: Array<Cell>): Array<GrphBookNode> => {
  const updatedCells = cells.map((cell, i) => {
    return {
      index: i,
      ...cell,
    };
  });

  return updatedCells.map((cell, i) => {
    let type: CELL_PREFIX;
    let content: string = cell.source.join("\n");
    const commonCellContent = {
      position: {
        x: 500,
        y: 200 * (i + 1),
      },
    };
    if (cell.cell_type === CellType.CODING) {
      type = CELL_PREFIX.CODING_CELL_PREFIX;
      return {
        id: generateNodeId(type),
        type: type,
        data: {
          order: cell.index,
          code: content,
        },
        ...commonCellContent,
      };
    } else {
      type = CELL_PREFIX.DESCRIPTION_CELL_PREFIX;
      return {
        id: generateNodeId(type),
        type: type,
        data: {
          order: cell.index,
          content,
        },
        ...commonCellContent,
      };
    }
  });
};
