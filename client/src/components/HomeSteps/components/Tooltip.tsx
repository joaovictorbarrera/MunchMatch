import React from "react";

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
};

const Tooltip: React.FC<TooltipProps> = ({ children, content , className}) => {
  return (
    <div className={"relative group inline-block "+className}>
      {children}
      <div className="absolute border-1 left-1/2 -translate-x-full bottom-1/2 mb-2 hidden group-hover:block px-2 py-1 bg-white text-black text-sm rounded-md whitespace-nowrap z-10">
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
