import {useMemo} from "react";
import {MiniMap, ReactFlow} from "reactflow";

import NodeCell from "./components/NodeCell/NodeCell";

function App() {
  const nodeTypes = useMemo(() => ({nodeCell: NodeCell}), []);

  const nodes = [{id: "node-1", type: "nodeCell", position: {x: 500, y: 300}, data: {value: 123}}];

  return (
    <div style={{height: "100%"}}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes}>
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
