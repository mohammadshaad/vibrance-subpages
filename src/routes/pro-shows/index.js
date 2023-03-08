import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import ProShowCard from './components/Card';

import image1 from '../../assets/artists/1.png';
import image2 from '../../assets/artists/2.png';
import image3 from '../../assets/artists/3.png';
import image4 from '../../assets/artists/4.png';
import image5 from '../../assets/artists/5.png';

const ProShows = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = 'Vibrance\'23 - Pro Shows';
  }, []);

  const fetchData = async () => {
    // const response = await fetch(
    //   "https://vitvibrance.onrender.com/api/v1.0/pro-shows?" +
    //   new URLSearchParams({
    //     page: page,
    //   })
    // );
    // const data = await response.json();

    // setItems([...items, ...data.pro_shows]);

    // setPage(data.next_page);
    // if (data.pro_shows.length === 0) {
    //   setHasMore(false);
    // }

    const data = {
      pro_shows: [
        {
          id: 1,
          title: 'Individual Pass',
          description: 'This pass is available only for <b>VIT Chennai students</b> who wish to purchase the DAY 1, DAY 2 and DAY 3 Combo individually.',
          venue: 'VIT Chennai Main Ground Stage',
          start_time: '17:00:00',
          end_time: '23:30:00',
          images: [
            image1,
            image2,
            image3,
            image4,
            image5,
          ],
          event_id: 375,
          cost: 1499,
          discounted: false
        },
        {
          id: 2,
          title: 'Combo Pass',
          description: 'This pass is available only for <b>VIT Chennai students</b> who wish to purchase the DAY 1, DAY 2 and DAY 3 Combo as a group of 5 for a special price of Rs. 6999/-. Please ensure that all 5 People have an Account in VIT Chennai Events Portal under Vibrance.',
          venue: 'VIT Chennai Main Ground Stage',
          start_time: '17:00:00',
          end_time: '23:30:00',
          images: [
            image1,
            image2,
            image3,
            image4,
            image5,
          ],
          event_id: 376,
          cost: 6999,
          discounted: true
        },
      ]
    };

    setItems([...items, ...data.pro_shows])
    setHasMore(false);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <>
      <Header type={useLocation().pathname} />
      <div className='flex flex-col space-y-3' style={{marginTop: 0}}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <Spinner color={'#9424C9'} bgColor={'#D7FDFF'}/>
          }>
          <div className='mb-10'>
            {items.map((data) => <ProShowCard key={data.id} data={data} />)}
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

export default ProShows