import { MouseEventHandler, useState } from "react";
import { ReactFlowInstance, useReactFlow, Node, Edge } from "reactflow";
import { GenerateNodeData } from "./GenerateNode";
import {
  CELL_PREFIX,
  generateEdgeId,
  generateNodeId,
} from "../../utils/generateId";
import { GptSingleResponse, generateCode } from "../../chat/generation";
import { CodingNodeType } from "../CodingNode/CodingNode";
import { DescriptionNodeType } from "../DescriptionNode/DescriptionNode";
import { GrphBookNode } from "../../notebook/NoteBook";

export const useGenerateControls = (data: GenerateNodeData) => {
  const flowInstance = useReactFlow();

  // TODO: Set default to true
  const [includeMd, setIncludeMd] = useState(false);
  const [input, setInput] = useState(data.content);
  const [loading, setLoading] = useState(false);

  const getCurrentNode = (): Array<Node> => [
    ...flowInstance.getNodes().filter(node => node.selected),
  ];
  const createGeneratedNodes = (response: GptSingleResponse) => {
    const { code, description } = response;
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
    const nodeList: Array<GrphBookNode> = [newCodingNode];
    const edgeList = [newEdge];
    if (description) {
      // Update the coding & description node configuration in the case
      nodeList[0].position.y += 300;
      nodeList[0].data.order += 1;
      const newDescriptionNode: DescriptionNodeType = {
        id: generateNodeId(CELL_PREFIX.DESCRIPTION_CELL_PREFIX),
        type: CELL_PREFIX.DESCRIPTION_CELL_PREFIX,
        position: {
          x: sourceNode.position.x,
          y: sourceNode.position.y + 300,
        },
        data: {
          content: description,
          order: sourceNode.data.order + 1,
        },
      };
      edgeList[0].id = generateEdgeId(newDescriptionNode.id, newCodingNode.id);
      edgeList[0].source = newDescriptionNode.id;
      const newDescriptionEdge: Edge = {
        id: generateEdgeId(sourceNode.id, newDescriptionNode.id),
        source: sourceNode.id,
        target: newCodingNode.id,
      };
      nodeList.push(newDescriptionNode);
      edgeList.push(newDescriptionEdge);
    }

    // Deleting the current node
    flowInstance.deleteElements({ nodes: [selectedNode] });
    // Adding the new node and edge
    flowInstance.addNodes(nodeList);
    flowInstance.addEdges(edgeList);
  };

  const handleGenerate: MouseEventHandler = _event => {
    setLoading(true);
    generateCode(input, includeMd)
      .then(response => {
        if (response) {
          createGeneratedNodes(response);
        }
        setLoading(false);
      })
      .catch(_error => {
        console.error("Cannot parse the response! Check prompt");
        deleteGenerateNode();
      });
  };

  const handleToggle: MouseEventHandler = _event => {
    setIncludeMd(!includeMd);
  };

  const deleteGenerateNode = () => {
    flowInstance.deleteElements({ nodes: getCurrentNode() });
  };

  const handleDelete: MouseEventHandler = _event => {
    deleteGenerateNode();
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
