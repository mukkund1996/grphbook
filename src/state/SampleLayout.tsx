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
        source: ["# You can enter python code here", 'print("Hello World!")'],
      },
      {
        cell_type: "markdown",
        metadata: {},
        source: [
          "## You can add description",
          "### by clicking the edit button\n",
          "- Through simple Markdown format\n",
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
