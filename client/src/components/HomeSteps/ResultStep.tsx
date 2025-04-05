import { useContext, useEffect, useState } from "react"
import { Meal } from "./MealSelectionStep"
import { AcceptedMealContext } from "../../contexts/AcceptedMealContext";
import { defaultQuestionnaire, QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import MealModal from "./Modals/MealModal";
import EmailModal from "./Modals/EmailModal";

export interface MealPlan {
    mealPlanID: number,
    meals: Meal[],
    resultId: number
}

export interface Result {
    resultID: number,
    mealPlans: MealPlan[]
}

function ResultStep() {
    const {questionnaire,} = useContext(QuestionnaireContext)
    const {acceptedMeals} = useContext(AcceptedMealContext)

    const [result, setResult] = useState<Result>();
    const [loading, setLoading] = useState<boolean>(true);

    function fetchResult() {
        const URL = import.meta.env.DEV ? import.meta.env.VITE_API_URL + "/results" : "/results"
        //TODO
        console.log("Sending out")
        console.log(JSON.stringify({questionnaire, acceptedMeals}))
        fetch(URL, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({questionnaire, acceptedMeals})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setResult(data as Result)
        })
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchResult()
    }, [])

    if (loading) return <div>Loading...</div>

    if (!result) return <div>Failed to get result</div>

    console.log(result)

    return (
        <div className="flex flex-col gap-5 mb-20">
            <h1 className="text-4xl text-mm-text my-10">Meal Plans</h1>
            <div className="flex flex-col gap-20">
                {result?.mealPlans.map((mealPlan, index) => {
                    console.log(mealPlan)
                    const fullNutrition = {
                        calories: mealPlan.meals[0].calories + mealPlan.meals[1].calories + mealPlan.meals[2].calories + mealPlan.meals[3].calories,
                        protein: mealPlan.meals[0].protein + mealPlan.meals[1].protein + mealPlan.meals[2].protein + mealPlan.meals[3].protein,
                        carbs: mealPlan.meals[0].carbs + mealPlan.meals[1].carbs + mealPlan.meals[2].carbs + mealPlan.meals[3].carbs,
                        fat: mealPlan.meals[0].fat + mealPlan.meals[1].fat + mealPlan.meals[2].fat + mealPlan.meals[3].fat,
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
                                <MealRow meal={mealPlan.meals[0]} />
                                <MealRow meal={mealPlan.meals[1]} />
                                <MealRow meal={mealPlan.meals[2]} />
                                <MealRow meal={mealPlan.meals[3]} />

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
            <td className="text-mm-text capitalize">{meal.dishTypes?.[0]}</td>
            <td><button onClick={() => setOpen(true)} className="cursor-pointer underline">{meal.title}</button></td>
            <td>{meal.calories} kcal</td>
            <td>{meal.carbs}g</td>
            <td>{meal.protein}g</td>
            <td>{meal.fat}g</td>
        </tr>
        </>
    )
}

export default ResultStep
