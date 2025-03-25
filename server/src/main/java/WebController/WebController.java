package WebController;

import org.example.MunchMatch.API.MealService;
import org.example.MunchMatch.Class.*;

import org.example.MunchMatch.Repository.UserRepository;
import org.example.MunchMatch.Repository.ResultRepository;
import org.example.MunchMatch.Repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
            @RequestParam (required = false) Double carbs,
            @RequestParam (required = false) Double fat,
            @RequestParam (required = false) Double protein,
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
        int preferredProtein = questionnaire.getNutrition().getProtein() != null ? questionnaire.getNutrition().getProtein() : 0; // Default to 0
        int preferredCarbs = questionnaire.getNutrition().getCarbs() != null ? questionnaire.getNutrition().getCarbs() : 0; // Default to 0
        int preferredFat = questionnaire.getNutrition().getFat() != null ? questionnaire.getNutrition().getFat() : 0; // Default to 0
        boolean lactoseFree = questionnaire.getRestrictions().isLactoseFree();
        boolean glutenFree = questionnaire.getRestrictions().isGlutenFree();
        boolean vegetarian = questionnaire.getRestrictions().isVegetarian();

        // Get meals from mealService based on the user's preferences
        List<Meal> meals = mealService.getMeals("", preferredCalories, preferredCarbs, preferredFat, preferredProtein, vegetarian, glutenFree, lactoseFree, "").getResults();

        // Apply filtering on the list of meals based on rejected meals
        return meals.stream()
                .filter(meal -> !rejectedMeals.contains(meal.getId())) // Exclude rejected meals
                .collect(Collectors.toList());
    }



    @PostMapping("/results")
    public ResponseEntity<ResultResponse> createMealPlan(@RequestBody List<Long> acceptedMeals) {
        return ResponseEntity.ok(mealSelectionService.saveResult(acceptedMeals));
    }

}
