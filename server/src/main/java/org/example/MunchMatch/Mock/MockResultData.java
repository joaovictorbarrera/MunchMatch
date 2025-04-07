package org.example.MunchMatch.Mock;

import org.example.MunchMatch.Class.Meal;
import org.example.MunchMatch.Class.MealPlan;
import org.example.MunchMatch.API.ResultResponse;

import java.util.ArrayList;
import java.util.List;

public class MockResultData {
    private static final long mockResultID = 999;
    public static List<MealPlan> makeData(List<Meal> acceptedMeals) {
        List<MealPlan> mealPlans = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            List<Meal> meals = new ArrayList<>();

            meals.add(acceptedMeals.get(4*i));
            meals.add(acceptedMeals.get(1 + 4*i));
            meals.add(acceptedMeals.get(2 + 4*i));
            meals.add(acceptedMeals.get(3 + 4*i));

            MealPlan mp = new MealPlan((long) i, meals, mockResultID);
            mealPlans.add(mp);
        }

        System.out.println("Mock Result Generated:");
        System.out.println(mealPlans);

        return mealPlans;
    }

    public static ResultResponse makeFakeResponse(List<MealPlan> mealPlans) {
        return new ResultResponse(mockResultID, mealPlans);
    }
}
