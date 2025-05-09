package org.MunchMatch.db.obj;

public class ResultMealJoinDTO {
    private int resultId;
    private int mealPlanId;
    private int mealId;
    private Long score;
    private String bestScoreCategory;
    private String title;
    private double calories;
    private double carbs;
    private double fat;
    private double protein;
    private String image;
    private boolean vegetarian;
    private boolean gluten;
    private boolean dairy;
    private String dishTypes;

    public ResultMealJoinDTO(int resultId, int mealPlanId, int mealId, Long score, String bestScoreCategory, String title, double calories, double carbs, double fat, double protein, String image, boolean vegetarian, boolean gluten, boolean dairy, String dishTypes) {
        this.resultId = resultId;
        this.mealPlanId = mealPlanId;
        this.mealId = mealId;
        this.score = score;
        this.bestScoreCategory = bestScoreCategory;
        this.title = title;
        this.calories = calories;
        this.carbs = carbs;
        this.fat = fat;
        this.protein = protein;
        this.image = image;
        this.vegetarian = vegetarian;
        this.gluten = gluten;
        this.dairy = dairy;
        this.dishTypes = dishTypes;
    }

    public int getResultId() {
        return resultId;
    }

    public void setResultId(int resultId) {
        this.resultId = resultId;
    }

    public int getMealPlanId() {
        return mealPlanId;
    }

    public void setMealPlanId(int mealPlanId) {
        this.mealPlanId = mealPlanId;
    }

    public int getMealId() {
        return mealId;
    }

    public void setMealId(int mealId) {
        this.mealId = mealId;
    }

    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public String getBestScoreCategory() {
        return bestScoreCategory;
    }

    public void setBestScoreCategory(String bestScoreCategory) {
        this.bestScoreCategory = bestScoreCategory;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        this.vegetarian = vegetarian;
    }

    public boolean isGluten() {
        return gluten;
    }

    public void setGluten(boolean gluten) {
        this.gluten = gluten;
    }

    public boolean isDairy() {
        return dairy;
    }

    public void setDairy(boolean dairy) {
        this.dairy = dairy;
    }

    public String getDishTypes() {
        return dishTypes;
    }

    public void setDishTypes(String dishTypes) {
        this.dishTypes = dishTypes;
    }
}
