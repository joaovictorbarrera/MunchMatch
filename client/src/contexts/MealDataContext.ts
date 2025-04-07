import { createContext } from "react";
import { Meal } from "../components/HomeSteps/MealSelectionStep";

interface MealDataContext {
    mealData: Meal[],
    setMealData: React.Dispatch<React.SetStateAction<Meal[]>>,
    currentMealIndex: number,
    setCurrentMealIndex: React.Dispatch<React.SetStateAction<number>>
}

export const MealDataContext = createContext<MealDataContext>({mealData: [], setMealData: () => {}, currentMealIndex: 0, setCurrentMealIndex: () => {}});
