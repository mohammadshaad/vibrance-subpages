import './styles.css'
import titik from '../../../../assets/icons/titik-titik.png'
import bookticketsarrowlight from '../../../../assets/icons/bookticketsarrowlight.svg'
import bookticketsarrowdark from '../../../../assets/icons/bookticketsarrowdark.svg'
import location from "../../../../assets/icons/location-proshow.svg"
import time from "../../../../assets/icons/time-proshow.svg"
import rupee from "../../../../assets/icons/rupee-proshow.png"
import placeholder from '../../../../assets/images/artist.jpg'
import ReactImageFallback from 'react-image-fallback'
import ProShowChip from '../Chip'
import { motion } from 'framer-motion';
import { format, parse } from 'date-fns';
import validator from 'validator';
import {  useCallback } from 'react'

function toHour12(hour24) {
  return format(parse(hour24, 'H:mm:ss', new Date()), 'h:mm a')
}

function ProShowCard({ data }) {
  var slideshowInterval;
  const slideshowRef = useCallback(node => {
    clearInterval(slideshowInterval);

    slideshowInterval = setInterval(() => {
      node.scrollBy({
        left: node.scrollLeft + node.clientWidth < node.scrollWidth ? node.clientWidth : -1 * node.scrollWidth
      });
    }, 3000);
  }, []);

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
    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true }} variants={cardVariants}  className='flex justify-center mt-[40px] m-w-[400px]'>
      <div className='p-[2%] w-[90%] min-w-[350px] flex md:flex-row flex-col gap-5 bdr'>
        <div className='flex justify-center items-center'>
          <div className='box mt-[18px] md:mt-0'>
            <img className='corner-1' src={titik} alt='white dots'/>
            <div className='centre'>
              <div className='slider'>
                <div className='slides' ref={slideshowRef}>
                  {data.images.map((image, i) => (
                    <ReactImageFallback key={i} src={image ?? placeholder} fallbackImage={placeholder} initialImage={placeholder} alt={validator.unescape(data.title)} />
                  ))}
                </div>
              </div>
            </div>
            <img className='corner-2' src={titik} alt='white dots'/>
          </div>
        </div>
        <div className='md:mt-[20px] md:ml-[-20px] p-[1%] pt-7'>
          <h1 className='text-white mx-[12px] md:mx-0 md:text-[70px] text-[56px] leading-none cirkafont'>{validator.unescape(data.title)}</h1>
          <div className='flex flex-col gap-[12px] md:ml-[-40px] p-[10px] mt-[4px]'>
            <p className='text-white gilroyfont' dangerouslySetInnerHTML={{ __html: data.description }} />
            <div className='flex flex-wrap gap-2'>
              <ProShowChip icon={location} text={validator.unescape(data.venue) + (data.room ? ` - ${validator.unescape(data.room)}` : '')} />
              <ProShowChip icon={time} text={toHour12(data.start_time) + ' Onwards'} />
              <ProShowChip icon={<img className='ml-2' src={rupee} />} text={`${data.cost}/-`} />
            </div>
            <div className='mt-[18px]'>
              <div className='w-[193px] grid'>
                <a className="btn-epic" href={'https://vitchennaievents.com/vibrance/?eventid=' + data.event_id} target="_blank" rel='noreferrer'>
                  <div>
                    <span>
                      <div className='flex flex-row gap-[10px] justify-center items-center pb-[5px]'>
                        <p className='cirkabold'>Buy pass</p>
                        <img className='pt-[4px] w-[30px]' src={bookticketsarrowlight} alt='Buy pass icon' />
                      </div>
                    </span>
                    <span>
                      <div className='flex flex-row gap-[10px] justify-center items-center pb-[5px]'>
                        <p className='cirkabold'>Buy pass</p>
                        <img className='pt-[4px] w-[30px]' src={bookticketsarrowdark} alt='Buy pass icon' />
                      </div>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProShowCard