package org.example.MunchMatch.Engine;

import org.example.MunchMatch.Class.Meal;
import org.example.MunchMatch.Class.MealPlan;

public class Total {
    private long totalCalories;
    private long totalProtein;
    private long totalCarbs;
    private long totalFat;

    public Total(MealPlan mealPlan) {
        this.totalCalories = getTotalCalories(mealPlan);
        this.totalProtein = getTotalProtein(mealPlan);
        this.totalCarbs = getTotalCarbs(mealPlan);
        this.totalFat = getTotalFat(mealPlan);
    }

    public static long getTotalCalories(MealPlan mealPlan) {
        long sum = 0;
        for (Meal meal : mealPlan.getMeals()) {
            sum += (long) meal.getCalories();
        }

        return sum;
    }

    public static long getTotalProtein(MealPlan mealPlan) {
        long sum = 0;
        for (Meal meal : mealPlan.getMeals()) {
            sum += (long) meal.getProtein();
        }

        return sum;
    }

    public static long getTotalCarbs(MealPlan mealPlan) {
        long sum = 0;
        for (Meal meal : mealPlan.getMeals()) {
            sum += (long) meal.getCarbs();
        }

        return sum;
    }

    public static long getTotalFat(MealPlan mealPlan) {
        long sum = 0;
        for (Meal meal : mealPlan.getMeals()) {
            sum += (long) meal.getFat();
        }

        return sum;
    }

    public long getTotalCalories() {
        return totalCalories;
    }

    public void setTotalCalories(long totalCalories) {
        this.totalCalories = totalCalories;
    }

    public long getTotalProtein() {
        return totalProtein;
    }

    public void setTotalProtein(long totalProtein) {
        this.totalProtein = totalProtein;
    }

    public long getTotalCarbs() {
        return totalCarbs;
    }

    public void setTotalCarbs(long totalCarbs) {
        this.totalCarbs = totalCarbs;
    }

    public long getTotalFat() {
        return totalFat;
    }

    public void setTotalFat(long totalFat) {
        this.totalFat = totalFat;
    }

    @Override
    public String toString() {
        return "Total{" +
                "totalCalories=" + totalCalories +
                ", totalProtein=" + totalProtein +
                ", totalCarbs=" + totalCarbs +
                ", totalFat=" + totalFat +
                '}';
    }
}
