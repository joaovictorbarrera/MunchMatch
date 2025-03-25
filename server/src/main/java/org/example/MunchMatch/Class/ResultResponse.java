package org.example.MunchMatch.Class;

import java.util.ArrayList;
import java.util.List;

/*public class ResultResponse {
    private Long resultId;
    private List<MealPlan> mealPlan;

    public ResultResponse(Long resultId, ArrayList<MealPlan> mealPlan) {
        this.resultId = resultId;
        this.mealPlan = mealPlan;
    }

    public Long getResultId() {
        return resultId;
    }

    public void setResultId(Long resultId) {
        this.resultId = resultId;
    }

    public void setMealPlan(List<MealPlan> mealPlan) {
        this.mealPlan = mealPlan;
    }

    public ArrayList<MealPlan> getMealPlan() {
        return (ArrayList<MealPlan>) mealPlan;
    }


    @Override
    public String toString() {
        return "ResultResponse{" +
                "resultId='" + resultId + '\'' +
                ", mealPlan=" + mealPlan +
                '}';
    }
}*/

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "results")
public class ResultResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<Long> acceptedMeals;

    // Default constructor for JPA
    public ResultResponse() {}

    public ResultResponse(List<Long> acceptedMeals) {
        this.acceptedMeals = acceptedMeals;
    }

    public List<Long> getAcceptedMeals() {
        return acceptedMeals;
    }

    public void setAcceptedMeals(List<Long> acceptedMeals) {
        this.acceptedMeals = acceptedMeals;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

