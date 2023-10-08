import {Connection, Handle, Position} from "reactflow";
import MDEditor from "@uiw/react-md-editor";
import {Button, Textarea} from "@primer/react";
import {useState} from "react";

import styles from "./DescriptionNode.module.css";

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
    <div className={styles["node-cell-type"]}>
      <Handle type="target" id="a" position={Position.Top} />
      {visibility ? <Textarea placeholder="Enter a description" onChange={handleChange} value={textValue} /> : null}
      {!visibility ? <MDEditor.Markdown source={textValue} style={{whiteSpace: "pre-wrap"}} /> : null}
      <div className={styles["control"]}>
        <Button variant="outline" onClick={handleClick}>
          {visibility ? "Convert" : "Edit"}
        </Button>
        <Button variant="outline">Code</Button>
        <Button variant="outline">Markdown</Button>
      </div>
      <Handle
        type="source"
        onConnect={(connection: Connection) => {
          console.log("Connection id: ", connection.source);
        }}
        position={Position.Bottom}
        id="b"
      />
    </div>
  );
};

export default DescriptionNode;
