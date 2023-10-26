import { BoldIcon, CodeReviewIcon, ZapIcon } from "@primer/octicons-react";
import { Button } from "@primer/react";

import styles from "./NodeControls.module.css";
import commonStyles from "../Styles/common.module.css";
import { useControls } from "../../hooks/useControls";
import { buttonSx } from "../Styles/common.styles";

type NodeControlProps = {
  auxillaryButton?: React.FC;
};

export const NodeControls: React.FC<NodeControlProps> = (props) => {
  const { auxillaryButton: AuxillaryButton } = props;
  const { addCodingNode, addDescriptionNode, addGeneratorNode } = useControls();
  return (
    <div className={styles["control"]}>
      {AuxillaryButton ? <AuxillaryButton /> : null}
      <Button
        sx={buttonSx}
        className={commonStyles["button"]}
        onClick={addCodingNode}
      >
        <CodeReviewIcon size={16} />
      </Button>
      <Button
        sx={buttonSx}
        className={commonStyles["button"]}
        onClick={addDescriptionNode}
      >
        <BoldIcon size={16} />
      </Button>
      <Button
        sx={buttonSx}
        className={commonStyles["button"]}
        onClick={addGeneratorNode}
      >
        <ZapIcon size={16} />
      </Button>
    </div>
  );
};
