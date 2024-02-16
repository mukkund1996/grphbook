import { ActionList } from "@primer/react";
import { MouseEventHandler } from "react";
import IconPages from "../../Icons/IconPages";
import IconGraphOutline from "../../Icons/IconGraphOutline";

import commonStyles from "../../Styles/common.module.css";
import styles from "./StartupPrompt.module.css";

type StartupPromptProps = {
  handleBlankStart: MouseEventHandler;
  handleSampleLayoutStart: MouseEventHandler;
};

export const StartupPrompt = (props: StartupPromptProps) => {
  const { handleBlankStart, handleSampleLayoutStart } = props;
  return (
    <div className={`${styles["prompt-container"]} ${commonStyles["border"]}`}>
      <ActionList className={styles["prompt-items"]}>
        <ActionList.Item onClick={handleBlankStart}>
          <div data-test={"blank-start"} className={styles["prompt-selection"]}>
            <IconPages className={styles["icon"]} />
            <span>Start from blank</span>
          </div>
        </ActionList.Item>
        <ActionList.Item onClick={handleSampleLayoutStart}>
          <div
            data-test={"template-start"}
            className={styles["prompt-selection"]}
          >
            <IconGraphOutline className={styles["icon"]} />
            <span>Use a starting layout</span>
          </div>
        </ActionList.Item>
      </ActionList>
    </div>
  );
};
