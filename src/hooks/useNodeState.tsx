import { useReactFlow } from "reactflow";
import { GrphBookNode } from "../notebook/NoteBook";
import { useEffect, useMemo, useState } from "react";

export const useNodeState = () => {
  const flowInstance = useReactFlow();
  const nodes = useMemo(() => flowInstance.getNodes(), [flowInstance]);
  const [highlightedNode, setHighlightedNode] = useState<GrphBookNode | null>(
    null
  );

  const getHighlightedNode = (
    nodes: Array<GrphBookNode>
  ): GrphBookNode | null => {
    return nodes.filter((node) => node.selected)[0] || null;
  };

  useEffect(() => {
    setHighlightedNode(getHighlightedNode(nodes));
  }, [nodes]);

  return {
    highlightedNode,
  };
};
