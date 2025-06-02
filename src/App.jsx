import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const descriptions = [
    "Bienvenidos a mi portafolio. Cambia a la siguiente cancion para aprender mas sobre mi    ----->",
    "Me llamo Nelson Escalante. Me apasiona la musica. Ahora mismo estas escuchando mi cancion favorita :)"
  ]

  const songTitle = [
    "Cats in mars",
    "Cementerio Club"
  ]

  const songArtist = [
    "Seatbelts",
    "Pescado Rabioso"
  ]

  const images = [
    "/src/assets/cats_on_mars.jpg",
    "/src/assets/cementerio_club.jpg"
  ]

  const altText = [
    "Cats On Mars - Seatbelts",
    "Cementerio Club - Pescado Rabioso"
  ]

  const songs = [
    "/src/assets/cats_on_mars.mp3",
    "/src/assets/cementerio_club.mp3"
  ]

  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef(null)

  const nextSong = () => {
    setIndex((prev) => (prev + 1) % descriptions.length)
    setIsPlaying(true)
  }

  const prevSong = () => {
    setIndex((prev) => (prev - 1 + descriptions.length) % descriptions.length)
    setIsPlaying(true)
  }

  const togglePausePlay = () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [index])

  return (
    <>
      <div className='songbar'>
        <div className='song'>
          <img src={images[index]} alt={altText[index]} style={{ width: "100px", height: "auto" }} />
          <div className='song-info'>
            <p>{songTitle[index]}</p>
            <p>{songArtist[index]}</p>
          </div>
        </div>
        <div className='button-row'>
          
          <button onClick={prevSong}>&lt;&lt;</button>

          <button onClick={togglePausePlay}>
            {isPlaying ? '#' : '>'}
          </button>

          <button onClick={nextSong}>&gt;&gt;</button>

          <audio ref={audioRef} style={{ display: 'none' }}>
            <source src={songs[index]} type="audio/mp3" />
          </audio>

        </div>
      </div>

      <p>{descriptions[index]}</p>
    </>
  )
}

export default App
