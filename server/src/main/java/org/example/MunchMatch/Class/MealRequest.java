package org.example.MunchMatch.Class;

import java.util.List;

public class MealRequest {
    private Questionnaire questionnaire;
    private List<Integer> seenMeals;

    // Getters and Setters

    public Questionnaire getQuestionnaire() {
        return questionnaire;
    }

    public void setQuestionnaire(Questionnaire questionnaire) {
        this.questionnaire = questionnaire;
    }

    public List<Integer> getSeenMeals() {
        return seenMeals;
    }

    public void setSeenMeals(List<Integer> seenMeals) {
        this.seenMeals = seenMeals;
    }
}
