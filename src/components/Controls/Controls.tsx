import { ControlButton, Controls } from "reactflow";
import { controlDiv, controlButtons } from "./Controls.styles";
import {
  DownloadIcon,
  KeyIcon,
  PlayIcon,
  UploadIcon,
} from "@primer/octicons-react";
import DownloadDialog from "./DownloadDialog/DownloadDialog";
import { useDownloadRoutes } from "./DownloadDialog/DownloadDialog.hooks";
import { useUploadControls } from "./UploadDialog/UploadDialog.hooks";
import { UploadDialog } from "./UploadDialog/UploadDIalog";
import { TextInput } from "@primer/react";

import controlStyles from "./Controls.module.css";
import commonStyles from "../Styles/common.module.css";
import { borderStyles, inputStyles } from "../Styles/common.styles";

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
      <TextInput
        className={controlStyles["api-input"]}
        sx={{ ...borderStyles, ...inputStyles }}
        type="password"
        leadingVisual={KeyIcon}
        aria-label={"GPTAI API Key"}
        name="api-key-input"
        placeholder="Enter your API Key"
        trailingAction={
          <TextInput.Action
            id="input-api-btn"
            // onClick={props.handleGenerate}
            icon={PlayIcon}
            aria-label="Input API Key"
            className={`${commonStyles["button"]}`}
            // disabled={props.loading}
          />
        }
      />
    </Controls>
  );
};

export default CustomControl;
