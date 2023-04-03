import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../../components/Spinner';
import MerchandiseCard from './components/Card';
import Select from 'react-select'
import FilterChip from './components/FilterChip';
import Header from '../../components/Header';
import { useLocation } from 'react-router-dom';

const Events = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isDaysLoading, setDaysLoading] = useState(false);
  const [isCategoriesLoading, setCategoriesLoading] = useState(false);
  const [isVenuesLoading, setVenuesLoading] = useState(false);

  const [dayOptions, setDayOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [venueOptions, setVenueOptions] = useState([]);

  const [selectedDays, setSelectedDays] = useState(new Map());
  const [selectedCategories, setSelectedCategories] = useState(new Map());
  const [selectedVenues, setSelectedVenues] = useState(new Map());

  const [searchQuery, setSearchQuery] = useState('');
  const [daySearchQuery, setDaySearchQuery] = useState('');
  const [categoriesSearchQuery, setCategoriesSearchQuery] = useState('');
  const [venuesSearchQuery, setVenuesSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Vibrance\'23 - Events';
  }, []);

  const fetchData = async (page) => {
    var query = searchQuery;

    const days = Array.from(selectedDays.keys());
    const categories = Array.from(selectedCategories.keys());
    const venues = Array.from(selectedVenues.keys());

    const response = await fetch(
      "https://vitvibrance.onrender.com/api/v1.0/events?" +
      new URLSearchParams([
        ['page', page],
        // ['after', new Date().toISOString().substring(0, 11) + '00:00'],
        ...query !== '' ? [['query', query]] : [],
        ...days.map(d => ['day_id', d]),
        ...categories.map(c => ['category_id', c]),
        ...venues.map(v => ['venue_id', v]),
      ])
    );
    const data = await response.json();

    if (query !== searchQuery) {
      return;
    }

    setItems([...page !== 1 ? items : [], ...data.events]);
    setPage(data.next_page);
    if (data.events.length === 0) {
      setHasMore(false);
    }
  };

  const query = async (base) => {
    var query = '';

    if (base === 'days') {
      query = daySearchQuery;
    } else if (base === 'categories') {
      query = categoriesSearchQuery;
    } else {
      query = venuesSearchQuery;
    }

    if (base === 'days') {
      if (query !== daySearchQuery) {
        return;
      }
    } else if (base === 'categories') {
      if (query !== categoriesSearchQuery) {
        return;
      }
    } else {
      if (query !== venuesSearchQuery) {
        return;
      }
    }

    try {
      const data = await fetch(`https://vitvibrance.onrender.com/api/v1.0/${base}?${new URLSearchParams({query: query})}`);
      const response = await data.json();

      const options = [];

      for (var i = 0; i < response[base].length; ++i) {
        options.push({
          value: response[base][i].id,
          label: response[base][i].title
        });
      }

      if (base === 'days') {
        if (query !== daySearchQuery) {
          return;
        }

        setDayOptions(options);
      } else if (base === 'categories') {
        if (query !== categoriesSearchQuery) {
          return;
        }

        setCategoryOptions(options);
      } else if (base === 'venues') {
        if (query !== venuesSearchQuery) {
          return;
        }

        setVenueOptions(options);
      }
    } catch (e) {
      // ignore errors
    }

    if (base === 'days') {
      setDaysLoading(false);
    } else if (base === 'categories') {
      setCategoriesLoading(false);
    } else {
      setVenuesLoading(false);
    }
  }
  
  useEffect(() => {
    setDaysLoading(true);
    const getData = setTimeout(() => {
      query('days');
    }, 1000)

    return () => clearTimeout(getData)
  }, [daySearchQuery]);

  useEffect(() => {
    setCategoriesLoading(true);
    const getData = setTimeout(() => {
      query('categories');
    }, 1000)

    return () => clearTimeout(getData)
  }, [categoriesSearchQuery]);

  useEffect(() => {
    setVenuesLoading(true);
    const getData = setTimeout(() => {
      query('venues');
    }, 1000)

    return () => clearTimeout(getData)
  }, [venuesSearchQuery]);

  useEffect(() => {
    setItems([]);
    setHasMore(true);
    setPage(1);

    const getData = setTimeout(() => {
      fetchData(1);
    }, 1000)

    return () => clearTimeout(getData);
  }, [searchQuery, selectedDays, selectedCategories, selectedVenues]);

  const customStyles = {
    control: (base, state) => ({
        ...base,
        border: '1px solid #343D4C',
        borderRadius: '32px',
        padding: '6px 16px',
        '&:hover': {
            border: state.isFocused ? '1px solid #343D4C' : '1px solid #343D4C',
            backgroundColor: '#fff',
            cursor: 'pointer'
        },
        backgroundColor: 'transparent',
        color: '#343D4C',
        fontFamily: 'fredoka',
        '@media (max-width: 375px)': {
            padding: '3px 8px',
            fontSize: '12px',
        },
        '@media (max-width: 200px)': {
            display: 'none'
        },
        innerHeight: '100%',
        '&:focus': {
            backgroundColor: '#fff',
            color: '#343D4C'
        },
        boxShadow: 'none'
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#a8b2c3' : state.isFocused ? '#cbd1db' : null,
        color: state.isSelected ? '#343D4C' : state.isFocused ? '#343D4C' : null,
        '&:hover': {
            cursor: 'pointer'
        },
        '&:active': {
            backgroundColor: '#a8b2c3',
            color: '#343D4C'
        },
        fontFamily: 'fredoka'
    }),
    menuList: (base) => ({
        ...base,
        padding: '0',
        fontFamily: 'fredoka',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#343D4C',
        fontFamily: 'fredoka'
    }),
    placeholder: (base) => ({
        ...base,
        color: '#939393',
        fontFamily: 'fredoka'
    }),
    indicatorSeparator: (base) => ({
        ...base,
        color: '#343D4C'
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: '#343D4C'
    })
  }

  const handleOnchange = (type, newValue) => {
    if (type === 'days') {
      if (newValue !== daySearchQuery) {
        setDayOptions([]);
        setDaySearchQuery(newValue);
      }
    } else if (type === 'categories') {
      if (newValue !== categoriesSearchQuery) {
        setCategoryOptions([]);
        setCategoriesSearchQuery(newValue);
      }
    } else if (type === 'venues') {
      if (newValue !== venuesSearchQuery) {
        setVenueOptions([]);
        setVenuesSearchQuery(newValue);
      }
    }
  }

  return (
    <>
      <Header type={useLocation().pathname} />
      <div className='flex flex-col space-y-3'>
        <div className='filters flex md:flex-row flex-col-reverse justify-center lg:justify-evenly items-center py-2 mx-3 pt-0 w-10/12 mx-auto'>
          <div className='flex flex-wrap lg:space-x-1 mt-8 gap-2 md:mt-0 items-center justify-center md:justify-start lg:justify-start w-full'>
            <Select styles={customStyles} value="" placeholder="Search Days" options={dayOptions} onFocus={() => query('days')} onInputChange={(newValue) => handleOnchange('days', newValue)} isLoading={isDaysLoading} filterOption={() => true} onChange={(newValue) => setSelectedDays(new Map(selectedDays.set(newValue.value, newValue)))} />
            <Select styles={customStyles} value="" placeholder="Search Categories" options={categoryOptions} onFocus={() => query('categories')} onInputChange={(newValue) => handleOnchange('categories', newValue)} isLoading={isCategoriesLoading} filterOption={() => true} onChange={(newValue) => setSelectedCategories(new Map(selectedCategories.set(newValue.value, newValue)))} />
            <Select styles={customStyles} value="" placeholder="Search Venues" options={venueOptions} onFocus={() => query('venues')} onInputChange={(newValue) => handleOnchange('venues', newValue)} isLoading={isVenuesLoading} filterOption={() => true} onChange={(newValue) => setSelectedVenues(new Map(selectedVenues.set(newValue.value, newValue)))} />
          </div>
          <div className='flex justify-center focus-within:bg-white hover:bg-white space-x-1 h-full items-center md:px-5 pl-5 md:w-auto w-auto mx-4 pr-10 py-2 border-black border rounded-[32px] text-xl'>
            <label htmlFor='search'>
              <AiOutlineSearch className='hover:cursor-pointer' />
            </label>
            <input className='bg-transparent focus:outline-none text-lg w-full font-secondary' id='search' value={searchQuery} placeholder='Search Events' type="text" onChange={(event) => { setSearchQuery(event.target.value); }} />
          </div>
        </div>

        <div>
          <div className='flex flex-wrap gap-2 pb-3 w-10/12 m-auto'>
            {
              Array.from(selectedDays).map(([k, v]) => <FilterChip key={'d' + k} label={v.label} onDelete={() => { selectedDays.delete(k); setSelectedDays(new Map(selectedDays)); }} />)
            }
            {
              Array.from(selectedCategories).map(([k, v]) => <FilterChip key={'c' + k} label={v.label} onDelete={() => { selectedCategories.delete(k); setSelectedCategories(new Map(selectedCategories)); }} />)
            }
            {
              Array.from(selectedVenues).map(([k, v]) => <FilterChip key={'v' + k} label={v.label} onDelete={() => { selectedVenues.delete(k); setSelectedVenues(new Map(selectedVenues)); }} />)
            }
          </div>
        </div>

        <InfiniteScroll
          dataLength={items.length}
          next={() => { page !== 1 && fetchData(page); }}
          hasMore={hasMore}
          loader={
            <Spinner color={'#7D0EF9'} bgColor={'#D7FDFF'}/>
          }>
          <div className='merch grid mb-10 justify-center grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-5 md:w-11/12 md:mx-auto gap-10 items-center'>
            {items.map((data) => <MerchandiseCard key={data.id} data={data} />)}
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

export default Events