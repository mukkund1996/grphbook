import {ReactFlowInstance} from "reactflow";
import {GrphBookNode} from "../notebook/NoteBook";
import {CodingNodeData} from "../components/CodingNode/CodingNode";
import {DescriptionNodeData} from "../components/DescriptionNode/DescriptionNode";

export const getSelectedNode = (flowInstance: ReactFlowInstance<any, any>): GrphBookNode =>
  flowInstance.getNodes().filter(node => node.selected)[0] || null;

export const getCurrentNode = (
  flowInstance: ReactFlowInstance,
  data: CodingNodeData | DescriptionNodeData
): GrphBookNode => flowInstance.getNodes().filter(node => node.data.order === data.order)[0];
