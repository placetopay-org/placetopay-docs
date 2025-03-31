import { Handle, Position, useEdges } from "reactflow";

function SequenceAction({ id, data }) {
  const barColor = data?.color || "bg-green-500";
  const edges = useEdges(); 
  const targetPosition = data.isReturned ? Position.Right : Position.Left;
  const sourcePosition = data.isReturned ? Position.Left : Position.Right;

  const isHandleConnected = (handleId, handleType) => {
    return edges.some(edge => 
      (handleType === 'source' && edge.source === id && edge.sourceHandle === handleId) ||
      (handleType === 'target' && edge.target === id && edge.targetHandle === handleId)
    );
  };

  return (
    <div className="h-16 w-[6px]">
      <div className={`absolute inset-0 ${barColor} rounded-lg`}>
        <Handle
          id="default_target"
          type="target"
          position={targetPosition}
          className={`!bg-primary-500 ${
            !isHandleConnected("default_target", "target") ? "opacity-0" : ""
          }`}
        />

        <Handle
          id="default_source"
          type="source"
          position={sourcePosition}
          className={`!bg-primary-500 ${
            !isHandleConnected("default_source", "source") ? "opacity-0" : ""
          }`}
        />

        <Handle
          id="source_self_action"
          type="source"
          position={Position.Left}
          className={`!bg-primary-500 ${
            !isHandleConnected("source_self_action", "source") ? "opacity-0" : ""
          }`}
        />

        <Handle
          id="target_self_action"
          type="target"
          position={Position.Right}
          className={`!bg-primary-500 ${
            !isHandleConnected("target_self_action", "target") ? "opacity-0" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default SequenceAction;