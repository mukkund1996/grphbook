import {Editor} from "@monaco-editor/react";
import {Handle, Position} from "reactflow";
import "./CodingNode.css";
import {Button} from "@primer/react";

const CodingNode: React.FC = () => {
  return (
    <div className="node-cell-type">
      <Handle type="target" position={Position.Top} />
      <Editor defaultLanguage="python" defaultValue="print('Hello World!')" />
      <Button variant="outline">Code</Button>
      <Button variant="outline">Markdown</Button>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default CodingNode;
