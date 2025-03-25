package org.example.MunchMatch.Class;

public class Questionnaire {
    private int calories;
    private Nutrition nutrition;
    private Restrictions restrictions;

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public Nutrition getNutrition() {
        return nutrition;
    }

    public void setNutrition(Nutrition nutrition) {
        this.nutrition = nutrition;
    }

    public Restrictions getRestrictions() {
        return restrictions;
    }

    public void setRestrictions(Restrictions restrictions) {
        this.restrictions = restrictions;
    }

    public static class Nutrition {
        private int protein;
        private int carbs;
        private int fat;

        // Getters and Setters

        public int getProtein() {
            return protein;
        }

        public void setProtein(int protein) {
            this.protein = protein;
        }

        public int getCarbs() {
            return carbs;
        }

        public void setCarbs(int carbs) {
            this.carbs = carbs;
        }

        public int getFat() {
            return fat;
        }

        public void setFat(int fat) {
            this.fat = fat;
        }
    }

    public static class Restrictions {
        private boolean lactoseFree;
        private boolean glutenFree;
        private boolean vegetarian;

        // Getters and Setters

        public boolean isLactoseFree() {
            return lactoseFree;
        }

        public void setLactoseFree(boolean lactoseFree) {
            this.lactoseFree = lactoseFree;
        }

        public boolean isGlutenFree() {
            return glutenFree;
        }

        public void setGlutenFree(boolean glutenFree) {
            this.glutenFree = glutenFree;
        }

        public boolean isVegetarian() {
            return vegetarian;
        }

        public void setVegetarian(boolean vegetarian) {
            this.vegetarian = vegetarian;
        }
    }
}
