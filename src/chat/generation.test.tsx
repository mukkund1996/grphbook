import { GptSingleResponse, parseResponseWithDescription } from "./generation";

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
    expect(parseResponseWithDescription(testResponse)).toEqual(
      expectedResponse,
    );
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
    expect(parseResponseWithDescription(testResponse)).toEqual(
      expectedResponse,
    );
  });

  it("should correctly parse the code and the description given a response without Description: delimiter.", () => {
    const testResponse = [
      "Sure! Here's an example of a function that plots two arrays of numbers using Python's matplotlib library:",
      "\n",
      "Code: ",
      "\n",
      "```python",
      "import matplotlib.pyplot as plt",
      "def plot_arrays(x, y):",
      "    plt.plot(x, y)",
      "    plt.xlabel('X values')",
      "    plt.ylabel('Y values')",
      "    plt.title('Plot of two arrays')",
      "    plt.show()",
      "```",
      "\n",
      "Description: The `plot_arrays` function takes in two arrays `x` and `y` as inputs and uses the `plt.plot()` function from the matplotlib library to create a line plot of the values in the arrays. It also adds labels to the x and y axes and sets a title for the plot. Finally, `plt.show()` is called to display the plot.",
    ].join("\n");
    const expectedResponse: GptSingleResponse = {
      code:
        "import matplotlib.pyplot as plt\n" +
        "def plot_arrays(x, y):\n" +
        "    plt.plot(x, y)\n" +
        "    plt.xlabel('X values')\n" +
        "    plt.ylabel('Y values')\n" +
        "    plt.title('Plot of two arrays')\n" +
        "    plt.show()",
      description:
        "The `plot_arrays` function takes in two arrays `x` and `y` as inputs and uses the `plt.plot()` function from the matplotlib library to create a line plot of the values in the arrays. It also adds labels to the x and y axes and sets a title for the plot. Finally, `plt.show()` is called to display the plot.",
    };
    expect(parseResponseWithDescription(testResponse)).toEqual(
      expectedResponse,
    );
  });

  it("should correctly parse the code and the description - 2", () => {
    const testResponse =
      "import matplotlib.pyplot as plt\n\ndef generate_plot(x, y):\n    plt.plot(x, y)\n    plt.show()\n\n# Example usage:\nx_values = [1, 2, 3, 4, 5]\ny_values = [10, 8, 6, 4, 2]\n\ngenerate_plot(x_values, y_values)\nDescription: The code above is a function that takes in two arrays of numbers, x and y, and generates a plot using the matplotlib library in Python. It plots the values from the x array on the x-axis and the values from the y array on the y-axis. The resulting plot is displayed using plt.show().";
    const expectedResponse: GptSingleResponse = {
      code: "import matplotlib.pyplot as plt\n\ndef generate_plot(x, y):\n    plt.plot(x, y)\n    plt.show()\n\n# Example usage:\nx_values = [1, 2, 3, 4, 5]\ny_values = [10, 8, 6, 4, 2]\n\ngenerate_plot(x_values, y_values)\n",
      description:
        "The code above is a function that takes in two arrays of numbers, x and y, and generates a plot using the matplotlib library in Python. It plots the values from the x array on the x-axis and the values from the y array on the y-axis. The resulting plot is displayed using plt.show().",
    };
    expect(parseResponseWithDescription(testResponse)).toEqual(
      expectedResponse,
    );
  });
});
