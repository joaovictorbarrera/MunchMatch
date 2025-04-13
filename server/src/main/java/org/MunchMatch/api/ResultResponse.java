package org.MunchMatch.api;
import org.MunchMatch.obj.MealPlan;

import java.util.List;

public class ResultResponse {
    private int id;
    private List<MealPlan> mealPlans;

    public ResultResponse() {}

    public ResultResponse(List<MealPlan> mealPlans) {
        this.mealPlans = mealPlans;
    }

    public ResultResponse(int id, List<MealPlan> mealPlans) {
        this.id = id;
        this.mealPlans = mealPlans;
    }

    public int getId() {
        return id;
    }

    public List<MealPlan> getMealPlans() {
        return mealPlans;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setMealPlans(List<MealPlan> mealPlans) {
        this.mealPlans = mealPlans;
    }
}

