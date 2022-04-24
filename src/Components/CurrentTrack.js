import React, {useEffect} from 'react'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
import PlayerControls from './PlayerControls';
import OtherControls from './OtherControls';

import {
  HeartIcon,
} from '@heroicons/react/outline';

function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data !== '') {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          album: item.album.name,
          artists: item.artists.map((artist) => artist.name + ' '),
          image: item.album.images[2].url,
          duration: item.duration_ms,
        };
        dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
      }
    }
    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <>
      {
        currentlyPlaying && (

          <div className='w-full relative bottom-0 p-4 bg-neutral-900 border-t-[1.5px] border-t-gray-800'>
            <div className='flex items-center justify-between'>
              <div className='space-x-8 flex items-center '>
                <div className='flex items-center space-x-4'>
                  <img className='w-10 h-10 md:w-14 md:h-14' src={currentlyPlaying.image} alt="Played song" />
                  <div className='flex flex-col text-gray-500'>
                    <h3 className='font-semibold text-white text-xs lg:text-base'>{currentlyPlaying.name}</h3>
                    <small className='text-gray-200 text-xs hidden md:inline'>{currentlyPlaying.artists.join(', ')}</small>
                  </div>
                </div>
                <HeartIcon className='w-6 h-6 text-green-700 cursor-pointer hidden md:inline' />
              </div>
              <PlayerControls />
              <OtherControls />
            </div>
          </div>
        )
      }
    </>
  );
}

export default CurrentTrack