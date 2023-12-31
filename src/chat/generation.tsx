import OpenAI from "openai";

import { CHAT_PARAMS, DESCRIPTION_DELIMITER } from "./config";

export type GptSingleResponse = {
  description: string | null;
  code: string | null;
};

export const generateDescription = async (
  prompt: string,
  apiKey: string,
): Promise<string> => {
  const openai = new OpenAI({
    apiKey: apiKey || "",
    dangerouslyAllowBrowser: true,
  });

  const systemMsgContent =
    'Provide a description for the given python code snippet. Do not include anything other than the description. Start with "The below code".';

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemMsgContent,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    ...CHAT_PARAMS,
  });
  return response["choices"][0]["message"]["content"] as string;
};

export const generateCode = async (
  prompt: string,
  includeDescription: boolean,
  apiKey: string | null,
): Promise<GptSingleResponse | null> => {
  const openai = new OpenAI({
    apiKey: apiKey || "",
    dangerouslyAllowBrowser: true,
  });

  let systemMsgContent =
    "You return only concise python code for the given prompt. Do not return anything other than the code snippet.";
  if (includeDescription) {
    systemMsgContent =
      'You return only python code and a short description. The response should first contain the code and then the description. Start description with keyword "Description: ".';
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemMsgContent,
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
    return parseResponseWithDescription(responseMsg);
  } else {
    return { code: responseMsg, description: null };
  }
};

export const parseResponseWithDescription = (
  response: string | null,
): GptSingleResponse => {
  const emptyResponse = { code: null, description: null };
  if (!response) {
    return emptyResponse;
  }
  const splitString = response.split(DESCRIPTION_DELIMITER);
  // Return an empty response
  if (splitString.length === 1) {
    return { code: splitString[0], description: null };
  }
  const descriptionString = splitString[1];
  let codeString = "";
  const matchedCodeSnippets = _findContentInBackticks(splitString[0]);
  if (matchedCodeSnippets.length) {
    codeString = matchedCodeSnippets[0];
  } else if (splitString[0] !== "") {
    codeString = splitString[0];
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
