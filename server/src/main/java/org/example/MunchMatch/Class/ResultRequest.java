package org.example.MunchMatch.Class;
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