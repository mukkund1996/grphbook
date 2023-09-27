import {useMemo} from "react";
import {MiniMap, ReactFlow} from "reactflow";

import CodingNode from "./components/CodingNode/CodingNode";
import {INITIAL_NODES} from "./state/InitialNodes";

const App: React.FC = () => {
  const nodeTypes = useMemo(() => ({nodeCell: CodingNode}), []);

  return (
    <div style={{height: "100%"}}>
      <ReactFlow nodes={INITIAL_NODES} nodeTypes={nodeTypes}>
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
