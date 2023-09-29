import {Handle, Position} from "reactflow";
import "./DescriptionNode.css";
import {Button, Textarea} from "@primer/react";
import MDEditor from "@uiw/react-md-editor";
import {useState} from "react";

const DescriptionNode: React.FC = () => {
  const [textValue, setTextValue] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(true);

  const handleChange = (event: any) => {
    setTextValue(event.target.value);
  };

  const handleClick = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="node-cell-type">
      <Handle type="target" position={Position.Top} />
      {visibility ? <Textarea placeholder="Enter a description" onChange={handleChange} value={textValue} /> : null}
      {!visibility ? <MDEditor.Markdown source={textValue} style={{whiteSpace: "pre-wrap"}} /> : null}
      <Button variant="outline" onClick={handleClick}>
        {visibility ? "Convert" : "Edit"}
      </Button>
      <Button variant="outline">Code</Button>
      <Button variant="outline">Markdown</Button>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default DescriptionNode;
