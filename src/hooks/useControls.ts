import {Edge, useReactFlow} from "reactflow";
import { CodingNodeType} from "../components/CodingNode/CodingNode";
import { DescriptionNodeType} from "../components/DescriptionNode/DescriptionNode";
import uuidv4 from "uuidv4";

export interface ControlHooks {
  addCodingNode: () => void;
  addDescriptionNode: () => void;
}

export const useControls = (): ControlHooks => {
  const reactFlowInstance = useReactFlow();
  const extractEdge = (
    type: string,
    data: any,
  ): [CodingNodeType | DescriptionNodeType, Edge] => {
    const selectedNode = reactFlowInstance.getNodes().filter(node => node.selected)[0];
    const newNode: CodingNodeType | DescriptionNodeType = {
      id: `${type}_${uuidv4()}`,
      position: {x: selectedNode.position.x, y: selectedNode.position.y + 200},
      data,
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
    const [newNode, newEdge] = extractEdge("codingCell", {codePlaceHolder: "print('another cell')"});
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
  };
  const addDescriptionNode = () => {
    const [newNode, newEdge] = extractEdge("descriptionCell", {content: "another cell"});
    reactFlowInstance.addNodes(newNode);
    reactFlowInstance.addEdges(newEdge);
  };

  return {addCodingNode, addDescriptionNode};
};
