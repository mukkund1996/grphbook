import styles from "./DownloadDialog.module.css";
import { NodeRoutes } from "../../../notebook/exportNotebook";
import { ActionList, Dialog } from "@primer/react";
import { DownloadIcon } from "@primer/octicons-react";
import uuidv4 from "uuidv4";
import { generateLabel } from "../../utils/download";
import { dialogStyles } from "./DownloadDialog.styles";
import { useDownloadHandles } from "./DownloadDialog.hooks";

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
  const { availableRoutes, handleClose, handleItemSelect, handleDownload } =
    useDownloadHandles(props);

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
