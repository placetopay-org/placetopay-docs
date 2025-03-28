import {Tag} from "@/components/Tag";
import {Handle, Position} from "reactflow";
import clsx from "clsx";

export function TagNode({data}) {
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
            {targetHandle && <Handle type="target" position={targetPosition} className="w-16 !bg-primary-500"/>}
            {sourceHandle && <Handle type="source" position={sourcePosition} className="w-16 !bg-primary-500"/>}
        </div>
    );
}

export function CustomNode({data}) {
    const targetHandle = data.targetHandle ?? true;
    const sourceHandle = data.sourceHandle ?? true;
    const targetPosition = data.isBack 
    ? Position.Right 
    : data.targetPosition ?? Position.Left;
  
  const sourcePosition = data.isBack 
    ? Position.Left 
    : data.sourcePosition ?? Position.Right;

    return (
        <div
            className={clsx("px-3 py-2 shadow-sm bg-white border border-gray-200", data.rounded ? 'rounded-full' : 'rounded-md')}>
            <div className="flex">
                <div 
                className="text-gray-700 text-sm" 
                dangerouslySetInnerHTML={{ __html:data.label }} />
            </div>

            {targetHandle && <Handle type="target" position={targetPosition} className="w-16 !bg-primary-500"/>}
            {sourceHandle && <Handle type="source" position={sourcePosition} className="w-16 !bg-primary-500"/>}
        </div>
    );
}

function SequenceActor({ data, color = "bg-green-500" }) {
    const barColor = data?.color || color;
    return (
    <div className="SequenceDiagramActorNode Box-root rounded-l" style={{height: '400px'}}>
      <div className="SequenceDiagramActorNode-heading Box-root w-40">
      <div className={`absolute left-0 top-0 h-6 w-[6px] ${barColor} rounded-lg`}></div>
      <div className="w-fit h-fit pl-4">
      <p className="font-bold text-gray-900 mt-0">{data.label ?? "Actor"}</p>
      </div>
      </div>
    </div>
  
    );
  }

  function SequenceAction({ data, color = "bg-green-500" }) {
    const barColor = data?.color || color;

    const targetPosition = data.isBack ? Position.Right : Position.Left;
    const sourcePosition = data.isBack ? Position.Left : Position.Right;

    return (
        <div className="relative h-16 w-[6px]">
          <div className={`absolute inset-0 ${barColor} rounded-lg`}>
          <Handle 
            type="target" 
            position={targetPosition} 
            className="!w-3 !h-3 !bg-primary-500"
          />
          <Handle 
            type="source" 
            position={sourcePosition} 
            className="!w-3 !h-3 !bg-primary-500"
          />
          </div>
        </div>
      );
  }

export const nodeTypes = {
    action: CustomNode,
    tag: TagNode,
    actor: SequenceActor,
    nodeAction: SequenceAction
};