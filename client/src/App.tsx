import { useEffect, useState } from 'react'
import './App.css'
import { defaultQuestionnaire, Questionnaire, QuestionnaireContext } from './contexts/QuestionnaireContext';
import { Meal } from './components/HomeSteps/MealSelectionStep';
import NavBar from './components/NavBar';
import Home from './components/HomeSteps/Home';
import About from './components/ExtraPages/About';
import Contact from './components/ExtraPages/Contact';
import Mission from './components/ExtraPages/Mission';
import { MealDataContext } from './contexts/MealDataContext';
import { ResultIdContext } from './contexts/ResultIdContext';


function App() {
  const [resultId, setResultId] = useState<number | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const resultId = queryParams.get('resultId');
    if (resultId && !isNaN(Number(resultId))) {
      setResultId(parseInt(resultId))
    }
  }, [])

  return (
    <div className='w-full min-h-screen bg-mm-bg flex justify-center relative'>
      <ResultIdContext.Provider value={{resultId, setResultId}}>
        <Window />
      </ResultIdContext.Provider>
    </div>
  )
}

function Window() {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>(defaultQuestionnaire);
  const [acceptedMeals, setAcceptedMeals] = useState<Meal[]>([]);

  const [page, setPage] = useState<number>(1)
  const [homePage, setHomePage] = useState<number>(1)

  const [currentMealIndex, setCurrentMealIndex] = useState<number>(0);
  const [mealData, setMealData] = useState<Meal[]>([])
  const [offset, setOffset] = useState<number>(0);

  const pageComponents = new Map(
    [
        [1, <Home page={homePage} setPage={setHomePage} />],
        [2, <About />],
        [3, <Mission />],
        [4, <Contact />]
    ]
  )

  return (
  <div className='w-full bg-mm-bg flex justify-center'>
    <div className='w-[1200px] flex flex-col text-black'>
      <NavBar page={page} setPage={setPage} />
      <main className='text-xl flex '>
        <QuestionnaireContext.Provider value={{questionnaire, setQuestionnaire}}>
          <MealDataContext.Provider value={{mealData, setMealData, currentMealIndex, setCurrentMealIndex, acceptedMeals, setAcceptedMeals, offset, setOffset}}>
            {pageComponents.get(page)}
          </MealDataContext.Provider>
        </QuestionnaireContext.Provider>
      </main>
      <footer className='mt-auto p-5 opacity-70 text-sm'>
          <p className='text-mm-text text-center'>2025 All rights reserved. Made by the Munch Match Team.</p>
      </footer>
    </div>
  </div>
)
}

export default App
