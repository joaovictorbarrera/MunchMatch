import { Meal } from "../components/HomeSteps/MealSelectionStep";

export function isReadyToProcessResult(acceptedMeals: Meal[]): boolean {
    return (isEnoughMeals(acceptedMeals) && isOneOfEachType(acceptedMeals))
}

export function isEnoughMeals(acceptedMeals: Meal[]) {
    return acceptedMeals.length >= 30
}

export function isOneOfEachType(acceptedMeals: Meal[]) {
    return acceptedMeals.filter(meal => meal.dishTypes.includes('breakfast')).length > 0 && acceptedMeals.filter(meal => meal.dishTypes.includes('lunch')).length > 0 &&
    acceptedMeals.filter(meal => !meal.dishTypes.includes('lunch') && !meal.dishTypes.includes('breakfast') && !meal.dishTypes.includes('dinner')).length > 0 &&
    acceptedMeals.filter(meal => meal.dishTypes.includes('dinner')).length > 0
}
