import { AiFillCloseCircle } from 'react-icons/ai';

const FilterChip = ({ label, onDelete }) => {
  return (
    <div className='flex justify-center items-center py-2 pl-2 pr-3 rounded-4xl text-xs space-x-1 place-items-start font-secondary group-hover:border-[#000000] border-[#FFFFFF] bg-[#8D5CFF] border transition-all'>
      <span className='p-0.5 cursor-pointer' onClick={onDelete}><AiFillCloseCircle className='text-lg' /></span>
      <p>{label}</p>
    </div>
  );
}

export default FilterChip;
