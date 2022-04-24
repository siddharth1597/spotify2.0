import '../App.css';
import { ClockIcon } from '@heroicons/react/outline';
import { milli_to_minsec } from '../utils/DurationConvert';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

const Songs = (props) => {
  const [{ token }, dispatch] = useStateProvider();

  const PlayTrack = async (id, name, artists, image, context_uri, track_number, duration) => {
    const response = await axios.put("https://api.spotify.com/v1/me/player/play", 
    {
      context_uri,
      offset: {
        position: track_number - 1
      },
      position_ms: 0
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
      
    if (response.status === 204) {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image,
        duration
      };
      dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
      dispatch({type: reducerCases.SET_PLAYER_STATE, playerState: true});
    }
    else {
      dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying: null});
      dispatch({type: reducerCases.SET_PLAYER_STATE, playerState: false});
    }
  }

  const list = props.tracks.map(({id, name, album, image, artist, context_uri, duration, track_number}, index) => {
    return(
      <div key={id} onClick={() => PlayTrack(id, name, artist, image, context_uri, track_number, duration)} 
        className='grid grid-cols-3 py-2 px-3 rounded-lg hover:bg-gray-700 hover:bg-opacity-30'>
        <div className='flex items-center space-x-4 text-gray-600'>
          <p className='text-white'>{index + 1}</p>
          <img className='w-8 h-8' src={image} alt={name} />
          <div className='flex flex-col'>
            <p className='text-white w-36 lg:w-60 truncate'>{name}</p>
            <p className='w-36 lg:w-60 truncate'>{artist}</p>
          </div>
        </div>
        <div className='text-gray-600 my-auto'>
          <p className='hidden md:inline'>{album}</p>
        </div>
        <div className='text-gray-600 text-right my-auto'>
          <p>{ milli_to_minsec(duration) }</p>
        </div>
      </div>
    );
  });

  return(
      <div className='bg-black p-5 sm:p-8'>
        <div className='grid grid-cols-3 border-b-[1px] border-b-gray-800 uppercase py-4 mb-3 sticky top-0 bg-black'>
          <div className='flex items-center space-x-4 text-gray-500 px-3'>
            <p>#</p>
            <p>Title</p>
          </div>
          <div className='text-gray-500 px-3'>
            <p className='hidden md:inline'>Album</p>
          </div>
          <div className='text-gray-500 ml-auto px-3'>
            <ClockIcon className='w-6 h-6' />
          </div>
        </div>
        {list}
      </div>
  );
}

export default Songs;
