import {Editor} from "@monaco-editor/react";
import {Handle, Node, NodeProps, Position} from "reactflow";

import commonStyles from "../Styles/common.module.css";
import styles from "./CodingNode.module.css";
import {NodeControls} from "../NodeControls/NodeControls";

export type CodingNodeData = {
  code: string;
  order: number;
};

export type CodingNodeType = Node<CodingNodeData>;

const CodingNode = ({data}: NodeProps<CodingNodeData>) => {
  const options = {
    selectOnLineNumbers: false,
    minimap: {enabled: false},
  };
  return (
    <div className={`${styles["node-cell-type"]} ${commonStyles["border"]}`}>
      <Handle type="target" id="a" position={Position.Top} />
      <Editor width="90%" options={options} defaultLanguage="python" defaultValue={data.code} />
      <NodeControls />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
};

export default CodingNode;
