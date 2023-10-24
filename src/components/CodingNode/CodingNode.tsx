import { Editor } from "@monaco-editor/react";
import { Handle, Node, NodeProps, Position } from "reactflow";

import { NodeControls } from "../NodeControls/NodeControls";
import { useCodingNode } from "./CodingNode.hooks";

import styles from "./CodingNode.module.css";
import commonStyles from "../Styles/common.module.css";

export type CodingNodeData = {
  code: string;
  order: number;
  editorId?: string;
};

export type CodingNodeType = Node<CodingNodeData>;

const editorOptions = {
  selectOnLineNumbers: false,
  minimap: { enabled: false },
};

const CodingNode = ({ data }: NodeProps<CodingNodeData>) => {
  const { handleEditorChange, handleEditorDidMount } = useCodingNode(data);

  return (
    <div className={`${commonStyles["node"]} ${commonStyles["border"]}`}>
      <Handle type="target" id="a" position={Position.Top} />
      <Editor
        className={styles["code-editor"]}
        width="90%"
        height="150px"
        options={editorOptions}
        defaultLanguage="python"
        defaultValue={data.code}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
      <NodeControls />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
};

export default CodingNode;
