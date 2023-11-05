import { useCallback, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  MiniMap,
  Node,
  NodeTypes,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import CodingNode from "../CodingNode/CodingNode";
import DescriptionNode from "../DescriptionNode/DescriptionNode";
import CustomControl from "../Controls/Controls";
import { INITIAL_EDGES, INITIAL_NODES } from "../../state/InitialState";
import GenerateNode from "../GenerateNode/GenerateNode";

import "reactflow/dist/style.css";
import styles from "./Flow.module.css";

const nodeTypes: NodeTypes = {
  codingCell: CodingNode,
  descriptionCell: DescriptionNode,
  generatorCell: GenerateNode,
};

const Flow: React.FC = () => {
  const [nodes, setNodes] = useState<Array<Node>>(INITIAL_NODES);
  const [edges, setEdges] = useState<Array<Edge>>(INITIAL_EDGES);

  const onNodesChange: OnNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges(els => addEdge(params, els)),
    [setEdges],
  );

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
      <Background
        id="1"
        gap={10}
        color="#f1f1f1"
        variant={BackgroundVariant.Lines}
      />
      <div className={styles["icon"]}>
        <span></span>
      </div>
    </ReactFlow>
  );
};

export default Flow;
