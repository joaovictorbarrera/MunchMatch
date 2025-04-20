import { useContext } from "react"
import { isEnoughMeals, isOneOfEachType } from "../../../extra/isReadyToProcessResult"
import MealTypeCounter from "./MealTypeCounter"
import { MealDataContext } from "../../../contexts/MealDataContext"

function ResultRequirements() {
    const {acceptedMeals} = useContext(MealDataContext)

    return (
        <div className="w-full text-start">
            <p>{isEnoughMeals(acceptedMeals) ? "✅" : "❌"} Accepted 30 meals</p>
            <p>{isOneOfEachType(acceptedMeals) ? "✅" : "❌"} Selected One Meal of Each Type</p>
            <MealTypeCounter />
        </div>
    )
}

export default ResultRequirements
