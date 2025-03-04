import { useState } from 'react'
import './App.css'
import { defaultQuestionnaire, Questionnaire, QuestionnaireContext } from './contexts/QuestionnaireContext';
import { Meal } from './components/HomeSteps/MealSelectionStep';
import NavBar from './components/NavBar';
import { AcceptedMealContext } from './contexts/AcceptedMealContext';
import Home from './components/HomeSteps/Home';
import About from './components/ExtraPages/About';
import Contact from './components/ExtraPages/Contact';


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

  const pageComponents = new Map(
    [
        [1, <Home />],
        [2, <About />],
        [3, <Contact />]
    ]
  )
  
  return (
  <div className='bg-mm-bg w-full flex justify-center'>
    <div className='w-[1200px] flex-col text-black'>
      <NavBar page={page} setPage={setPage} />
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
