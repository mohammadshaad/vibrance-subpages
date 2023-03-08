import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Events from './routes/events';
import Merchandise from './routes/merchandise';
import proShowBackground from './assets/backgrounds/proshow-background.svg';
import ProShows from './routes/pro-shows';
import Team from './routes/team';
import PageNotFound from './routes/page-not-found';
import Sponsors from './routes/sponsors';
import Gallery from './routes/gallery';

function getBackground(path) {
  switch (path) {
    case '/events':
    case '/events/':
      return '#FAEAFD';
    case '/gallery':
    case '/gallery/':
      return '#DFFFB7';
    case '/merchandise':
    case '/merchandise/':
      return '#DFF5FF';
    case '/team':
    case '/team/':
      return '#D7FDFF';
    case '/pro-shows':
    case '/pro-shows/':
      return `url(${proShowBackground})`;
    case '/sponsors':
    case '/sponsors/':
      return '#FFF5D3';
    default:
      return '#F5B8FF';
  }
}

function App() {
  const path = useLocation().pathname;

  return (
    <div className='flex flex-col min-h-screen px-2 pb-0 md:space-y-10 space-y-5 main' style={{ background: getBackground(path) }}>
      <Navbar />
      <div className='flex flex-col space-y-6'>
        <Header />
        <Routes path="/">
          <Route path='/events' element={<Events />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/merchandise' element={<Merchandise />} />
          <Route path='/pro-shows' element={<ProShows />} />
          <Route path='/sponsors' element={<Sponsors />} />
          <Route path='/team' element={<Team />} />
          <Route path='/*' element={<PageNotFound />} status={404} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
