package org.example.MunchMatch.Engine;

import org.example.MunchMatch.Class.MealPlan;

public class Score {
    // Lower is better
    public static long getScore(MealPlan mealPlan, Target target) {

        Total total = new Total(mealPlan);

        long sum = 0;

        sum += getNutrientScore(total.getTotalCalories(), target.getTargetCalories());
        sum += getNutrientScore(total.getTotalProtein(), target.getTargetProtein());
        sum += getNutrientScore(total.getTotalCarbs(), target.getTargetCarbs());
        sum += getNutrientScore(total.getTotalFat(), target.getTargetFat());

        return sum;
    }

    private static long getNutrientScore(long val1, Double val2) {
        if (val2 == null) return 0;
        if (val2 == 0) {
            return val1 == 0 ? 0 : 100; // if target is 0, any deviation is 100%
        }
        double percentDiff = Math.abs((val1 - val2) / val2) * 100;
        return Math.round(percentDiff);
    }
}
