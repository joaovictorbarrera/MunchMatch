package org.example.MunchMatch.Class;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="result")

public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = MealPlan.class,
            cascade = CascadeType.ALL

    )
    @JoinColumn(name = "resultId")
    private List<MealPlan> mealPlan;

    @Column(name="userId")
    private Long id;

    public Result() {
    }

    public Result(Long resultId, List<MealPlan> mealPlan, Long id) {
        this.resultId = resultId;
        this.mealPlan = mealPlan;
        this.id = id;
    }

    public Long getResultId() {
        return resultId;
    }

    public void setResultId(Long resultId) {
        this.resultId = resultId;
    }

    public List<MealPlan> getMealPlan() {
        return mealPlan;
    }

    public void setMealPlan(List<MealPlan> mealPlan) {
        this.mealPlan = mealPlan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Result{" +
                "resultId=" + resultId +
                ", mealPlan=" + mealPlan +
                ", id=" + id +
                '}';
    }
}