import { ChangeEvent, useContext, useState } from "react"
import { QuestionnaireContext } from "../contexts/QuestionnaireContext";

function QuestionnairePage({handleNextPage}: {handleNextPage: () => void}) {
    const [step, setStep] = useState<number>(0);

    function handleBack() {
        setStep(step => {
            if (step == 1) return step
            return step - 1
        })
    }

    function handleNext() {
        setStep(step => {
            if (step == 3) return step
            return step + 1
        })
    }

    const stepComponents = new Map([
        [0, <Intro handleNext={handleNext} />],
        [1, <StepOne />],
        [2, <StepTwo />],
        [3, <StepThree />]
    ])

    return (
        <div className="w-full bg-gray-200 p-5 rounded-md">
            {stepComponents.get(step)}
            {step > 0 ? <div className="flex items-center justify-between">
                <Navigation step={step} handleBack={handleBack} handleNext={handleNext} handleNextPage={handleNextPage} />
                <div className="">Questionnaire {step}/3</div>
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
        <button onClick={handleBack} disabled={step <= 1} className="cursor-pointer bg-teal-800 hover:bg-teal-900 text-white py-2 px-4 rounded-l disabled:bg-gray-300 disabled:hover:bg-auto disabled:cursor-auto">
            Back
        </button>
        {step < 3 ?
            <button onClick={handleNext} disabled={step == 3 || questionnaire.calories == -1} className="cursor-pointer bg-teal-800 hover:bg-teal-900 text-white py-2 px-4 rounded-r disabled:bg-gray-300 disabled:hover:bg-auto disabled:cursor-auto">
            Next
            </button> :
            <button onClick={handleNextPage} className="cursor-pointer bg-blue-800 hover:brightness-90 text-white py-2 px-4 rounded-r">
                Submit
            </button>}

    </div>
    )
}

function Intro({handleNext}: {handleNext: () => void}) {
    return (
        <div className="flex flex-col w-full h-[500px] justify-center items-center gap-4">
            <h2 className="text-6xl font-light">Welcome to MunchMatch.</h2>
            <button onClick={handleNext} className="cursor-pointer bg-teal-800 hover:bg-teal-900 text-white py-2 px-4 rounded">
                Start
            </button>
        </div>
    )
}

function StepOne() {
    const {questionnaire, setQuestionnaire} = useContext(QuestionnaireContext)

    function handleCalorieChange(e: ChangeEvent<HTMLInputElement>) {
        console.log("change")
        setQuestionnaire(q => {
            q.calories = e.target.value == "" ? -1 : Number(e.target.value)
            return {...q}
        })

    }

    return (
        <div className="flex flex-col gap-2 h-[300px]">
            <h1 className="font-semibold">Calories</h1>
            <form onSubmit={e => e.preventDefault()} className="flex flex-col" action="">
                <label htmlFor="calories-input">How many calories would you like to eat daily?</label>
                <input className="border-2 border-gray-400 bg-white rounded-md w-30" id="calories-input" min={500} defaultValue={questionnaire.calories == -1 ? undefined : questionnaire.calories} onChange={handleCalorieChange} type="number" />
            </form>
        </div>
    )

}

function StepTwo() {
    const {questionnaire, setQuestionnaire} = useContext(QuestionnaireContext)

    function handleNutritionChange(e: ChangeEvent<HTMLInputElement>, type: "protein" | "carbs" | "fat") {
        setQuestionnaire(q => {
            q.nutrition[type] = e.target.value == "" ? -1 : Number(e.target.value)
            return {...q}
        })
    }

    return (
        <div className="flex flex-col gap-2  h-[300px]">
            <h1 className="font-semibold">Nutrition <span className="text-sm font-light">(Leave blank if no specific amount)</span></h1>
            <form onSubmit={e => e.preventDefault()} action="" className="flex flex-col">
                <label htmlFor="protein-input">Protein</label>
                <input className="border-2 border-gray-400 bg-white rounded-md w-30" id="protein-input" onChange={e => handleNutritionChange(e, "protein")} type="number" min={0} defaultValue={questionnaire.nutrition.protein == -1 ? undefined : questionnaire.nutrition.protein}/>

                <label htmlFor="carbs-input">Carbohydrates</label>
                <input className="border-2 border-gray-400 bg-white rounded-md w-30" id="carbs-input" onChange={e => handleNutritionChange(e, "carbs")} type="number" min={0} defaultValue={questionnaire.nutrition.carbs == -1 ? undefined : questionnaire.nutrition.carbs}/>

                <label htmlFor="fat-input">Fat</label>
                <input className="border-2 border-gray-400 bg-white rounded-md w-30" id="fat-input" onChange={e => handleNutritionChange(e, "fat")} type="number" min={0} defaultValue={questionnaire.nutrition.fat == -1 ? undefined : questionnaire.nutrition.fat}/>
            </form>
        </div>
    )
}

function StepThree() {
    const {questionnaire, setQuestionnaire} = useContext(QuestionnaireContext)

    function handleRestrictionChange(e: ChangeEvent<HTMLInputElement>, type: "lactoseFree" | "glutenFree" | "vegetarian") {
        setQuestionnaire(q => {
            q.restrictions[type] = e.target.checked
            return {...q}
        })
    }

    return (
        <div className="flex flex-col gap-2 h-[300px] items-start">
            <h1 className="font-semibold">Restrictions</h1>
            <form onSubmit={e => e.preventDefault()} action="" className="flex flex-col">
                <label htmlFor=""><input onChange={e => handleRestrictionChange(e, "lactoseFree")} defaultChecked={questionnaire.restrictions.lactoseFree} type="checkbox" /> Lactose-Free Only</label>

                <label htmlFor=""><input onChange={e => handleRestrictionChange(e, "glutenFree")} defaultChecked={questionnaire.restrictions.glutenFree} type="checkbox" /> Gluten-Free Only</label>

                <label htmlFor=""><input onChange={e => handleRestrictionChange(e, "vegetarian")} defaultChecked={questionnaire.restrictions.vegetarian} type="checkbox" /> Vegetarian Only</label>

            </form>
        </div>
    )
}

export default QuestionnairePage
