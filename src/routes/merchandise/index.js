import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import MerchandiseCard from './components/Card';

const Merchandise = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    document.title = 'Vibrance\'23 - Merchandise';
  }, []);

  const fetchData = async (page) => {
    var query = searchQuery;

    const response = await fetch(
      "https://vitvibrance.com/api/v1.0/merchandise?" +
      new URLSearchParams([
        ['page', page],
        ...query !== '' ? [['query', query]] : [],
      ])
    );
    const data = await response.json();

    setItems([...page !== 1 ? items : [], ...data.merchandise]);

    setPage(data.next_page);
    if (data.merchandise.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setItems([]);
    setHasMore(true);
    setPage(1);

    const getData = setTimeout(() => {
      fetchData(1);
    }, 1000)

    return () => clearTimeout(getData);
  }, [searchQuery]);

  return (
    <>
      <Header type={useLocation().pathname} />
      <div className='flex flex-col space-y-3'>
        <div className='filters flex md:flex-row flex-col-reverse justify-end lg:justify-end items-center py-5 lg:space-x-52 md:space-x-20 md:space-y-0 w-10/12 mx-auto pt-0'>
          <div className='flex justify-center focus-within:bg-white hover:bg-white space-x-5 h-full items-center md:px-5 pl-5 md:w-auto w-auto mx-4 pr-10 py-2 border-black border rounded-[32px] text-xl'>
            <label htmlFor='search'>
              <AiOutlineSearch className='hover:cursor-pointer' />
            </label>
            <input className='bg-transparent focus:outline-none text-lg w-full font-secondary' id='search' value={searchQuery} placeholder='Search Merchandise' type="text" onChange={(event) => { setSearchQuery(event.target.value); }} />
          </div>
        </div>

        <InfiniteScroll
          dataLength={items.length}
          next={() => { page !== 1 && fetchData(page); }}
          hasMore={hasMore}
          loader={
            <Spinner color={'#26B7FB'} bgColor={'#D7FDFF'}/>
          }>
          <div className='merch grid mb-10 justify-center grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-5 md:w-11/12 md:mx-auto gap-10 items-center'>
            {items.map((data) => <MerchandiseCard key={data.id} data={data} />)}
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

export default Merchandise