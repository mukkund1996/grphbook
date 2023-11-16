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
import GenerateNode from "../GenerateNode/GenerateNode";

import "reactflow/dist/style.css";
import styles from "./Flow.module.css";

const nodeTypes: NodeTypes = {
  codingCell: CodingNode,
  descriptionCell: DescriptionNode,
  generatorCell: GenerateNode,
};

const Flow: React.FC = () => {
  const [nodes, setNodes] = useState<Array<Node>>([]);
  const [edges, setEdges] = useState<Array<Edge>>([]);

  const onNodesChange: OnNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    changes => {
      setEdges(eds => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      // Do not allow edges having the same target from different sources
      const newEdgeTarget = params.target;
      const multipleTargetEdgeExists = Boolean(
        edges.find(edge => edge.target === newEdgeTarget),
      );
      if (!multipleTargetEdgeExists) {
        setEdges(els => addEdge(params, els));
      }
    },
    [edges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      deleteKeyCode={null}
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
