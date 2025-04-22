import { useContext, useEffect } from "react"
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import Calories from "../Questionnaire/Calories";
import Intro from "../Questionnaire/Intro";
import Nutrition from "../Questionnaire/Nutrition";
import Restrictions from "../Questionnaire/Restrictions";
import Confirmation from "../Questionnaire/Confirmation";
import { MealDataContext } from "../../contexts/MealDataContext";

export interface inputPartProps {
    cleanData: () => void
}

function QuestionnaireStep({step, setStep, setPage}: {step: number, setStep: React.Dispatch<React.SetStateAction<number>>, setPage: React.Dispatch<React.SetStateAction<number>>}) {
    const MAX_STEPS = 4
    const {setMealData, setCurrentMealIndex, setAcceptedMeals, setOffset} = useContext(MealDataContext)
    const {questionnaire} = useContext(QuestionnaireContext)

    function handleBack() {
        setStep(step => {
            if (step == 1) return step
            return step - 1
        })
    }

    function isQuestionnaireValid() {
        if (questionnaire.calories !== -1 && questionnaire.calories < 500) {
            window.alert("Calories too low. 500 is the minimum amount allowed.")
            return false
        }

        if (questionnaire.nutrition.carbs < -1 || questionnaire.nutrition.protein < -1 || questionnaire.nutrition.fat < -1) {
            window.alert("Nutritional component cannot be negative")
            return false
        }

        return true
    }

    function handleNext() {
        if (!isQuestionnaireValid()) return

        setStep(step => {
            if (step >= MAX_STEPS) {
                setPage(2) // THIS FIRES TWICE AND THATSA BAD
                return step
            }
            return step + 1
        })
    }

    function cleanData() {
        setMealData([])
        setCurrentMealIndex(0)
        setAcceptedMeals([])
        setOffset(0)
    }

    const stepComponents = new Map([
        [0, <Intro handleNext={handleNext} />],
        [1, <Calories cleanData={cleanData} />],
        [2, <Nutrition cleanData={cleanData}  />],
        [3, <Restrictions cleanData={cleanData} />],
        [4, <Confirmation />]
    ])

    return (
        <div className="w-full p-5 py-10 border-b-2 flex flex-col gap-15 border-mm-text">
            <div className="flex items-center justify-center min-h-60">
                {stepComponents.get(step)}
            </div>
            {step > 0 &&
            <div className="flex flex-col items-center gap-10">
                <Navigation step={step} handleBack={handleBack} handleNext={handleNext} />
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
}

function Navigation({step, handleBack, handleNext}: NavigationProps) {
    const {questionnaire} = useContext(QuestionnaireContext)

    function handleKeyDown (event: KeyboardEvent)  {
        console.log(questionnaire.calories)
        if (event.key === 'Enter' && questionnaire.calories >= 500) handleNext()
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [questionnaire.calories]);

    return (
    <div className="inline-flex">
        {step > 1 ?
        <button onClick={handleBack} disabled={step <= 1} className="cursor-pointer bg-mm-primary hover:brightness-90 text-mm-text border-[1px] border-r-0 border-mm-text py-2 px-10 disabled:border-0 disabled:text-gray-400 disabled:bg-gray-300 disabled:hover:bg-auto disabled:cursor-auto">
            Back
        </button> :
        null}
        <button onClick={handleNext} disabled={questionnaire.calories < 500} className="cursor-pointer bg-mm-primary hover:brightness-90 text-mm-text border-[1px] border-mm-text py-2 px-10 disabled:border-0 disabled:text-gray-400 disabled:bg-gray-300 disabled:hover:bg-auto disabled:cursor-auto">
            Next
        </button>
    </div>
    )
}

export default QuestionnaireStep
