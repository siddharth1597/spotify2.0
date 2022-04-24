import React from 'react';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';

import { 
  VolumeUpIcon,
} from '@heroicons/react/solid';

import {
  CollectionIcon,
  DeviceTabletIcon,
  VolumeUpIcon as VolumeDownIcon,
  MusicNoteIcon
} from '@heroicons/react/outline';

function OtherControls() {
  const [{ token }] = useStateProvider();

  const setVolume = async (e) => {
    await axios.put(`https://api.spotify.com/v1/me/player/volume`, {}, {
      params: {
        volume_percent: parseInt(e.target.value)
      },
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
  };

  return (
    <>
      <div className='space-x-4 flex items-center'>
        <MusicNoteIcon className='w-5 h-5 text-gray-400 hover:text-white hidden md:inline' />
        <CollectionIcon className='w-5 h-5 text-gray-400 hover:text-white hidden md:inline' />
        <DeviceTabletIcon className='w-5 h-5 text-gray-400 hover:text-white hidden md:inline' />
        <div className='space-x-2 flex'>
          <VolumeDownIcon className='w-5 h-5 text-gray-300' />
          <input type="range" className='w-14 sm:w-20 md:w-28 accent-green-600' min={0} max={100} defaultValue={100} onMouseUp={(e)=> setVolume(e)} />
          <VolumeUpIcon className='w-5 h-5 text-gray-300' />
        </div>
      </div>
    </>
  )
}

export default OtherControls;