import { useContext, useEffect, useState } from "react"
import { IconContext } from "react-icons";
import { RiCheckLine, RiCloseFill } from "react-icons/ri";
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import { AcceptedMealContext } from "../../contexts/AcceptedMealContext";

export interface Meal {
    imageUrl: string,
    title: string,
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

    function fetchmealData() {
        // TODO
        fetch(`${import.meta.env.VITE_API_URL}/suggestions`, {
            method: 'post',
            body: JSON.stringify({questionnaire, rejectedMeals})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // data = data.map((meal: any) => {
            //     let formattedMeal: Meal = {imageUrl: meal.imageUrl, title: meal.mealName, nutrition: {
            //         calories: meal.calories,
            //         protein: meal.protein,
            //         carbs: meal.carbs,
            //         fat: meal.fat
            //     }, mealID: meal.idMeal}
            //     return formattedMeal
            // })
            setMealData(data)
        })
    }

    useEffect(() => {
        fetchmealData()
    }, [])

    function nextDish() {
        setCurrentDishIndex(n => {
            // TODO
            if (n + 1 == mealData.length) return 0 // temporary
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
        <div className="border-2 border-gray-300 relative flex flex-col">
            <MealCard
                mealData={mealData}
                currentDishIndex={currentDishIndex}
                acceptedMeals={acceptedMeals}
                handleGetResults={handleGetResults}
            />

            <div className="absolute top-[94%] left-[50%] -translate-x-[50%] flex gap-2">
                <button onClick={handleReject} className="w-15 h-15 bg-red-600 rounded-full cursor-pointer hover:brightness-90 relative">
                    <IconContext.Provider value={{color: "#ff6666", size:"3rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                        <RiCloseFill />
                    </IconContext.Provider>
                </button>
                <button onClick={handleÁccept} className="w-15 h-15 bg-green-400 rounded-full cursor-pointer hover:brightness-90 relative">
                    <IconContext.Provider value={{color: "66ff66", size:"3rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                        <RiCheckLine />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}

interface MealCardProps {
    mealData: Meal[],
    currentDishIndex: number,
    acceptedMeals: Meal[],
    handleGetResults: () => void
}

function MealCard({mealData, currentDishIndex, acceptedMeals, handleGetResults}: MealCardProps) {
    return (
        <div className="flex opacity-100 transition-all">
            <img className="bg-black w-[50%] aspect-square object-cover" src={mealData[currentDishIndex].imageUrl} alt="" />
            <header className="p-5 flex flex-col gap-3 flex-1">
                <h1 className="font-semibold text-3xl">{mealData[currentDishIndex].title}</h1>
                <p>{mealData[currentDishIndex].nutrition.calories} calories</p>
                <hr />
                <div>
                    <h2 className="font-bold">Nutrition</h2>
                    <p>Protein: {mealData[currentDishIndex].nutrition.protein}g</p>
                    <p>Carbs: {mealData[currentDishIndex].nutrition.carbs}g</p>
                    <p>Fat: {mealData[currentDishIndex].nutrition.fat}g</p>
                </div>
                <div className="">
                    <h2>Accept dishes to get results</h2>
                    <button onClick={handleGetResults} disabled={acceptedMeals.length < 20} className=" disabled:cursor-auto cursor-pointer disabled:bg-gray-300 bg-green-600 disabled:brightness-100 hover:brightness-90 text-white py-2 px-4 rounded">
                        Get Results [{acceptedMeals.length} / 20]
                    </button>

                </div>
            </header>
        </div>
    )
}

export default MealSelectionStep
