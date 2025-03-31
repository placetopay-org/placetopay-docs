import { Tag } from "@/components/Tag";
import { Handle, Position } from "reactflow";
import clsx from "clsx";

import SequenceActor from "@/components/react-flow/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceAction";

export function TagNode({ data }) {
  const targetHandle = data.targetHandle ?? true;
  const sourceHandle = data.sourceHandle ?? true;
  const targetPosition = data.targetPosition ?? Position.Left;
  const sourcePosition = data.sourcePosition ?? Position.Right;

  return (
    <div className="bg-white py-2 px-3 border rounded-lg">
      <div className="flex flex-col items-center space-y-1">
        <span className="font-medium text-sm">{data.label}</span>
        <Tag color={data.tagColor}>{data.tagLabel}</Tag>
      </div>
      {targetHandle && <Handle type="target" position={targetPosition} className="w-16 !bg-primary-500" />}
      {sourceHandle && <Handle type="source" position={sourcePosition} className="w-16 !bg-primary-500" />}
    </div>
  );
}

export function CustomAction({ data }) {
  const targetHandle = data.targetHandle ?? true;
  const sourceHandle = data.sourceHandle ?? true;

  let targetPosition = data.isBack ? Position.Right : data.targetPosition ?? Position.Left;
  let sourcePosition = data.isBack
    ? Position.Left
    : data.sourcePosition ?? Position.Right;

  if(Boolean(data.selfAction)){
    targetPosition = Position.Top;
    sourcePosition = Position.Bottom;
  }

  return (
    <div
      className={clsx("px-3 py-2 shadow-sm bg-white border border-gray-200", data.rounded ? 'rounded-full' : 'rounded-md')}>
      <div className="flex">
        <div
          className="text-gray-700 text-sm"
          dangerouslySetInnerHTML={{ __html: data.label }} />
      </div>

      {targetHandle && <Handle type="target" position={targetPosition} className=" !bg-primary-500" />}
      {sourceHandle && <Handle type="source" position={sourcePosition} className=" !bg-primary-500" />}
    </div>
  );
}

export const nodeTypes = {
  action: CustomAction,
  tag: TagNode,
  actor: SequenceActor,
  actionPoint: SequenceAction
};