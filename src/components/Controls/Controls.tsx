import {ControlButton, Controls} from "reactflow";
import {controlDiv, controlButtons} from "./Controls.styles";
import {DiffAddedIcon, PlayIcon} from "@primer/octicons-react";

const CustomControl: React.FC = () => {
  return (
    <Controls style={controlDiv} showZoom={false} showFitView={false} showInteractive={false}>
      <ControlButton style={controlButtons}>
        <DiffAddedIcon size={16} />
      </ControlButton>
      <ControlButton style={controlButtons}>
        <PlayIcon size={16} />
      </ControlButton>
    </Controls>
  );
};

export default CustomControl;
