package org.example.MunchMatch.Engine;

import org.example.MunchMatch.Class.Meal;
import org.example.MunchMatch.Class.MealPlan;
import org.example.MunchMatch.Mock.MockResultData;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class MealPlanGenerator {
    public static List<MealPlan> generateMealPlans(List<Meal> acceptedMeals, Target target) {

        List<MealPlan> mealPlans = new ArrayList<>();

        // TODO: FIGURE OUT WHAT TO DO WITH DISH TYPES

        // TODO: figure out mealplanid and resultid
        final long temporaryId = 999;

        // TODO: ALGORITHM
        List<Meal> breakfasts = acceptedMeals.stream().filter(m -> m.getDishTypes().contains("breakfast")).toList();
        List<Meal> lunches = acceptedMeals.stream().filter(m -> m.getDishTypes().contains("lunch")).toList();
        List<Meal> snacks = acceptedMeals.stream().filter(m -> !m.getDishTypes().contains("breakfast") && !m.getDishTypes().contains("lunch") && !m.getDishTypes().contains("dinner")).toList();
        List<Meal> dinners = acceptedMeals.stream().filter(m -> m.getDishTypes().contains("dinner")).toList();

        if (breakfasts.isEmpty()) {
            System.out.println("No breakfast meals received. Returning empty list.");
            return mealPlans;
        }

        if (lunches.isEmpty()) {
            System.out.println("No lunch meals received. Returning empty list.");
            return mealPlans;
        }

        if (snacks.isEmpty()) {
            System.out.println("No snack meals received. Returning empty list.");
            return mealPlans;
        }

        if (dinners.isEmpty()) {
            System.out.println("No dinner meals received. Returning empty list.");
            return mealPlans;
        }

        int goodScorePlans = 0;
        for (Meal b : breakfasts) {
            if (goodScorePlans >= 5) break;
            for (Meal l : lunches) {
                if (goodScorePlans >= 5) break;
                for (Meal s : snacks) {
                    if (goodScorePlans >= 5) break;
                    for (Meal d : dinners) {
                        if (goodScorePlans >= 5) break;
                        List<Meal> meals = Arrays.asList(b, l, s, d);
                        MealPlan mealPlan = new MealPlan(temporaryId, meals, temporaryId);
                        mealPlan.setScore(Score.getScore(mealPlan, target));
                        mealPlans.add(mealPlan);

                        // if meal plan is within 20% deviation from target, mark it as a good plan
                        if (mealPlan.getScore() <= 20) {
                            goodScorePlans++;
                            System.out.println("Good meal plan found! MealPlan: "+mealPlan);
                        }
                    }
                }
            }
        }


        // After generating meal plans,
        // if there are more than 5 it will calculate what their scores are
        // and butcher the ones with the worst score
        //
        // This function always returns 5 or less meal plans.

        mealPlans.sort(new MealPlanComparator());

        List<MealPlan> filteredMealPlans = new ArrayList<>();

        int count = 0;
        for (MealPlan mealPlan : mealPlans) {
            if (count == 5) break;
            filteredMealPlans.add(mealPlan);
            count++;
            System.out.println("Meal Plan Generated of score " + mealPlan.getScore() + " Totals: " + new Total(mealPlan));
        }

        return filteredMealPlans;
    }

    public static class MealPlanComparator implements Comparator<MealPlan> {

        @Override
        public int compare(MealPlan o1, MealPlan o2) {
            return Math.round(o1.getScore() - o2.getScore());
        }
    }
}
