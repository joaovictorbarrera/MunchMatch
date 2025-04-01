function IntroCard({title, description}: {title:string, description:string}) {
    return (
        <li className="flex flex-1 flex-col bg-mm-primary p-5 rounded-2xl text-mm-text text-center gap-3">
            <h2 className="text-xl sm:text-3xl font-semibold">{title}</h2>
            <p className="text-sm sm:text-xl">{description}</p>
        </li>
    )
}

function Intro({handleNext}: {handleNext: () => void}) {

    const text = {
        personalProfile: {
            title: "Personal Profile",
            description: "Set your dieatery preferences, restrictions, and daily calorie goals."
        },
        smartSuggestions: {
            title: "Smart Suggestions",
            description: "Get meal recommendations that match your preferences and nutritional needs."
        },
        mealPlanning: {
            title: "Meal Planning",
            description: "Plan your weekly meals with an easy-to-use meal plan."
        }
    }

    return (
        <div className="flex flex-col gap-10">
            <ul className="flex flex-col gap-5 xl:gap-20 xl:flex-row">
                <IntroCard title={text.personalProfile.title} description={text.personalProfile.description} />
                <IntroCard title={text.smartSuggestions.title} description={text.smartSuggestions.description} />
                <IntroCard title={text.mealPlanning.title} description={text.mealPlanning.description} />
            </ul>
            <div className="flex justify-center items-center">
                <button onClick={handleNext} className="cursor-pointer bg-mm-text hover:brightness-90 text-mm-primary py-2 px-4 rounded-2xl">
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Intro
