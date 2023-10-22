import { ZapIcon } from "@primer/octicons-react";
import { TextInput } from "@primer/react";

import styles from "./GeneratorInput.module.css";
import { borderStyles } from "../Styles/common.styles";

export const GeneratorInput: React.FC = () => {
  return (
    <TextInput
      className={`${styles["input"]}`}
      sx={borderStyles}
      leadingVisual={ZapIcon}
      aria-label="Generate Blocks"
      name="generate-input"
      placeholder="What do you wanna create?"
    />
  );
};
