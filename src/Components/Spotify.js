import Sidebar from './Sidebar';
import MainBody from './MainBody';
import Footer from './Footer';
import '../App.css';

import React, {useEffect} from 'react'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

function Spotify() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });

      const userInfo = response.data;
      const user = {
        userId: userInfo.id,
        userName: userInfo.display_name,
        userImage: userInfo.images[0]['url'],
      }
      dispatch({type: reducerCases.SET_USER, user});
    }
    getUserInfo();

  }, [token, dispatch]);

  return (
    <div className="overflow-hidden bg-black h-screen">
      <main className='flex h-[88%]'>
        <Sidebar />
        <MainBody />
      </main>
      
      <Footer className="h-[12%]" />
    </div>
  )
}

export default Spotify;
