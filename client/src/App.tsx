import { useState } from 'react'
import './App.css'
import { defaultQuestionnaire, Questionnaire, QuestionnaireContext } from './contexts/QuestionnaireContext';
import { Meal } from './components/HomeSteps/MealSelectionStep';
import NavBar from './components/NavBar';
import { AcceptedMealContext } from './contexts/AcceptedMealContext';
import Home from './components/HomeSteps/Home';
import About from './components/ExtraPages/About';
import Contact from './components/ExtraPages/Contact';
import Mission from './components/ExtraPages/Mission';


function App() {
  return (
    <div className='w-full min-h-screen bg-mm-bg flex justify-center relative'>
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
        [3, <Mission />],
        [4, <Contact />]
    ]
  )

  return (
  <div className='w-full bg-mm-bg flex justify-center'>
    <div className='w-[1200px] flex flex-col text-black'>
      <NavBar page={page} setPage={setPage} />
      <main className='text-xl flex pt-5'>
        <QuestionnaireContext.Provider value={{questionnaire, setQuestionnaire}}>
          <AcceptedMealContext.Provider value={{acceptedMeals, setAcceptedMeals}}>
            {pageComponents.get(page)}
          </AcceptedMealContext.Provider>
        </QuestionnaireContext.Provider>
      </main>
      <footer className='mt-auto p-5'>
          <p className='text-mm-text text-center'>2025 All rights reserved. Made by the Munch Match Team.</p>
      </footer>
    </div>
  </div>
)
}

export default App
