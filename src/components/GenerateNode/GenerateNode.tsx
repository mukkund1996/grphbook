import { Handle, Node, NodeProps, Position, useReactFlow } from "reactflow";

import { GeneratorInput } from "../GeneratorInput/GeneratorInput";
import { MouseEventHandler, useState } from "react";
import { Button, Text, ToggleSwitch } from "@primer/react";
import { baseButtonStyles } from "../Styles/common.styles";
import { XIcon } from "@primer/octicons-react";

import commonStyles from "../Styles/common.module.css";
import controlStyles from "../NodeControls/NodeControls.module.css";
import styles from "./GenerateNode.module.css";

export type GenerateNodeData = {
  content: string;
};

export type GenerateNodeType = Node<GenerateNodeData>;

export const GenerateNode = ({ data }: NodeProps<GenerateNodeData>) => {
  const flowInstance = useReactFlow();
  const [includeMd, setIncludeMd] = useState(true);
  const [input, setInput] = useState(data.content);

  const handleGenerate: MouseEventHandler = (_event) => {
    console.log(`${input.split(" ").length} tokens sent to GPT.`);
  };

  const handleToggle: MouseEventHandler = (_event) => {
    setIncludeMd(!includeMd);
  };

  const handleDelete: MouseEventHandler = (_event) => {
    flowInstance.setNodes((nodes) => {
      const updatedNodes = [...nodes.filter((node) => !node.selected)];
      return updatedNodes;
    });
  };

  return (
    <div className={`${commonStyles["node"]} ${commonStyles["border"]}`}>
      <Handle type="target" id="a" position={Position.Top} />
      <GeneratorInput
        value={input}
        handleGenerate={handleGenerate}
        setValue={setInput}
      />
      <div className={`${controlStyles["control"]} ${styles["switches"]}`}>
        <div className={styles["toggle-area"]}>
          <Text className={styles["text"]}>Include Description</Text>
          <ToggleSwitch
            className={styles["toggle"]}
            size="small"
            checked={includeMd}
            onClick={handleToggle}
            aria-labelledby="toggleDescription"
          />
        </div>
        <Button
          sx={baseButtonStyles}
          onClick={handleDelete}
          leadingIcon={XIcon}
          className={commonStyles["button"]}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default GenerateNode;
