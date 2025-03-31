function Line({ data }) {
  return (
    <div style={{ 
      width: data.width 
    }}>
      <div className="flex items-center w-full">
        <span className="font-medium">{data.label ?? "Line"}</span>
        <div className="flex-grow border-b-2 border-dashed border-gray-300 ml-2"></div>
      </div>
    </div>
  );
}
  
  export default Line;
  