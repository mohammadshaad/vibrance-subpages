import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import TeamCard from './components/Card';
import validator from 'validator';
import Header from '../../components/Header';

const Team = () => {
  const [teams, setTeams] = useState(new Map());
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = 'Vibrance\'23 - Our Team';
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://vitvibrance.onrender.com/api/v1.0/team?" +
      new URLSearchParams({
        page: page,
      })
    );

    const data = await response.json();
    setPage(data.next_page);

    data.team.forEach(member => {
      if (!teams.has(member.team_name)) {
        teams.set(member.team_name, new Map());
      }

      teams.set(member.team_name, teams.get(member.team_name).set(member.id, member));
    });

    setTeams(teams);
    setSize(size + data.team.length);

    if (data.team.length === 0) {
      setHasMore(false);
    }
  };

  const sanitizeTeamName = (teamName) => {
    const result = [];
    const splitTeamName = teamName.split(' ');

    for (var i = 0; i < splitTeamName.length; ++i) {
      if (!isNaN(parseInt(splitTeamName[i]))) {
        continue;
      }

      result.push(splitTeamName[i]);
    }

    return result.join(' ');
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <>
      <Header type={useLocation().pathname} />
      <InfiniteScroll
        dataLength={size}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <Spinner color={'#008A93'} bgColor={'#D7FDFF'} />
        }>
        {Array.from(teams).map(([teamName, team]) => (
          <div key={teamName} className='flex flex-col md:space-y-6 space-y-6'>
            <div className='w-10/12 mx-auto'>
              <span className='font-black text-2xl md:text-[40px] md:leading-[48px] font-secondary'>{sanitizeTeamName(validator.unescape(teamName))}</span>
            </div>
            <div className='team grid mb-10 justify-center grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-10/12 mx-auto md:w-11/12 md:mx-auto md:gap-4 gap-10 items-center pb-10'>
              {Array.from(team).map(([_, item]) => <TeamCard key={item.id} data={item} />)}
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  )
}

export default Team