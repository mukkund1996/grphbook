import { Cell } from "@datalayer/jupyter-react";
import { Box } from "@primer/react";

const NodeCell: React.FC = () => {
  return (
    <Box>
      <Cell source={"print('Hello world!')"}/>
    </Box>
  );
};

export default NodeCell;
