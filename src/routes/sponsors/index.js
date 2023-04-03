import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import SponsorCard from './components/Card';

function getTitle(key) {
  switch (key) {
    case 'TITLE':
      return 'Title Sponsors';
    case 'SILVER':
      return 'Silver Sponsors';
    case 'FOOD_PARTNER':
      return 'Food Partners';
    case 'MEDIA_PARTNER':
      return 'Media Partners';
    case 'BANKING_PARTNER':
      return 'Banking Partners';
    case 'MERCHANDISE_PARTNER':
      return 'Merchandise Partners';
    default:
      return 'Other Sponsors';
  }
}

const Sponsors = () => {
  const [sponsors, setSponsors] = useState(new Map());
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = 'Vibrance\'23 - Sponsors';
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://vitvibrance.onrender.com/api/v1.0/sponsors?" +
      new URLSearchParams({
        page: page,
      })
    );

    const data = await response.json();
    setPage(data.next_page);

    data.sponsors.forEach(sponsor => {
      if (!sponsors.has(sponsor.type)) {
        sponsors.set(sponsor.type, new Map());
      }

      sponsors.set(sponsor.type, sponsors.get(sponsor.type).set(sponsor.id, sponsor));
    });

    setSponsors(sponsors);
    setSize(size + data.sponsors.length);

    if (data.sponsors.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <>
      <Header type={ useLocation().pathname } />
      <InfiniteScroll
        dataLength={size}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <Spinner color={'#E5BB33'} bgColor={'#D7FDFF'} />
        }>
        {Array.from(sponsors).map(([sponsorType, sponsors]) => (
          <div key={sponsorType} className='flex flex-col md:space-y-6 space-y-6'>
            <div className='w-10/12 mx-auto'>
              <span className='font-black text-2xl md:text-[40px] md:leading-[48px] font-secondary'>{getTitle(sponsorType)}</span>
            </div>
            <div className='team grid mb-10 justify-center grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-10/12 mx-auto md:w-11/12 md:mx-auto md:gap-4 gap-10 items-center pb-10'>
              {Array.from(sponsors).map(([_, item]) => <SponsorCard key={item.id} data={item} />)}
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  )
}

export default Sponsors