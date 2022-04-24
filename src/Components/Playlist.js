import React, {useEffect, useState} from 'react'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

function Playlist() {
  const [{ token, playlists, selectedPlaylistId }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylist = async () => {
      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });

      const items = response.data.items;
      const playlists = items.map(({name, id}) => {
        return {name, id};
      });
      dispatch({type: reducerCases.SET_PLAYLISTS, playlists});
    }
    getPlaylist();
  }, [token, dispatch]);

  const ChangeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId});
  }

  return (
    <div>
      <hr className="border-t-[.1px] border-gray-900" />
        <div className="space-y-4 pt-4">
          {
            playlists.map(({name, id}) => {
              const selectedItem = id === selectedPlaylistId ? 'text-white' : '';
              return (
                <button key={id} onClick={() => ChangeCurrentPlaylist(id)} className={`flex space-x-4 items-center truncate font-semibold text-left hover:text-white ${selectedItem}`}>
                  {name}
                </button>
              )
            })
          }
          
        </div>
    </div>
  )
}

export default Playlist;
