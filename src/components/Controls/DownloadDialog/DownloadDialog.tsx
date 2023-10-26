import { NodeRoutes } from "../../../notebook/exportNotebook";
import { ActionList, Button, Dialog } from "@primer/react";
import { DownloadIcon } from "@primer/octicons-react";
import { dialogStyles } from "./DownloadDialog.styles";
import { useDownloadHandles } from "./DownloadDialog.hooks";

import styles from "./DownloadDialog.module.css";
import { baseButtonStyles } from "../../Styles/common.styles";
import commonStyles from "../../Styles/common.module.css";

export type DownloadOptionsProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  routes: NodeRoutes;
  anchorRef: React.MutableRefObject<null>;
};

const DownloadDialog: React.FC<DownloadOptionsProps> = (
  props: DownloadOptionsProps
) => {
  const { open, anchorRef } = props;
  const {
    keyRouteMap,
    keySelectionMap,
    handleClose,
    handleItemSelect,
    handleDownload,
  } = useDownloadHandles(props);

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
        {Object.keys(keyRouteMap).map((key) => {
          const route = keyRouteMap[key];
          return (
            <ActionList.Item
              selected={keySelectionMap[key]}
              className={styles["route-label"]}
              onSelect={handleItemSelect([key, keyRouteMap[key]])}
              key={key}
            >
              {`${route.length}-node route`}
            </ActionList.Item>
          );
        })}
        <ActionList.Divider />
        <div className={styles["download-control"]}>
          <Button
            sx={baseButtonStyles}
            onClick={handleDownload}
            className={commonStyles["button"]}
            trailingIcon={DownloadIcon}
          >
            Download
          </Button>
        </div>
      </ActionList>
    </Dialog>
  );
};

export default DownloadDialog;
