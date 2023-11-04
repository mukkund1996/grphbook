import Flow from "./components/Flow/Flow";
import { ApiContextProvider } from "./components/context/ApiContext";
import "./styles.css";

export default function App() {
  return (
    <ApiContextProvider>
      <div className="app">
        <Flow />
      </div>
    </ApiContextProvider>
  );
}
