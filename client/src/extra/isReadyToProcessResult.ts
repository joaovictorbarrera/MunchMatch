import { Meal } from "../components/HomeSteps/MealSelectionStep";

export default function isReadyToProcessResult(acceptedMeals: Meal[]): boolean {
    return (acceptedMeals.length >= 30 && acceptedMeals.filter(meal => meal.dishTypes.includes('breakfast')).length > 0 && acceptedMeals.filter(meal => meal.dishTypes.includes('lunch')).length > 0 &&
    acceptedMeals.filter(meal => !meal.dishTypes.includes('lunch') && !meal.dishTypes.includes('breakfast') && !meal.dishTypes.includes('dinner')).length > 0 &&
    acceptedMeals.filter(meal => meal.dishTypes.includes('dinner')).length > 0)
}
