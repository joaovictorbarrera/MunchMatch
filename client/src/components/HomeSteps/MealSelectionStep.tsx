import { useContext, useEffect, useState } from "react"
import { IconContext } from "react-icons";
import { RiCheckLine, RiCloseFill } from "react-icons/ri";
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import { AcceptedMealContext } from "../../contexts/AcceptedMealContext";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export interface Meal {
    image: string,
    title: string,
    dishTypes: string[],
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    id: number,
    vegetarian: boolean,
    gluten: boolean,
    dairy: boolean
}

function MealSelectionStep({handleNextPage, handlePreviousPage}: {handleNextPage: () => void, handlePreviousPage: () => void}) {
    const {questionnaire,} = useContext(QuestionnaireContext)

    const [currentDishIndex, setCurrentDishIndex] = useState<number>(0);
    const [mealData, setMealData] = useState<Meal[]>([])

    const {acceptedMeals, setAcceptedMeals} = useContext(AcceptedMealContext)
    const [seenMeals, setSeenMeals] = useState<number[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const MIN_MEALS_TO_PROGRESS = 20
    let offset = 0

    function fetchMealData() {
        const URL = import.meta.env.DEV ? import.meta.env.VITE_API_URL + `/suggestions?number=100&offset=${offset}` : `/suggestions?number=100&offset=${offset}`
        // TODO
        fetch(URL, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({questionnaire, seenMeals})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data = data.map((meal: any) => {

                return meal as Meal
            })
            setMealData(oldData => [...oldData, ...data])
        })
        .finally(() => setLoading(false))
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
        setSeenMeals(arr => [...arr, mealData[currentDishIndex].id])
    }

    function handleAccept() {
        nextDish()
        setSeenMeals(arr => [...arr, mealData[currentDishIndex].id])
        setAcceptedMeals(arr => [...arr, mealData[currentDishIndex]])
    }

    function handleGetResults() {
        // TODO
        handleNextPage()
    }

    if (loading) return <div>Loading...</div>

    if (currentDishIndex >= mealData.length) return <div>
        <p>No meal data available</p>
        <button onClick={handlePreviousPage}>Back</button>
    </div>

    return (
        <div className="flex flex-col gap-10 w-full">
            <MealCard
                mealData={mealData}
                currentDishIndex={currentDishIndex}
                handleAccept={handleAccept}
                handleReject={handleReject}
                handleGetResults={handleGetResults}
                acceptedMealsLength={acceptedMeals.length}
            />

            <div className="hidden xl:flex flex-col xl:flex-row gap-25 items-center">
                <button onClick={handleReject} className="flex gap-5 items-center text-gray-800 text-2xl cursor-pointer hover:brightness-90">
                    Not really
                    <div className="w-10 h-10 bg-red-600 rounded-full relative">
                        <IconContext.Provider value={{color: "#ffffff", size:"2rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                            <RiCloseFill />
                        </IconContext.Provider>
                    </div>
                </button>
                <button onClick={handleAccept} className="flex gap-5 items-center text-gray-800 text-2xl cursor-pointer hover:brightness-90">
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
    currentDishIndex: number,
    handleAccept: () => void,
    handleReject: () => void,
    handleGetResults: () => void,
    acceptedMealsLength: number
}

function MealCard({mealData, currentDishIndex, handleAccept, handleReject, handleGetResults, acceptedMealsLength}: MealCardProps) {
    return (
        <div className="flex flex-col xl:flex-row xl:gap-10 gap-4 items-center">
            <img className="bg-black w-[400px] aspect-square object-cover" src={mealData[currentDishIndex].image} alt="" />

            <div className="xl:hidden flex gap-5">
                <button onClick={handleReject} className="flex gap-5 items-center text-gray-800 text-2xl cursor-pointer hover:brightness-90">
                    <div className="w-15 h-15 bg-red-600 rounded-full relative">
                        <IconContext.Provider value={{color: "#ffffff", size:"3rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                            <RiCloseFill />
                        </IconContext.Provider>
                    </div>
                </button>
                <button onClick={handleAccept} className="flex gap-5 items-center text-gray-800 text-2xl cursor-pointer hover:brightness-90">
                    <div className="w-15 h-15 bg-green-600 rounded-full relative">
                        <IconContext.Provider value={{color: "66ff66", size:"3rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                            <RiCheckLine />
                        </IconContext.Provider>
                    </div>

                </button>
                <button onClick={handleGetResults} disabled={acceptedMealsLength < 20} className="cursor-pointer hover:brightness-90">
                    <div className={`w-15 h-15 ${acceptedMealsLength < 20 ? 'bg-gray-500' : 'bg-blue-600'} rounded-full relative`}>
                    <IconContext.Provider value={{color: `${acceptedMealsLength < 20 ? "#99a1af" : "#FFFFFF" }`, size:"3rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                        <MdOutlineKeyboardDoubleArrowRight   />
                    </IconContext.Provider>
                    </div>

                </button>
            </div>

            <header className="px-5 flex flex-col gap-5 flex-1 text-lg xl:text-xl items-start text-center w-full">
                <h1 className="text-2xl xl:text-4xl text-mm-text">{mealData[currentDishIndex].title}</h1>
                <span className="bg-mm-secondary p-3 rounded-xl text-mm-text font-bold">{mealData[currentDishIndex].calories} calories</span>
                <hr className="w-full bg-mm-text h-[1px]" />
                <div className="flex flex-col gap-3">
                    <h2 className="font-bold">Nutrition:</h2>
                    <p>Protein: {mealData[currentDishIndex].protein}g</p>
                    <p>Carbs: {mealData[currentDishIndex].carbs}g</p>
                    <p>Fat: {mealData[currentDishIndex].fat}g</p>
                </div>
            </header>
        </div>
    )
}

export default MealSelectionStep
