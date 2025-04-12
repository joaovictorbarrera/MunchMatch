import { useContext } from "react"
import { AcceptedMealContext } from "../../../contexts/AcceptedMealContext"
import { isEnoughMeals, isOneOfEachType } from "../../../extra/isReadyToProcessResult"

function ResultRequirements() {
    const {acceptedMeals} = useContext(AcceptedMealContext)

    return (
        <div className="w-full text-start">
            <p>{isEnoughMeals(acceptedMeals) ? "✅" : "❌"} Accepted 30 meals</p>
            <p>{isOneOfEachType(acceptedMeals) ? "✅" : "❌"} Selected One Meal of Each Type</p>
        </div>
    )
}

export default ResultRequirements
