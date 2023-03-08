import React from "react";

const ProShowChip = ({ icon, text, className = '' }) => {
  return (
    <div className={`flex justify-center items-center py-2 pl-2 pr-4 bg-none rounded-4xl text-xs space-x-1 place-items-start font-secondary border border-[#FFFFFF] border transition-all text-white gilroyfontlight font-semibold ` + className}>
      <span className='p-0.5'>
        {React.isValidElement(icon) ? icon : <img src={icon} alt="" />}
      </span>
      <p style={{ lineHeight: 1.2, fontWeight: 'bold' }}>{text}</p>
    </div>
  );
}

export default ProShowChip;
