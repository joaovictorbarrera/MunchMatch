package org.example.MunchMatch.Engine;

import org.example.MunchMatch.Class.MealPlan;

import java.util.HashMap;
import java.util.Map;

public class Score {
    // Lower is better
    public static long getScore(MealPlan mealPlan, Target target) {

        Total total = new Total(mealPlan);

        long sum = 0;

        // Each nutrient contributes to 25% of scoring.
        sum += getNutrientScore(total.getTotalCalories(), target.getTargetCalories());
        sum += getNutrientScore(total.getTotalProtein(), target.getTargetProtein());
        sum += getNutrientScore(total.getTotalCarbs(), target.getTargetCarbs());
        sum += getNutrientScore(total.getTotalFat(), target.getTargetFat());

        // Here the score gets translated to More is better.
        return 100 - (sum / 4);
    }

    public static String getBestScoreCategory(MealPlan mealPlan, Target target) {
        Total total = new Total(mealPlan);

        Map<String, Long> typedScorings = new HashMap<>();
        typedScorings.put("calories", getNutrientScore(total.getTotalCalories(), target.getTargetCalories()));
        if(target.getTargetProtein() != null) typedScorings.put("protein", getNutrientScore(total.getTotalProtein(), target.getTargetProtein()));
        if(target.getTargetCarbs() != null) typedScorings.put("carbs", getNutrientScore(total.getTotalCarbs(), target.getTargetCarbs()));
        if(target.getTargetFat() != null) typedScorings.put("fat", getNutrientScore(total.getTotalFat(), target.getTargetFat()));

        String bestScoreCategory = "calories";
        long bestScore = typedScorings.get("calories");
        for (Map.Entry<String, Long> entry : typedScorings.entrySet()) {
//            System.out.println("Category: "+entry.getKey()+" Score: "+entry.getValue());
            if (entry.getValue() < bestScore) {
                bestScoreCategory = entry.getKey();
                bestScore = entry.getValue();
            }
        }

        return bestScoreCategory;
    }

    // Less is better. Nutrient Score is scoring for deviation.
    // 0 means there was zero deviation thus total was equal to target.
    // 100 means there was maximum deviation thus total was very different from target.
    private static long getNutrientScore(long val1, Double val2) {
        if (val2 == null) return 0;
        if (val2 == 0) {
            return val1 == 0 ? 0 : 100; // if target is 0, any deviation is 100%
        }

        val1 = (long) Math.pow(val1, 2);
        val2 = Math.pow(val2, 2);

        double percentDiff = Math.abs((val1 - val2) / val2) * 100;
        return Math.round(percentDiff) > 100 ? 100 : Math.round(percentDiff);
    }
}
