import React, { useEffect, useState } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

import {
  PlayIcon,
  PauseIcon,
  ReplyIcon,
  RewindIcon,
  FastForwardIcon,
  SwitchHorizontalIcon
} from '@heroicons/react/solid';

function PlayerControls() {
  const [{ token, playerState, repeatMode, currentlyPlaying }, dispatch] = useStateProvider();
  const [currentDuration, setCurrentDuration] = useState(0);
  const [progress, setProgress] = useState();

  const ChangeTrack = async (type) => {
    await axios.post(`https://api.spotify.com/v1/me/player/${type}`, {}, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
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
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    }
    else {
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
    }
  }

  const ChangeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(`https://api.spotify.com/v1/me/player/${state}`, {}, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState });
  };

  const RepeatTrack = async () => {
    const state = repeatMode ? 'track' : 'off';
    await axios.put(`https://api.spotify.com/v1/me/player/repeat`, {},
      {
        params: {
          state: state,
        },
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
    dispatch({ type: reducerCases.SET_REPEAT_MODE, repeatMode: !repeatMode });
  };

  const GetDurationRange = async (e) => {
    await axios.put('https://api.spotify.com/v1/me/player/seek', {},
      {
        params: {
          position_ms: parseInt(e.target.value)
        },
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      setCurrentDuration(parseInt(e.target.value));
  }
  useEffect(() => {
    if (playerState && (currentDuration <= currentlyPlaying.duration)) {
      console.log(currentDuration);
      setProgress(
        setInterval(() => {
          setCurrentDuration(currentDuration => currentDuration + 1000);
        }, 1000)
      );
    }
    else {
      clearInterval(progress);
    }
  }, [playerState]);

  return (
    <>
      <div className='flex items-center flex-col space-y-3'>
        <div className='md:space-x-6 mx-auto space-x-4 flex items-center'>
          <SwitchHorizontalIcon className='w-5 h-5 text-gray-400 hover:text-white hidden md:inline' />
          <RewindIcon className='w-5 h-5 text-gray-400 hover:text-white m-auto md:m-0' onClick={() => ChangeTrack('previous')} />

          {!playerState ? <PlayIcon className='w-10 h-10 text-gray-300 cursor-pointer hover:scale-110' onClick={ChangeState} /> :
            <PauseIcon className='w-10 h-10 text-gray-300 cursor-pointer hover:scale-110' onClick={ChangeState} />}

          <FastForwardIcon className='w-5 h-5 text-gray-400 hover:text-white' onClick={() => ChangeTrack('next')} />
          {repeatMode ? <ReplyIcon className='w-5 h-5 text-green-600 hover:text-green-400 hidden md:inline' onClick={RepeatTrack} /> :
            <ReplyIcon className='w-5 h-5 text-gray-400 hover:text-white hidden md:inline' onClick={RepeatTrack} />}
        </div>
        <input type="range" className='w-32 sm:w-40 md:w-[18rem] lg:w-[25rem] xl:w-[33rem] accent-gray-100 bg-gray-500 hover:accent-green-600 h-[5px]' min={0} max={currentlyPlaying.duration} step={1000} defaultValue={currentDuration} onMouseUp={(e) => GetDurationRange(e)} />
      </div>
    </>
  )
}

export default PlayerControls