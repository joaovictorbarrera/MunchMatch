import { useState } from 'react'
import './App.css'
import { defaultQuestionnaire, Questionnaire, QuestionnaireContext } from './contexts/QuestionnaireContext';
import DishPage, { Meal } from './components/HomeSteps/MealSelectionStep';
import NavBar from './components/NavBar';
import QuestionnaireStep from './components/HomeSteps/QuestionnaireStep';
import ResultStep from './components/HomeSteps/ResultStep';
import { AcceptedMealContext } from './contexts/AcceptedMealContext';


function App() {
  return (
    <div className='w-full h-screen bg-gray-100 flex justify-center'>
      <Window />
    </div>
  )
}

function Window() {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>(defaultQuestionnaire);
  const [acceptedMeals, setAcceptedMeals] = useState<Meal[]>([]);
  const [page, setPage] = useState<number>(1)

  function handleNextPage() {
    setPage(state => {
      if (state == 3) return state
      return state + 1
    })
  }

  const pageComponents = new Map(
    [
        [1, <QuestionnaireStep handleNextPage={handleNextPage} />],
        [2, <DishPage handleNextPage={handleNextPage} />],
        [3, <ResultStep />]
    ]
  )

  return (
  <div className='bg-mm-bg w-full flex justify-center'>
    <div className='w-[1200px] flex-col text-black'>
      <NavBar />
      <main className='text-xl flex pt-5'>
        <QuestionnaireContext.Provider value={{questionnaire, setQuestionnaire}}>
          <AcceptedMealContext.Provider value={{acceptedMeals, setAcceptedMeals}}>
            {pageComponents.get(page)}
          </AcceptedMealContext.Provider>
        </QuestionnaireContext.Provider>
      </main>
    </div>
  </div>
)
}

export default App
