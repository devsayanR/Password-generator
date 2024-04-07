import { useCallback, useRef, useState,useEffect } from 'react'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charactersAllowed, setCharactersAllowed] = useState(false)

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (charactersAllowed) str += "!@#$%^&*(){}[]'|/~"
    if (numberAllowed) str += "0123456789"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charactersAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charactersAllowed, passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center pb-4'>Password Generator</h1>
        <div className='flex justify-center shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
          />
          <button className='bg-[#1D4ED8] text-white px-2' onClick={()=>copyPasswordToClipboard()}>Copy</button>
        </div>
        <div className='flex items-center'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer outline-none border-none' onChange={(e) => setLength(e.target.value)} ref={passwordRef} />
          <label className='ml-1 cursor-pointer'>Length: {length}</label>

          <input type="checkbox" id='numbers' defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} className='ml-3 cursor-pointer' />
          <label htmlFor='numbers' className='ml-1  cursor-pointer'>Numbers</label>

          <input type="checkbox" id='chars' defaultChecked={charactersAllowed} onChange={() => setCharactersAllowed((prev) => !prev)} className='ml-3 cursor-pointer' />
          <label htmlFor='chars' className='ml-1 cursor-pointer'>Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
