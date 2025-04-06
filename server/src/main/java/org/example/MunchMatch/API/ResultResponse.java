package org.example.MunchMatch.API;
import jakarta.persistence.*;
import org.example.MunchMatch.Class.MealPlan;

import java.util.List;

@Entity
@Table(name = "results")
public class ResultResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<MealPlan> mealPlans;

    public ResultResponse() {}

    public ResultResponse(List<MealPlan> mealPlans) {
        this.mealPlans = mealPlans;
    }

    public ResultResponse(Long id, List<MealPlan> mealPlans) {
        this.id = id;
        this.mealPlans = mealPlans;
    }

    public Long getId() {
        return id;
    }

    public List<MealPlan> getMealPlans() {
        return mealPlans;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMealPlans(List<MealPlan> mealPlans) {
        this.mealPlans = mealPlans;
    }
}

