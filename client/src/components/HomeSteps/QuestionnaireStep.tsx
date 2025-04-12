import { useContext } from "react"
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import Calories from "../Questionnaire/Calories";
import Intro from "../Questionnaire/Intro";
import Nutrition from "../Questionnaire/Nutrition";
import Restrictions from "../Questionnaire/Restrictions";
import Confirmation from "../Questionnaire/Confirmation";
import { MealDataContext } from "../../contexts/MealDataContext";
import { AcceptedMealContext } from "../../contexts/AcceptedMealContext";

export interface inputPartProps {
    cleanData: () => void
}

function QuestionnaireStep({step, setStep, handleNextPage}: {step: number, setStep: React.Dispatch<React.SetStateAction<number>>, handleNextPage: () => void}) {
    const MAX_STEPS = 4
    const {setMealData, setCurrentMealIndex} = useContext(MealDataContext)
    const {setAcceptedMeals} = useContext(AcceptedMealContext)

    function handleBack() {
        setStep(step => {
            if (step == 1) return step
            return step - 1
        })
    }

    function handleNext() {
        setStep(step => {
            if (step == MAX_STEPS) return step
            return step + 1
        })
    }

    function cleanData() {
        setMealData([])
        setCurrentMealIndex(0)
        setAcceptedMeals([])
    }

    const stepComponents = new Map([
        [0, <Intro handleNext={handleNext} />],
        [1, <Calories cleanData={cleanData} />],
        [2, <Nutrition cleanData={cleanData}  />],
        [3, <Restrictions cleanData={cleanData} />],
        [4, <Confirmation />]
    ])

    return (
        <div className="w-full p-5 py-10 border-b-2 flex flex-col gap-30 border-mm-text">
            <div className=" flex items-center justify-center">
                {stepComponents.get(step)}
            </div>
            {step > 0 &&
            <div className="flex flex-col items-center gap-10">
                <Navigation step={step} handleBack={handleBack} handleNext={handleNext} handleNextPage={handleNextPage} />
                <div className="flex w-full border-y-2 border-gray-300 border-dashed">
                    <hr className="border-t-3 border-mm-text" style={{width:`${step*(100.0/MAX_STEPS)}%`}} />
                    <hr className="border-t-3 border-mm-secondary" style={{width:`${(MAX_STEPS-step)*(100.0/MAX_STEPS)}%`}}/>
                </div>
            </div>}
        </div>
    )
}

interface NavigationProps {
    step: number,
    handleBack: () => void,
    handleNext: () => void,
    handleNextPage: () => void
}

function Navigation({step, handleBack, handleNext, handleNextPage}: NavigationProps) {
    const {questionnaire,} = useContext(QuestionnaireContext)

      function progress() {
        if(step == 4) handleNextPage()
        else handleNext()
      }

    return (
    <div className="inline-flex">
        {step > 1 ?
        <button onClick={handleBack} disabled={step <= 1} className="cursor-pointer bg-mm-primary hover:brightness-90 text-mm-text border-[1px] border-mm-text py-2 px-10 disabled:border-0 disabled:text-gray-400 disabled:bg-gray-300 disabled:hover:bg-auto disabled:cursor-auto">
            Back
        </button> :
        null}
        <button onClick={progress} disabled={questionnaire.calories == -1} className="cursor-pointer bg-mm-primary hover:brightness-90 text-mm-text border-[1px] border-mm-text py-2 px-10 disabled:border-0 disabled:text-gray-400 disabled:bg-gray-300 disabled:hover:bg-auto disabled:cursor-auto">
            Next
        </button>
    </div>
    )
}

export default QuestionnaireStep
