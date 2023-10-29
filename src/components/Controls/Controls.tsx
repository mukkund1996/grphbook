import { ControlButton, Controls, useReactFlow } from "reactflow";
import { controlDiv, controlButtons } from "./Controls.styles";
import { DownloadIcon, UploadIcon } from "@primer/octicons-react";
import DownloadDialog from "./DownloadDialog/DownloadDialog";
import { useDownloadRoutes } from "./DownloadDialog/DownloadDialog.hooks";

const CustomControl: React.FC = () => {
  const handleUpload = () => {};
  const {
    anchorRef,
    nodeRoutes,
    handleDownloadOpen,
    showDownload,
    setShowDownload,
    disableDownload,
  } = useDownloadRoutes();
  return (
    <Controls
      style={controlDiv}
      showZoom={false}
      showFitView={false}
      showInteractive={false}
    >
      <ControlButton style={controlButtons} onClick={handleUpload}>
        <UploadIcon size={24} />
      </ControlButton>
      <ControlButton
        aria-haspopup="true"
        aria-expanded={showDownload}
        onClick={handleDownloadOpen}
        style={controlButtons}
        disabled={disableDownload}
      >
        <div ref={anchorRef}></div>
        <DownloadIcon />
      </ControlButton>
      <DownloadDialog
        open={showDownload}
        setOpen={setShowDownload}
        routes={nodeRoutes}
        anchorRef={anchorRef}
      />
    </Controls>
  );
};

export default CustomControl;
