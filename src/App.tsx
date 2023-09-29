import {useCallback, useMemo, useState} from "react";
import {
  Background,
  MiniMap,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import CodingNode from "./components/CodingNode/CodingNode";
import {INITIAL_EDGES, INITIAL_NODES} from "./state/InitialNodes";
import DescriptionNode from "./components/DescriptionNode/DescriptionNode";

const App: React.FC = () => {
  const nodeTypes = useMemo(() => ({codingCell: CodingNode, descriptionCell: DescriptionNode}), []);

  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState(INITIAL_EDGES);

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
    <div style={{height: "100%"}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default App;
