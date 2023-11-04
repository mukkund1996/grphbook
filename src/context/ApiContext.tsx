import { createContext } from "react";

export type ApiContextType = string | undefined;

export const ApiContext = createContext<ApiContextType>(
  process.env.REACT_APP_OPENAI_API_KEY,
);
