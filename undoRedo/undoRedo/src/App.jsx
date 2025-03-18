import { useState } from 'react'
import './App.css'

function App() {

  const [dots, setDots] = useState([]);
  const [undos,setUndos] = useState([])


  const handleClick = (e) => {

    let pageY = e.pageY
    let pageX = e.pageX

    setDots(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        top: `${pageY-35}px`,
        left: `${pageX-5}px`
      }
    ]);
  };

  const handleUndo = (e) => {
    let lastDot = dots.pop()
    if(lastDot) {
      setUndos(prev => [
        ...prev,
        lastDot
      ])
    }
  }

  const handleRedo = (e) => {
    let lastUndo = undos.pop()
    if(lastUndo) {
      setDots(prev => [
        ...prev,
        lastUndo
      ])
    }
  }

  return (
    <>
      <div className='buttons'>
        <button onClick={() => handleUndo()}>Undo</button>
        <button onClick={() => handleRedo()}>Redo</button>
      </div>
      <div onClick={(e) => handleClick(e)} className='main'>
        {dots.map((dot, idx) => (
          <div key={dot.id} className='dot' style={{ position: 'absolute', top: dot.top, left: dot.left }}></div>
        ))}
      </div>

    </>
  )
}

export default App
