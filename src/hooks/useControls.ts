import {Edge, useReactFlow} from "reactflow";
import {CodingNodeType} from "../components/CodingNode/CodingNode";
import {DescriptionNodeType} from "../components/DescriptionNode/DescriptionNode";

export interface ControlHooks {
  addCodingNode: () => void;
  addDescriptionNode: () => void;
}

export const useControls = (): ControlHooks => {
  const reactFlowInstance = useReactFlow();
  const extractEdge = (type: string): [CodingNodeType | DescriptionNodeType, Edge] => {
    const selectedNode = reactFlowInstance.getNodes().filter(node => node.selected)[0];
    const newNode: CodingNodeType | DescriptionNodeType = {
      id: `${type}_${Math.random()}`,
      position: {x: selectedNode.position.x, y: selectedNode.position.y + 200},
      data: {codePlaceHolder: "another cell"},
      type,
    };
    const newEdge: Edge = {
      id: `${selectedNode.id}_${newNode.id}`,
      source: selectedNode.id,
      target: newNode.id,
    };
    return [newNode, newEdge];
  };
  const addCodingNode = () => {
    const [newNode, newEdge] = extractEdge("codingCell");
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
  };
  const addDescriptionNode = () => {
    const [newNode, newEdge] = extractEdge("descriptionCell");
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
  };

  return {addCodingNode, addDescriptionNode};
};
