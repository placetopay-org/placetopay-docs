import { Handle, NodeResizer, Position } from "reactflow";
import clsx from "clsx";

function SequenceAction({ data }) {
    return (
        <div className="relative h-16 w-[6px]"> {/* Contenedor con dimensiones fijas */}
          <div className="absolute inset-0 bg-green-500 rounded-lg">
          <Handle 
            type="target" 
            position={Position.Left} 
            className="!w-3 !h-3 !bg-primary-500"
          />
          <Handle 
            type="source" 
            position={Position.Right} 
            className="!w-3 !h-3 !bg-primary-500"
          />
          </div>
        </div>
      );
  }
  
  export default SequenceAction;