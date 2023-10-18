import {Edge} from "reactflow";
import {Cell, GrphBookNode, NoteBook} from "./NoteBook";
var jsnx = require("jsnetworkx");

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

export const identifyWorkflows = (edges: Array<Edge>) => {
  var graph = new jsnx.Graph();
  const edgeTuples = edges.map(edge => [edge.source, edge.target]);
  graph.addEdgesFrom(edgeTuples);

  console.log(graph.nodes());
};

const extractSourceData = (content: string): Array<string> => (content === "" ? [] : content.split("\n"));
