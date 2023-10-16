import {Edge} from "reactflow";
import {Cell, GrphBookNode, NoteBook} from "./NoteBook";

export const exportNotebook = (nodes: Array<GrphBookNode>): NoteBook => {
  const cells: Array<Cell> = nodes.map(node => {
    let cellType: string = "";
    let cellData: Array<string> = [];
    let executionInfo = {};
    if ("code" in node.data) {
      cellType = "code";
      cellData = extractSourceData(node.data.code);
      executionInfo = {
        execution_count: null,
        outputs: [],
      };
    } else if ("content" in node.data) {
      cellType = "markdown";
      cellData = extractSourceData(node.data.content);
    }
    return {
      cell_type: cellType,
      metadata: {},
      source: cellData,
      ...executionInfo,
    };
  });
  const metadata = {
    language_info: {
      name: "python",
    },
  };
  return {
    cells,
    metadata,
    nbformat: 4,
    nbformat_minor: 2,
  };
};

// const identifyWorkflows = (edges: Array<Edge>): Array<Array<string>> => {
//   const nodeRoute: Array<string> = [];
//   const updatedEdges: Array<Edge> = [];
//   const sourceTargetMap: any = {};
//   edges.forEach(edge => {
//     sourceTargetMap[edge.source] = edge.target;
//   })

//   Object.keys(sourceTargetMap).forEach(source => {
//     const target
//     nodeRoute.push(source);
//     nodeRoute.push(sourceTargetMap[source]);

//   })

  
  // const sourceNodes = edges.map(edge => edge.source);
  // const targetNodes = edges.map(edge => edge.target);

  // const countMap: any = {};
  // [...sourceNodes, ...targetNodes].forEach(nodeId => {
  //   countMap[nodeId] = countMap[nodeId] || 0 + 1;
  // });

  // // Counting the nodes that have divergent values
  // Object.keys(countMap).filter(node => countMap[node] > 1);
// };

const extractSourceData = (content: string): Array<string> => (content === "" ? [] : content.split("\n"));
