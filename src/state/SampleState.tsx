import { NoteBook } from "../notebook/NoteBook";
import { importNotebook } from "../notebook/importNotebook";

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
      source: ["## Hello there", "- Hey there\n", "[Link](https://google.com)"],
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

const { nodes: INITIAL_NODES, edges: INITIAL_EDGES } =
  importNotebook(initialNotebook);

export { INITIAL_NODES, INITIAL_EDGES };
