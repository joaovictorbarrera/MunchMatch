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

    return (
        <div className="flex flex-col gap-5 mb-20 p-5">
            <h1 className="text-4xl text-mm-text my-10">Meal Plans</h1>
            <div className="flex flex-col gap-20">
                {result?.mealPlans.map((mealPlan, index) => {
                    const fullNutrition = {
                        calories: mealPlan.meals[0].calories + mealPlan.meals[1].calories + mealPlan.meals[2].calories + mealPlan.meals[3].calories,
                        protein: mealPlan.meals[0].protein + mealPlan.meals[1].protein + mealPlan.meals[2].protein + mealPlan.meals[3].protein,
                        carbs: mealPlan.meals[0].carbs + mealPlan.meals[1].carbs + mealPlan.meals[2].carbs + mealPlan.meals[3].carbs,
                        fat: mealPlan.meals[0].fat + mealPlan.meals[1].fat + mealPlan.meals[2].fat + mealPlan.meals[3].fat,
                    }

                    return (
                    <div key={JSON.stringify(mealPlan)} className="flex flex-col gap-10 mb-10">
                        <h2 className="text-mm-text text-3xl" >Option {index+1}</h2>

                        <div className="md:hidden flex flex-col gap-5">
                            <MealCard meal={mealPlan.meals[0]} />
                            <MealCard meal={mealPlan.meals[1]} />
                            <MealCard meal={mealPlan.meals[2]} />
                            <MealCard meal={mealPlan.meals[3]} />
                            <Total fullNutrition={fullNutrition} />
                        </div>

                        <table className="md:table hidden text-nowrap resultTable">
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

function Total({fullNutrition}: {fullNutrition: {calories: number, fat: number, protein:number, carbs:number}}) {
    return (
        <div className="bg-mm-text text-mm-bg border-black border-2 rounded-xl p-5 flex flex-col text-lg gap-2">
            <strong className="underline">{fullNutrition.calories} Calories Total</strong>
            <div className="flex gap-3 text-black">
                <span className="bg-mm-secondary p-2 rounded-xl">Protein: {fullNutrition.protein}g</span>
                <span className="bg-mm-secondary p-2 rounded-xl">Carbs: {fullNutrition.carbs}g</span>
                <span className="bg-mm-secondary p-2 rounded-xl">Fat: {fullNutrition.fat}g</span>
            </div>
        </div>
    )
}

function MealCard({meal}: {meal: Meal}) {
    const [modalOpen, setOpen] = useState<boolean>(false);

    return (
        <>
        {modalOpen && <MealModal mealData={meal} setOpen={setOpen} />}
        <div onClick={() => setOpen(true)} className="bg-mm-primary border-mm-text border-2 rounded-xl p-5 flex flex-col text-lg gap-2">
            <strong>{meal.title}</strong>
            <div className="flex gap-3 text-mm-text">
                <span className="bg-mm-secondary p-2 rounded-xl">Protein: {meal.protein}g</span>
                <span className="bg-mm-secondary p-2 rounded-xl">Carbs: {meal.carbs}g</span>
                <span className="bg-mm-secondary p-2 rounded-xl">Fat: {meal.fat}g</span>
            </div>
            <span className="bg-mm-text text-mm-bg p-2 rounded-xl w-fit">Calories: {meal.calories} kcal</span>
        </div>
        </>
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
