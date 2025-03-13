import { useContext, useEffect, useState } from "react"
import { IconContext } from "react-icons";
import { RiCheckLine, RiCloseFill } from "react-icons/ri";
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import { AcceptedMealContext } from "../../contexts/AcceptedMealContext";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export interface Meal {
    imageUrl: string,
    title: string,
    type: "breakfast" | "lunch" | "snack" | "dinner",
    nutrition: {
        calories: number,
        protein: number,
        carbs: number,
        fat: number
    },
    mealID: number
}

function MealSelectionStep({handleNextPage}: {handleNextPage: () => void}) {
    const {questionnaire,} = useContext(QuestionnaireContext)

    const [currentDishIndex, setCurrentDishIndex] = useState<number>(0);
    const [mealData, setMealData] = useState<Meal[]>([])

    const {acceptedMeals, setAcceptedMeals} = useContext(AcceptedMealContext)
    const [rejectedMeals, setRejectedMeals] = useState<number[]>([]);

    const MIN_MEALS_TO_PROGRESS = 20

    function fetchMealData() {
        // TODO
        fetch(`/suggestions`, {
            method: 'post',
            body: JSON.stringify({questionnaire, rejectedMeals})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data = data.map((meal: any) => {
                console.log(meal)
                let formattedMeal: Meal = {
                    imageUrl: meal.image, 
                    title: meal.title, 
                    nutrition: {
                        calories: meal.calories,
                        protein: meal.protein,
                        carbs: meal.carbs,
                        fat: meal.fat
                    }, 
                    mealID: meal.id,
                    type: meal.dishTypes
                }
                return formattedMeal
            })
            setMealData(oldData => [...oldData, ...data])
        })
    }

    useEffect(() => {
        fetchMealData()
    }, [])

    function nextDish() {
        setCurrentDishIndex(n => {
            // TODO
            if (n + 1 == mealData.length) fetchMealData()
            return n + 1
        })
    }

    function handleReject() {
        nextDish()
        setRejectedMeals(arr => [...arr, mealData[currentDishIndex].mealID])
    }

    function handleÁccept() {
        nextDish()
        setAcceptedMeals(arr => [...arr, mealData[currentDishIndex]])
    }

    function handleGetResults() {
        // TODO
        handleNextPage()
    }

    if (currentDishIndex >= mealData.length) return null

    return (
        <div className="flex flex-col gap-10">
            <MealCard
                mealData={mealData}
                currentDishIndex={currentDishIndex}
            />

            <div className="flex gap-25 items-center">
                <button onClick={handleReject} className="flex gap-5 items-center text-gray-800 text-2xl cursor-pointer hover:brightness-90">
                    Not really
                    <div className="w-10 h-10 bg-red-600 rounded-full relative">
                        <IconContext.Provider value={{color: "#ffffff", size:"2rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                            <RiCloseFill />
                        </IconContext.Provider>
                    </div>
                </button>
                <button onClick={handleÁccept} className="flex gap-5 items-center text-gray-800 text-2xl cursor-pointer hover:brightness-90">
                    <div className="w-10 h-10 bg-green-600 rounded-full relative">
                        <IconContext.Provider value={{color: "66ff66", size:"2rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                            <RiCheckLine />
                        </IconContext.Provider>
                    </div>
                    I like it!
                </button>

                <button onClick={handleGetResults} disabled={acceptedMeals.length < 20} className="
                    disabled:cursor-auto cursor-pointer
                    disabled:brightness-100 hover:brightness-70
                    disabled:text-gray-400 disabled:decoration-gray-400
                    decoration-[#4571EA] text-black
                    text-2xl underline underline-offset-8
                    flex items-end ml-auto">
                    Get Results
                    <IconContext.Provider value={{color: `${acceptedMeals.length < 20 ? "#99a1af" : "#4571EA" }`, size:"2rem", className:""}}>
                        <MdOutlineKeyboardDoubleArrowRight   />
                    </IconContext.Provider>
                </button>
            </div>

            <div className="flex w-full border-y-2 border-gray-300 border-dashed">
                <hr className="border-t-3 border-mm-text" style={{width:`${acceptedMeals.length*(100.0/MIN_MEALS_TO_PROGRESS)}%`}} />
                <hr className="border-t-3 border-mm-secondary" style={{width:`${(MIN_MEALS_TO_PROGRESS-acceptedMeals.length)*(100.0/MIN_MEALS_TO_PROGRESS)}%`}}/>
            </div>
        </div>
    )
}

interface MealCardProps {
    mealData: Meal[],
    currentDishIndex: number
}

function MealCard({mealData, currentDishIndex}: MealCardProps) {
    return (
        <div className="flex gap-10">
            <img className="bg-black w-[33%] aspect-square object-cover" src={mealData[currentDishIndex].imageUrl} alt="" />
            <header className="p-5 flex flex-col gap-5 flex-1 text-xl items-start">
                <h1 className="text-4xl text-mm-text">{mealData[currentDishIndex].title}</h1>
                <span className="bg-mm-secondary p-3 rounded-xl text-mm-text font-bold">{mealData[currentDishIndex].nutrition.calories} calories</span>
                <hr className="w-full bg-mm-text h-[1px]" />
                <div className="flex flex-col gap-3">
                    <h2 className="font-bold">Nutrition:</h2>
                    <p>Protein: {mealData[currentDishIndex].nutrition.protein}g</p>
                    <p>Carbs: {mealData[currentDishIndex].nutrition.carbs}g</p>
                    <p>Fat: {mealData[currentDishIndex].nutrition.fat}g</p>
                </div>
            </header>
        </div>
    )
}

export default MealSelectionStep
