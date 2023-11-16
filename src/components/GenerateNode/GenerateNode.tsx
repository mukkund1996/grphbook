import { Handle, Node, NodeProps, Position } from "reactflow";

import { GeneratorInput } from "../GeneratorInput/GeneratorInput";
import { Text, ToggleSwitch } from "@primer/react";
import { useGenerateControls } from "./GenerateNode.hooks";

import commonStyles from "../Styles/common.module.css";
import controlStyles from "../NodeControls/NodeControls.module.css";
import styles from "./GenerateNode.module.css";
import { DeleteButton } from "../Buttons/DeleteButton";

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
        <DeleteButton />
      </div>
      {errorMsg ? (
        <p className={commonStyles["error-state"]}>{errorMsg}</p>
      ) : null}
    </div>
  );
};

export default GenerateNode;
