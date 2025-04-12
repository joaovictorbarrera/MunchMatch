package org.example.MunchMatch.Class;

import java.util.List;

public class MealPlan {
    private List<Meal> meals;
    private Long score;
    private String bestScoreCategory;

    @Override
    public String toString() {
        return "MealPlan{" +
                ", meals=" + meals +
                ", score=" + score +
                ", bestScoreCategory='" + bestScoreCategory + '\'' +
                '}';
    }

    public String getBestScoreCategory() {
        return bestScoreCategory;
    }

    public void setBestScoreCategory(String bestScoreCategory) {
        this.bestScoreCategory = bestScoreCategory;
    }

    public MealPlan() {
    }

    public MealPlan(List<Meal> meals) {
        this.meals = meals;
    }

    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public List<Meal> getMeals() {
        return meals;
    }

    public void setMeals(List<Meal> meal) {
        this.meals = meal;
    }
}