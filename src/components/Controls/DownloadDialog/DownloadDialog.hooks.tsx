import { useCallback, useEffect, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import {
  NodeRoutes,
  exportNotebook,
  identifyWorkflows,
} from "../../../notebook/exportNotebook";
import { DownloadOptionsProps } from "./DownloadDialog";
import { GrphBookNode } from "../../../notebook/NoteBook";
import { downloadTxtFile } from "../../utils/download";
import { generateLabel, generateRouteKey } from "./DownloadDialog.utils";

export type KeyRouteMapType = { [key: string]: Array<GrphBookNode> };

export const useDownloadRoutes = () => {
  const flowInstance = useReactFlow();
  const anchorRef = useRef(null);
  const [nodeRoutes, setNodeRoutes] = useState<NodeRoutes>([]);
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const handleDownloadOpen = () => {
    if (!showDownload) {
      const routes = identifyWorkflows(
        flowInstance.getEdges(),
        flowInstance.getNodes()
      );
      setNodeRoutes(routes);
    }
    setShowDownload(!showDownload);
  };

  return {
    anchorRef,
    nodeRoutes,
    handleDownloadOpen,
    showDownload,
    setShowDownload,
  };
};

export const useDownloadHandles = (props: DownloadOptionsProps) => {
  const { setOpen, routes } = props;

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
  const [keyRouteMap, setKeyRouteMap] = useState<KeyRouteMapType>({});

  useEffect(() => {
    let updatedRoute: KeyRouteMapType = {};
    routes.forEach((route) => {
      const key = generateRouteKey();
      updatedRoute[key] = route;
    });
    setKeyRouteMap(updatedRoute);
  }, [routes, getHighlightedNodes]);

  const handleItemSelect =
    (selectedRoute: Array<GrphBookNode>) =>
    (
      _event:
        | React.MouseEvent<HTMLLIElement>
        | React.KeyboardEvent<HTMLLIElement>
    ): void => {
      // Clearing the selection for other routes first
      const updatedRoutes = [...Object.values(keyRouteMap)];
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

  const handleDownload = (): void => {
    if (selectedRoute.length !== 0) {
      const notebook = exportNotebook(selectedRoute);
      const stringified = JSON.stringify(notebook);
      downloadTxtFile(stringified, `${generateLabel(selectedRoute)}.ipynb`);
      setNodes(getHighlightedNodes(selectedRoute, false));
    }
  };

  return {
    keyRouteMap,
    handleClose,
    handleItemSelect,
    handleDownload,
  };
};
