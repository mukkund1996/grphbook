import {useRef, useState} from "react";
import {useReactFlow} from "reactflow";
import {NodeRoutes, identifyWorkflows} from "../../notebook/exportNotebook";

export const useDownloadRoutes = () => {
  const flowInstance = useReactFlow();
  const anchorRef = useRef(null);
  const [nodeRoutes, setNodeRoutes] = useState<NodeRoutes>([]);
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const handleDownloadOpen = () => {
    if (!showDownload) {
      const routes = identifyWorkflows(flowInstance.getEdges(), flowInstance.getNodes());
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
