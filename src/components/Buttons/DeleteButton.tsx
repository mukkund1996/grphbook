import { Button } from "@primer/react";
import { FC, MouseEventHandler } from "react";
import { baseButtonStyles } from "../Styles/common.styles";
import { XIcon } from "@primer/octicons-react";
import commonStyles from "../Styles/common.module.css";
import { getHighlightedNode } from "../../utils/node";
import { useReactFlow } from "reactflow";

export const DeleteButton: FC = () => {
  const flowInstance = useReactFlow();
  const deleteGenerateNode = () => {
    const currentNode = getHighlightedNode(flowInstance);
    if (currentNode) {
      flowInstance.deleteElements({ nodes: [currentNode] });
    }
  };

  const handleDelete: MouseEventHandler = _event => {
    deleteGenerateNode();
  };
  return (
    <Button
      sx={baseButtonStyles}
      onClick={handleDelete}
      className={commonStyles["button"]}
    >
      <XIcon />
    </Button>
  );
};
