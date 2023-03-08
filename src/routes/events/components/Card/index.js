import { HiCurrencyRupee, HiLocationMarker, HiUserGroup } from 'react-icons/hi';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MdAccessTimeFilled, MdCategory, MdFace } from 'react-icons/md'
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import placeholder from '../../../../assets/images/placeholder.png'
import { motion } from "framer-motion"
import ReactImageFallback from "react-image-fallback";
import Chip from '../../../../components/Chip';
import { format, parse } from 'date-fns';
import validator from 'validator';

function toHour12(hour24) {
  return format(parse(hour24, 'H:mm:ss', new Date()), 'h:mm a')
}

const EventCard = ({ data }) => {
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
    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }} key={data.id} variants={cardVariants} className={`hover:shadow-5xl cursor-pointer card-item hover:bg-white group hover:scale-105 transition-all merch-items md:max-w-sm flex flex-col justify-center items-start border space-y-2 rounded-3xl p-3 border-black h-full`}>
      <div className='flex justify-center w-full object-cover object-center hover:cursor-pointer'>
        <div className='relative w-full max-h-[150px] rounded-xl overflow-hidden'>
          <ReactImageFallback src={data.image ?? placeholder} fallbackImage={placeholder} initialImage={placeholder} alt={validator.unescape(data.title)} className='w-full h-full object-cover' />
        </div>
      </div>
      <div className='m-2'><p className='font-secondary font-black text-[28px] leading-[34px]'>{validator.unescape(data.title)}</p></div>
        <p className="font-secondary mx-2 line-clamp-3">{validator.unescape(data.description)}</p>
        <div className='flex flex-wrap gap-2'>
          <Chip icon={<BsFillCalendarCheckFill className='text-sm'/>} text={<span className='text-sm'>{data.day}</span>} color="#7D0EF9" className='group-hover:border-[#7D0EF9]' />
          <Chip icon={<MdAccessTimeFilled className='text-lg'/>} text={<span className='text-sm'>{toHour12(data.start_time) + (data.start_time !== data.end_time ? ` - ${toHour12(data.end_time)}` : '')}</span>} color="#7D0EF9" />
          <Chip icon={<HiUserGroup className='text-lg'/>} text={<span className='text-sm'>{data.team_size_min + (data.team_size_min !== data.team_size_max ? ` - ${data.team_size_max}` : '')}</span>} color="#7D0EF9" />
          <Chip icon={<HiLocationMarker className='text-lg'/>} text={<span className='text-sm'>{validator.unescape(data.venue) + (data.room ? ` - ${validator.unescape(data.room)}` : '')}</span>} color="#7D0EF9" />
          <Chip icon={<MdCategory className='text-lg'/>} text={<span className='text-sm'>{validator.unescape(data.category)}</span>} color="#7D0EF9" />
          <Chip icon={<HiCurrencyRupee className='text-lg' />} text={<span className='text-sm font-bold'>{data.cost ? `${data.cost}/-` : 'Free'}</span>} color="#7D0EF9" />
          {data.faculty_coordinator_name && 
            <Chip icon={<MdFace className='text-lg'/>} text={<span className='text-sm'>{validator.unescape(data.faculty_coordinator_name) + (data.faculty_coordinator_mobile ? ` - ${data.faculty_coordinator_mobile}` : '')}</span>} color="#7D0EF9" />
          }
          {data.student_coordinator_name && 
            <Chip icon={<MdFace className='text-lg'/>} text={<span className='text-sm'>{validator.unescape(data.student_coordinator_name) + (data.student_coordinator_mobile ? ` - ${data.student_coordinator_mobile}` : '')}</span>} color="#7D0EF9" />
          }
        </div>
        <div className='font-secondary flex items-center justify-center gap-2'></div>
      <div className='flex-1' />
      <div className='w-full'>
        <a target="_blank" href={'https://www.vitchennaievents.com/vibrance/?eventid=' + data.event_id}>
          <button className='bg-[#7D0EF9] w-full justify-center rounded-4xl py-3 text-white font-secondary flex items-center space-x-2 hover:bg-[#48019A]'><span className='font-semibold'>Register Now </span><span className='text-xs'><FaExternalLinkAlt /></span></button>
        </a>
      </div>
    </motion.div>
  );
}

export default EventCard;
