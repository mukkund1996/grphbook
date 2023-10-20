import { useReactFlow } from "reactflow";
import { DescriptionNodeData } from "./DescriptionNode";
import { useState } from "react";
import { getCurrentNode } from "../../utils/reactFlow";

export const useDescriptionNode = (data: DescriptionNodeData) => {
  const flowInstance = useReactFlow();
  const [textValue, setTextValue] = useState<string>(data.content);
  const [visibility, setVisibility] = useState<boolean>(true);

  const setEditorMd = (value?: string) => {
    if (value) {
      const currentNode = getCurrentNode(flowInstance, data);
      const updatedNode = {
        ...currentNode,
        data: { ...currentNode.data, content: value },
      };
      flowInstance.setNodes((nodes) => [...nodes, updatedNode]);
    }
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    setTextValue(value);
    setEditorMd(value);
  };

  const handleConvertMd = () => {
    setVisibility(!visibility);
  };

  return {
    visibility,
    textValue,
    handleChange,
    handleConvertMd,
  };
};
