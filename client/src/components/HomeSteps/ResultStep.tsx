import { useContext, useEffect, useRef, useState } from "react"
import { Meal } from "./MealSelectionStep"
import { AcceptedMealContext } from "../../contexts/AcceptedMealContext";
import { defaultQuestionnaire, QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import MealModal from "./components/Modals/MealModal";
import EmailModal from "./components/Modals/EmailModal";
import { MdOutlineArrowBack } from "react-icons/md";
import { MealDataContext } from "../../contexts/MealDataContext";
import { ResultIdContext } from "../../contexts/ResultIdContext";

export interface MealPlan {
    meals: Meal[],
    score: number,
    bestScoreCategory: string
}

export interface Result {
    id: number,
    mealPlans: MealPlan[]
}

function ResultStep({handlePreviousPage}: {handlePreviousPage: () => void}) {
    const {resultId} = useContext(ResultIdContext);

    const {questionnaire,} = useContext(QuestionnaireContext)
    const {acceptedMeals} = useContext(AcceptedMealContext)

    const [result, setResult] = useState<Result>();
    const [loading, setLoading] = useState<boolean>(true);

    const hasFetched = useRef(false);

    function fetchResult() {
        const URL = import.meta.env.DEV ? import.meta.env.VITE_API_URL + "/results" : "/results"

        if (resultId) {
            fetch(URL+"?resultId="+resultId)
            .then(res => {
                if (res.status != 200) throw new Error()
                return res.json()
            })
            .then(data => {
                console.log(data)
                setResult(data as unknown as Result)
            })
            .finally(() => setLoading(false))
        } else {
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
    }

    useEffect(() => {
        if (!hasFetched.current) {
            fetchResult()
            hasFetched.current = true
        }
    }, [])

    if (loading) return <div className="text-center w-full">Loading...</div>

    if (!result) return <div className="text-center w-full">Failed to get result</div>

    return (
        <div className="flex flex-col mb-20 p-5 items-start">
            {resultId == null && <button className="
            text-mm-text bg-mm-primary py-2 px-5 rounded-lg
            w-fit cursor-pointer hover:brightness-90 flex items-center gap-2"
            onClick={handlePreviousPage}>
                <MdOutlineArrowBack /> Back to Meal Selection
            </button>}
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
                        <MealPlan key={JSON.stringify(mealPlan)} mealPlan={mealPlan} fullNutrition={fullNutrition} index={index} />
                    )
                })}
            </div>
            <ResultButtons resultId={result.id} />
        </div>
    )
}

interface MealPlanProps {
    mealPlan: MealPlan,
    fullNutrition: {
        calories:number,
        protein:number,
        carbs:number,
        fat:number
    },
    index:number
}

function MealPlan({mealPlan, fullNutrition, index}: MealPlanProps) {
    function scoreColor(score: number): string {
        if (score >= 90) return "bg-green-900 text-green-500"
        else if (score >= 80) return "bg-green-300 text-green-800"
        else if (score >= 70) return "bg-yellow-500 text-yellow-100"
        else return "bg-red-200 text-red-800"
    }

    return (
        <div key={JSON.stringify(mealPlan)} className="flex flex-col gap-10 mb-10">
            <div className="flex gap-3 text-black items-center flex-wrap">
                <h2 className="text-mm-text text-3xl" >Option {index+1}</h2>
                <div className="flex gap-3">
                    {mealPlan.score && <span className={`${scoreColor(mealPlan.score)} p-2 rounded-xl w-fit`}>{mealPlan.score}% Match</span>}
                    {mealPlan.bestScoreCategory && <span className="bg-red-400 text-white p-2 rounded-xl w-fit capitalize">Best Match: {mealPlan.bestScoreCategory}</span>}
                </div>
            </div>

            <div className="md:hidden flex flex-col gap-5">
                <ResultCard meal={mealPlan.meals[0]} type="Breakfast" />
                <ResultCard meal={mealPlan.meals[1]} type="Lunch" />
                <ResultCard meal={mealPlan.meals[2]} type="Snack" />
                <ResultCard meal={mealPlan.meals[3]} type="Dinner" />
                <Total fullNutrition={fullNutrition} />
            </div>

            <table className="md:table hidden text-nowrap resultTable">
                <thead>
                    <tr>
                        <th className="!border-none"></th>
                        <th className="text-start text-mm-text">Dish</th>
                        <th className="text-mm-text">Calories</th>
                        <th className="text-mm-text">Carbs</th>
                        <th className="text-mm-text">Protein</th>
                        <th className="text-mm-text">Fat</th>
                    </tr>
                </thead>
                <tbody>
                    <MealRow meal={mealPlan.meals[0]} type="Breakfast"/>
                    <MealRow meal={mealPlan.meals[1]} type="Lunch"/>
                    <MealRow meal={mealPlan.meals[2]} type="Snack"/>
                    <MealRow meal={mealPlan.meals[3]} type="Dinner"/>

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
}

function ResultButtons({resultId}: {resultId: number}) {
    const {setAcceptedMeals} = useContext(AcceptedMealContext)
    const {setQuestionnaire} = useContext(QuestionnaireContext)
    const {setMealData, setCurrentMealIndex} = useContext(MealDataContext)
    const {setResultId} = useContext(ResultIdContext)
    const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);

    const [linkCopyText, setLinkCopyText] = useState<string>("Copy Link")

    function clearAndStartOver() {
        setQuestionnaire(defaultQuestionnaire)
        setAcceptedMeals([])
        setMealData([])
        setResultId(null)
        setCurrentMealIndex(0)
        const baseUrl = window.location.origin
        window.history.replaceState({}, document.title, baseUrl)
        window.location.reload()
    }

    function copyLink() {
        navigator.clipboard.writeText(window.location.origin + "?resultId=" + resultId);
        setLinkCopyText("Link Copied!")
    }

    return (
        <div className="flex">
            <button onClick={clearAndStartOver} type="button" className="cursor-pointer bg-mm-secondary text-mm-text py-2 px-4 hover:brightness-90">Start Over</button>
            <button onClick={() => setEmailModalOpen(true)} type="button" className="cursor-pointer bg-mm-secondary text-mm-text py-2 px-4 hover:brightness-90">Send to email</button>
            <button onClick={copyLink} type="button" className="cursor-pointer bg-mm-secondary text-mm-text py-2 px-4 hover:brightness-90">{linkCopyText}</button>
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

function ResultCard({meal, type}: {meal: Meal, type:string}) {
    const [modalOpen, setOpen] = useState<boolean>(false);

    return (
        <>
        {modalOpen && <MealModal mealData={meal} setOpen={setOpen} />}
        <div onClick={() => setOpen(true)} className="bg-mm-primary border-mm-text border-2 rounded-xl p-5 flex flex-col text-lg gap-2 cursor-pointer hover:brightness-90">
            <span className="bg-red-400 text-white p-2 px-3 rounded-xl w-fit">{type}</span>
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

function MealRow({meal, type}: {meal: Meal, type:string}) {
    const [modalOpen, setOpen] = useState<boolean>(false);

    return (
        <>
        {modalOpen && <MealModal mealData={meal} setOpen={setOpen} />}
        <tr className="text-wrap">
            <td className="text-mm-text capitalize">{type}</td>
            <td><button onClick={() => setOpen(true)} className="cursor-pointer underline w-full text-start">{meal.title}</button></td>
            <td>{meal.calories} kcal</td>
            <td>{meal.carbs}g</td>
            <td>{meal.protein}g</td>
            <td>{meal.fat}g</td>
        </tr>
        </>
    )
}

export default ResultStep
