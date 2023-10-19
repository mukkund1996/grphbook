import styles from "./DownloadDialog.module.css";
import commonStyles from "../Styles/common.module.css";
import {NodeRoutes, exportNotebook} from "../../notebook/exportNotebook";
import {ActionList, Dialog} from "@primer/react";
import {DownloadIcon} from "@primer/octicons-react";
import {useCallback, useRef, useState} from "react";
import {GrphBookNode} from "../../notebook/NoteBook";
import uuidv4 from "uuidv4";
import {downloadTxtFile, generateLabel} from "../utils/download";

type DownloadOptionsProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  routes: NodeRoutes;
  anchorRef: React.MutableRefObject<null>;
};

const DownloadDialog: React.FC<DownloadOptionsProps> = (props: DownloadOptionsProps) => {
  const {open, setOpen, routes, anchorRef} = props;

  const handleClose = () => setOpen(false);

  const [selectedRoute, setSelectedRoute] = useState<Array<GrphBookNode>>([]);

  const handleItemSelect =
    (selectedRoute: Array<GrphBookNode>) =>
    (_event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>): void => {
      setSelectedRoute(selectedRoute);
    };

  const handleDownload = useCallback(
    (_event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>): void => {
      if (selectedRoute.length !== 0) {
        const notebook = exportNotebook(selectedRoute);
        const stringified = JSON.stringify(notebook);
        downloadTxtFile(stringified, `${generateLabel(selectedRoute)}.ipynb`);
      }
    },
    [selectedRoute]
  );

  return (
    <Dialog
      sx={{
        position: "fixed",
        left: 0,
        margin: "34vh 18%",
        border: "3px solid #f4f4f4",
        borderRadius: "5px",
        background: "#fff",
        padding: "0px 15px",
        width: "20em",
      }}
      returnFocusRef={anchorRef}
      isOpen={open}
      onDismiss={handleClose}
      aria-labelledby="header-id"
    >
      <Dialog.Header id="header-id">Select possible routes</Dialog.Header>
      <ActionList selectionVariant="single">
        {routes.map(route => (
          <ActionList.Item
            className={styles["route-label"]}
            onSelect={handleItemSelect(route)}
            key={`route_${uuidv4()}`}
          >
            {generateLabel(route)}
          </ActionList.Item>
        ))}
        <ActionList.Divider />
        <ActionList.Item className={styles["download-label"]} onSelect={handleDownload}>
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
