import { MouseEventHandler, useContext, useState } from "react";
import { ApiContext } from "../context/ApiContext";
import { generateDescription } from "../../chat/generation";
import { Button, Spinner } from "@primer/react";

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
import { NODE_X_BUFFER, NODE_Y_BUFFER } from "../../config/config";

export const GenerateDescriptionButton: React.FC = () => {
  const flowInstance = useReactFlow();
  const { apiKey } = useContext(ApiContext);
  const [loading, setLoading] = useState<boolean>(false);

  const createDescriptionNode = (content: string) => {
    const highlightedNode = getHighlightedNode(flowInstance);
    if (highlightedNode) {
      highlightedNode.data.order += 1;
      const descriptionNode: DescriptionNodeType = {
        id: generateNodeId(CELL_PREFIX.DESCRIPTION_CELL_PREFIX),
        type: CELL_PREFIX.DESCRIPTION_CELL_PREFIX,
        position: {
          x: highlightedNode.position.x + NODE_X_BUFFER,
          y: highlightedNode.position.y - NODE_Y_BUFFER / 2,
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
      setLoading(true);
      generateDescription(highlightedNode?.data.code, apiKey).then(
        description => {
          createDescriptionNode(description);
          setLoading(false);
        },
      );
    }
  };
  return (
    <Button
      leadingIcon={!loading ? InfoIcon : () => <Spinner size={"small"} />}
      className={commonStyles["button"]}
      sx={baseButtonStyles}
      variant="outline"
      onClick={handleGenerateDescription}
      disabled={loading}
    >
      {!loading ? "Explain" : "Generating..."}
    </Button>
  );
};
