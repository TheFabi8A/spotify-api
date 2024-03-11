import useSWR from 'swr'

export function useGetArtist (spotifyArtistId: string | undefined) {
  const accessToken = localStorage.getItem('spotifyAccessToken')

  const API_URL = `https://api.spotify.com/v1/artists/${spotifyArtistId}`

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  const fetcher = (url: string) => fetch(url, { headers }).then((res) => res.json())
  const { data, error, isValidating } = useSWR(API_URL, fetcher, accessToken ? { refreshInterval: 1000 } : {})

  return {
    artist: data,
    error,
    isLoading: !data && !error,
    isValidating
  }
}
