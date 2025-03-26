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

export default SequenceActor;
