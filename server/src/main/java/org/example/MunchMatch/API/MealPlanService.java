package org.example.MunchMatch.API;

import org.example.MunchMatch.Class.Meal;
import org.example.MunchMatch.Class.MealResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@Service
public class MealPlanService {

    private static final String BASE_URL = "https://api.spoonacular.com/";

    @Value("${API_KEY}")
    private String API_KEY;

    private final RestTemplate restTemplate;

    public MealPlanService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Meal> getMeals(String title,  Double calories,Double carbs, Double fat,Double protein, String image, String imageType, Boolean vegetarian,Boolean gluten, Boolean dairy, List<String> dishTypes) {


        List<String> intolerances = new ArrayList<>();
        if (gluten != null && gluten) intolerances.add("gluten");
        if (dairy != null && dairy) intolerances.add("dairy");

        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL + "recipes/complexSearch")
                .queryParam("query", title)
                .queryParam("maxCalories", calories)
                .queryParam("maxCarbs", carbs)
                .queryParam("maxFat", fat)
                .queryParam("maxProtein", protein)
                .queryParam("image", image)
                .queryParam("imageType", imageType)
                .queryParam("diet", vegetarian != null && vegetarian ? "vegetarian" : "")
                .queryParam("intolerances", String.join(",", intolerances))
                .queryParam("dishTypes", String.join(",", dishTypes))
                .queryParam("apiKey", API_KEY)
                .toUriString();

        MealResponse response = restTemplate.getForObject(url, MealResponse.class);

        if (response != null && response.getResults() != null) {
            return response.getResults();
        } else {
            throw new RuntimeException("No meals found with the provided parameters.");
        }
    }
}

//This works   https://api.spoonacular.com/recipes/complexSearch?query=salad&type=lunch&maxProtein=150&maxCarbs=150&maxFat=100&maxCalories=1000&diet=vegetarian&intolerances=gluten,dairy&apiKey=apikey
//Local host is not working   http://localhost:8080/meal?title=salad&dishTypes=lunch&protein=150&carbs=150&fat=100&calories=1000.5&vegetarian=true&gluten=true&dairy=true
