import { MouseEventHandler, useState } from "react";
import { ReactFlowInstance, useReactFlow, Node, Edge } from "reactflow";
import { GenerateNodeData } from "./GenerateNode";
import {
  CELL_PREFIX,
  generateEdgeId,
  generateNodeId,
} from "../../utils/generateId";
import { generateCode } from "../../chat/generation";
import { CodingNodeType } from "../CodingNode/CodingNode";

export const useGenerateControls = (data: GenerateNodeData) => {
  const flowInstance = useReactFlow();

  // TODO: Set default to true
  const [includeMd, setIncludeMd] = useState(false);
  const [input, setInput] = useState(data.content);
  const [loading, setLoading] = useState(false);

  const getCurrentNode = (): Array<Node> => [
    ...flowInstance.getNodes().filter(node => node.selected),
  ];
  const createCodingNode = (code: string | null) => {
    const selectedNode = getCurrentNode()[0];
    const selectedEdge: Edge = flowInstance
      .getEdges()
      .filter(edge => edge.target === selectedNode.id)[0];
    const sourceNode: Node = flowInstance
      .getNodes()
      .filter(node => node.id === selectedEdge.source)[0];
    const newCodingNode: CodingNodeType = {
      id: generateNodeId(CELL_PREFIX.CODING_CELL_PREFIX),
      type: CELL_PREFIX.CODING_CELL_PREFIX,
      position: {
        x: sourceNode.position.x,
        y: sourceNode.position.y + 300,
      },
      data: {
        code: code ?? "",
        order: sourceNode.data.order + 1,
      },
    };
    const newEdge: Edge = {
      id: generateEdgeId(sourceNode.id, newCodingNode.id),
      source: sourceNode.id,
      target: newCodingNode.id,
    };

    // Deleting the current node
    flowInstance.deleteElements({ nodes: [selectedNode] });
    // Adding the new node and edge
    flowInstance.addNodes(newCodingNode);
    flowInstance.addEdges(newEdge);
  };

  const handleGenerate: MouseEventHandler = _event => {
    setLoading(true);
    generateCode(input).then(code => {
      createCodingNode(code);
      setLoading(false);
    });
  };

  const handleToggle: MouseEventHandler = _event => {
    setIncludeMd(!includeMd);
  };

  const handleDelete: MouseEventHandler = _event => {
    flowInstance.deleteElements({ nodes: getCurrentNode() });
  };

  return {
    input,
    setInput,
    includeMd,
    loading,
    handleToggle,
    handleGenerate,
    handleDelete,
  };
};

export const clearGenerateNodes = (
  flowInstance: ReactFlowInstance<any, any>,
): void => {
  const nodesToDelete = [
    ...flowInstance
      .getNodes()
      .filter(node => node.type === CELL_PREFIX.GENERATOR_CELL_PREFIX),
  ];
  flowInstance.deleteElements({ nodes: nodesToDelete });
};

export const containsGenerateNodes = (
  flowInstance: ReactFlowInstance<any, any>,
): boolean =>
  flowInstance
    .getNodes()
    .filter(node => node.type === CELL_PREFIX.GENERATOR_CELL_PREFIX).length !==
  0;
