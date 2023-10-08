import {Edge, Node} from "reactflow";

export const INITIAL_NODES: Node[] = [
  {id: "node-1", type: "codingCell", position: {x: 500, y: 300}, data: {value: 123}},
  {id: "node-2", type: "descriptionCell", position: {x: 500, y: 500}, data: {value: 123}},
  {
    id: "1",
    type: "input",
    data: {label: "Node 1"},
    position: {x: 250, y: 5},
  },
];

export const INITIAL_EDGES: Edge[] = [{id: "e1-2", source: "node-1", target: "node-2"}];
