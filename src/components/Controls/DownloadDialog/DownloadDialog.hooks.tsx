import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { containsGenerateNodes } from "../../GenerateNode/GenerateNode.hooks";

type KeyRouteMapType = { [key: string]: Array<GrphBookNode> };
type KeyRouteTuple = [key: string, route: Array<GrphBookNode>];
type KeySelectionMap = { [key: string]: boolean };

export const useDownloadRoutes = () => {
  const flowInstance = useReactFlow();
  const anchorRef = useRef(null);
  const [nodeRoutes, setNodeRoutes] = useState<NodeRoutes>([]);
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const disableDownload = useMemo(
    () => containsGenerateNodes(flowInstance),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [flowInstance.getNodes()],
  );
  const handleDownloadOpen = () => {
    if (!showDownload) {
      const routes = identifyWorkflows(
        flowInstance.getEdges(),
        flowInstance.getNodes(),
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
    disableDownload,
  };
};

export const useDownloadHandles = (props: DownloadOptionsProps) => {
  const { setOpen, routes } = props;
  const [selectedKeyRouteMap, setSelectedKeyRouteMap] =
    useState<KeyRouteTuple>();
  const [keyRouteMap, setKeyRouteMap] = useState<KeyRouteMapType>({});
  const [keySelectionMap, setKeySelectionMap] = useState<KeySelectionMap>({});
  const flowInstance = useReactFlow();

  const setNodes = useCallback(
    (updatedRoute: Array<GrphBookNode>) => {
      flowInstance.setNodes(nodes => [...nodes, ...updatedRoute]);
    },
    [flowInstance],
  );

  const clearKeySelection = () => {
    setKeySelectionMap((selectionMap: KeySelectionMap): KeySelectionMap => {
      const updatedMap = { ...selectionMap };
      Object.keys(updatedMap).forEach(key => {
        updatedMap[key] = false;
      });
      return updatedMap;
    });
  };
  const getHighlightedNodes = useCallback(
    (route: Array<GrphBookNode>, highlighted: boolean): Array<GrphBookNode> => {
      const borderStyle = highlighted
        ? { border: "5px solid #ff9999" }
        : undefined;
      const updatedRoute = [...route];
      updatedRoute.forEach(node => {
        node.style = borderStyle;
      });
      return updatedRoute;
    },
    [],
  );

  const handleClose = () => {
    setOpen(false);
    if (selectedKeyRouteMap?.[1].length) {
      setNodes(getHighlightedNodes(selectedKeyRouteMap[1], false));
      clearKeySelection();
    }
  };

  useEffect(() => {
    let updatedRoute: KeyRouteMapType = {};
    let updatedKeySelection: KeySelectionMap = {};
    routes.forEach(route => {
      const key = generateRouteKey();
      updatedRoute[key] = route;
      updatedKeySelection[key] = false;
    });
    setKeyRouteMap(updatedRoute);
    setKeySelectionMap(updatedKeySelection);
  }, [routes, getHighlightedNodes]);

  const handleItemSelect =
    (selectedKeyRouteTuple: KeyRouteTuple) =>
    (
      _event:
        | React.MouseEvent<HTMLLIElement>
        | React.KeyboardEvent<HTMLLIElement>,
    ): void => {
      // Clearing the selection for other routes first
      clearKeySelection();
      const updatedRoutes = [...Object.values(keyRouteMap)];
      let updatedNodes: Array<GrphBookNode> = [];
      updatedRoutes.forEach(route => {
        updatedNodes = [...updatedNodes, ...getHighlightedNodes(route, false)];
      });
      updatedNodes = [
        ...updatedNodes,
        ...getHighlightedNodes(selectedKeyRouteTuple?.[1], true),
      ];
      setNodes(updatedNodes);
      setSelectedKeyRouteMap(selectedKeyRouteTuple);
      setKeySelectionMap((selectionMap): KeySelectionMap => {
        const updatedMap = { ...selectionMap };
        updatedMap[selectedKeyRouteTuple?.[0]] = true;
        return updatedMap;
      });
    };

  const handleDownload = (): void => {
    if (selectedKeyRouteMap?.[1] && selectedKeyRouteMap?.[1].length !== 0) {
      const notebook = exportNotebook(selectedKeyRouteMap?.[1]);
      const stringified = JSON.stringify(notebook);
      downloadTxtFile(
        stringified,
        `${generateLabel(selectedKeyRouteMap?.[1])}.ipynb`,
      );
      setNodes(getHighlightedNodes(selectedKeyRouteMap?.[1], false));
      clearKeySelection();
    }
  };

  return {
    keyRouteMap,
    handleClose,
    handleItemSelect,
    handleDownload,
    keySelectionMap,
  };
};
