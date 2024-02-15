import { Connection, Handle, Position, Node, NodeProps } from "reactflow";
import MDEditor from "@uiw/react-md-editor";
import { Button, Textarea } from "@primer/react";

import { NodeControls } from "../NodeControls/NodeControls";
import { useDescriptionNode } from "./DescriptionNode.hooks";

import { mdStyles } from "./DescriptionNode.styles";

import { baseButtonStyles, textStyles } from "../Styles/common.styles";
import commonStyles from "../Styles/common.module.css";
import styles from "./DescriptionNode.module.css";
import { PaintbrushIcon, PencilIcon } from "@primer/octicons-react";
import { Icon } from "@iconify/react";
import { DeleteButton } from "../Buttons/DeleteButton";

export type DescriptionNodeData = {
  content: string;
  order: number;
  editorId?: string;
};

export type DescriptionNodeType = Node<DescriptionNodeData>;

const DescriptionNode = ({ data }: NodeProps<DescriptionNodeData>) => {
  const { visibility, textValue, handleChange, handleConvertMd } =
    useDescriptionNode(data);

  const MdButton = () => (
    <Button
      leadingIcon={visibility ? PaintbrushIcon : PencilIcon}
      className={commonStyles["button"]}
      sx={baseButtonStyles}
      variant="outline"
      onClick={handleConvertMd}
    >
      {visibility ? "Convert" : "Edit"}
    </Button>
  );

  return (
    <div
      data-testid="desc-node"
      className={`${commonStyles["node"]} ${commonStyles["border"]}`}
    >
      <Handle type="target" id="a" position={Position.Top} />
      {visibility ? (
        <Textarea
          sx={textStyles}
          resize="none"
          placeholder="Enter a description"
          onChange={handleChange}
          value={textValue}
        />
      ) : null}
      {!visibility ? (
        <MDEditor.Markdown
          className={styles["md-box"]}
          source={textValue}
          style={mdStyles}
        />
      ) : null}
      <NodeControls
        leadingButton={MdButton}
        trailingButton={DeleteButton}
        Icon={
          <Icon
            icon="teenyicons:markdown-solid"
            className={commonStyles["icon-marker"]}
          />
        }
      />
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
