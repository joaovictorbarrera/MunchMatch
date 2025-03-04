import { ChangeEvent, useContext } from 'react'
import { QuestionnaireContext } from '../../contexts/QuestionnaireContext'

function Nutrition() {
    const {questionnaire, setQuestionnaire} = useContext(QuestionnaireContext)

    function handleNutritionChange(e: ChangeEvent<HTMLInputElement>, type: "protein" | "carbs" | "fat") {
        setQuestionnaire(q => {
            q.nutrition[type] = e.target.value == "" ? -1 : Number(e.target.value)
            return {...q}
        })
    }

    return (
        <div className="flex flex-col gap-5 text-mm-text text-center">
            <div>
                <h1 className="text-2xl">Please enter your target nutrition in grams:</h1>
                <p className="text-md font-light">(Leave blank if no specific amount)</p>
            </div>
            <form onSubmit={e => e.preventDefault()} action="" className="flex flex-col items-center w-full gap-5">
                <div className='flex flex-col'>
                    <label htmlFor="protein-input">Protein </label>
                    <input className="bg-mm-primary rounded-sm border-b-[1px] border-mm-text p-2" id="protein-input" onChange={e => handleNutritionChange(e, "protein")} type="number" min={0} defaultValue={questionnaire.nutrition.protein == -1 ? undefined : questionnaire.nutrition.protein}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="carbs-input">Carbohydrates</label>
                    <input className="bg-mm-primary rounded-sm border-b-[1px] border-mm-text p-2" id="carbs-input" onChange={e => handleNutritionChange(e, "carbs")} type="number" min={0} defaultValue={questionnaire.nutrition.carbs == -1 ? undefined : questionnaire.nutrition.carbs}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="fat-input">Fat</label>
                    <input className="bg-mm-primary rounded-sm border-b-[1px] border-mm-text p-2" id="fat-input" onChange={e => handleNutritionChange(e, "fat")} type="number" min={0} defaultValue={questionnaire.nutrition.fat == -1 ? undefined : questionnaire.nutrition.fat}/>
                </div>
            </form>
        </div>
    )
}

export default Nutrition
