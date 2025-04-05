import { createContext } from "react";
import { Meal } from "../components/HomeSteps/MealSelectionStep";

interface AcceptedMealContext {
    acceptedMeals: Meal[],
    setAcceptedMeals: React.Dispatch<React.SetStateAction<Meal[]>>
}

export const AcceptedMealContext = createContext<AcceptedMealContext>({acceptedMeals: [], setAcceptedMeals: () => {}});
