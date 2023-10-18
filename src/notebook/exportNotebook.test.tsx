import {CELL_PREFIX} from "../utils/generateId";
import {GrphBookNode, NoteBook} from "./NoteBook";
import {exportNotebook, identifyWorkflows} from "./exportNotebook";

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

  it("should return unique paths given edges", () => {
    const nodes: Array<GrphBookNode> = [
      {
        id: "sample_1",
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
        id: "sample_2",
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
        id: "sample_3",
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
      {
        id: "sample_4",
        type: CELL_PREFIX.DESCRIPTION_CELL_PREFIX,
        position: {
          x: 500,
          y: 600,
        },
        data: {
          content: "## Hello there",
          order: 3,
        },
      },
      {
        id: "sample_5",
        type: CELL_PREFIX.DESCRIPTION_CELL_PREFIX,
        position: {
          x: 500,
          y: 600,
        },
        data: {
          content: "## Hello there",
          order: 5,
        },
      },
    ];
    const edges = [
      {
        id: "edge_1",
        source: "sample_1",
        target: "sample_2",
      },
      {
        id: "edge_2",
        source: "sample_2",
        target: "sample_3",
      },
      {
        id: "edge_2",
        source: "sample_3",
        target: "sample_5",
      },
      {
        id: "edge_3",
        source: "sample_2",
        target: "sample_4",
      },
    ];

    const generatedRoutes = identifyWorkflows(edges, nodes);
    const expectedRoutes = [
      [nodes[0], nodes[1], nodes[3]],
      [nodes[0], nodes[1], nodes[2], nodes[4]],
    ];
    expect(generatedRoutes).toEqual(expectedRoutes);
  });
});
