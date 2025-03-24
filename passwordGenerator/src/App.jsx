import { useState } from 'react'
import './App.css'

function App() {

  const [password,setPassword] = useState("")
  const [length,setLength] = useState(10)

  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [number, setNumber] = useState(false)
  const [special, setSpecial] = useState(false)

  const numberInputs = "1234567890"
  const lowercaseInputs= "abcdefghijklmnopqrstuvwxyz"
  const uppercaseInputs= "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const specialInputs= "!@#$%^&*()_+-=[]{}|;:'\,.<>?/~"

  const generatePassword = () => {
    let chars = []
    let pw = ""

    if(uppercase) chars += uppercaseInputs
    if(lowercase) chars += lowercaseInputs
    if(number) chars += numberInputs
    if(special) chars += specialInputs

    if(chars.length <= 0) return "Can not generate password!"

    if(length < 10) return "Length must be bigger than 10"
    if(length > 40) return "Length must be less than 40"

    for (let index = 0; index < length; index++) {
      pw += chars[Math.floor(Math.random()*chars.length)]
      
    }

    setPassword(pw)

  }

  console.log(password)

  return (
    <>
      <div className="main-container">
        <div className="checkbox-container">
          <div className='checkboxes'>
            <label htmlFor="uppercase" >Uppercase</label>
            <input onChange={() => setUppercase(!uppercase)} name='uppercase' type="checkbox" />
          </div>
          <div className='checkboxes'>
            <label htmlFor="lowercase" >Lowercase</label>
            <input onChange={() => setLowercase(!lowercase)} name='lowercase' type="checkbox" />
          </div>
          <div className='checkboxes'>
            <label htmlFor="number" >Number</label>
            <input onChange={() => setNumber(!number)} name='number' type="checkbox" />
          </div>
          <div className='checkboxes'>
            <label htmlFor="special" >Special character</label>
            <input onChange={() => setSpecial(!special)} name='special' type="checkbox" />
          </div>
        </div>
        <div className='button-container'>
          <button className='btn' onClick={() => generatePassword(length)}>Generate Password</button>
          <button className='btn' onClick={() => setPassword("")}>Clear Password</button>
        </div>
        <div className="password-container">
          <input placeholder='Password' value={password} className='passwordInput' type="text" />
          <input placeholder='Length' value={length} onChange={(e) => setLength(e.target.value)} className='passwordInput' type="number" min={10} max={40} />
          <button>Copy</button>
        </div>
      </div>
    </>
  )
}

export default App
