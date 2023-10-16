import {CELL_PREFIX} from "../utils/generateId";
import {GrphBookNode, NoteBook} from "./NoteBook";
import {exportNotebook} from "./exportNotebook";

describe("tests the export", () => {
  it("should return the correct notebook given a list of nodes", () => {
    const nodes: Array<GrphBookNode> = [
      {
        id: "1",
        type: CELL_PREFIX.CODING_CELL_PREFIX,
        position: {
          x: 500,
          y: 200,
        },
        data: {
          code: 'print("hello world!")\nprint("Another Line!")',
          order: 0,
        },
      },
      {
        id: "2",
        type: CELL_PREFIX.CODING_CELL_PREFIX,
        position: {
          x: 500,
          y: 400,
        },
        data: {
          code: "",
          order: 1,
        },
      },
      {
        id: "3",
        type: CELL_PREFIX.DESCRIPTION_CELL_PREFIX,
        position: {
          x: 500,
          y: 600,
        },
        data: {
          content: "## Hello there",
          order: 2,
        },
      },
    ];
    const expectedNotebook: NoteBook = {
      cells: [
        {
          cell_type: "code",
          execution_count: null,
          metadata: {},
          outputs: [],
          source: ['print("hello world!")', 'print("Another Line!")'],
        },
        {
          cell_type: "code",
          execution_count: null,
          metadata: {},
          outputs: [],
          source: [],
        },
        {
          cell_type: "markdown",
          metadata: {},
          source: ["## Hello there"],
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
    const exportedNotebook = exportNotebook(nodes);
    expect(exportedNotebook).toEqual(expectedNotebook);
  });
});
