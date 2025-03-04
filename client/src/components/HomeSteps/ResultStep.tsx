import { useContext, useEffect, useState } from "react"
import { Meal } from "./MealSelectionStep"
import { AcceptedMealContext } from "../../contexts/AcceptedMealContext";

export interface MealPlan {
    breakfast: Meal,
    lunch: Meal,
    snack: Meal,
    dinner: Meal
}

export interface Result {
    resultID: number,
    mealPlans: MealPlan[]
}

function ResultStep() {
    const [result, setResult] = useState<Result>();
    const {acceptedMeals} = useContext(AcceptedMealContext)

    function fetchResult() {
        //TODO
        fetch(`${import.meta.env.VITE_API_URL}/results`, {
            method: 'post',
            body: JSON.stringify(acceptedMeals)
        })
        .then(res => res.json())
        .then(data => {
            setResult(data)
        })
    }

    useEffect(() => {
        fetchResult()
    }, [])

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">Results</h1>
            <div className="flex flex-col gap-6">
                {result?.mealPlans.map((mealPlan, index) => {
                    const fullNutrition = {
                        calories: mealPlan.breakfast.nutrition.calories + mealPlan.lunch.nutrition.calories + mealPlan.snack.nutrition.calories + mealPlan.dinner.nutrition.calories,
                        protein: mealPlan.breakfast.nutrition.protein + mealPlan.lunch.nutrition.protein + mealPlan.snack.nutrition.protein + mealPlan.dinner.nutrition.protein,
                        carbs: mealPlan.breakfast.nutrition.carbs + mealPlan.lunch.nutrition.carbs + mealPlan.snack.nutrition.carbs + mealPlan.dinner.nutrition.carbs,
                        fat: mealPlan.breakfast.nutrition.fat + mealPlan.lunch.nutrition.fat + mealPlan.snack.nutrition.fat + mealPlan.dinner.nutrition.fat,
                    }

                    return (
                    <div key={JSON.stringify(mealPlan)}>
                        <h2 className="font-semibold" >Meal Plan Option {index+1}</h2>

                        <table className="border-2 text-nowrap">
                            <tbody>
                                <tr>
                                    <td className="p-2 bg-gray-200">Breakfast</td>
                                    <td className="p-2"><button className="cursor-pointer underline">{mealPlan.breakfast.title}</button></td>
                                    <td className="p-2 bg-gray-200">Calories</td>
                                    <td className="p-2">{fullNutrition.calories}</td>
                                </tr>
                                <tr >
                                    <td className="p-2 bg-gray-200">Lunch</td>
                                    <td className="p-2"><button className="cursor-pointe underline">{mealPlan.lunch.title}</button></td>
                                    <td className="p-2 bg-gray-200">Protein</td>
                                    <td className="p-2">{fullNutrition.protein}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 bg-gray-200">Snack</td>
                                    <td className="p-2"><button className="cursor-pointer underline">{mealPlan.snack.title}</button></td>
                                    <td className="p-2 bg-gray-200">Carbs</td>
                                    <td className="p-2">{fullNutrition.carbs}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 bg-gray-200">Dinner</td>
                                    <td className="p-2"><button className="cursor-pointer underline">{mealPlan.dinner.title}</button></td>
                                    <td className="p-2 bg-gray-200">Fat</td>
                                    <td className="p-2">{fullNutrition.fat}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ResultStep
