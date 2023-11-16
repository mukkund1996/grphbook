import {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import { ApiContext } from "../context/ApiContext";

export const useApi = () => {
  const { apiKey, setApiKey } = useContext(ApiContext);
  const [localInput, setLocalInput] = useState<string>("");

  const apiInputHandler: ChangeEventHandler<HTMLInputElement> = event => {
    const value = event.target.value;
    setLocalInput(value);
  };

  const apiSubmitHandler: MouseEventHandler<HTMLButtonElement> = _event => {
    if (localInput) {
      setApiKey(localInput);
    }
  };

  return {
    apiKey,
    localInput,
    setLocalInput,
    apiInputHandler,
    setApiKey,
    apiSubmitHandler,
  };
};
