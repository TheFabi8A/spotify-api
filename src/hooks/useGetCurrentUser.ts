import useSWR from 'swr'

export function useGetCurrentUser () {
  const accessToken = localStorage.getItem('spotifyAccessToken')

  const API_URL = 'https://api.spotify.com/v1/me'

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  const fetcher = (url: string) => fetch(url, { headers }).then((res) => res.json())
  const { data, error, isValidating } = useSWR(API_URL, fetcher, accessToken ? { refreshInterval: 10000 } : {})

  return {
    user: data,
    error,
    isLoading: !data && !error,
    isValidating
  }
}
