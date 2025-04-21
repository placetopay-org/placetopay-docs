function SequenceActor({ data }) {
  return (
    <div>
      <p className="relative -left-[55%] font-bold text-gray-900 shadow-sm bg-white border border-gray-200 m-0 mt-0 ml-4 p-1 rounded-lg">{data.label ?? "Actor"}</p>
      <div className="relative bg-gray-300 left-[2px] w-[2px] rounded" style={{ height: data.height }}></div>
    </div>
  );
}

export default SequenceActor;
