import uuidv4 from "uuidv4";
import { GrphBookNode } from "../../../notebook/NoteBook";

export const generateRouteKey = (): string => `route_${uuidv4()}`;

export const generateLabel = (route: Array<GrphBookNode>): string =>
  `${route.length}-node route`;
