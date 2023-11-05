import { Handle, Node, NodeProps, Position } from "reactflow";

import { GeneratorInput } from "../GeneratorInput/GeneratorInput";
import { Button, Text, ToggleSwitch } from "@primer/react";
import { baseButtonStyles } from "../Styles/common.styles";
import { XIcon } from "@primer/octicons-react";

import commonStyles from "../Styles/common.module.css";
import controlStyles from "../NodeControls/NodeControls.module.css";
import styles from "./GenerateNode.module.css";
import { useGenerateControls } from "./GenerateNode.hooks";

export type GenerateNodeData = {
  content: string;
};

export type GenerateNodeType = Node<GenerateNodeData>;

export const GenerateNode = ({ data }: NodeProps<GenerateNodeData>) => {
  const {
    input,
    setInput,
    errorMsg,
    includeMd,
    loading,
    handleToggle,
    handleGenerate,
    handleDelete,
  } = useGenerateControls(data);

  return (
    <div className={`${commonStyles["node"]} ${commonStyles["border"]}`}>
      <Handle type="target" id="a" position={Position.Top} />
      <GeneratorInput
        loading={loading}
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
      {errorMsg ? (
        <p className={commonStyles["error-state"]}>{errorMsg}</p>
      ) : null}
    </div>
  );
};

export default GenerateNode;
