package WebController;

import org.example.MunchMatch.API.MealService;
import org.example.MunchMatch.Class.*;

import org.example.MunchMatch.Mock.MockResultData;
import org.example.MunchMatch.Repository.UserRepository;
import org.example.MunchMatch.Repository.ResultRepository;
import org.example.MunchMatch.Repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RestController
@CrossOrigin(origins = "*")

public class WebController {

    private MealSelectionService mealSelectionService;

    public void MealSelectionController(MealSelectionService mealSelectionService) {
        this.mealSelectionService = mealSelectionService;
    }

    @Autowired
    UserRepository repository;
    @Autowired
    ResultRepository repositoryResult;
    @Autowired
    MealPlanRepository repositoryMealPlan;

    private final MealService mealService;

    @Autowired
    public WebController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/")
    public String indexPage(Model model) {
        model.addAttribute("userForm", new User());
        return "index";
    }

    @PostMapping("/success")
    public String successPage(@ModelAttribute User user, Model model) {
        repository.save(user);
        return "success";

    }


    @GetMapping("/meal")
    public MealResponse getMeals(
            @RequestParam String title,
            @RequestParam Double calories,
            @RequestParam (required = false) Double carbs,
            @RequestParam (required = false) Double fat,
            @RequestParam (required = false) Double protein,
            @RequestParam Boolean vegetarian,
            @RequestParam Boolean gluten,
            @RequestParam Boolean dairy,
            @RequestParam (required = false) String dishTypes,
            @RequestParam int number,
            @RequestParam int offset) {
        return mealService.getMeals(title, calories, carbs, fat, protein, vegetarian, gluten, dairy, dishTypes, number, offset);
    }

    @PostMapping("/suggestions")
    public List<Meal> getMealSuggestions(@RequestBody MealRequest request, int number, int offset) {

        System.out.println(request);
        System.out.println("number: " + number);
        System.out.println("offset: " + offset);

        Questionnaire questionnaire = request.getQuestionnaire();
        List<Integer> seenMeals = request.getSeenMeals();

        // Destructure preferences from the questionnaire
        int preferredCalories = questionnaire.getCalories();
        int preferredProtein = questionnaire.getNutrition().getProtein() > 0 ? questionnaire.getNutrition().getProtein() : 1000; // Default to 0
        int preferredCarbs = questionnaire.getNutrition().getCarbs() > 0 ? questionnaire.getNutrition().getCarbs() : 1000; // Default to 0
        int preferredFat = questionnaire.getNutrition().getFat() > 0 ? questionnaire.getNutrition().getFat() : 1000; // Default to 0
        boolean lactoseFree = questionnaire.getRestrictions().isLactoseFree();
        boolean glutenFree = questionnaire.getRestrictions().isGlutenFree();
        boolean vegetarian = questionnaire.getRestrictions().isVegetarian();

        // Get meals from mealService based on the user's preferences
        List<Meal> meals = mealService.getMeals("", preferredCalories, preferredCarbs, preferredFat, preferredProtein, vegetarian, glutenFree, lactoseFree, "", number, offset).getResults();

        // Apply filtering on the list of meals based on seen meals
        return meals.stream()
                .filter(meal -> !seenMeals.contains(meal.getId())) // Exclude seen meals
                .skip(offset) //Offset for each page
                .limit(number) //limit
                .collect(Collectors.toList());
    }

    //Create a meal plan results
    @PostMapping("/results")
    public ResultResponse createMealPlan(@RequestBody ResultRequest request) {
        // ResponseEntity<ResultResponse>
//        return ResponseEntity.ok(mealSelectionService.saveResult(acceptedMeals));
        System.out.println(request);
        return MockResultData.makeData(request.getAcceptedMeals());
    }

}
