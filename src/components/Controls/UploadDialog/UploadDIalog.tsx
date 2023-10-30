import { ActionList, Button, Dialog, Textarea } from "@primer/react";

import { UploadIcon } from "@primer/octicons-react";
import { useState } from "react";
import { NoteBook } from "../../../notebook/NoteBook";
import { importNotebook } from "../../../notebook/importNotebook";
import { useReactFlow } from "reactflow";

import {
  baseButtonStyles,
  dialogStyles,
  textStyles,
} from "../../Styles/common.styles";
import commonStyles from "../../Styles/common.module.css";
import { errorBorder } from "./UploadDialog.styles";

export type UploadOptionsProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  anchorRef: React.MutableRefObject<null>;
};

export const UploadDialog = (props: UploadOptionsProps) => {
  const { open, setOpen, anchorRef, content, setContent } = props;

  const flowInstance = useReactFlow();
  const [inErrorState, setErrorState] = useState<boolean>(false);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    setErrorState(false);
    const { value } = event.target;
    setContent(value);
  };

  const handleClose = () => {
    setContent("");
    setErrorState(false);
    setOpen(false);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = _event => {
    if (content === "") {
      setErrorState(true);
    }
    try {
      // Extract string into JSON
      const noteBook = JSON.parse(content) as NoteBook;
      const { nodes: importedNodes, edges: importedEdges } =
        importNotebook(noteBook);
      const currentNodes = flowInstance.getNodes();
      flowInstance.deleteElements({ nodes: currentNodes });
      flowInstance.setNodes(importedNodes);
      flowInstance.setEdges(importedEdges);
      setContent("");
    } catch (error) {
      setErrorState(true);
    }
  };

  return (
    <Dialog
      sx={dialogStyles}
      returnFocusRef={anchorRef}
      isOpen={open}
      onDismiss={handleClose}
      aria-labelledby="header-id"
    >
      <Dialog.Header id="header-id">Import notebook</Dialog.Header>
      <ActionList selectionVariant="single">
        <Textarea
          placeholder="Enter notebook JSON"
          onChange={handleChange}
          sx={inErrorState ? { ...textStyles, ...errorBorder } : textStyles}
          value={content}
          resize="none"
        />
        <ActionList.Divider />
        <div>
          <Button
            sx={baseButtonStyles}
            onClick={handleSubmit}
            className={commonStyles["button"]}
            trailingIcon={UploadIcon}
          >
            Upload
          </Button>
        </div>
      </ActionList>
    </Dialog>
  );
};
