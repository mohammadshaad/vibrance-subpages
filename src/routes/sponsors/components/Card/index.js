import ReactImageFallback from 'react-image-fallback';
import instagram from '../../../../assets/icons/instagram-sponsors.svg';
import twitter from '../../../../assets/icons/twitter-sponsors.svg';
import placeholder from '../../../../assets/images/sponsor.png';
import { motion } from "framer-motion"
import validator from 'validator';

const SponsorCard = ({ data }) => {
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

  const sanitizeTitle = (teamName) => {
    const result = [];
    const splitTitle = teamName.split(' ');
    var found = false;

    for (var i = 0; i < splitTitle.length; ++i) {
      if (!found && !isNaN(parseInt(splitTitle[i]))) {
        found = true;
        continue;
      }

      result.push(splitTitle[i]);
    }

    return result.join(' ');
  }

  const getInstagram = (title) => {
    const key = title.toLowerCase();

    if (key.includes('pepsi')) {
      return 'pepsi';
    } else if (key.includes('indian bank')) {
      return 'myindianbank';
    } else if (key.includes('careerlabs')) {
      return 'mycareerlabs';
    } else if (key.includes('times of india')) {
      return 'timesofindia';
    } else if (key.includes('vastrado')) {
      return 'vastrado';
    } else if (key.includes('rapido')) {
      return 'rapidobiketaxi';
    } else if (key.includes('museek')) {
      return 'museek_trichy';
    } else if (key.includes('kirtilals')) {
      return 'kirtilalsonline';
    } else if (key.includes('2iim')) {
      return '2iimcatpreparation';
    } else if (key.includes('cadbury')) {
      return 'cadburyuk';
    } else if (key.includes('anjaneya')) {
      return 'anjaneya.fashions';
    } else if (key.includes('twin bird')) {
      return 'twinbirdsonline';
    } else if (key.includes('musee musical')) {
      return 'museemusical';
    } else if (key.includes('xboom')) {
      return 'xboompower';
    }
  }

  const getTwitter = (title) => {
    const key = title.toLowerCase();

    if (key.includes('pepsi')) {
      return 'pepsi';
    } else if (key.includes('indian bank')) {
      return 'myindianbank';
    } else if (key.includes('careerlabs')) {
      return 'mycareerlabs';
    } else if (key.includes('times of india')) {
      return 'timesofindia';
    } else if (key.includes('vastrado')) {
      return 'vastrado1';
    } else if (key.includes('rapido')) {
      return 'rapidobikeapp';
    } else if (key.includes('kirtilals')) {
      return 'kirtilalsonline';
    } else if (key.includes('cadbury')) {
      return 'cadburyuk';
    } else if (key.includes('twin bird')) {
      return 'twinbirdsonline';
    } else if (key.includes('musee musical')) {
      return 'musee_musical';
    }
  }

  return (
    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true }} variants={cardVariants} className={`group hover:scale-105 transition-all team-items md:max-w-sm flex flex-col justify-center items-start space-y-2 md:p-6  rounded-lg border-[#008A93] md:hover:bg-[#FFEEB6] h-full`}>
      <div className='flex justify-center w-full object-cover object-center hover:cursor-pointer'>
        <div className='relative w-full'>
          <ReactImageFallback src={data.image ?? placeholder} fallbackImage={placeholder} initialImage={placeholder} alt={validator.unescape(data.title)} className='w-full md:max-h-72 rounded-lg' />
        </div>
      </div>
      <div className='flex flex-col w-full -space-y-2 relative align-middle h-full'>
        <div className='flex'><span className='font-secondary text-[32px] font-bold leading-[35px]'>{sanitizeTitle(validator.unescape(data.title))}</span></div>
        <div className='flex md:flex-col w-full justify-between md:justify-center md:items-start items-center h-full'>
          <div className='flex mt-3'>
            <span className='font-secondary text-[14px] leading-[16px] font-normal md:group-hover:text-black/80'>{validator.unescape(data.description)}</span>
          </div>
          <div className='h-full' />
          <div className='absolute md:static right-0 top-2 flex space-x-3 md:opacity-0 group-hover:opacity-100 mt-5 align-middle'>
            {getInstagram(data.title) && <a href={`http://instagram.com/${getInstagram(data.title)}`} target="_blank"><div className='cursor-pointer hover:scale-110'><img className='w-5' src={instagram} alt="Instagram Link" /></div></a>}
            {getTwitter(data.title) && <a href={`http://twitter.com/${getTwitter(data.title)}`} target="_blank"><div className='cursor-pointer hover:scale-110'><img className='w-5' src={twitter} alt="Twitter Link" /></div></a>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SponsorCard;
