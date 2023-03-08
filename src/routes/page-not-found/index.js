import React, { useEffect } from 'react'
import donut from '../../assets/images/donutbgs.svg'

const PageNotFound = () => {

    useEffect(() => {
        document.title = 'Vibrance\'23 - 404 Page Not Found';
    }, []);

    return (
        <div className='flex flex-col justify-center items-center md:space-y-6 space-y-3'>
            <div className='w-7/12 flex justify-center'>
                <img src={donut} alt={"donut"} />
            </div>
            <div className='w-10/12 md:w-9/12 lg:w-5/12'> 
                <p className='font-secondary items-center font-bold text-center md:text-2xl'>Page not found. But hey, at least you found your way to the fest! Enjoy the sights, sounds, and good vibes.</p>
            </div>
            <div>
                <a href="/">
                    <button className='bg-[#ED81FF] hover:bg-[#B125C9] font-secondary text-[16px] md:text-[24px] text-white px-12 py-4 font-semibold leading-[20px] md:leading-[29px] rounded-full mb-10'>Go Back Home</button>
                </a>
            </div>
        </div>
    )
}

export default PageNotFound