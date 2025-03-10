import { useContext, useEffect, useState } from "react"
import { Meal } from "./MealSelectionStep"
import { AcceptedMealContext } from "../../contexts/AcceptedMealContext";
import { defaultQuestionnaire, QuestionnaireContext } from "../../contexts/QuestionnaireContext";

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

function EmailModal({setOpen}: {setOpen: (cond:boolean) => void}) {
    return (
        <div className="w-screen h-screen absolute left-0 top-0 flex justify-center items-center">

            <div onClick={() => setOpen(false)} className="absolute bg-black opacity-50 h-full w-full z-0">
            </div>
            <div className="flex flex-col gap-10 bg-mm-bg w-150 opacity-100 z-10 rounded-2xl p-5 relative">
                <header className="text-mm-text text-2xl">Send results to email</header>
                <form onSubmit={e => e.preventDefault()} className="flex flex-col items-center gap-5">
                    <label>Email <input type="text" className="bg-white border-2" /></label>
                    <button type="submit" className="bg-mm-secondary text-mm-text p-2">Submit</button>
                </form>
                <button onClick={() => setOpen(false)} className="cursor-pointer">Close</button>
            </div>
        </div>
    )
}

function MealRow({meal}: {meal: Meal}) {
    const [modalOpen, setOpen] = useState<boolean>(false);

    return (
        <>
        {modalOpen && <MealModal mealData={meal} setOpen={setOpen} />}
        <tr>
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

function MealModal({mealData, setOpen}: {mealData: Meal, setOpen: (cond:boolean) => void}) {
    return (
        <div className="w-screen h-screen absolute left-0 top-0 flex justify-center items-center">
            <div onClick={() => setOpen(false)} className="absolute bg-black opacity-50 h-full w-full z-0">
            </div>
            <div className="flex flex-col gap-10 bg-mm-bg w-150 opacity-100 z-10 rounded-2xl p-5">
                <img className=" aspect-square object-cover" src={mealData.imageUrl} alt="" />
                <div className="p-5 flex flex-col gap-5 flex-1 text-xl items-start">
                    <header className="text-4xl text-mm-text">{mealData.title}</header>
                    <span className="bg-mm-secondary p-3 rounded-xl text-mm-text font-bold">{mealData.nutrition.calories} calories</span>
                    <hr className="w-full bg-mm-text h-[1px]" />
                    <div className="flex flex-col gap-3">
                        <h2 className="font-bold">Nutrition:</h2>
                        <p>Protein: {mealData.nutrition.protein}g</p>
                        <p>Carbs: {mealData.nutrition.carbs}g</p>
                        <p>Fat: {mealData.nutrition.fat}g</p>
                    </div>
                </div>
                <button onClick={() => setOpen(false)} className="cursor-pointer">Close</button>
            </div>
        </div>
    )
}

export default ResultStep
