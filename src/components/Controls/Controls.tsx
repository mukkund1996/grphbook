import { ControlButton, Controls } from "reactflow";
import { controlDiv, controlButtons } from "./Controls.styles";
import { DownloadIcon, UploadIcon } from "@primer/octicons-react";
import DownloadDialog from "./DownloadDialog/DownloadDialog";
import { useDownloadRoutes } from "./DownloadDialog/DownloadDialog.hooks";
import { useUploadControls } from "./UploadDialog/UploadDialog.hooks";
import { UploadDialog } from "./UploadDialog/UploadDIalog";

const CustomControl: React.FC = () => {
  const {
    anchorRef,
    nodeRoutes,
    handleDownloadOpen,
    showDownload,
    setShowDownload,
    disableDownload,
  } = useDownloadRoutes();

  const {
    open: showUpload,
    setOpen: setShowUpload,
    handleOpen: handleUploadOpen,
    content: uploadContent,
    setContent: setUploadContent,
    anchorRef: anchorRefUpload,
  } = useUploadControls();

  return (
    <Controls
      style={controlDiv}
      showZoom={false}
      showFitView={false}
      showInteractive={false}
    >
      <ControlButton style={controlButtons} onClick={handleUploadOpen}>
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
      <UploadDialog
        open={showUpload}
        setOpen={setShowUpload}
        content={uploadContent}
        setContent={setUploadContent}
        anchorRef={anchorRefUpload}
      />
    </Controls>
  );
};

export default CustomControl;
