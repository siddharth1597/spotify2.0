import '../App.css';
import Logo from '../logo.jpg';

const Login = () => {

  const LoginHandler = () => {
    const clientId = 'YOUR_CLIENT_ID';
    const redirectUrl = 'http://localhost:3000/';
    const apiUrl = 'https://accounts.spotify.com/authorize';
    const scope = [
      'user-read-email',
      'user-read-private', 
      'user-modify-playback-state',
      'user-read-playback-state',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-playback-position',
      'user-top-read',
    ];

    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
  }

  return (
    <div className='w-screen h-screen bg-black'>
      <div className='flex flex-col items-center justify-center space-y-5 h-full'>
          <img className='w-72' src={Logo} alt="Logo" />
          <button className='text-lg font-semibold py-3 px-12 rounded-full bg-green-600 text-black cursor-pointer hover:opacity-90' onClick={LoginHandler}>Login Spotify</button>
      </div>
    </div>
  )
}

export default Login;
