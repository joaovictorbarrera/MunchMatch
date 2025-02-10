import { useEffect, useState } from "react"
import { IconContext } from "react-icons";
import { RiCheckLine, RiCloseFill } from "react-icons/ri";
import { mockDishData } from "../mockData";

export interface Dish {
    imageUrl: string,
    title: string,
    nutrition: {
        calories: number,
        protein: number,
        carbs: number,
        fat: number
    },
    dishID: number
}

function DishPage({handleNextPage}: {handleNextPage: () => void}) {
    const [currentDishIndex, setCurrentDishIndex] = useState<number>(0);
    const [dishData, setDishData] = useState<Dish[]>([])

    const [acceptedDishes, setAcceptedDishes] = useState<number[]>([]);
    const [rejectedDishes, setRejecteddDishes] = useState<number[]>([]);

    function fetchDishData() {
        setDishData(mockDishData)
        // TODO
    }

    useEffect(() => {
        fetchDishData()
    }, [])

    function nextDish() {
        setCurrentDishIndex(n => {
            // TODO
            if (n + 1 == dishData.length) return 0 // temporary
            return n + 1
        })
    }

    function handleReject() {
        nextDish()
        setRejecteddDishes(arr => [...arr, dishData[currentDishIndex].dishID])
    }

    function handleÁccept() {
        nextDish()
        setAcceptedDishes(arr => [...arr, dishData[currentDishIndex].dishID])
    }

    function handleGetResults() {
        // TODO
        handleNextPage()
    }

    if (currentDishIndex >= dishData.length) return null

    return (
        <div className="border-2 border-gray-300 relative flex flex-col">
            <DishCard
                dishData={dishData}
                currentDishIndex={currentDishIndex}
                acceptedDishes={acceptedDishes}
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

interface DishCardProps {
    dishData: Dish[],
    currentDishIndex: number,
    acceptedDishes: number[],
    handleGetResults: () => void
}

function DishCard({dishData, currentDishIndex, acceptedDishes, handleGetResults}: DishCardProps) {
    return (
        <div className="flex opacity-100 transition-all">
            <img className="bg-black w-[50%] aspect-square object-cover" src={dishData[currentDishIndex].imageUrl} alt="" />
            <header className="p-5 flex flex-col gap-3 flex-1">
                <h1 className="font-semibold text-3xl">{dishData[currentDishIndex].title}</h1>
                <p>{dishData[currentDishIndex].nutrition.calories} calories</p>
                <hr />
                <div>
                    <h2 className="font-bold">Nutrition</h2>
                    <p>Protein: {dishData[currentDishIndex].nutrition.protein}g</p>
                    <p>Carbs: {dishData[currentDishIndex].nutrition.carbs}g</p>
                    <p>Fat: {dishData[currentDishIndex].nutrition.fat}g</p>
                </div>
                <div className="">
                    <h2>Accept dishes to get results</h2>
                    <button onClick={handleGetResults} disabled={acceptedDishes.length < 20} className=" disabled:cursor-auto cursor-pointer disabled:bg-gray-300 bg-green-600 disabled:brightness-100 hover:brightness-90 text-white py-2 px-4 rounded">
                        Get Results [{acceptedDishes.length} / 20]
                    </button>

                </div>
            </header>
        </div>
    )
}

export default DishPage
