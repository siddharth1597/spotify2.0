import '../App.css';
import Songs from './Songs';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';

import { useEffect, useState } from 'react';
import { PlayIcon } from '@heroicons/react/solid';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

const MainBody = () => {
  const [{user, token, selectedPlaylistId, selectedPlaylist}, dispatch] = useStateProvider();
  const [gradient, setgradient] = useState('gray');
  const [open, setOpen] = useState(false);
  const colors = ['gray', 'chocolate', 'brown', 'peru'];

  useEffect(() => {
    const getPlaylist = async () => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({track}) => ({
          id: track.id,
          name: track.name,
          track_number: track.track_number,
          duration: track.duration_ms,
          album: track.album.name,
          image: track.album.images[2].url,
          artist: track.artists.map((artist) => artist.name),
          context_uri: track.album.uri,
        }))
      }
      
      dispatch({type: reducerCases.SET_PLAYLIST, selectedPlaylist});
      setgradient(colors[Math.floor(Math.random() * 4)]);
    }
    getPlaylist();

  }, [token, dispatch, selectedPlaylistId])

  const ProfileOptions = () => {
    setOpen(open => !open);
  }

  return(
    <div className="relative h-full bg-black text-white flex flex-col flex-grow overflow-y-scroll">
      <header style={{backgroundImage: `linear-gradient(to bottom, ${gradient}, black)`}}>
      {/* <header className=" bg-gradient-to-b to-black from-gray-700"> */}
        <div className="sticky top-0 flex justify-between items-center p-5 sm:px-8 py-4">
          <div className="flex items-center space-x-4">
            <ChevronLeftIcon className="w-8 h-8 bg-gray-900 opacity-90 rounded-full p-1 cursor-pointer hover:opacity-80" />
            <ChevronRightIcon className="w-8 h-8 bg-gray-900 opacity-70 rounded-full p-1 cursor-pointer hover:opacity-80" />
          </div>
          <div className="relative flex items-center space-x-2 bg-gray-900 opacity-90 rounded-full p-1 cursor-pointer hover:opacity-80" onClick={ProfileOptions}>
            <img className="rounded-full w-7 h-7" src={user?.userImage} alt="profile" />
            <h3 className='text-md font-semibold'>{user?.userName}</h3>
            <ChevronDownIcon className='w-4 h-4' />

            { open &&
              <div className='absolute w-full bg-gray-900 rounded-lg top-11 left-[-10px] flex flex-col'>
                <button className='py-2 px-5 text-left hover:bg-black rounded-lg'>Account</button>
                <button className='py-2 px-5 text-left hover:bg-black rounded-lg'>Profile</button>
                <button className='py-2 px-5 text-left hover:bg-black rounded-lg'>Logout</button>
              </div>
            }
          </div>
        </div>
        {
          selectedPlaylist &&
          
            <div className="space-y-4 sm:space-y-0 sm:space-x-5 w-full flex flex-col sm:flex-row items-start sm:items-end h-96 sm:h-80 text-white p-5 sm:p-8">
              <img className="w-60 shadow-lg" src={selectedPlaylist.image} alt="Album poster" />
              <div className="flex flex-col space-y-1">
                <h4 className="uppercase text-xs font-bold">Playlist</h4>
                <h1 className="text-2xl sm:text-8xl font-bold">{selectedPlaylist.name}</h1>
                <h4 className='pt-2 text-md font-semibold'><span className='font-semibold'>{user?.userName}</span> . <span>{selectedPlaylist.tracks.length} songs</span></h4>
              </div>
            </div>
        }
        
        <PlayIcon className="text-green-600 w-16 sm:w-24 pl-5 sm:pl-8 cursor-pointer " />
      </header>

      {selectedPlaylist && <Songs tracks={selectedPlaylist.tracks} />}

    </div>
  );
}

export default MainBody;
