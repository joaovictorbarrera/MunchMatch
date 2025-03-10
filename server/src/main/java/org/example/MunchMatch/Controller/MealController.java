package org.example.MunchMatch.API;
import org.example.MunchMatch.Class.Meal;
import org.example.MunchMatch.Class.MealResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import java.util.Collections;

@RestController
@RequestMapping("/meal")
@CrossOrigin(origins = "*")
public class MealController {

    private final MealService mealService;

    @Autowired
    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping
    public MealResponse getMeals(
            @RequestParam String title,
            @RequestParam Double calories,
            @RequestParam Double carbs,
            @RequestParam Double fat,
            @RequestParam Double protein,
            @RequestParam Boolean vegetarian,
            @RequestParam Boolean gluten,
            @RequestParam Boolean dairy,
            @RequestParam String dishTypes) {
        ArrayList<Meal> meal = new ArrayList<>();
        Meal meal1 = new Meal(Collections.singletonList(mealService.getMeals(title, calories, carbs, fat, protein, vegetarian, gluten, dairy, dishTypes)));
        meal.add(meal1);
        return new MealResponse(meal);
    }

}
