import {OnChange, OnMount} from "@monaco-editor/react";
import {useReactFlow} from "reactflow";
import {getCurrentNode} from "../../utils/reactFlow";
import {CodingNodeData} from "./CodingNode";

export const useCodingNode = (data: CodingNodeData) => {
  const flowInstance = useReactFlow();

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    setEditorId(editor.getId());
  };

  const setEditorId = (id: string) => {
    const currentNode = getCurrentNode(flowInstance, data);
    const updatedNode = {...currentNode, data: {...currentNode.data, editorId: id}};
    flowInstance.setNodes(nodes => [...nodes, updatedNode]);
  };

  const setEditorCode = (value?: string) => {
    if (value) {
      const currentNode = getCurrentNode(flowInstance, data);
      const updatedNode = {...currentNode, data: {...currentNode.data, code: value}};
      flowInstance.setNodes(nodes => [...nodes, updatedNode]);
    }
  };

  const handleEditorChange: OnChange = (value, _event) => {
    setEditorCode(value);
  };

  return {
    handleEditorChange,
    handleEditorDidMount,
  };
};
