import { Dispatch, SetStateAction, createContext, useState } from "react";

type ApiContextType = {
  apiKey: string | null;
  setApiKey: Dispatch<SetStateAction<string | null>>;
};

type ApiContextPropsType = {
  children: JSX.Element | JSX.Element[];
};

export const ApiContext = createContext<ApiContextType>({} as ApiContextType);

export const ApiContextProvider = ({ children }: ApiContextPropsType) => {
  const [apiKey, setApiKey] = useState(
    process.env.REACT_APP_OPENAI_API_KEY || null,
  );

  return (
    <ApiContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiContext.Provider>
  );
};
