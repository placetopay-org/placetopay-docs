import { Handle, Position } from "reactflow";

function SequenceAction({ data }) {
  const barColor = data?.color || "bg-green-500";

  const targetPosition = data.isBack ? Position.Right : Position.Left;
  const sourcePosition = data.isBack ? Position.Left : Position.Right;

  return (
    <div className="h-16 w-[6px]">
      <div className={`absolute inset-0 ${barColor} rounded-lg`}>
        <Handle
          id="default_target"
          type="target"
          position={targetPosition}
          className=" !bg-primary-500"
        />
        <Handle
          id="default_source"
          type="source"
          position={sourcePosition}
          className=" !bg-primary-500"
        />
        <Handle
          id="source_self_action"
          type="source"
          position={Position.Left}
          className=" !bg-primary-500"
        />
        <Handle
          id="target_self_action"
          type="target"
          position={Position.Right}
          className=" !bg-primary-500"
        />
      </div>
    </div>
  );
}

export default SequenceAction;