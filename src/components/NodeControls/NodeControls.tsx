import { BoldIcon, CodeReviewIcon, ZapIcon } from "@primer/octicons-react";
import { Button } from "@primer/react";

import styles from "./NodeControls.module.css";
import commonStyles from "../Styles/common.module.css";
import { useControls } from "../../hooks/useControls";
import { baseButtonStyles } from "../Styles/common.styles";
import { FC } from "react";

type NodeControlProps = {
  leadingButton?: FC;
  trailingButton?: FC;
  Icon?: JSX.Element | JSX.Element[];
};

export const NodeControls: FC<NodeControlProps> = props => {
  const {
    leadingButton: LeadingButton,
    trailingButton: TrailingButton,
    Icon,
  } = props;
  const { addCodingNode, addDescriptionNode, addGeneratorNode } = useControls();
  return (
    <div className={styles["control"]}>
      {LeadingButton ? <LeadingButton /> : null}
      <Button
        sx={baseButtonStyles}
        className={commonStyles["button"]}
        onClick={addCodingNode}
      >
        <CodeReviewIcon size={16} />
      </Button>
      <Button
        sx={baseButtonStyles}
        className={commonStyles["button"]}
        onClick={addDescriptionNode}
      >
        <BoldIcon size={16} />
      </Button>
      <Button
        sx={baseButtonStyles}
        className={commonStyles["button"]}
        onClick={addGeneratorNode}
      >
        <ZapIcon size={16} />
      </Button>
      {TrailingButton ? <TrailingButton /> : null}
      {Icon}
    </div>
  );
};
