package org.example.MunchMatch.db.Tables;

import jakarta.persistence.*;
import org.example.MunchMatch.Class.Meal;

import java.util.List;

@Entity
public class MealPlanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int row_id;
    private int mealPlanId;
    private int mealId;
    private Long score;
    private String bestScoreCategory;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "mealId", referencedColumnName = "mealId")
    private List<MealEntity> mealEntities;

    public MealPlanEntity(int mealPlanId, int mealId, Long score, String bestScoreCategory) {
        this.mealPlanId = mealPlanId;
        this.mealId = mealId;
        this.score = score;
        this.bestScoreCategory = bestScoreCategory;
    }

    public MealPlanEntity() {

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
}
