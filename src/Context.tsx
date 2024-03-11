import React, { createContext, useState } from 'react'
import { useGetPlayBackState } from '@/hooks/useGetPlayBackState'
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser'

type typePlayerAPI = {
  is_playing: boolean;
  item: {
    artists: Array<{
      external_urls: {
        spotify: string;
      };
      name: string;
      id: string;
    }>;
    name: string;
    album: {
      name: string;
      external_urls: {
        spotify: string;
      }
      images: {
        url: string;
      }[];
      artists: {
        external_urls: {
          spotify: string;
        };
        name: string;
        id: string;
      }[];
    };
    external_urls: {
      spotify: string;
    }
  };
};

type typeCurrentUser = {
  display_name: string;
  images: Array<{
    url: string;
  }>;
  email: string;
}

export interface ContextProviderProps {
  player: typePlayerAPI | undefined;
  user: typeCurrentUser | undefined;
  PlayerTheme: string;
  setPlayerTheme: (theme: string) => void;
}

export const Context = createContext<ContextProviderProps>({
  player: undefined,
  user: undefined,
  PlayerTheme: 'Vinyl',
  setPlayerTheme: () => {}
})

export default function ContextProvider ({ children } : { children: React.ReactNode }) {
  const { player } = useGetPlayBackState()

  const { user } = useGetCurrentUser()

  const [PlayerTheme, setPlayerTheme] = useState(() => {
    let stored_player_theme: string | null = null

    if (typeof window !== 'undefined') {
      stored_player_theme = localStorage.getItem('player_theme')
    }

    return stored_player_theme || 'Vinyl'
  })

  return (
    <Context.Provider value={{ player, user, PlayerTheme, setPlayerTheme }}>
      {children}
    </Context.Provider>
  )
}
