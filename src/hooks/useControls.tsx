import { Edge, useReactFlow } from "reactflow";
import {
  CELL_PREFIX,
  generateEdgeId,
  generateNodeId,
} from "../utils/generateId";
import { GrphBookNode } from "../notebook/NoteBook";
import { GenerateNodeType } from "../components/GenerateNode/GenerateNode";
import { NODE_Y_BUFFER } from "../config/config";

export interface ControlHooks {
  addCodingNode: () => void;
  addDescriptionNode: () => void;
  addGeneratorNode: () => void;
}

export const useControls = (): ControlHooks => {
  const reactFlowInstance = useReactFlow();
  const extractEdge = (
    type: CELL_PREFIX,
    data: any,
  ): [GrphBookNode | GenerateNodeType, Edge] => {
    const selectedNode = reactFlowInstance
      .getNodes()
      .filter(node => node.selected)[0];
    const newNode: GrphBookNode | GenerateNodeType = {
      id: generateNodeId(type),
      position: {
        x: selectedNode.position.x,
        y: selectedNode.position.y + NODE_Y_BUFFER,
      },
      data,
      type,
    };
    const newEdge: Edge = {
      id: generateEdgeId(selectedNode.id, newNode.id),
      source: selectedNode.id,
      target: newNode.id,
    };
    return [newNode, newEdge];
  };
  const addCodingNode = () => {
    const [newNode, newEdge] = extractEdge(CELL_PREFIX.CODING_CELL_PREFIX, {
      code: "print('another cell')",
    });
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
  };
  const addDescriptionNode = () => {
    const [newNode, newEdge] = extractEdge(
      CELL_PREFIX.DESCRIPTION_CELL_PREFIX,
      { content: "another cell" },
    );
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
  };

  const addGeneratorNode = () => {
    const [newNode, newEdge] = extractEdge(CELL_PREFIX.GENERATOR_CELL_PREFIX, {
      content: "",
    });
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
  };

  return { addCodingNode, addDescriptionNode, addGeneratorNode };
};
