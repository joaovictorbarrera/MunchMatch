package org.MunchMatch.engine;

import org.MunchMatch.obj.Questionnaire;

public class Target {
    private double targetCalories;
    private Double targetProtein;
    private Double targetCarbs;
    private Double targetFat;

    public Target(double targetCalories, Double targetProtein, Double targetCarbs, Double targetFat) {
        this.targetCalories = targetCalories;
        this.targetProtein = targetProtein;
        this.targetCarbs = targetCarbs;
        this.targetFat = targetFat;
    }

    public Target(Questionnaire questionnaire) {
        this.targetCalories = questionnaire.getCalories();
        this.targetProtein = questionnaire.getNutrition().getProtein() >= 0 ? questionnaire.getNutrition().getProtein() : null;
        this.targetCarbs = questionnaire.getNutrition().getCarbs() >= 0 ? questionnaire.getNutrition().getCarbs() : null;
        this.targetFat = questionnaire.getNutrition().getFat() >= 0 ? questionnaire.getNutrition().getFat() : null;
    }

    public double getTargetCalories() {
        return targetCalories;
    }

    @Override
    public String toString() {
        return "Target{" +
                "targetCalories=" + targetCalories +
                ", targetProtein=" + targetProtein +
                ", targetCarbs=" + targetCarbs +
                ", targetFat=" + targetFat +
                '}';
    }

    public void setTargetCalories(double targetCalories) {
        this.targetCalories = targetCalories;
    }

    public Double getTargetProtein() {
        return targetProtein;
    }

    public void setTargetProtein(Double targetProtein) {
        this.targetProtein = targetProtein;
    }

    public Double getTargetCarbs() {
        return targetCarbs;
    }

    public void setTargetCarbs(Double targetCarbs) {
        this.targetCarbs = targetCarbs;
    }

    public Double getTargetFat() {
        return targetFat;
    }

    public void setTargetFat(Double targetFat) {
        this.targetFat = targetFat;
    }
}
