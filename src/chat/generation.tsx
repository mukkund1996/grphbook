import OpenAI from "openai";

import { CHAT_PARAMS, DESCRIPTION_DELIMITER } from "./config";

export type GptSingleResponse = {
  description: string | null;
  code: string | null;
};

export const generateCode = async (
  prompt: string,
  includeDescription: boolean,
): Promise<GptSingleResponse | null> => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const systemMessage = {
    role: "system",
    content:
      "You return only concise python code for the given prompt. Do not return anything other than the code snippet.",
  };
  if (includeDescription) {
    systemMessage.content =
      'You return only python code and a short description. The response should first contain the code and then the description. Start description with keyword "Description: ".';
  }

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
    ...CHAT_PARAMS,
  });
  const responseMsg = response["choices"][0]["message"]["content"];
  if (includeDescription) {
    return parseResponse(responseMsg);
  } else {
    return { code: responseMsg, description: null };
  }
};

export const parseResponse = (response: string | null): GptSingleResponse => {
  const emptyResponse = { code: null, description: null };
  if (!response) {
    return emptyResponse;
  }
  const splitString = response.split(DESCRIPTION_DELIMITER);
  // Return an empty response
  if (splitString.length === 1) {
    return emptyResponse;
  }
  const descriptionString = splitString[1];
  let codeString = "";
  const matchedCodeSnippets = _findContentInBackticks(splitString[0]);
  if (matchedCodeSnippets.length) {
    codeString = matchedCodeSnippets[0];
  }
  return { code: codeString, description: descriptionString };
};

const _findContentInBackticks = (inputString: string): Array<string> => {
  const backtickRegex = /```(?:python)?\s*([\s\S]*?)\s*```/g; // Regex to find content within "```"
  const matches: Array<string> = [];
  let match;

  while ((match = backtickRegex.exec(inputString)) !== null) {
    matches.push(match[1]);
  }

  return matches;
};
