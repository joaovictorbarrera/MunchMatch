package org.MunchMatch.api;
import org.MunchMatch.obj.Meal;
import org.MunchMatch.obj.Questionnaire;

import java.util.List;
public class ResultRequest {
    Questionnaire questionnaire;
    List<Meal> acceptedMeals;

    public Questionnaire getQuestionnaire() {
        return questionnaire;
    }

    public List<Meal> getAcceptedMeals() {
        return acceptedMeals;
    }

    public void setQuestionnaire(Questionnaire questionnaire) {
        this.questionnaire = questionnaire;
    }

    public void setAcceptedMeals(List<Meal> acceptedMeals) {
        this.acceptedMeals = acceptedMeals;
    }

    @Override
    public String toString() {
        return "ResultRequest{" +
                "questionnaire=" + (questionnaire != null ? questionnaire.toString() : "null") +
                ", acceptedMeals=" + (acceptedMeals != null ? acceptedMeals.toString() : "null") +
                '}';
    }
}