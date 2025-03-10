package org.example.MunchMatch.Class;

import java.util.ArrayList;
import java.util.List;

public class ResultResponse {
    private Long resultId;
    private List<MealPlan> mealPlan;

    public ResultResponse(Long resultId, ArrayList<MealPlan> mealPlan) {
        this.resultId = resultId;
        this.mealPlan = mealPlan;
    }

    public Long getResultId() {
        return resultId;
    }

    public void setResultId(Long resultId) {
        this.resultId = resultId;
    }

    public void setMealPlan(List<MealPlan> mealPlan) {
        this.mealPlan = mealPlan;
    }

    public ArrayList<MealPlan> getMealPlan() {
        return (ArrayList<MealPlan>) mealPlan;
    }


    @Override
    public String toString() {
        return "ResultResponse{" +
                "resultId='" + resultId + '\'' +
                ", mealPlan=" + mealPlan +
                '}';
    }
}