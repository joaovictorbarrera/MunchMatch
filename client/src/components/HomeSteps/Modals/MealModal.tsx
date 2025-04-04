import { useEffect } from "react"
import { Meal } from "../MealSelectionStep"

export default function MealModal({mealData, setOpen}: {mealData: Meal, setOpen: (cond:boolean) => void}) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="w-full h-full absolute left-0 top-0 flex justify-center items-start">
            <div onClick={() => setOpen(false)} className="absolute bg-black opacity-50 h-full w-full z-0">
            </div>
            <div className="flex flex-col gap-5 bg-mm-bg w-150 opacity-100 z-10 rounded-2xl p-5">
                <img className="mx-5 mt-5 aspect-square object-cover rounded-2xl" src={mealData.image} alt="" />
                <div className="p-5 flex flex-col gap-5 flex-1 text-xl items-start">
                    <header className="text-4xl text-mm-text text-wrap">{mealData.title}</header>
                    <span className="bg-mm-secondary p-3 rounded-xl text-mm-text font-bold">{mealData.calories} calories</span>
                    <hr className="w-full bg-mm-text h-[1px]" />
                    <div className="flex flex-col gap-3">
                        <h2 className="font-bold">Nutrition:</h2>
                        <p>Protein: {mealData.protein}g</p>
                        <p>Carbs: {mealData.carbs}g</p>
                        <p>Fat: {mealData.fat}g</p>
                    </div>
                </div>
                <button onClick={() => setOpen(false)} className="cursor-pointer">Close</button>
            </div>
        </div>
    )
}
