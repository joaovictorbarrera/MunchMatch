package WebController;

import org.example.MunchMatch.API.MealService;
import org.example.MunchMatch.Class.*;

import org.example.MunchMatch.Repository.MealRepository;
import org.example.MunchMatch.Repository.UserRepository;
import org.example.MunchMatch.Repository.ResultRepository;
import org.example.MunchMatch.Repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RestController
@CrossOrigin(origins = "*")

public class WebController {

    @Autowired
    UserRepository repository;
    @Autowired
    ResultRepository repositoryResult;
    @Autowired
    MealPlanRepository repositoryMealPlan;
    @Autowired
    MealRepository mealRepository;

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

    //http://localhost:8080/suggestions - works.
    /*@PostMapping("/suggestions")
    public List<Meal> createSuggestions() {
        return Arrays.asList(
                new Meal(1L, "Salad", 123.0, 100, 100, 100,"image", "jpg", true, false, true, "lunch"),
                new Meal(2L, "Pasta",  345.0,200, 200, 200,"image", "jpg", true, false, true, "dinner")
        );
    }

    //http://localhost:8080/results - works.
    @PostMapping("/results")
    public ResultResponse createResults() {
        ArrayList<MealPlan> mealPlans = new ArrayList<>();
        MealPlan m1 = new MealPlan(5L, Arrays.asList(
                new Meal(1L, "Salad", 123.0, 100, 100, 100,"image", "jpg", true, false, true, "lunch"),
                new Meal(2L, "Pasta",  345.0,200, 200, 200,"image", "jpg", true, false, true, "dinner")
        ), 2L);
        mealPlans.add(m1);
        return new ResultResponse(3L, mealPlans);

    }*/
    /*//http://localhost:8080/results?resultId=123  - works.
    @GetMapping("/results")
    public ResultResponse resultsPage(@RequestParam Long resultId) {

        ArrayList<MealPlan> mealPlans = new ArrayList<>();
        MealPlan m1 = new MealPlan(5L, Arrays.asList(
                new Meal(1L, "Salad", 123.0, 100, 100, 100,"image", "jpg", true, false, true, "lunch"),
                new Meal(2L, "Pasta",  345.0,200, 200, 200,"image", "jpg", true, false, true, "dinner")
        ), 2L);
        mealPlans.add(m1);
        return new ResultResponse(3L, mealPlans);

    }*/


    @GetMapping("/meal")
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
        return mealService.getMeals(title, calories, carbs, fat, protein, vegetarian, gluten, dairy, dishTypes);
    }

    @PostMapping("/suggestions")
    public List<Meal> getMealSuggestions(@RequestBody MealRequest request) {

        // Destructure questionnaire and rejectedMeals from the request
        Questionnaire questionnaire = request.getQuestionnaire();
        List<Integer> rejectedMeals = request.getRejectedMeals();

        // Destructure preferences from the questionnaire
        int preferredCalories = questionnaire.getCalories();
        int preferredProtein = questionnaire.getNutrition().getProtein();
        int preferredCarbs = questionnaire.getNutrition().getCarbs();
        int preferredFat = questionnaire.getNutrition().getFat();
        boolean lactoseFree = questionnaire.getRestrictions().isLactoseFree();
        boolean glutenFree = questionnaire.getRestrictions().isGlutenFree();
        boolean vegetarian = questionnaire.getRestrictions().isVegetarian();

        // Fetch all meals from the database
        List<Meal> meals = mealRepository.findAll();

        // Apply filtering on the list of meals
        return meals.stream()
                .filter(meal -> !rejectedMeals.contains(meal.getId())) // Exclude rejected meals
                .filter(meal -> meal.getCalories() <= preferredCalories)
                .filter(meal -> meal.getProtein() >= preferredProtein)
                .filter(meal -> meal.getCarbs() <= preferredCarbs)
                .filter(meal -> meal.getFat() <= preferredFat)
                .filter(meal -> lactoseFree ? meal.isDairy() : true)
                .filter(meal -> glutenFree ? meal.isGluten() : true)
                .filter(meal -> vegetarian ? meal.isVegetarian() : true)
                .collect(Collectors.toList());
    }
}
