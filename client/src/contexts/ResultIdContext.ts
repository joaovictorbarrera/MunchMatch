import { createContext } from "react";

interface ResultIdContext {
    resultId: number | null,
    setResultId: React.Dispatch<React.SetStateAction<number | null>>,
}

export const ResultIdContext = createContext<ResultIdContext>({resultId: null, setResultId: () => {}});
