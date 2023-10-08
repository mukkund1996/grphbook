import {Editor} from "@monaco-editor/react";
import {Handle, Position} from "reactflow";
import "./CodingNode.css";
import {Button} from "@primer/react";

const CodingNode: React.FC = () => {
  const options = {
    selectOnLineNumbers: false,
    minimap: {enabled: false},
  };
  return (
    <div className="node-cell-type">
      <Handle type="target" id="a" position={Position.Right} />
      <Editor width="90%" options={options} defaultLanguage="python" defaultValue="print('Hello World!')" />
      <div className="control">
        <Button variant="outline">Code</Button>
        <Button variant="outline">Markdown</Button>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
};

export default CodingNode;
