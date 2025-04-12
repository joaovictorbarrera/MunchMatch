import { useContext } from "react"
import { AcceptedMealContext } from "../../../contexts/AcceptedMealContext"

export default function MealTypeCounter() {
    const {acceptedMeals} = useContext(AcceptedMealContext)

    return (
    <div className="grid grid-cols-2 w-fit gap-1 text-start text-nowrap text-sm">
        <span>Lunch: {acceptedMeals.filter(meal => meal.dishTypes.includes('lunch')).length}</span>
        <span>Breakfast: {acceptedMeals.filter(meal => meal.dishTypes.includes('breakfast')).length}</span>
        <span>Snack: {acceptedMeals.filter(meal => !meal.dishTypes.includes('lunch') && !meal.dishTypes.includes('breakfast') && !meal.dishTypes.includes('dinner') ).length}</span>
        <span>Dinner: {acceptedMeals.filter(meal => meal.dishTypes.includes('dinner')).length}</span>
    </div>)
}
