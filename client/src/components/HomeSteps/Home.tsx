
import QuestionnaireStep from "./QuestionnaireStep"
import ResultStep from "./ResultStep"
import MealSelectionStep from "./MealSelectionStep"
import { useContext, useState } from "react";
import { ResultIdContext } from "../../contexts/ResultIdContext";

function Home({page, setPage}: {page:number, setPage: React.Dispatch<React.SetStateAction<number>>}) {
    const [questionnaireStep, setQuestionnaireStep] = useState<number>(0);
    const {resultId} = useContext(ResultIdContext);

    const pageComponents = new Map(
        [
            [1, <QuestionnaireStep step={questionnaireStep} setStep={setQuestionnaireStep} setPage={setPage} />],
            [2, <MealSelectionStep setPage={setPage} />],
            [3, <ResultStep setPage={setPage} />]
        ]
      )

    return resultId ? pageComponents.get(3) : pageComponents.get(page)
}

export default Home
