package org.example.MunchMatch.Class;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="mealPlan")

public class MealPlan {
    @Id
    private Long mealPlanId;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = Meal.class,
            cascade = CascadeType.ALL

    )
    @JoinColumn(name = "mealPlanId")
    private List<Meal> meals;

    @Column(name="resultId")
    private Long resultId;

    public MealPlan() {
    }

    public MealPlan(Long mealPlanId, List<Meal> meals, Long resultId) {
        this.mealPlanId = mealPlanId;
        this.meals = meals;
        this.resultId = resultId;
    }

    public Long getMealPlanId() {
        return mealPlanId;
    }

    public void setMealPlanId(Long mealPlanId) {
        this.mealPlanId = mealPlanId;
    }

    public List<Meal> getMeals() {
        return meals;
    }

    public void setMeals(List<Meal> meal) {
        this.meals = meal;
    }

    public Long getResultId() {
        return resultId;
    }

    public void setResultId(Long resultId) {
        this.resultId = resultId;
    }
}