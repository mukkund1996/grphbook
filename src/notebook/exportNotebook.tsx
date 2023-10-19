import {Edge} from "reactflow";
import {Cell, GrphBookNode, NoteBook} from "./NoteBook";

type AdjascencyInfo = {in: Array<string>; out: Array<string>};
export type NodeRoutes = Array<Array<GrphBookNode>>;

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

export const identifyWorkflows = (edges: Array<Edge>, nodes: Array<GrphBookNode>): NodeRoutes => {
  const nodeMap: {[nodeId: string]: GrphBookNode} = {};
  nodes.forEach(node => {
    nodeMap[node.id] = node;
  });
  let nodeInfo: {[node: string]: AdjascencyInfo} = {};
  Object.keys(nodeMap).forEach(node => {
    nodeInfo[node] = {in: [], out: []};
  });
  for (const edge of edges) {
    // adding the in and out degree to the target node
    nodeInfo[edge.target].in.push(edge.source);
    nodeInfo[edge.source].out.push(edge.target);
  }
  const finalNodes = Object.keys(nodeInfo).filter(node => nodeInfo[node].out.length === 0);

  const uniqueRoutes: Array<Array<string>> = [];
  for (const finalNode of finalNodes) {
    const uniqueRoute = [finalNode];
    let sourceNode = nodeInfo[finalNode].in[0];
    while (sourceNode) {
      uniqueRoute.push(sourceNode);
      sourceNode = nodeInfo[sourceNode].in[0];
    }
    uniqueRoutes.push(uniqueRoute);
  }

  return extractNodes(uniqueRoutes, nodeMap);
};

const extractSourceData = (content: string): Array<string> => (content === "" ? [] : content.split("\n"));

const extractNodes = (routes: Array<Array<string>>, nodeMap: {[nodeId: string]: GrphBookNode}): NodeRoutes => {
  const routeNodes: NodeRoutes = [];
  const convertToNodes = (nodeId: string): GrphBookNode => nodeMap[nodeId];
  routes.forEach(route => {
    routeNodes.push(route.map(convertToNodes).reverse());
  });

  return routeNodes;
};
