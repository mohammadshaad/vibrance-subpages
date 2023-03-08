import { BsTelephoneFill } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';
import placeholder from '../../../../assets/images/person.png'
import { motion } from "framer-motion"
import ReactImageFallback from "react-image-fallback";
import validator from 'validator';

const TeamCard = ({ data }) => {
  const cardVariants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true }} variants={cardVariants} className={`group hover:scale-105 transition-all team-items md:max-w-sm flex flex-col justify-center items-start space-y-2 md:p-6 rounded-lg border-[#008A93] md:hover:bg-[#008A93] h-full`}>
      <div className='flex justify-center w-full object-cover object-center hover:cursor-pointer'>
        <div className='relative w-full aspect-[4/5] rounded-lg overflow-hidden'>
          <ReactImageFallback src={data.image ?? placeholder} fallbackImage={placeholder} initialImage={placeholder} alt={validator.unescape(data.name)} className='w-full h-full object-cover' />
        </div>
      </div>
      <div className='flex flex-col w-full -space-y-2 relative h-full'>
        <div className='flex'><span className='font-secondary text-xl md:text-[32px] md:leading-[39px] font-bold md:group-hover:text-white'>{validator.unescape(data.name)}</span></div>
        <div className='flex md:flex-col w-full justify-between md:justify-center md:items-start items-center h-full'>
          <div className='flex'>
            <span className='font-secondary text-[14px] leading-[30px] font-normal md:group-hover:text-white/80'>{validator.unescape(data.role)}</span>
          </div>
          <div className='flex-1' />
          <div className='absolute md:static right-0 top-2 flex space-x-3 md:opacity-0 group-hover:opacity-100'>
            {data.email && <span className='font-secondary md:text-[20px] text-2xl md:leading-[19px] font-normal p-1 bg-[#008A93]/10 border rounded-full border-[#008A93] md:hover:border-white transition duration-500 aspect-square'><a href={"mailto:" + data.email}><IoMdMail className='hover:cursor-pointer text-[#008A93] md:group-hover:text-white scale-78' /></a></span>}
            {data.phone && <span className='font-secondary md:text-[20px] text-2xl md:leading-[19px] font-normal p-1 bg-[#008A93]/10 border rounded-full border-[#008A93] md:hover:border-white transition'><a href={"tel:" + data.phone}><BsTelephoneFill className='hover:cursor-pointer text-[#008A93] md:group-hover:text-white scale-75' /></a></span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TeamCard;
