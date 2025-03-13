package org.example.MunchMatch.Class;
import java.util.List;

public class MealResponse {
    private List<Meal> results;


    public List<Meal> getResults() {
        return results;
    }

    public void setResults(List<Meal> results) {
        this.results = results;
    }

    @Override
    public String toString() {
        return "MealResponse{" +
                "results=" + results +
                '}';
    }
}
