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
import { ActionList, TextInput } from "@primer/react";

import controlStyles from "./Controls.module.css";
import commonStyles from "../Styles/common.module.css";
import { borderStyles, inputStyles } from "../Styles/common.styles";
import { useApi } from "../../hooks/useApi";
import IconPages from "../Icons/IconPages";
import IconGraphOutline from "../Icons/IconGraphOutline";
import { useState } from "react";

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
  } = useApi();

  const [showPrompt, setShowPrompt] = useState(true);
  

  return (
    <Controls
      style={controlDiv}
      showZoom={false}
      showFitView={false}
      showInteractive={false}
    >
      {!showPrompt && (
        <>
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
            value={userApiInput}
            onChange={apiInputHandler}
            trailingAction={
              <TextInput.Action
                id="input-api-btn"
                onClick={apiSubmitHandler}
                icon={PlayIcon}
                aria-label="Input API Key"
                className={`${commonStyles["button"]}`}
              />
            }
          />
        </>
      )}
      {showPrompt && (
        <div
          className={`${controlStyles["prompt-container"]} ${commonStyles["border"]}`}
        >
          <ActionList className={controlStyles["prompt-items"]}>
            <ActionList.Item onClick={handleBlankStart}>
              <div className={controlStyles["prompt-selection"]}>
                <IconPages height={"7rem"} width={"7rem"} />
                <span>Start from blank</span>
              </div>
            </ActionList.Item>
            <ActionList.Item onClick={handleBlankStart}>
              <div className={controlStyles["prompt-selection"]}>
                <IconGraphOutline height={"7rem"} width={"7rem"} />
                <span>Use a starting layout</span>
              </div>
            </ActionList.Item>
          </ActionList>
        </div>
      )}
    </Controls>
  );
};

export default CustomControl;
