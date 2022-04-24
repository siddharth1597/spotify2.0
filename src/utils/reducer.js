import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [],
  user: null,
  selectedPlaylistId: '7zd60K0CrXDGaIfv3a5GvD',
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
  repeatMode: false,
};

const reducer = (state, action) => {
  switch(action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token:action.token
      }
    }
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists:action.playlists
      }
    }
    case reducerCases.SET_PLAYLIST_ID: {
      return {
        ...state,
        selectedPlaylistId:action.selectedPlaylistId
      }
    }
    case reducerCases.SET_USER: {
      return {
        ...state,
        user:action.user
      }
    }
    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist:action.selectedPlaylist
      }
    }
    case reducerCases.SET_PLAYING: {
      return {
        ...state,
        currentlyPlaying:action.currentlyPlaying
      }
    }
    case reducerCases.SET_PLAYER_STATE: {
      return {
        ...state,
        playerState:action.playerState
      }
    }
    case reducerCases.SET_REPEAT_MODE: {
      return {
        ...state,
        repeatMode:action.repeatMode
      }
    }
    default:
      return state;
  }
};

export default reducer;
