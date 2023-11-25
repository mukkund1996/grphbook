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
  const [hasApi, setHasApi] = useState<boolean>(!!apiKey);

  const apiInputHandler: ChangeEventHandler<HTMLInputElement> = event => {
    setHasApi(false);
    const value = event.target.value;
    setLocalInput(value);
  };

  const apiSubmitHandler: MouseEventHandler<HTMLButtonElement> = _event => {
    if (localInput) {
      setApiKey(localInput);
      setHasApi(true);
    }
  };

  return {
    apiKey,
    localInput,
    setLocalInput,
    apiInputHandler,
    setApiKey,
    apiSubmitHandler,
    hasApi,
  };
};
