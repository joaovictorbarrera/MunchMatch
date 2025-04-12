
import QuestionnaireStep from "./QuestionnaireStep"
import ResultStep from "./ResultStep"
import MealSelectionStep from "./MealSelectionStep"
import { useContext, useState } from "react";
import { ResultIdContext } from "../../contexts/ResultIdContext";

function Home({page, setPage}: {page:number, setPage: React.Dispatch<React.SetStateAction<number>>}) {
    const [questionnaireStep, setQuestionnaireStep] = useState<number>(0);
    const {resultId} = useContext(ResultIdContext);

    function handlePreviousPage() {
        setPage(state => {
            if (state == 1) return state
            return state - 1
        })
    }

    function handleNextPage() {
        setPage(state => {
        if (state == 3) return state
        return state + 1
        })
    }

    const pageComponents = new Map(
        [
            [1, <QuestionnaireStep step={questionnaireStep} setStep={setQuestionnaireStep} handleNextPage={handleNextPage} />],
            [2, <MealSelectionStep handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />],
            [3, <ResultStep handlePreviousPage={handlePreviousPage} />]
        ]
      )

    return resultId ? pageComponents.get(3) : pageComponents.get(page)
}

export default Home
