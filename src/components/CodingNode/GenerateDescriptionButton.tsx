import { MouseEventHandler, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { generateDescription } from "../../chat/generation";
import { Button } from "@primer/react";

import commonStyles from "../Styles/common.module.css";
import { InfoIcon } from "@primer/octicons-react";
import { baseButtonStyles } from "../Styles/common.styles";
import { Edge, useReactFlow, Node } from "reactflow";
import { DescriptionNodeType } from "../DescriptionNode/DescriptionNode";
import { getHighlightedNode } from "../utils/node";
import {
  CELL_PREFIX,
  generateEdgeId,
  generateNodeId,
} from "../../utils/generateId";

export const GenerateDescriptionButton: React.FC = () => {
  const flowInstance = useReactFlow();
  const { apiKey } = useContext(ApiContext);

  const createDescriptionNode = (content: string) => {
    const highlightedNode = getHighlightedNode(flowInstance);
    if (highlightedNode) {
      highlightedNode.data.order += 1;
      const descriptionNode: DescriptionNodeType = {
        id: generateNodeId(CELL_PREFIX.DESCRIPTION_CELL_PREFIX),
        type: CELL_PREFIX.DESCRIPTION_CELL_PREFIX,
        position: {
          x: highlightedNode.position.x + 300,
          y: highlightedNode.position.y - 300,
        },
        data: {
          content: content,
          order: highlightedNode.data.order - 1,
        },
      };
      const prevEdge: Edge | null =
        flowInstance
          .getEdges()
          .find(edge => edge.target === highlightedNode.id) || null;
      let newEdges: Array<Edge> = [];
      let newNodes: Array<Node> = [highlightedNode, descriptionNode];
      if (prevEdge) {
        const sourceNode = [...flowInstance.getNodes()].find(
          node => node.id === prevEdge.source,
        );
        if (sourceNode) {
          sourceNode.data.order -= 1;
          // Adding the connection from source to desc node
          const sourceToDescEdge: Edge = {
            id: generateEdgeId(sourceNode.id, descriptionNode.id),
            source: sourceNode.id,
            target: descriptionNode.id,
          };
          newEdges.push(sourceToDescEdge);
          newNodes.push(sourceNode);
          flowInstance.deleteElements({ edges: [prevEdge] });
        }
      }
      // Adding the connection from desc node to target
      newEdges.push({
        id: generateEdgeId(descriptionNode.id, highlightedNode.id),
        source: descriptionNode.id,
        target: highlightedNode.id,
      });
      flowInstance.addNodes(newNodes);
      flowInstance.addEdges(newEdges);
    }
  };

  const handleGenerateDescription: MouseEventHandler<
    HTMLButtonElement
  > = _event => {
    const highlightedNode = getHighlightedNode(flowInstance);
    if (apiKey && highlightedNode && "code" in highlightedNode.data) {
      console.log("Generating response");
      generateDescription(highlightedNode?.data.code, apiKey).then(
        description => {
          createDescriptionNode(description);
        },
      );
    }
  };
  return (
    <Button
      leadingIcon={InfoIcon}
      className={commonStyles["button"]}
      sx={baseButtonStyles}
      variant="outline"
      onClick={handleGenerateDescription}
    >
      Explain
    </Button>
  );
};
