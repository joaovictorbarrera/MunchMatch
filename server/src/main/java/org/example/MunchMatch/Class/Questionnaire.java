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

    @Override
    public String toString() {
        return "Questionnaire{" +
                "calories=" + calories +
                ", nutrition=" + (nutrition != null ? nutrition.toString() : "null") +
                ", restrictions=" + (restrictions != null ? restrictions.toString() : "null") +
                '}';
    }

    public static class Nutrition {
        private Integer protein;
        private Integer carbs;
        private Integer fat;

        // Getters and Setters

        public Integer getProtein() {
            return protein;
        }

        public void setProtein(Integer protein) {
            this.protein = protein;
        }

        public Integer getCarbs() {
            return carbs;
        }

        public void setCarbs(Integer carbs) {
            this.carbs = carbs;
        }

        public Integer getFat() {
            return fat;
        }

        public void setFat(Integer fat) {
            this.fat = fat;
        }

        @Override
        public String toString() {
            return "Nutrition{" +
                    "protein=" + protein +
                    ", carbs=" + carbs +
                    ", fat=" + fat +
                    '}';
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

        @Override
        public String toString() {
            return "Restrictions{" +
                    "lactoseFree=" + lactoseFree +
                    ", glutenFree=" + glutenFree +
                    ", vegetarian=" + vegetarian +
                    '}';
        }
    }
}
