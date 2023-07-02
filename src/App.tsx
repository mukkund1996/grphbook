// App.tsx
import { Notebook, Jupyter } from "@datalayer/jupyter-react";

function App() {
  return (
    <Jupyter>
      <Notebook path="ping.ipynb" />
    </Jupyter>
  )
}

export default App;