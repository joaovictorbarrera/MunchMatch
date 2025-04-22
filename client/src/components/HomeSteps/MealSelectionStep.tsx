import { useContext, useEffect, useRef, useState } from "react"
import { IconContext } from "react-icons";
import { RiCheckLine, RiCloseFill } from "react-icons/ri";
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import { MdOutlineArrowBack, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MealDataContext } from "../../contexts/MealDataContext";
import MealCard from "./components/MealCard";
import Tooltip from "./components/Tooltip";
import ResultRequirements from "./components/ResultRequirements";
import { isReadyToProcessResult } from "../../extra/isReadyToProcessResult";
import { IoInformationCircleOutline } from "react-icons/io5";

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

function MealSelectionStep({setPage}: {setPage: React.Dispatch<React.SetStateAction<number>>}) {

    const {questionnaire,} = useContext(QuestionnaireContext)
    const {mealData, setMealData, currentMealIndex, setCurrentMealIndex, acceptedMeals, setAcceptedMeals, offset, setOffset} = useContext(MealDataContext)

    const [seenMeals, setSeenMeals] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(mealData.length == 0);
    const [error, setError] = useState<boolean>(false);

    const shouldFetch = useRef(false);

    function fetchMealData() {
        setLoading(true)
        console.log("Fetched, offset: " + offset)
        setOffset(offset => offset + 100)
        const URL = import.meta.env.DEV ? import.meta.env.VITE_API_URL + `/suggestions?offset=${offset}` : `/suggestions?&offset=${offset}`
        fetch(URL, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({questionnaire, seenMeals})
        })
        .then(res => {
            if (res.status == 500) window.alert("Internal Server Error! api Limit reached ?")
            return res.json()
        })
        .then(data => {
            // console.log(data)
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
        if (!shouldFetch.current && currentMealIndex + 1 >= mealData.length) {
            fetchMealData()
            shouldFetch.current = true
        }
    })

    function nextDish() {
        setCurrentMealIndex(n => {
            if (n + 1 == mealData.length) {
                shouldFetch.current = false
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
        setPage(3)
    }

    if (loading) return <div className="text-center w-full mt-10">
        <span>Loading your suggestions...</span>
    </div>

    if (error || currentMealIndex >= mealData.length) return <div className="w-full flex flex-col items-center gap-5 mt-10">
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
        <button className="text-mm-text bg-mm-primary py-2 px-5 rounded-lg w-fit cursor-pointer hover:brightness-90 flex items-center gap-2" onClick={() => setPage(1)}><MdOutlineArrowBack  /> Back to Questionnaire</button>
    </div>

    return (
        <div className="flex flex-col gap-10 w-full  xl:items-start items-center mt-10">
            <MealCard
                mealData={mealData[currentMealIndex]}
                handleAccept={handleAccept}
                handleReject={handleReject}
                handleGetResults={handleGetResults}
            />

            <div className="hidden xl:flex flex-col xl:flex-row gap-25 items-center w-full">
                <button onClick={handleReject} className="flex gap-5 items-center text-gray-800 text-2xl cursor-pointer hover:brightness-90 select-none">
                    Not really
                    <div className="w-10 h-10 bg-red-600 rounded-full relative">
                        <IconContext.Provider value={{color: "#ffffff", size:"2rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                            <RiCloseFill />
                        </IconContext.Provider>
                    </div>
                </button>
                <button onClick={handleAccept} className="flex gap-5 items-center text-gray-800 text-2xl cursor-pointer hover:brightness-90 select-none">
                    <div className="w-10 h-10 bg-green-600 rounded-full relative">
                        <IconContext.Provider value={{color: "66ff66", size:"2rem", className:"absolute top-[50%] left-[50%] -translate-[50%]"}}>
                            <RiCheckLine />
                        </IconContext.Provider>
                    </div>
                    I like it!
                </button>

                <div className="ml-auto flex gap-1">
                    {!isReadyToProcessResult(acceptedMeals) &&
                    <Tooltip content={<ResultRequirements />}>
                        <IconContext.Provider value={{color:"99a1af", size:"1.5rem", className: "mt-2"}}>
                            <IoInformationCircleOutline />
                        </IconContext.Provider>
                    </Tooltip>}

                    <button onClick={handleGetResults} disabled={!isReadyToProcessResult(acceptedMeals)} className="
                        disabled:cursor-auto cursor-pointer
                        disabled:brightness-100 hover:brightness-70
                        disabled:text-gray-400 disabled:decoration-gray-400
                        decoration-[#4571EA] text-black
                        text-2xl underline underline-offset-8
                        flex items-end select-none">
                        Get Results
                        <IconContext.Provider value={{color: `${!isReadyToProcessResult(acceptedMeals) ? "#99a1af" : "#4571EA" }`, size:"2rem", className:""}}>
                            <MdOutlineKeyboardDoubleArrowRight   />
                        </IconContext.Provider>
                    </button>
                </div>
            </div>

            <div className="flex w-full border-y-2 border-gray-300 border-dashed">
                <hr className="border-t-3 border-mm-text" style={{width:`${acceptedMeals.length*(100.0/MIN_MEALS_TO_PROGRESS)}%`}} />
                <hr className="border-t-3 border-mm-secondary" style={{width:`${(MIN_MEALS_TO_PROGRESS-acceptedMeals.length)*(100.0/MIN_MEALS_TO_PROGRESS)}%`}}/>
            </div>

            <button className="text-mm-text bg-mm-primary py-2 px-5 rounded-lg w-fit cursor-pointer hover:brightness-90 flex items-center gap-2" onClick={() => setPage(1)}>
                <MdOutlineArrowBack  /> Back to Questionnaire
            </button>
        </div>
    )
}

export default MealSelectionStep
