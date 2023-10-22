import styles from "./DownloadDialog.module.css";
import { NodeRoutes, exportNotebook } from "../../../notebook/exportNotebook";
import { ActionList, Dialog } from "@primer/react";
import { DownloadIcon } from "@primer/octicons-react";
import { useCallback, useEffect, useState } from "react";
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

  const setNodes = useCallback(
    (updatedRoute: Array<GrphBookNode>) => {
      flowInstance.setNodes((nodes) => [...nodes, ...updatedRoute]);
    },
    [flowInstance]
  );

  const getHighlightedNodes = useCallback(
    (route: Array<GrphBookNode>, highlighted: boolean): Array<GrphBookNode> => {
      const borderStyle = highlighted
        ? { border: "5px solid #ff9999" }
        : undefined;
      const updatedRoute = [...route];
      updatedRoute.forEach((node) => {
        node.style = borderStyle;
      });
      return updatedRoute;
    },
    []
  );

  const handleClose = () => {
    setOpen(false);
    if (selectedRoute.length) {
      setNodes(getHighlightedNodes(selectedRoute, false));
    }
  };

  const [selectedRoute, setSelectedRoute] = useState<Array<GrphBookNode>>([]);
  const [availableRoutes, setAvailableRoutes] = useState<NodeRoutes>(routes);

  useEffect(() => {
    setAvailableRoutes(routes);
  }, [routes, getHighlightedNodes]);

  const handleItemSelect =
    (selectedRoute: Array<GrphBookNode>) =>
    (
      _event:
        | React.MouseEvent<HTMLLIElement>
        | React.KeyboardEvent<HTMLLIElement>
    ): void => {
      // Clearing the selection for other routes first
      const updatedRoutes = [...availableRoutes];
      let updatedNodes: Array<GrphBookNode> = [];
      updatedRoutes.forEach((route) => {
        updatedNodes = [...updatedNodes, ...getHighlightedNodes(route, false)];
      });
      updatedNodes = [
        ...updatedNodes,
        ...getHighlightedNodes(selectedRoute, true),
      ];
      setNodes(updatedNodes);
      setSelectedRoute(selectedRoute);
    };

  const handleDownload = (
    _event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ): void => {
    if (selectedRoute.length !== 0) {
      const notebook = exportNotebook(selectedRoute);
      const stringified = JSON.stringify(notebook);
      downloadTxtFile(stringified, `${generateLabel(selectedRoute)}.ipynb`);
      setNodes(getHighlightedNodes(selectedRoute, false));
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
        {availableRoutes.map((route) => (
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
