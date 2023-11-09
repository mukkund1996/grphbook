import { useReactFlow } from "reactflow";
import { generateSampleLayout } from "../../../state/SampleLayout";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";

export const useStartupPrompt = (
  setShowUpload: Dispatch<SetStateAction<boolean>>,
) => {
  const flowInstance = useReactFlow();
  const [showPrompt, setShowPrompt] = useState(true);
  const handleBlankStart: MouseEventHandler<HTMLLIElement> = _event => {
    setShowPrompt(false);
    setShowUpload(true);
  };
  const handleSampleLayoutStart: MouseEventHandler<HTMLLIElement> = _event => {
    const { nodes, edges } = generateSampleLayout();
    flowInstance.setNodes(nodes);
    flowInstance.setEdges(edges);
    setShowPrompt(false);
  };

  return {
    showPrompt,
    handleBlankStart,
    handleSampleLayoutStart,
  };
};
