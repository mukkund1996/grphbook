import OpenAI from "openai";

import { chatParams } from "./config";

export const generateCode = async (prompt: string): Promise<string | null> => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You return only concise python code for the given prompt. Do not return anything other than the code snippet.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    ...chatParams,
  });

  const responseCode = response["choices"][0]["message"]["content"];
  return responseCode;
};
