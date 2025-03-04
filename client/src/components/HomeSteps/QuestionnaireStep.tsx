import { useContext, useState } from "react"
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import Calories from "../Questionnaire/Calories";
import Intro from "../Questionnaire/Intro";
import Nutrition from "../Questionnaire/Nutrition";
import Restrictions from "../Questionnaire/Restrictions";
import Confirmation from "../Questionnaire/Confirmation";

function QuestionnaireStep({handleNextPage}: {handleNextPage: () => void}) {
    const [step, setStep] = useState<number>(0);

    function handleBack() {
        setStep(step => {
            if (step == 1) return step
            return step - 1
        })
    }

    function handleNext() {
        setStep(step => {
            if (step == 4) return step
            return step + 1
        })
    }

    const stepComponents = new Map([
        [0, <Intro handleNext={handleNext} />],
        [1, <Calories />],
        [2, <Nutrition />],
        [3, <Restrictions />],
        [4, <Confirmation />]
    ])

    return (
        <div className="w-full p-5 py-10 border-y-2 flex flex-col gap-30 border-mm-text">
            <div className="h-[300px] flex items-center justify-center">
                {stepComponents.get(step)}
            </div>
            {step > 0 ?
            <div className="flex flex-col items-center gap-10">
                <Navigation step={step} handleBack={handleBack} handleNext={handleNext} handleNextPage={handleNextPage} />
                <div className="flex w-full border-y-2 border-gray-300 border-dashed">
                    <hr className="border-t-2 border-mm-text" style={{width:`${step*25}%`}} />
                    <hr className="border-t-2 w-${3*(4-step)}/12 border-mm-primary" style={{width:`${(4-step)*25}%`}}/>
                </div>
            </div> : null}
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

    return (
    <div className="inline-flex">
        {step > 1 ?
        <button onClick={handleBack} disabled={step <= 1} className="cursor-pointer bg-mm-primary hover:brightness-90 text-mm-text border-[1px] border-mm-text py-2 px-10 disabled:border-0 disabled:text-gray-400 disabled:bg-gray-300 disabled:hover:bg-auto disabled:cursor-auto">
            Back
        </button> :
        null}
        <button onClick={step == 4 ? handleNextPage : handleNext} disabled={questionnaire.calories == -1} className="cursor-pointer bg-mm-primary hover:brightness-90 text-mm-text border-[1px] border-mm-text py-2 px-10 disabled:border-0 disabled:text-gray-400 disabled:bg-gray-300 disabled:hover:bg-auto disabled:cursor-auto">
            Next
        </button>
    </div>
    )
}

export default QuestionnaireStep
