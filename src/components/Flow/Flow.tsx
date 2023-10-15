import {useCallback, useMemo, useState} from "react";
import {
  Connection,
  Edge,
  MiniMap,
  NodeTypes,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import "reactflow/dist/style.css";

import CodingNode from "../CodingNode/CodingNode";
import DescriptionNode from "../DescriptionNode/DescriptionNode";
import CustomControl from "../Controls/Controls";
import { INITIAL_EDGES, INITIAL_NODES } from "../../state/InitialState";
import { GrphBookNode } from "../../notebook/NoteBook";

const nodeTypes: NodeTypes = {codingCell: CodingNode, descriptionCell: DescriptionNode};

const Flow: React.FC = () => {

  const [nodes, setNodes] = useState<Array<GrphBookNode>>(INITIAL_NODES);
  const [edges, setEdges] = useState<Array<Edge>>(INITIAL_EDGES);

  const onNodesChange: OnNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback((params: Edge | Connection) => setEdges(els => addEdge(params, els)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <MiniMap />
      <CustomControl />
    </ReactFlow>
  );
};

export default Flow;