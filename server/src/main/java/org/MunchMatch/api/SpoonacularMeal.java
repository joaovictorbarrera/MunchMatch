package org.MunchMatch.api;

import java.util.List;

public class SpoonacularMeal {
    private int id;
    private String title;
    private String image;
    private boolean dairyFree;
    private boolean glutenFree;
    private boolean vegetarian;

    private SpoonacularNutrition nutrition;

    private List<String> dishTypes;

    @Override
    public String toString() {
        return "SpoonacularMeal{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", image='" + image + '\'' +
                ", dairyFree=" + dairyFree +
                ", glutenFree=" + glutenFree +
                ", vegetarian=" + vegetarian +
                ", nutrition=" + nutrition +
                ", dishTypes=" + dishTypes +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isDairyFree() {
        return dairyFree;
    }

    public void setDairyFree(boolean dairyFree) {
        this.dairyFree = dairyFree;
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

    public SpoonacularNutrition getNutrition() {
        return nutrition;
    }

    public void setNutrition(SpoonacularNutrition nutrition) {
        this.nutrition = nutrition;
    }

    public List<String> getDishTypes() {
        return dishTypes;
    }

    public void setDishTypes(List<String> dishTypes) {
        this.dishTypes = dishTypes;
    }

    public static class SpoonacularNutrition {
        private List<SpoonacularNutrient> nutrients;
        @Override
        public String toString() {
            return "SpoonacularNutrition{" +
                    "nutrients=" + nutrients +
                    '}';
        }

        public List<SpoonacularNutrient> getNutrients() {
            return nutrients;
        }

        public void setNutrients(List<SpoonacularNutrient> nutrients) {
            this.nutrients = nutrients;
        }
    }

    public static class SpoonacularNutrient {
        private String name;
        private Long amount;
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Long getAmount() {
            return amount;
        }

        public void setAmount(Long amount) {
            this.amount = amount;
        }

        @Override
        public String toString() {
            return "SpoonacularNutrient{" +
                    "name='" + name + '\'' +
                    ", amount=" + amount +
                    '}';
        }
    }
}
