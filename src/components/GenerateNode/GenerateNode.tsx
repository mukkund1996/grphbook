import { Handle, Node, NodeProps, Position } from "reactflow";

import commonStyles from "../Styles/common.module.css";
import { GeneratorInput } from "../GeneratorInput/GeneratorInput";
import { MouseEventHandler, useState } from "react";

export type GenerateNodeData = {
  content: string;
};

export type GenerateNodeType = Node<GenerateNodeData>;

export const GenerateNode = ({ data }: NodeProps<GenerateNodeData>) => {
  const [input, setInput] = useState(data.content);
  const handleGenerate: MouseEventHandler = (_event) => {
    console.log(`${input.split(" ").length} tokens sent to GPT.`);
  };

  return (
    <div className={`${commonStyles["node"]} ${commonStyles["border"]}`}>
      <Handle type="target" id="a" position={Position.Top} />
      <GeneratorInput
        value={input}
        handleGenerate={handleGenerate}
        setValue={setInput}
      />
    </div>
  );
};

export default GenerateNode;
