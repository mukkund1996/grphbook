import {Jupyter} from "@datalayer/jupyter-react";
import NodeCell from "./components/NodeCell/NodeCell";

function App() {
  return (
    <Jupyter>
      <NodeCell />
    </Jupyter>
  );
}

export default App;
