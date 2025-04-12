import { useEffect } from "react"
import { Meal } from "../../MealSelectionStep"

export default function MealModal({mealData, setOpen}: {mealData: Meal, setOpen: (cond:boolean) => void}) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="w-full h-full absolute left-0 top-0 flex justify-center items-start">
            <div onClick={() => setOpen(false)} className="absolute bg-black opacity-50 h-full w-full z-0">
            </div>
            <div className="flex flex-col gap-5 bg-mm-bg w-120 opacity-100 z-10 rounded-2xl p-5 m-5">
                <img className="mx-5 mt-5 aspect-square object-cover rounded-2xl" src={mealData.image} alt="" />
                <div className="p-5 flex flex-col gap-5 flex-1 text-xl items-start">
                    <header className="text-3xl text-mm-text text-wrap">{mealData.title}</header>
                    <span className="bg-mm-secondary p-3 rounded-xl text-mm-text font-bold">{mealData.calories} calories</span>
                    <hr className="w-full bg-mm-text h-[1px]" />
                    <div className="flex flex-col gap-3 text-mm-text items-start">
                        <h2 className="font-bold text-black">Nutrition:</h2>
                        <span className="bg-mm-secondary p-2 rounded-xl">Protein: {mealData.protein}g</span>
                        <span className="bg-mm-secondary p-2 rounded-xl">Carbs: {mealData.carbs}g</span>
                        <span className="bg-mm-secondary p-2 rounded-xl">Fat: {mealData.fat}g</span>
                    </div>
                </div>
                <button onClick={() => setOpen(false)} className="cursor-pointer bg-mm-primary p-2 rounded-xl text-mm-text border-1 hover:brightness-90">Close</button>
            </div>
        </div>
    )
}
