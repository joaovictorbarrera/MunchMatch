import { IconContext } from "react-icons"
import { RiCheckLine, RiCloseFill } from "react-icons/ri"
import isReadyToProcessResult from "../../../extra/isReadyToProcessResult"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import { Meal } from "../MealSelectionStep"

interface MealCardProps {
    mealData: Meal,
    handleAccept: () => void,
    handleReject: () => void,
    handleGetResults: () => void,
    acceptedMeals: Meal[]
}

function MealCard({mealData, handleAccept, handleReject, handleGetResults, acceptedMeals}: MealCardProps) {

    return (
        <div className="flex flex-col xl:flex-row xl:gap-10 gap-4 items-center w-fit xl:px-0 px-5">
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
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col text-start gap-5">
                        <h1 className="text-2xl xl:text-2xl text-mm-text">{mealData.title}</h1>
                        <span className="bg-mm-secondary p-3 rounded-xl w-fit text-mm-text font-bold">{mealData.calories} calories</span>
                    </div>
                    <div className="grid grid-cols-2 w-fit gap-3 text-start text-nowrap text-mm-text text-lg">
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

export default MealCard
