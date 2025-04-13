package org.MunchMatch.engine;

import org.MunchMatch.obj.Meal;
import org.MunchMatch.obj.MealPlan;

import java.util.*;

public class MealPlanGenerator {
    public static List<MealPlan> generateMealPlans(List<Meal> acceptedMeals, Target target) {
        acceptedMeals = removeDuplicates(acceptedMeals);
        List<MealPlan> mealPlans = new ArrayList<>();

        List<Meal> breakfasts = acceptedMeals.stream().filter(m -> m.getDishTypes().contains("breakfast")).toList();
        List<Meal> lunches = acceptedMeals.stream().filter(m -> m.getDishTypes().contains("lunch")).toList();
        List<Meal> snacks = acceptedMeals.stream().filter(m -> !m.getDishTypes().contains("breakfast") && !m.getDishTypes().contains("lunch") && !m.getDishTypes().contains("dinner")).toList();

        if (breakfasts.isEmpty()) {
            System.out.println("No breakfast meals received. Returning empty list.");
            return mealPlans;
        }

        if (lunches.isEmpty()) {
            System.out.println("No lunch/dinner meals received. Returning empty list.");
            return mealPlans;
        }

        if (snacks.isEmpty()) {
            System.out.println("No snack meals received. Returning empty list.");
            return mealPlans;
        }

        // Since apparently Spoonacular makes every meal with lunch also have dinner, I will split them in two.
        // Dinners is just going to be the second half of lunches, then ill prune it from lunches.
        int mid = lunches.size() / 2;
        List<Meal> dinners = lunches.subList(mid, lunches.size());
        lunches = lunches.subList(0, mid);

        System.out.println("Algorithm Starting. Breakfasts: "+breakfasts.size()+" Lunches: "+lunches.size()+" Snacks: "+snacks.size()+" Dinners: "+dinners.size());
        System.out.println("Possible Combinations: "+breakfasts.size()*lunches.size()*snacks.size()*dinners.size());

        // Main Algorithm
        long start = System.currentTimeMillis();
        long timeout = 5000; // 5 seconds
        boolean forcedDone = false;
        for (Meal b : breakfasts) {
            if (forcedDone) break;
            for (Meal l : lunches) {
                if (forcedDone) break;
                for (Meal s : snacks) {
                    if (forcedDone) break;
                    for (Meal d : dinners) {
                        if (forcedDone) break;
                        List<Meal> meals = Arrays.asList(b, l, s, d);
                        MealPlan mealPlan = new MealPlan(meals);
                        mealPlan.setScore(Score.getScore(mealPlan, target));
                        mealPlans.add(mealPlan);

                        if (System.currentTimeMillis() - start > timeout) {
                            System.out.println("Brute Force Alg taking too long. Exiting Loop...");
                            forcedDone = true;
                        }
                    }
                }
            }
        }

        // After generating meal plans,
        // if there are more than 5 it will calculate what their scores are
        // and get rid of the ones with the worst score
        //
        // This function always returns 5 or less meal plans.

        mealPlans.sort(new MealPlanComparator());

        List<MealPlan> filteredMealPlans = new ArrayList<>();

        int count = 0;
        for (MealPlan mealPlan : mealPlans) {
            if (count == 5) break;
            mealPlan.setBestScoreCategory(Score.getBestScoreCategory(mealPlan, target));
            filteredMealPlans.add(mealPlan);
            count++;
            System.out.println("Meal Plan Generated of score " + mealPlan.getScore() + " Totals: " + new Total(mealPlan) + "MealPlan: "+mealPlan);
        }

        return filteredMealPlans;
    }

    private static List<Meal> removeDuplicates(List<Meal> meals) {
        Set<Integer> seenTitles = new HashSet<>();
        List<Meal> pruned = new ArrayList<>();

        for (Meal meal : meals) {
            if (seenTitles.add(meal.getId())) {
                pruned.add(meal); // Only add if title wasn't seen before
            }
        }

        return pruned;
    }

    public static class MealPlanComparator implements Comparator<MealPlan> {

        @Override
        public int compare(MealPlan o1, MealPlan o2) {
            return Math.round(o1.getScore() - o2.getScore()) * -1;
        }
    }
}
