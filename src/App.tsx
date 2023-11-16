import Flow from "./components/Flow/Flow";
import { ApiContextProvider } from "./context/ApiContext";
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
