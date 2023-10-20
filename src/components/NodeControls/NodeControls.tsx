import {BoldIcon, CodeReviewIcon} from "@primer/octicons-react";
import {Button} from "@primer/react";

import styles from "./NodeControls.module.css";
import {useControls} from "../../hooks/useControls";

type NodeControlProps = {
  auxillaryButton?: React.FC;
};

export const NodeControls: React.FC<NodeControlProps> = props => {
  const {auxillaryButton: AuxillaryButton} = props;
  const {addCodingNode, addDescriptionNode} = useControls();
  return (
    <div className={styles["control"]}>
      {AuxillaryButton ? <AuxillaryButton /> : null}
      <Button variant="outline" onClick={addCodingNode}>
        <CodeReviewIcon size={16} />
      </Button>
      <Button variant="outline" onClick={addDescriptionNode}>
        <BoldIcon size={16} />
      </Button>
    </div>
  );
};
