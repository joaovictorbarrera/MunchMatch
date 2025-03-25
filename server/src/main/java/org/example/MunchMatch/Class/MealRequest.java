package org.example.MunchMatch.Class;

import java.util.List;

public class MealRequest {
    private Questionnaire questionnaire;
    private List<Integer> rejectedMeals;

    // Getters and Setters

    public Questionnaire getQuestionnaire() {
        return questionnaire;
    }

    public void setQuestionnaire(Questionnaire questionnaire) {
        this.questionnaire = questionnaire;
    }

    public List<Integer> getRejectedMeals() {
        return rejectedMeals;
    }

    public void setRejectedMeals(List<Integer> rejectedMeals) {
        this.rejectedMeals = rejectedMeals;
    }
}
