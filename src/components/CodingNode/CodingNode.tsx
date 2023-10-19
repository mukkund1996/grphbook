import {Editor} from "@monaco-editor/react";
import {Handle, Node, NodeProps, Position} from "reactflow";
import {Button} from "@primer/react";
import {useControls} from "../../hooks/useControls";

import commonStyles from "../Styles/common.module.css";
import "./CodingNode.css";

export type CodingNodeData = {
  code: string;
  order: number;
};

export type CodingNodeType = Node<CodingNodeData>;

const CodingNode = ({data}: NodeProps<CodingNodeData>) => {
  const {addCodingNode, addDescriptionNode} = useControls();
  const options = {
    selectOnLineNumbers: false,
    minimap: {enabled: false},
  };
  return (
    <div className={`node-cell-type ${commonStyles["border"]}`}>
      <Handle type="target" id="a" position={Position.Top} />
      <Editor width="90%" options={options} defaultLanguage="python" defaultValue={data.code} />
      <div className="control">
        <Button variant="outline" onClick={addCodingNode}>
          Code
        </Button>
        <Button variant="outline" onClick={addDescriptionNode}>
          Markdown
        </Button>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
};

export default CodingNode;
