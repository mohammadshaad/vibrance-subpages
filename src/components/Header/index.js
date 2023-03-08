import React from 'react'
import eventBanner from '../../assets/banners/event-banner.png'
import galleryBanner from '../../assets/banners/gallery-banner.png'
import merchBanner from '../../assets/banners/merch-banner.png'
import proShowsBanner from '../../assets/banners/proshows-banner.png'
import sponsorsBanner from '../../assets/banners/sponsors-banner.png'
import teamBanner from '../../assets/banners/team-banner.png'
import { motion } from "framer-motion"

const Header = ({ type }) => {

  switch (type) {
    case '/events':
    case '/events/':
      return (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='flex justify-center w-11/12 mx-auto'>
          <img src={eventBanner} alt="Event Banner" />
        </motion.div>
      )
    case '/gallery':
    case '/gallery/':
      return (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='flex justify-center w-11/12 mx-auto'>
          <img src={galleryBanner} alt="Gallery Banner" />
        </motion.div>
      )
    case '/merchandise':
    case '/merchandise.':
      return (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='flex justify-center w-11/12 mx-auto'>
          <img src={merchBanner} alt="Merchandise Banner" />
        </motion.div>
      )
    case '/pro-shows':
    case '/pro-shows/':
      return (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='flex justify-center w-11/12 mx-auto'>
          <img src={proShowsBanner} alt="ProShows Banner" />
        </motion.div>
      )
    case '/sponsors':
    case '/sponsors/':
      return (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='flex justify-center w-11/12 mx-auto'>
          <img src={sponsorsBanner} alt="Sponsors Banner" />
        </motion.div>
      )
    case '/team':
    case '/team/':
      return (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='flex justify-center w-11/12 mx-auto'>
          <img src={teamBanner} alt="Team Banner" />
        </motion.div>
      )
    default:
      return (<></>)
  }
}

export default Header
