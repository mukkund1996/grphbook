import {Connection, Handle, Position, Node, NodeProps} from "reactflow";
import MDEditor from "@uiw/react-md-editor";
import {Button, Textarea} from "@primer/react";
import {useState} from "react";

import styles from "./DescriptionNode.module.css";
import commonStyles from "../Styles/common.module.css";
import {NodeControls} from "../NodeControls/NodeControls";

export type DescriptionNodeData = {
  content: string;
  order: number;
  editorId?: string;
};

export type DescriptionNodeType = Node<DescriptionNodeData>;

const DescriptionNode = ({data}: NodeProps<DescriptionNodeData>) => {
  const [textValue, setTextValue] = useState<string>(data.content);
  const [visibility, setVisibility] = useState<boolean>(true);

  const handleChange = (event: any) => {
    setTextValue(event.target.value);
  };

  const handleConvertMd = () => {
    setVisibility(!visibility);
  };

  const MdButton = () => (
    <Button variant="outline" onClick={handleConvertMd}>
      {visibility ? "Convert" : "Edit"}
    </Button>
  );

  return (
    <div className={`${commonStyles["node"]} ${commonStyles["border"]}`}>
      <Handle type="target" id="a" position={Position.Top} />
      {visibility ? <Textarea placeholder="Enter a description" onChange={handleChange} value={textValue} /> : null}
      {!visibility ? <MDEditor.Markdown source={textValue} style={{whiteSpace: "pre-wrap"}} /> : null}
      <NodeControls auxillaryButton={MdButton} />
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
