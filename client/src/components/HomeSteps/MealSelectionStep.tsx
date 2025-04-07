import { useContext, useEffect, useRef, useState } from "react"
import { IconContext } from "react-icons";
import { RiCheckLine, RiCloseFill } from "react-icons/ri";
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import { AcceptedMealContext } from "../../contexts/AcceptedMealContext";
import { MdOutlineArrowBack, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MealDataContext } from "../../contexts/MealDataContext";
import isReadyToProcessResult from "../../extra/isReadyToProcessResult";
import { IoMdArrowRoundBack } from "react-icons/io";

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

const MIN_MEALS_TO_PROGRESS = 30
const MIN_OF_EACH_TYPE = 8

function MealSelectionStep({handleNextPage, handlePreviousPage}: {handleNextPage: () => void, handlePreviousPage: () => void}) {

    const {questionnaire,} = useContext(QuestionnaireContext)
    const {mealData, setMealData, currentMealIndex, setCurrentMealIndex} = useContext(MealDataContext)
    const {acceptedMeals, setAcceptedMeals} = useContext(AcceptedMealContext)

    const [seenMeals, setSeenMeals] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(mealData.length == 0);
    const [error, setError] = useState<boolean>(false);

    const [offset, setOffset] = useState<number>(0);
    const hasFetched = useRef(false);

    function fetchMealData() {
        setLoading(true)
        setOffset(n => n+100)
        const URL = import.meta.env.DEV ? import.meta.env.VITE_API_URL + `/suggestions?offset=${offset}` : `/suggestions?&offset=${offset}`
        fetch(URL, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({questionnaire, seenMeals})
        })
        .then(res => {
            if (res.status == 500) window.alert("Internal Server Error! API Limit reached ?")
            return res.json()
        })
        .then(data => {
            console.log(data)
            if (data.error) {
                setError(true)
                return
            }
            data = data.map((meal: any) => {

                return meal as Meal
            })
            setMealData(oldData => [...oldData, ...data].sort(() => Math.random() - 0.5))
        })

        .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (!hasFetched.current && currentMealIndex + 1 >= mealData.length) {
            fetchMealData()
            hasFetched.current = true
        }
    }, [])

    function nextDish() {
        setCurrentMealIndex(n => {
            if (n + 1 == mealData.length) {
                fetchMealData()
            }
            return n + 1
        })
    }

    function handleReject() {
        nextDish()
        setSeenMeals(arr => [...arr, mealData[currentMealIndex].id])
    }

    function handleAccept() {
        nextDish()
        setSeenMeals(arr => [...arr, mealData[currentMealIndex].id])
        setAcceptedMeals(arr => [...arr, mealData[currentMealIndex]])
    }

    function handleGetResults() {
        // TODO
        handleNextPage()
    }

    if (loading) return <div className="text-center w-full">
        <span>Loading your suggestions...</span>
    </div>

    if (error || currentMealIndex >= mealData.length) return <div className="w-full flex flex-col items-center gap-5">
        <p>No meal data available! </p>
        <button onClick={handleGetResults} disabled={!isReadyToProcessResult(acceptedMeals)} className="
                    disabled:cursor-auto cursor-pointer
                    disabled:brightness-100 hover:brightness-70
                    disabled:text-gray-400 disabled:decoration-gray-400
                    decoration-[#4571EA] text-black
                    text-2xl underline underline-offset-8
                    flex">
                    Get Results
                    <IconContext.Provider value={{color: `${!isReadyToProcessResult(acceptedMeals) ? "#99a1af" : "#4571EA" }`, size:"2rem", className:""}}>
                        <MdOutlineKeyboardDoubleArrowRight   />
                    </IconContext.Provider>
                </button>
        <button className="text-mm-text bg-mm-primary py-2 px-5 rounded-lg w-fit cursor-pointer hover:brightness-90 flex items-center gap-2" onClick={handlePreviousPage}><MdOutlineArrowBack  /> Back to Questionnaire</button>
    </div>

    return (
        <div className="flex flex-col gap-10 w-full px-5">
            <MealCard
                mealData={mealData[currentMealIndex]}
                handleAccept={handleAccept}
                handleReject={handleReject}
                handleGetResults={handleGetResults}
                acceptedMeals={acceptedMeals}
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

                <button onClick={handleGetResults} disabled={!isReadyToProcessResult(acceptedMeals)} className="
                    disabled:cursor-auto cursor-pointer
                    disabled:brightness-100 hover:brightness-70
                    disabled:text-gray-400 disabled:decoration-gray-400
                    decoration-[#4571EA] text-black
                    text-2xl underline underline-offset-8
                    flex items-end ml-auto">
                    Get Results
                    <IconContext.Provider value={{color: `${!isReadyToProcessResult(acceptedMeals) ? "#99a1af" : "#4571EA" }`, size:"2rem", className:""}}>
                        <MdOutlineKeyboardDoubleArrowRight   />
                    </IconContext.Provider>
                </button>
            </div>

            <div className="flex w-full border-y-2 border-gray-300 border-dashed">
                <hr className="border-t-3 border-mm-text" style={{width:`${acceptedMeals.length*(100.0/MIN_MEALS_TO_PROGRESS)}%`}} />
                <hr className="border-t-3 border-mm-secondary" style={{width:`${(MIN_MEALS_TO_PROGRESS-acceptedMeals.length)*(100.0/MIN_MEALS_TO_PROGRESS)}%`}}/>
            </div>

            <button className="text-mm-text bg-mm-primary py-2 px-5 rounded-lg w-fit cursor-pointer hover:brightness-90 flex items-center gap-2" onClick={handlePreviousPage}><MdOutlineArrowBack  /> Back to Questionnaire</button>
        </div>
    )
}

interface MealCardProps {
    mealData: Meal,
    handleAccept: () => void,
    handleReject: () => void,
    handleGetResults: () => void,
    acceptedMeals: Meal[]
}

function MealCard({mealData, handleAccept, handleReject, handleGetResults, acceptedMeals}: MealCardProps) {

    return (
        <div className="flex flex-col xl:flex-row xl:gap-10 gap-4 items-center">
            <img className="bg-black w-[400px] aspect-square object-cover" src={mealData.image} alt="" />

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
                <button onClick={handleGetResults} disabled={!isReadyToProcessResult(acceptedMeals)} className="cursor-pointer hover:brightness-90">
                    <div className={`w-15 h-15 ${!isReadyToProcessResult(acceptedMeals) ? 'bg-gray-500' : 'bg-blue-600'} rounded-full relative`}>
                    <IconContext.Provider value={{color: `${!isReadyToProcessResult(acceptedMeals) ? "#99a1af" : "#FFFFFF" }`, size:"3rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                        <MdOutlineKeyboardDoubleArrowRight   />
                    </IconContext.Provider>
                    </div>

                </button>
            </div>

            <header className="px-5 flex flex-col gap-5 flex-1 text-lg xl:text-xl items-start text-center w-full">
                <div className="flex md:flex-row flex-col gap-5">
                    <div className="flex flex-col text-start gap-5">
                        <h1 className="text-2xl xl:text-2xl text-mm-text">{mealData.title}</h1>
                        <span className="bg-mm-secondary p-3 rounded-xl w-fit text-mm-text font-bold">{mealData.calories} calories</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-start text-nowrap text-mm-text text-lg">
                        <span className="border-1 bg-mm-primary flex justify-center items-center w-35 h-12">Lunch: {acceptedMeals.filter(meal => meal.dishTypes.includes('lunch')).length}</span>
                        <span className="border-1 bg-mm-primary flex justify-center items-center w-35 h-12">Breakfast: {acceptedMeals.filter(meal => meal.dishTypes.includes('breakfast')).length}</span>
                        <span className="border-1 bg-mm-primary flex justify-center items-center w-35 h-12">Snack: {acceptedMeals.filter(meal => !meal.dishTypes.includes('lunch') && !meal.dishTypes.includes('breakfast') && !meal.dishTypes.includes('dinner') ).length}</span>
                        <span className="border-1 bg-mm-primary flex justify-center items-center w-35 h-12">Dinner: {acceptedMeals.filter(meal => meal.dishTypes.includes('dinner')).length}</span>
                    </div>
                </div>

                <hr className="w-full bg-mm-text h-[1px]" />
                <div className="flex gap-5 text-xl text-nowrap">
                    <div className="flex flex-col gap-3 text-mm-text">
                        <h2 className="font-bold text-black">Nutrition:</h2>
                        <span className="bg-mm-secondary p-2 rounded-xl">Protein: {mealData.protein}g</span>
                        <span className="bg-mm-secondary p-2 rounded-xl">Carbs: {mealData.carbs}g</span>
                        <span className="bg-mm-secondary p-2 rounded-xl">Fat: {mealData.fat}g</span>
                    </div>
                    <div className="flex flex-col items-start gap-3">
                        <strong>Meal Type:</strong>
                        <div className="flex gap-3 flex-wrap">
                        {mealData.dishTypes.map((type, index) => {
                            if (index > 8) return null
                            return <span key={type} className="bg-red-400 basis-1/4 text-white p-2 rounded-xl w-fit">{type}</span>
                        })}
                        </div>
                    </div>
                </div>


            </header>
        </div>
    )
}

export default MealSelectionStep
