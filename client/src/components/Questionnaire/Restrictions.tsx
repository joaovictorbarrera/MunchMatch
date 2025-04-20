import { ChangeEvent, useContext } from "react"
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext"
import { inputPartProps } from "../HomeSteps/QuestionnaireStep"

function Restrictions({cleanData}: inputPartProps) {
    const {questionnaire, setQuestionnaire} = useContext(QuestionnaireContext)

    function handleRestrictionChange(e: ChangeEvent<HTMLInputElement>, type: "lactoseFree" | "glutenFree" | "vegetarian") {
        setQuestionnaire(q => {
            q.restrictions[type] = e.target.checked
            return {...q}
        })

        cleanData()
    }

    return (
        <div className="flex flex-col gap-10 text-mm-text items-center">
            <h1 className="lg:text-2xl ">Do you have any dietary restrictions?</h1>
            <form onSubmit={e => e.preventDefault()} action="" className="flex flex-col gap-5">
                <label className="flex items-center gap-5"><input className="bg-mm-text border-b-[1px] border-mm-text p-2" onChange={e => handleRestrictionChange(e, "lactoseFree")} defaultChecked={questionnaire.restrictions.lactoseFree} type="checkbox" /> Lactose-Free Only</label>

                <label className="flex items-center gap-5"><input className="bg-mm-text border-b-[1px] border-mm-text p-2" onChange={e => handleRestrictionChange(e, "glutenFree")} defaultChecked={questionnaire.restrictions.glutenFree} type="checkbox" /> Gluten-Free Only</label>

                <label className="flex items-center gap-5"><input className="bg-mm-text border-b-[1px] border-mm-text p-2" onChange={e => handleRestrictionChange(e, "vegetarian")} defaultChecked={questionnaire.restrictions.vegetarian} type="checkbox" /> Vegetarian Only</label>

            </form>
        </div>
    )
}

export default Restrictions
