import { Handle, Position } from 'reactflow';

function SequenceActor({ data }) {
  return (
  <div className="SequenceDiagramActorNode Box-root rounded-l" style={{height: '400px'}}>
    <div className="SequenceDiagramActorNode-heading Box-root w-40">
    <div className="absolute left-0 top-0 h-6 w-[6px] bg-green-500 rounded-lg"></div>
    <div className="w-fit h-fit pl-4">
    <p className="font-bold text-gray-900 mt-0">{data.label ?? "Actor"}</p>
    </div>
    </div>
  </div>

  );
}

export default SequenceActor;
