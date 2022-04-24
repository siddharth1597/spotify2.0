import '../App.css';
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon
} from '@heroicons/react/outline';

import logo from '../logo.jpg';
import Playlist from './Playlist';

const Sidebar = (props) => {
  return(
    <div className="text-gray-500 text-xs lg:text-sm h-screen p-5 sm:max-w-[12rem] lg:max-w-[15rem] lg:w-60 hidden md:inline-flex">
      <div className='space-y-4'>
        <img className='w-40' src={logo} alt="Logo" />
        <button className='flex space-x-4 items-center font-semibold hover:text-white'>
          <HomeIcon className="h-7 w-7 mr-3" />
          Home
        </button>
        <button className='flex space-x-4 items-center font-semibold hover:text-white'>
          <SearchIcon className="h-7 w-7 mr-3" />
          Search
        </button>
        <button className='flex space-x-4 items-center font-semibold hover:text-white'>
          <LibraryIcon className="h-7 w-7 mr-3" />
          Your Library
        </button>
        <hr className="border-t-[.1px] border-gray-900" />
        <button className='flex space-x-4 items-center font-semibold hover:text-white'>
          <PlusCircleIcon className="h-7 w-7 mr-3" />
          Create Playlist
        </button>
        <button className='flex space-x-4 items-center font-semibold hover:text-white'>
          <HeartIcon className="h-7 w-7 mr-3" />
          Liked Songs
        </button>
        <Playlist />
      </div>
    </div>
  );
}

export default Sidebar;
