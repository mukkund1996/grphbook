import {Edge} from "reactflow";
import {generateEdgesFromNodes, importNotebook} from "../notebook/importNotebook";
import {CELL_PREFIX} from "./generateId";
import { GrphBookNode, NoteBook } from "../notebook/NoteBook";

describe("Tests importNotebook functions", () => {
  it("should generate edges when a list of nodes are specified", () => {
    const nodes: Array<GrphBookNode> = [
      {
        id: "sample_1",
        type: CELL_PREFIX.CODING_CELL_PREFIX,
        position: {
          x: 500,
          y: 200,
        },
        data: {
          code: "print(hello)",
          order: 1,
        },
      },
      {
        id: "sample_2",
        type: CELL_PREFIX.DESCRIPTION_CELL_PREFIX,
        position: {
          x: 500,
          y: 400,
        },
        data: {
          content: "Hello description",
          order: 2,
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
          content: "Hello description - 2",
          order: 3,
        },
      },
    ];

    const edges = generateEdgesFromNodes(nodes);
    const generatedIds = edges.map(edge => edge.id);
    const expectedEdges = [
      {
        id: generatedIds[0],
        source: "sample_1",
        target: "sample_2",
      },
      {
        id: generatedIds[1],
        source: "sample_2",
        target: "sample_3",
      },
    ];
    expect(edges).toEqual(expectedEdges);
  });

  it("should return empty list of edges when an empty list of nodes are provided", () => {
    const nodes: Array<GrphBookNode> = [];
    expect(generateEdgesFromNodes(nodes)).toEqual([]);
  });

  it("should produce the correct list of nodes and edges give a notebook input", () => {
    const testNotebook: NoteBook = {
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

    const {nodes, edges} = importNotebook(testNotebook);
    const expectedNodes: Array<GrphBookNode> = [
      {
        id: nodes[0].id,
        type: CELL_PREFIX.CODING_CELL_PREFIX,
        position: {
          x: 500,
          y: 100,
        },
        data: {
          code: 'print("hello world!")\nprint("Another Line!")',
          order: 0,
        },
      },
      {
        id: nodes[1].id,
        type: CELL_PREFIX.CODING_CELL_PREFIX,
        position: {
          x: 500,
          y: 200,
        },
        data: {
          code: "",
          order: 1,
        },
      },
      {
        id: nodes[2].id,
        type: CELL_PREFIX.DESCRIPTION_CELL_PREFIX,
        position: {
          x: 500,
          y: 300,
        },
        data: {
          content: "## Hello there",
          order: 2,
        },
      },
    ];
    const expectedEdges: Array<Edge> = [
      {id: `${nodes[0].id}_${nodes[1].id}`, source: nodes[0].id, target: nodes[1].id},
      {id: `${nodes[1].id}_${nodes[2].id}`, source: nodes[1].id, target: nodes[2].id},
    ];
    expect(nodes).toEqual(expectedNodes);
    expect(edges).toEqual(expectedEdges);
  });
});
