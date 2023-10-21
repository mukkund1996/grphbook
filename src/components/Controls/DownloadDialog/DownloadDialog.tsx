import styles from "./DownloadDialog.module.css";
import { NodeRoutes, exportNotebook } from "../../../notebook/exportNotebook";
import { ActionList, Dialog } from "@primer/react";
import { DownloadIcon } from "@primer/octicons-react";
import { useCallback, useState } from "react";
import { GrphBookNode } from "../../../notebook/NoteBook";
import uuidv4 from "uuidv4";
import { downloadTxtFile, generateLabel } from "../../utils/download";
import { useReactFlow } from "reactflow";
import { dialogStyles } from "./DownloadDialog.styles";

type DownloadOptionsProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  routes: NodeRoutes;
  anchorRef: React.MutableRefObject<null>;
};

const DownloadDialog: React.FC<DownloadOptionsProps> = (
  props: DownloadOptionsProps
) => {
  const { open, setOpen, routes, anchorRef } = props;

  const flowInstance = useReactFlow();

  const setHighlightAttr = useCallback(
    (nodes: Array<GrphBookNode>, highlighted: boolean) => {
      const borderStyle = highlighted
        ? { border: "5px solid #ff9999" }
        : undefined;
      const updatedRoute = [...nodes];
      updatedRoute.forEach((node) => {
        node.style = borderStyle;
      });
      flowInstance.setNodes((nodes) => [...nodes, ...updatedRoute]);
    },
    [flowInstance]
  );

  const handleClose = () => {
    setOpen(false);
    if (selectedRoute.length) {
      setHighlightAttr(selectedRoute, false);
    }
  };

  const [selectedRoute, setSelectedRoute] = useState<Array<GrphBookNode>>([]);

  const handleItemSelect =
    (selectedRoute: Array<GrphBookNode>) =>
    (
      _event:
        | React.MouseEvent<HTMLLIElement>
        | React.KeyboardEvent<HTMLLIElement>
    ): void => {
      // Clearing the selection for other routes first
      routes.forEach((route) => setHighlightAttr(route, false));
      setSelectedRoute(selectedRoute);
      setHighlightAttr(selectedRoute, true);
    };

  const handleDownload = (
    _event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ): void => {
    if (selectedRoute.length !== 0) {
      const notebook = exportNotebook(selectedRoute);
      const stringified = JSON.stringify(notebook);
      downloadTxtFile(stringified, `${generateLabel(selectedRoute)}.ipynb`);
      setHighlightAttr(selectedRoute, false);
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
      <Dialog.Header id="header-id">Select possible routes</Dialog.Header>
      <ActionList selectionVariant="single">
        {routes.map((route) => (
          <ActionList.Item
            className={styles["route-label"]}
            onSelect={handleItemSelect(route)}
            key={`route_${uuidv4()}`}
          >
            {generateLabel(route)}
          </ActionList.Item>
        ))}
        <ActionList.Divider />
        <ActionList.Item
          className={styles["download-label"]}
          onSelect={handleDownload}
        >
          Download file
          <ActionList.TrailingVisual>
            <DownloadIcon />
          </ActionList.TrailingVisual>
        </ActionList.Item>
      </ActionList>
    </Dialog>
  );
};

export default DownloadDialog;
