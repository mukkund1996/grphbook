import { MouseEventHandler, useState } from "react";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { GenerateNodeData } from "./GenerateNode";
import { CELL_PREFIX } from "../../utils/generateId";

export const useGenerateControls = (data: GenerateNodeData) => {
  const flowInstance = useReactFlow();
  const [includeMd, setIncludeMd] = useState(true);
  const [input, setInput] = useState(data.content);

  const handleGenerate: MouseEventHandler = _event => {
    console.log(`${input.split(" ").length} tokens sent to GPT.`);
  };

  const handleToggle: MouseEventHandler = _event => {
    setIncludeMd(!includeMd);
  };

  const handleDelete: MouseEventHandler = _event => {
    const nodesToDelete = [
      ...flowInstance.getNodes().filter(node => node.selected),
    ];
    flowInstance.deleteElements({ nodes: nodesToDelete });
  };

  return {
    input,
    setInput,
    includeMd,
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
