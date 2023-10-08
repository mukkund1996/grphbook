import {useCallback, useMemo, useState} from "react";
import {
  Edge,
  MiniMap,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import CodingNode from "../components/CodingNode/CodingNode";
import {INITIAL_NODES} from "../state/InitialState";
import DescriptionNode from "../components/DescriptionNode/DescriptionNode";
import CustomControl from "../components/Controls/Controls";

const Flow: React.FC = () => {
  const nodeTypes = useMemo(() => ({codingCell: CodingNode, descriptionCell: DescriptionNode}), []);

  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange: OnNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(connection => setEdges(eds => addEdge(connection, eds)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <MiniMap />
      <CustomControl />
    </ReactFlow>
  );
};

export default Flow;
