import { createContext } from "react"

export interface Questionnaire {
    calories: number,
    nutrition: {
      protein: number,
      carbs: number,
      fat: number
    },
    restrictions: {
      lactoseFree: boolean,
      glutenFree: boolean,
      vegetarian: boolean
    }
}

export const defaultQuestionnaire = {
    calories: -1,
    nutrition: {
        protein: -1,
        carbs: -1,
        fat: -1
    },
    restrictions: {
        lactoseFree: false,
        glutenFree: false,
        vegetarian: false
    }
}

interface QuestionnaireContext {
    questionnaire: Questionnaire,
    setQuestionnaire: React.Dispatch<React.SetStateAction<Questionnaire>>
}

export const QuestionnaireContext = createContext<QuestionnaireContext>({questionnaire: defaultQuestionnaire, setQuestionnaire: () => {}});
