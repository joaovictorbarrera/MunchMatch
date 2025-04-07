package org.example.MunchMatch.Class;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Table (name= "meal")
public class Meal {
    @Id
    private int id;
    private String title;
    private double calories;
    private double carbs;
    private double fat;
    private double protein;
    private String image;
    private boolean vegetarian;
    private boolean gluten;
    private boolean dairy;
    private List<String> dishTypes;

    @Column(name = "mealPlanId")
   private Long mealPlanId;

    public Meal() {
    }

    public Meal(int id, String title, double calories, double carbs, double fat, double protein, String image, String imageType, boolean vegetarian, boolean gluten, boolean dairy, List<String> dishTypes) {
        this.id = id;
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

    public <T> Meal(List<T> ts) {
    }




    // Getters and setters for all fields
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public double getCalories() { return calories; }
    public void setCalories(double calories) { this.calories = calories; }
    public double getCarbs() { return carbs; }
    public void setCarbs(double carbs) { this.carbs = carbs; }
    public double getFat() { return fat; }
    public void setFat(double fat) { this.fat = fat; }
    public double getProtein() { return protein; }
    public void setProtein(double protein) { this.protein = protein; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public boolean isVegetarian() { return vegetarian; }
    public void setVegetarian(boolean vegetarian) { this.vegetarian = vegetarian; }
    public boolean isGluten() { return gluten; }
    public void setGluten(boolean gluten) { this.gluten = gluten; }
    public boolean isDairy() { return dairy; }
    public void setDairy(boolean dairy) { this.dairy = dairy; }
    public List<String> getDishTypes() {return dishTypes;}
    public void setDishTypes(List<String> dishTypes) {this.dishTypes = dishTypes;}

    @Override
    public String toString() {
        return "Meal{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", calories=" + calories +
                ", carbs='" + carbs + '\'' +
                ", fat='" + fat + '\'' +
                ", protein='" + protein + '\'' +
                ", image='" + image + '\'' +
                ", vegetarian=" + vegetarian +
                ", gluten=" + gluten +
                ", dairy=" + dairy +
                ", dishTypes=" + dishTypes +
                '}';
    }
}

