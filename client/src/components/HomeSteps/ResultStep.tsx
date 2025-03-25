import { useContext, useEffect, useState } from "react"
import { Meal } from "./MealSelectionStep"
import { AcceptedMealContext } from "../../contexts/AcceptedMealContext";
import { defaultQuestionnaire, QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import MealModal from "./Modals/MealModal";
import EmailModal from "./Modals/EmailModal";

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
        const URL = import.meta.env.DEV ? import.meta.env.VITE_API_URL + "/results" : "/results"
        //TODO
        fetch(`/results`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(acceptedMeals)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setResult(data)
        })
    }

    useEffect(() => {
        fetchResult()
    }, [])

    return (
        <div className="flex flex-col gap-5 mb-20">
            <h1 className="text-4xl text-mm-text my-10">Meal Plans</h1>
            <div className="flex flex-col gap-20">
                {result?.mealPlans.map((mealPlan, index) => {
                    const fullNutrition = {
                        calories: mealPlan.breakfast.nutrition.calories + mealPlan.lunch.nutrition.calories + mealPlan.snack.nutrition.calories + mealPlan.dinner.nutrition.calories,
                        protein: mealPlan.breakfast.nutrition.protein + mealPlan.lunch.nutrition.protein + mealPlan.snack.nutrition.protein + mealPlan.dinner.nutrition.protein,
                        carbs: mealPlan.breakfast.nutrition.carbs + mealPlan.lunch.nutrition.carbs + mealPlan.snack.nutrition.carbs + mealPlan.dinner.nutrition.carbs,
                        fat: mealPlan.breakfast.nutrition.fat + mealPlan.lunch.nutrition.fat + mealPlan.snack.nutrition.fat + mealPlan.dinner.nutrition.fat,
                    }

                    return (
                    <div key={JSON.stringify(mealPlan)} className="flex flex-col gap-10 mb-10">
                        <h2 className="text-mm-text text-3xl" >Option {index+1}</h2>

                        <table className="text-nowrap resultTable">
                            <thead>
                                <th className="!border-none"></th>
                                <th className="text-start text-mm-text">Dish</th>
                                <th className="text-mm-text">Calories</th>
                                <th className="text-mm-text">Carbs</th>
                                <th className="text-mm-text">Protein</th>
                                <th className="text-mm-text">Fat</th>
                            </thead>
                            <tbody>
                                <MealRow meal={mealPlan.breakfast} />
                                <MealRow meal={mealPlan.lunch} />
                                <MealRow meal={mealPlan.snack} />
                                <MealRow meal={mealPlan.dinner} />

                                <tr className="">
                                    <td className=" text-yellow-600">Total</td>
                                    <td></td>
                                    <td>{fullNutrition.calories} kcal</td>
                                    <td>{fullNutrition.carbs}g</td>
                                    <td>{fullNutrition.protein}g</td>
                                    <td>{fullNutrition.fat}g</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    )
                })}
            </div>
            <ResultButtons />
        </div>
    )
}

function ResultButtons() {
    const {setAcceptedMeals} = useContext(AcceptedMealContext)
    const {setQuestionnaire} = useContext(QuestionnaireContext)
    const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);

    function clearAndStartOver() {
        setQuestionnaire(defaultQuestionnaire)
        setAcceptedMeals([])
        window.location.reload()
    }

    return (
        <div className="flex">
            <button onClick={clearAndStartOver} type="button" className="cursor-pointer bg-mm-secondary text-mm-text py-2 px-4 hover:brightness-90">Start Over</button>
            <button onClick={() => setEmailModalOpen(true)} type="button" className="cursor-pointer bg-mm-secondary text-mm-text py-2 px-4 hover:brightness-90">Send to email</button>
            {emailModalOpen && <EmailModal setOpen={setEmailModalOpen} />}
        </div>
    )
}

function MealRow({meal}: {meal: Meal}) {
    const [modalOpen, setOpen] = useState<boolean>(false);

    return (
        <>
        {modalOpen && <MealModal mealData={meal} setOpen={setOpen} />}
        <tr className="text-wrap">
            <td className="text-mm-text capitalize">{meal.type}</td>
            <td><button onClick={() => setOpen(true)} className="cursor-pointer underline">{meal.title}</button></td>
            <td>{meal.nutrition.calories} kcal</td>
            <td>{meal.nutrition.carbs}g</td>
            <td>{meal.nutrition.protein}g</td>
            <td>{meal.nutrition.fat}g</td>
        </tr>
        </>
    )
}

export default ResultStep
