function SequenceActor({ data, color = "bg-green-500" }) {
  const barColor = data?.color || color;
  return (
    <div>
      <div className="relative h-6 w-40 items-center flex">
        <div className={`h-6 w-[6px] ${barColor} rounded-lg`}></div>
        <p className="font-bold text-gray-900 m-0 mt-0 ml-4">{data.label ?? "Actor"}</p>
      </div>
      <div className="relative bg-gray-300 left-[2px] w-[2px] rounded" style={{ height: data.height }}></div>
    </div>
  );
}

export default SequenceActor;
