import { useState, useEffect, useRef } from 'react'

function App() {
  const descriptions = [
    "Bienvenidos a mi portafolio. Cambia a la siguiente cancion para aprender mas sobre mi    ----->",
    "Me llamo Nelson Escalante. Soy estudiante de Ing. en Ciencias de la Computacion y soy apasionado por la musica. Ahora mismo estas escuchando mi cancion favorita: Cementerio Club",
    "Toco varios instrumentos: piano, guitarra, bajo y marimba!",
    "Ademas de los instrumentos, mi otro hobby son los videojuegos. Mis videojuegos favoritos son: Terraria, Spelunky, Enter the Gungeon y Civilization VI."
  ]

  const songTitle = [
    "Cats in mars",
    "Cementerio Club",
    "El Valle de la Esmeralda",
    "Jungle C"
  ]

  const songArtist = [
    "Seatbelts",
    "Pescado Rabioso",
    "Marimba Estrella de Guatemala",
    "Eirik Suhrke"
  ]

  const images = [
    "/src/assets/cats_on_mars.jpg",
    "/src/assets/cementerio_club.jpg",
    "/src/assets/valle_de_la_esmeralda.jpg",
    "/src/assets/jungle_c.jpg"
  ]

  const altText = [
    "Cats On Mars - Seatbelts",
    "Cementerio Club - Pescado Rabioso",
    "El Valle de la Esmeralda - Marimba Estrella de Guatemala",
    "Jungle C - Eirik Surhke"
  ]

  const songs = [
    "/src/assets/cats_on_mars.mp3",
    "/src/assets/cementerio_club.mp3",
    "/src/assets/valle_de_la_esmeralda.mp3",
    "/src/assets/jungle_c.mp3"
  ]

  const themes = [
    {
      backgroundColor: '#64181a',
      textColor: '#FEFEFE'
    },
    {
      backgroundColor: '#3F893E',
      textColor: '#FEFEFE'
    },
    {
      backgroundColor: '#D1E7F2',
      textColor: '#2B3236'
    },
    {
      backgroundColor: '#FFFFFF',
      textColor: '#251436'
    }
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
        audioRef.current.play().catch(() =>{
          setIsPlaying(false)
        })
      }
    }
  }, [index])

  const theme = themes[index]

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'auto',
        transition: 'background-color 0.5s, color 0.5s'
      }}
    >
      <div style={{
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        boxSizing: 'border-box'
      }}>
        
        <div 
          className='songbar'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}
        >
          <div 
            className='song' 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              marginBottom: '15px'
            }}
          >
            <img 
              src={images[index]} 
              alt={altText[index]} 
              style={{ 
                width: "130px",
                height: "130px",
                borderRadius: '8px',
                objectFit: 'cover',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)' 
              }} 
            />
            <div className='song-info'>
              <p style={{ 
                fontWeight: 'bold',
                margin: '0 0 5px 0',
                fontSize: '18px'
              }}>
                  {songTitle[index]}
              </p>
              <p style={{
                margin: '0',
                opacity: '0.8',
                fontSize: '14px'
              }}>
                {songArtist[index]}
              </p>
            </div>
          </div>

          <div 
            className='button-row' 
            style={{ 
              display: 'flex', 
              gap: '15px', 
              alignItems: 'center'
            }}
          >
            
            <button 
              onClick={prevSong}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: theme.textColor,
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s',
                backdropFilter: 'blur(5px)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              &lt;&lt;
            </button>

            <button 
              onClick={togglePausePlay}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: theme.textColor,
                padding: '12px 18px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '18px',
                transition: 'all 0.3s',
                backdropFilter: 'blur(5px)',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              {isPlaying ? '#' : '>'}
            </button>

            <button 
              onClick={nextSong}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: theme.textColor,
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s',
                backdropFilter: 'blur(5px)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              &gt;&gt;
            </button>

            <audio ref={audioRef} style={{ display: 'none' }}>
              <source src={songs[index]} type="audio/mp3" />
            </audio>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
          fontSize: '18px',
          lineHeight: '1.6',
          padding: '0 20px'
        }}>
          <p>{descriptions[index]}</p>
        </div>
      </div>
    </div>
  )
}

export default App
