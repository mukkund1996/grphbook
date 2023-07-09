import {Editor, Monaco} from "@monaco-editor/react";
import {Handle, Position} from "reactflow";
import {Button} from "@primer/react";
import "./nodeCell.css";
import {useRef} from "react";
import {useActions} from "../hooks/useActions";

const handleStyle = {left: 10};

const NodeCell: React.FC = () => {
  const {updateCell} = useActions();

  // const editorRef = useRef(null);

  // function handleEditorDidMount(editor: any, monaco: Monaco) {
  //   editorRef.current = editor;
  // }

  // function showValue() {
  //   alert(editorRef.current.getValue());
  // }

  return (
    <div className="node-cell-type">
      <Handle type="target" position={Position.Top} />
      <Editor defaultLanguage="python" defaultValue="print('Hello World!')" />
      <Button onClick={() => updateCell("1", "print('hello world!')")}>Run</Button>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </div>
  );
};

export default NodeCell;
