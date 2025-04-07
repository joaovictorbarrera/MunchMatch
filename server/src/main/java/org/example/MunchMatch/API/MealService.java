package org.example.MunchMatch.API;

import org.example.MunchMatch.Engine.Target;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@Service
public class MealService {

    @Value("${spoonacular.api.url}")
    private String API_URL;
    @Value("${api_key}")
    private String API_KEY;

    private final RestTemplate restTemplate;

    public MealService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    public MealResponse getMeals(String title, Target target, Boolean vegetarian, Boolean gluten, Boolean dairy, int offset) {
        if(API_KEY.equals("api")){
            System.out.println("NO API KEY WAS FOUND. SHUTTING DOWN.");
            System.exit(0);
        }

        List<String> intolerances = new ArrayList<>();
        if (gluten != null && gluten) intolerances.add("gluten");
        if (dairy != null && dairy) intolerances.add("dairy");
        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("query", title)
                .queryParam("maxCalories", target.getTargetCalories())
                .queryParam("maxCarbs", target.getTargetCarbs() == null ? 1000 : target.getTargetCarbs())
                .queryParam("maxFat", target.getTargetFat() == null ? 1000 : target.getTargetFat())
                .queryParam("maxProtein", target.getTargetProtein() == null ? 1000 : target.getTargetProtein())
                .queryParam("diet", vegetarian != null && vegetarian ? "vegetarian" : "")
                .queryParam("intolerances", String.join(",", intolerances))
                .queryParam("number", 100)  // Always request 100 meals
                .queryParam("offset", offset)
                .queryParam("addRecipeNutrition", true)
                .queryParam("apiKey", API_KEY)
                .toUriString();

        System.out.println("Public API Query: "+url);

        return restTemplate.getForObject(url, MealResponse.class);

    }
}

//This works   https://api.spoonacular.com/recipes/complexSearch?query=salad&type=lunch&maxProtein=150&maxCarbs=150&maxFat=100&maxCalories=1000&diet=vegetarian&intolerances=gluten,dairy&apiKey=apikey
//Local host works too  http://localhost:8081/meal?title=salad&dishTypes=lunch&protein=150&carbs=150&fat=100&calories=1000&vegetarian=true&gluten=true&dairy=true
