import { ChangeEventHandler, MouseEventHandler } from "react";
import { PlayIcon, ZapIcon } from "@primer/octicons-react";
import { TextInput } from "@primer/react";

import styles from "./GeneratorInput.module.css";
import commonStyles from "../Styles/common.module.css";
import { borderStyles, inputStyles } from "../Styles/common.styles";

type GeneratorInputProps = {
  value: string;
  setValue: (value: string) => void;
  loading: boolean;
  handleGenerate: MouseEventHandler<HTMLButtonElement>;
};

export const GeneratorInput = (props: GeneratorInputProps) => {
  const inputHandler: ChangeEventHandler<HTMLInputElement> = event => {
    props.setValue(event.target.value);
  };

  return (
    <TextInput
      className={`${styles["input"]}`}
      sx={{ ...borderStyles, ...inputStyles }}
      leadingVisual={ZapIcon}
      aria-label="Generate Blocks"
      name="generate-input"
      placeholder="What do you wanna create?"
      value={props.value}
      onChange={inputHandler}
      loading={props.loading}
      trailingAction={
        <TextInput.Action
          onClick={props.handleGenerate}
          icon={PlayIcon}
          aria-label="Generate Code"
          className={`${commonStyles["button"]}`}
          disabled={props.loading}
        />
      }
    />
  );
};
