import {useMemo} from "react";
import {Jupyter} from "@datalayer/jupyter-react";
import {MiniMap, ReactFlow} from "reactflow";

import NodeCell from "./components/NodeCell/NodeCell";
import { store } from "./store/store";

function App() {
  const nodeTypes = useMemo(() => ({nodeCell: NodeCell}), []);

  const nodes = [{id: "node-1", type: "nodeCell", position: {x: 500, y: 300}, data: {value: 123}}];

  return (
    <div style={{height: "100%"}}>
      <Jupyter injectableStore={store}>{null}</Jupyter>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes}>
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
