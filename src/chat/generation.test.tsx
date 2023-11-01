import { GptSingleResponse, parseResponse } from "./generation";

describe("tests the chat parsing", () => {
  it("should correctly parse the code and the description with ```python delimiters.", () => {
    const testResponse = [
      "Here is the python code: ",
      "```python",
      'print("Hello world")',
      "```",
      "",
      "Description: A simple hello world program.",
    ].join("\n");
    const expectedResponse: GptSingleResponse = {
      code: 'print("Hello world")',
      description: "A simple hello world program.",
    };
    expect(parseResponse(testResponse)).toEqual(expectedResponse);
  });

  it("should correctly parse the code and the description without delimiters without ```python delimiters.", () => {
    const testResponse = [
      "Here is the python code: ",
      "```",
      'print("Hello world")',
      "```",
      "",
      "Description: A simple hello world program.",
    ].join("\n");
    const expectedResponse: GptSingleResponse = {
      code: 'print("Hello world")',
      description: "A simple hello world program.",
    };
    expect(parseResponse(testResponse)).toEqual(expectedResponse);
  });

  it("should correctly parse the code and the description without delimiters with incorrect delimiters", () => {
    const testResponse = [
      "Here is the python code: ",
      "Description: A simple hello world program.",
    ].join("\n");
    const expectedResponse: GptSingleResponse = {
      code: "",
      description: "A simple hello world program.",
    };
    expect(parseResponse(testResponse)).toEqual(expectedResponse);
  });
});
