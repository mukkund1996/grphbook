import { MouseEventHandler, useContext, useState } from "react";
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
import { NODE_Y_BUFFER } from "../../config/config";
import { ApiContext } from "../../context/ApiContext";

export const useGenerateControls = (data: GenerateNodeData) => {
  const flowInstance = useReactFlow();
  const { apiKey } = useContext(ApiContext);

  const [includeMd, setIncludeMd] = useState(false);
  const [input, setInput] = useState(data.content);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        y: sourceNode.position.y + NODE_Y_BUFFER,
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
    let nodeList: Array<GrphBookNode> = [newCodingNode];
    let edgeList: Array<Edge> = [newEdge];
    if (description) {
      // Update the coding & description node configuration in the case
      const newDescriptionNode: DescriptionNodeType = {
        id: generateNodeId(CELL_PREFIX.DESCRIPTION_CELL_PREFIX),
        type: CELL_PREFIX.DESCRIPTION_CELL_PREFIX,
        position: {
          x: sourceNode.position.x,
          y: sourceNode.position.y + NODE_Y_BUFFER,
        },
        data: {
          content: description,
          order: sourceNode.data.order + 1,
        },
      };
      const updatedCodingNode: CodingNodeType = {
        ...newCodingNode,
        position: {
          x: sourceNode.position.x,
          y: newDescriptionNode.position.y + NODE_Y_BUFFER,
        },
        data: {
          ...newCodingNode.data,
          order: newDescriptionNode.data.order + 1,
        },
      };
      nodeList = [newDescriptionNode, updatedCodingNode];
      edgeList = [
        {
          id: generateEdgeId(sourceNode.id, newDescriptionNode.id),
          source: sourceNode.id,
          target: newDescriptionNode.id,
        },
        {
          id: generateEdgeId(newDescriptionNode.id, newCodingNode.id),
          source: newDescriptionNode.id,
          target: newCodingNode.id,
        },
      ];
    }

    // Deleting the current node
    flowInstance.deleteElements({ nodes: [selectedNode] });
    // Adding the new node and edge
    flowInstance.addNodes(nodeList);
    flowInstance.addEdges(edgeList);
  };

  const handleGenerate: MouseEventHandler = _event => {
    setErrorMsg(null);
    if (!apiKey || apiKey === "") {
      setErrorMsg("GPT AI API key needed to use generative features!");
    } else {
      setLoading(true);
      generateCode(input, includeMd, apiKey)
        .then(response => {
          if (response) {
            createGeneratedNodes(response);
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          if (error.code === "invalid_api_key") {
            setErrorMsg("Invalid API key.");
          } else {
            setErrorMsg("Cannot parse the response! Check prompt");
          }
        });
    }
  };

  const handleToggle: MouseEventHandler = _event => {
    setIncludeMd(!includeMd);
  };

  return {
    input,
    setInput,
    errorMsg,
    includeMd,
    loading,
    handleToggle,
    handleGenerate,
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
