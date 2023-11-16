import { Node, ReactFlowInstance } from "reactflow";

export const getHighlightedNode = (
  flowInstance: ReactFlowInstance<any, any>,
): Node | null => {
  return [...flowInstance.getNodes()].filter(node => node.selected)[0] || null;
};
