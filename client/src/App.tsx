import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className='w-full h-screen bg-gray-100 flex justify-center'>
      <Window />
    </div>
  )
}

function Window() {
  const [state, setState] = useState<number>(1)

  function handleNext() {
    setState(state => {
      return state + 1 > 3 ? 1 : state + 1
    })
  }

  const stepComponents = new Map(
    [
        [1, <MockComponentPart handleNext={handleNext} text="Questions" />],
        [2, <MockComponentPart handleNext={handleNext} text="Approve/Reject" />],
        [3, <MockComponentPart handleNext={handleNext} text="Results" />]
    ]
  )
  return (
  <div className='w-[1000px] bg-gray-100 flex-col flex text-black'>
    <header className='flex'>
      <a className='pt-5 flex items-center gap-1' href='/'>
        <img className="h-9" src="/swipe.png" alt="" />
        <h1 className='text-4xl inline'>MunchMatch</h1>
      </a>
    </header>
    <main className='text-xl flex flex-col flex-1 py-5'>
      {stepComponents.get(state)}

    </main>
  </div>
)
}

function MockComponentPart({text, handleNext}: {text:string, handleNext: () => void}) {
  return (
    <div className='flex flex-col p-3 justify-between text-3xl bg-gray-400 text-white h-full rounded-2xl'>
      {text}
      <div className='w-full flex justify-end'>
        <button onClick={handleNext} className='rounded-xl bg-yellow-600 hover:bg-yellow-500 py-2 px-4 cursor-pointer'>
            Next
        </button>
      </div>
    </div>
  )
}

export default App
