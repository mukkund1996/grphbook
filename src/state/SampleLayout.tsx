import { Node, Edge } from "reactflow";
import { NoteBook } from "../notebook/NoteBook";
import { importNotebook } from "../notebook/importNotebook";

export const generateSampleLayout = (): {
  nodes: Array<Node>;
  edges: Array<Edge>;
} => {
  const initialNotebook: NoteBook = {
    cells: [
      {
        cell_type: "code",
        execution_count: null,
        metadata: {},
        outputs: [],
        source: ['print("hello world!")', 'print("Another Line!")'],
      },
      {
        cell_type: "markdown",
        metadata: {},
        source: [
          "## Hello there",
          "- Hey there\n",
          "[Link](https://google.com)",
        ],
      },
    ],
    metadata: {
      language_info: {
        name: "python",
      },
    },
    nbformat: 4,
    nbformat_minor: 2,
  };

  return importNotebook(initialNotebook);
};
