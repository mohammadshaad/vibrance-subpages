import React from "react";

const Chip = ({ icon, text, color, className = '' }) => {
  return (
    <div className={`flex justify-center items-center py-2 pl-2 pr-3 bg-white rounded-4xl text-xs space-x-1 place-items-start font-secondary group-hover:border-[${color}] border-[#FFFFFF] border transition-all ` + className}>
      <span className='p-0.5'>
        {React.isValidElement(icon) ? icon : <img src={icon} alt="" />}
      </span>
      <p>{text}</p>
    </div>
  );
}

export default Chip;
