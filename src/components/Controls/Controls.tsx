import { ControlButton, Controls } from "reactflow";
import { controlDiv, controlButtons } from "./Controls.styles";
import {
  CheckCircleFillIcon,
  DownloadIcon,
  KeyIcon,
  PlayIcon,
  SyncIcon,
  UploadIcon,
} from "@primer/octicons-react";
import DownloadDialog from "../DownloadDialog/DownloadDialog";
import { useDownloadRoutes } from "../DownloadDialog/DownloadDialog.hooks";
import { useUploadControls } from "../UploadDialog/UploadDialog.hooks";
import { UploadDialog } from "../UploadDialog/UploadDIalog";
import { TextInput } from "@primer/react";

import controlStyles from "./Controls.module.css";
import commonStyles from "../Styles/common.module.css";
import {
  borderStyles,
  inputStyles,
  successBorder,
} from "../Styles/common.styles";
import { useApi } from "../../hooks/useApi";
import { StartupPrompt } from "./StartupPrompt/StartupPrompt";
import { useStartupPrompt } from "./StartupPrompt/StartupPrompt.hooks";

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

  const {
    localInput: userApiInput,
    apiInputHandler,
    apiSubmitHandler,
    hasApi,
  } = useApi();

  const {
    showPrompt,
    handleBlankStart,
    handleSampleLayoutStart,
    handleRefresh,
  } = useStartupPrompt(setShowUpload);

  return (
    <Controls
      style={controlDiv}
      showZoom={false}
      showFitView={false}
      showInteractive={false}
    >
      {!showPrompt && (
        <>
          <ControlButton
            className={controlStyles["control-btn"]}
            style={controlButtons}
            onClick={handleRefresh}
          >
            <SyncIcon />
          </ControlButton>
          <ControlButton
            className={controlStyles["control-btn"]}
            style={controlButtons}
            onClick={handleUploadOpen}
          >
            <UploadIcon />
          </ControlButton>
          <ControlButton
            className={controlStyles["control-btn"]}
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
            sx={
              hasApi
                ? { ...successBorder, ...inputStyles }
                : { ...borderStyles, ...inputStyles }
            }
            type="password"
            leadingVisual={KeyIcon}
            aria-label={"GPTAI API Key"}
            name="api-key-input"
            placeholder={hasApi ? "API key added" : "Enter your API Key"}
            value={userApiInput}
            onChange={apiInputHandler}
            trailingAction={
              <TextInput.Action
                id="input-api-btn"
                onClick={apiSubmitHandler}
                icon={hasApi ? CheckCircleFillIcon : PlayIcon}
                aria-label="Input API Key"
                className={`${commonStyles["button"]}`}
              />
            }
          />
        </>
      )}
      {showPrompt && (
        <StartupPrompt
          handleBlankStart={handleBlankStart}
          handleSampleLayoutStart={handleSampleLayoutStart}
        />
      )}
    </Controls>
  );
};

export default CustomControl;
