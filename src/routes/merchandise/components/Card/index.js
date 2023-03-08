import { HiCurrencyRupee } from 'react-icons/hi';
import { FaExternalLinkAlt } from 'react-icons/fa';
import placeholder from '../../../../assets/images/placeholder.png'
import unisexIcon from '../../../../assets/icons/unisex.svg'
import SizeIcon from '../../../../assets/icons/size.svg'
import { motion } from "framer-motion"
import ReactImageFallback from "react-image-fallback";
import Chip from '../../../../components/Chip';
import validator from 'validator';

const MerchandiseCard = ({ data }) => {
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
    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }} key={data.id} variants={cardVariants} className={`hover:shadow-5xl hover:bg-white group hover:scale-105 transition-all merch-items md:max-w-sm flex flex-col justify-center items-start border space-y-2 rounded-3xl p-3 border-black h-full`}>
      <div className='flex justify-center w-full object-cover object-center hover:cursor-pointer'>
        <div className='relative w-full max-h-[150px] rounded-xl overflow-hidden'>
          <ReactImageFallback src={data.image ?? placeholder} fallbackImage={placeholder} initialImage={placeholder} alt={validator.unescape(data.title)} className='w-full h-full object-cover'/>
          { data.title.toLowerCase().includes('shirt') && <div className='absolute top-1 right-2 w-fit flex justify-center -space-x-1 items-center text-xs rounded-2xl font-semibold bg-white py-1 pl-2 pr-3'>
            <img src={unisexIcon} alt="" className='scale-75' /><span className='text-xs font-secondary'>Unisex</span>
          </div>}
        </div>
      </div>
      <div className='m-2'><p className='font-secondary font-black text-[28px] leading-[34px]'>{validator.unescape(data.title)}</p></div>
      <div className='flex flex-wrap gap-2'>
        {data.title.toLowerCase().includes('shirt') && <Chip icon={SizeIcon} text={<>Sizes: <span className='font-sm font-bold'>S, M, L, XL, XXL, XXXL</span></>} color="#26B7FB" className='group-hover:border-[#26B7FB]' /> }
        <Chip icon={<HiCurrencyRupee className='text-xl' />} text={<p className='text-sm font-black'>{data.cost}/-</p>} color="#26B7FB" />
      </div>
      <div className='flex-1' />
      <div className='w-full'><a href="https://vitchennaievents.com/vibrance/shirt" target="_blank">
        <button className='bg-[#26B7FB] w-full justify-center rounded-4xl py-3 text-white font-secondary flex items-center space-x-2 hover:bg-[#00A3EF]'><span className='font-semibold'>Buy Now </span><span className='text-xs'><FaExternalLinkAlt /></span></button>
      </a></div>
    </motion.div>
  );
}

export default MerchandiseCard;
