import { useState } from 'react'
import './App.css'
import QuestionnairePage from './components/QuestionnairePage'
import { defaultQuestionnaire, Questionnaire, QuestionnaireContext } from './contexts/QuestionnaireContext';
import DishPage from './components/DishPage';
import ResultPage from './components/ResultPage';


function App() {
  return (
    <div className='w-full h-screen bg-gray-100 flex justify-center'>
      <Window />
    </div>
  )
}

function Window() {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>(defaultQuestionnaire);
  const [page, setPage] = useState<number>(1)

  function handleNextPage() {
    setPage(state => {
      if (state == 3) return state
      return state + 1
    })
  }

  const pageComponents = new Map(
    [
        [1, <QuestionnairePage handleNextPage={handleNextPage} />],
        [2, <DishPage handleNextPage={handleNextPage} />],
        [3, <ResultPage />]
    ]
  )

  return (
  <div className='w-[1000px] bg-gray-100 flex-col text-black'>
    <header className='flex'>
      <a className='pt-5 flex items-center gap-1' href='/'>
        <img className="h-9" src="/swipe.png" alt="" />
        <h1 className='text-4xl inline'>MunchMatch</h1>
      </a>
    </header>
    <main className='text-xl flex pt-5'>
      <QuestionnaireContext.Provider value={{questionnaire, setQuestionnaire}}>
        {pageComponents.get(page)}
      </QuestionnaireContext.Provider>
    </main>
  </div>
)
}

export default App
