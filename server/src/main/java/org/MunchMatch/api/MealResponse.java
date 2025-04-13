package org.MunchMatch.api;
import org.MunchMatch.obj.Meal;

import java.util.ArrayList;
import java.util.List;

public class MealResponse {
    private List<SpoonacularMeal> results;

    private static List<Meal> formatResults(List<SpoonacularMeal> results) {
        List<Meal> meals = new ArrayList<>();
        for (SpoonacularMeal snMeal : results) {
            Meal meal = new Meal();
            meal.setId(snMeal.getId());
            meal.setTitle(snMeal.getTitle());
            meal.setImage(snMeal.getImage());
            meal.setVegetarian(snMeal.isVegetarian());
            meal.setGluten(!snMeal.isGlutenFree());
            meal.setDairy(!snMeal.isDairyFree());
            meal.setDishTypes(snMeal.getDishTypes());

            SpoonacularMeal.SpoonacularNutrition nutrition = snMeal.getNutrition();
            for (SpoonacularMeal.SpoonacularNutrient nutrient : nutrition.getNutrients()) {
                if (nutrient.getName().equals("Calories")) meal.setCalories(nutrient.getAmount());
                if (nutrient.getName().equals("Fat")) meal.setFat(nutrient.getAmount());
                if (nutrient.getName().equals("Carbohydrates")) meal.setCarbs(nutrient.getAmount());
                if (nutrient.getName().equals("Protein")) meal.setProtein(nutrient.getAmount());
            }

            meals.add(meal);
        }
        return meals;
    }

    public List<Meal> getResults() {
        return MealResponse.formatResults(this.results);
    }

    public void setResults(List<SpoonacularMeal> results) {
        this.results = results;
    }

    @Override
    public String toString() {
        return "MealResponse{" +
                "results=" + results +
                '}';
    }
}
