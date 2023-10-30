import { useRef, useState } from "react";

export const useUploadControls = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const anchorRef = useRef(null);
  const handleOpen = () => {
    setOpen(!open);
  };
  return {
    open,
    setOpen,
    handleOpen,
    content,
    setContent,
    anchorRef,
  };
};
