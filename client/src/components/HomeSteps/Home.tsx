
import QuestionnaireStep from "./QuestionnaireStep"
import ResultStep from "./ResultStep"
import MealSelectionStep from "./MealSelectionStep"

function Home({page, setPage}: {page:number, setPage: React.Dispatch<React.SetStateAction<number>>}) {

    function handleNextPage() {
        setPage(state => {
        if (state == 3) return state
        return state + 1
        })
    }

    const pageComponents = new Map(
        [
            [1, <QuestionnaireStep handleNextPage={handleNextPage} />],
            [2, <MealSelectionStep handleNextPage={handleNextPage} />],
            [3, <ResultStep />]
        ]
      )

    return pageComponents.get(page)
}

export default Home
