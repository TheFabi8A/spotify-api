import { useContext } from 'react'
import useSpotifyAuth from '@/hooks/useSpotifyAuth'
import { Context } from '@/Context'
import { AnimePlayer } from '@/components/AnimePlayer'
import { VinylPlayer } from '@/components/VinylPlayer'
import { SpotifyIcon } from '@/components/Icons'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './components/ui/sheet'
import { Button } from './components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './components/ui/select'

function App () {
  const accessToken = localStorage.getItem('spotifyAccessToken')

  const { handleSpotifyAuth } = useSpotifyAuth()

  const { user } = useContext(Context)
  console.log(user)

  const { setPlayerTheme, PlayerTheme } = useContext(Context)

  return (
    <div className="grid place-items-center h-screen">
      {accessToken && user && (
        <Sheet>
          <SheetTrigger asChild>
            <Avatar className="fixed top-4 right-4 cursor-pointer w-16 h-16">
              <AvatarImage src={user.images[0].url} alt="@shadcn" />
              <AvatarFallback>{user.display_name}</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <div className='flex flex-col gap-10'>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-4">
                  <Avatar className="cursor-pointer w-16 h-16">
                    <AvatarImage src={user.images[0].url} alt="@shadcn" />
                    <AvatarFallback>{user.display_name}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h2>{user.display_name}</h2>
                    <h3>{user.email}</h3>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <Select
                defaultValue={PlayerTheme}
                value={PlayerTheme}
                onValueChange={(value) => setPlayerTheme(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona el diseño del reproductor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Temas</SelectLabel>
                    <SelectItem value="Vinyl">Vinyl</SelectItem>
                    <SelectItem value="Anime">Anime</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  variant="destructive"
                  onClick={() => {
                    localStorage.removeItem('spotifyAccessToken')
                  }}>
                  Cerrar sesión
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
      {!accessToken && (
        <div className="flex flex-col gap-4 items-center max-w-[365px]">
          <button
            className="overflow-hidden text-lg tracking-wider box font-bold bg-spotify-green bg-clip-padding border-spotify-green border-b-2 border-r-2 border-dashed transition-all duration-300 rounded-md text-white flex items-center gap-4 p-4 h-max hover:shadow-xl hover:-translate-y-2"
            onClick={handleSpotifyAuth}>
            Iniciar sesión con Spotify
            <SpotifyIcon className="w-10 fill-white" />
          </button>
          <p className="text-balance">
            Si desea cambiar de cuenta, tambien debe cerrar sesión en la página
            de{' '}
            <a
              className="underline decoration-2 text-spotify-green decoration-spotify-green"
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer">
              Spotify
            </a>
          </p>
        </div>
      )}
      {accessToken && (
        <>
          {PlayerTheme === 'Vinyl' && <VinylPlayer />}
          {PlayerTheme === 'Anime' && <AnimePlayer />}
        </>
      )}
    </div>
  )
}

export default App
