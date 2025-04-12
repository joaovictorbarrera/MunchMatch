import { ChangeEvent, useContext } from "react"
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext"
import { inputPartProps } from "../HomeSteps/QuestionnaireStep"

function Calories({cleanData}: inputPartProps) {
    const {questionnaire, setQuestionnaire} = useContext(QuestionnaireContext)

    function handleCalorieChange(e: ChangeEvent<HTMLInputElement>) {
        setQuestionnaire(q => {
            q.calories = e.target.value == "" ? -1 : Number(e.target.value)
            return {...q}
        })

        cleanData()
    }

    return (
        <div className="flex flex-col gap-2">
            <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-10 items-center" action="">
                <h1 className="text-mm-text text-2xl">How many calories would you like to eat daily?</h1>
                <input defaultValue={questionnaire.calories == -1 ? undefined : questionnaire.calories} onChange={handleCalorieChange} className="bg-mm-primary rounded-sm  border-b-[1px] border-mm-text p-2" min={500} type="number" />
            </form>
        </div>
    )

}

export default Calories
