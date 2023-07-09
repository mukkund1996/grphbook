import {Editor} from "@monaco-editor/react";
import {Handle, Position} from "reactflow";
import "./nodeCell.css";
import { Button } from "@primer/react";

const handleStyle = {left: 10};

const NodeCell: React.FC = () => {
  return (
    <div className="node-cell-type">
      <Handle type="target" position={Position.Top} />
      <Editor defaultLanguage="python" defaultValue="print('Hello World!')" />
      <Button variant="outline">Run</Button>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </div>
  );
};

export default NodeCell;
