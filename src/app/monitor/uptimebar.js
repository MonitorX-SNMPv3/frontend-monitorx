export const UptimeBar = ({ data }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-[2px]">
        {data.map((item, index) => (
          <div key={index} className="relative group">
            <div
            className={`h-5 w-[5px] rounded transition-all duration-300 ${
              item.status === "UP" ? "bg-green-500" : "bg-red-500"
            }`}
            ></div>
            {/* Tooltip */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-[52px] w-[200px] bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 text-start">
            <div className="flex flex-col">
              <p>Uptime: {item.timeRange}</p>
              <p>{item.status} - {item.responseTime}</p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-5 h-5 
              border-l-10 border-l-transparent 
              border-r-10 border-r-transparent 
              border-t-10 border-t-black"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};