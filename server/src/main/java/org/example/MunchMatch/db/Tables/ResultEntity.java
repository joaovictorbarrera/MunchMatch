package org.example.MunchMatch.db.Tables;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class ResultEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int row_id;

    private int resultId;

    private int mealPlanId;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "mealPlanId", referencedColumnName = "mealPlanId")
    private List<MealPlanEntity> mealPlanEntities;

    public ResultEntity(int resultId, int mealPlanId) {
        this.resultId = resultId;
        this.mealPlanId = mealPlanId;
    }

    public ResultEntity() {

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
}
