import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../../components/Spinner';
import ReactImageFallback from "react-image-fallback";
import placeholder from '../../assets/images/placeholder.png'
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    document.title = 'Vibrance\'23 - Gallery';
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://vitvibrance.com/api/v1.0/gallery?" +
      new URLSearchParams({
        page: page,
      })
    );
    const data = await response.json();

    setItems([...items, ...data.gallery]);
    setPage(data.next_page);

    if (data.gallery.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <>
      <Header type={useLocation().pathname} />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <Spinner color={'#BCD12F'} bgColor={'#D7FDFF'}/>
        }>
        <div className='gap-4 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 w-11/12 mt-5 mb-10 m-auto'>
          {items.map((data) => (
            <ReactImageFallback 
              key={data.id}
              src={data.image ?? placeholder} 
              fallbackImage={placeholder} 
              initialImage={placeholder} 
              className='mb-4 rounded-[28px]'/>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default Gallery;
