package WebController;

import org.example.MunchMatch.API.*;
import org.example.MunchMatch.Class.*;

import org.example.MunchMatch.Engine.MealPlanGenerator;
import org.example.MunchMatch.Engine.Target;
import org.example.MunchMatch.Mock.MockResultData;
import org.example.MunchMatch.Repository.UserRepository;
import org.example.MunchMatch.Repository.ResultRepository;
import org.example.MunchMatch.Repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        return mealService.getMeals(title, new Target(calories, protein, carbs, fat), vegetarian, gluten, dairy, dishTypes, number, offset);
    }

    @PostMapping("/suggestions")
    public List<Meal> getMealSuggestions(@RequestBody MealRequest request, int number, int offset) {

        System.out.println(request);
        System.out.println("number: " + number);
        System.out.println("offset: " + offset);

        Questionnaire questionnaire = request.getQuestionnaire();
        List<Integer> seenMeals = request.getSeenMeals();

        // Destructure preferences from the questionnaire
        Target target = new Target(questionnaire);

        boolean lactoseFree = questionnaire.getRestrictions().isLactoseFree();
        boolean glutenFree = questionnaire.getRestrictions().isGlutenFree();
        boolean vegetarian = questionnaire.getRestrictions().isVegetarian();

        // Get meals from mealService based on the user's preferences
        List<Meal> meals = mealService.getMeals("", target, vegetarian, glutenFree, lactoseFree, "", number, offset).getResults();

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
        // return ResponseEntity.ok(mealSelectionService.saveResult(acceptedMeals));
        System.out.println(request);

        Target target = new Target(request.getQuestionnaire());

        // Step 1: Generate Meal Plans
        List<MealPlan> mealPlans = MealPlanGenerator.generateMealPlans(request.getAcceptedMeals(), target);

        // Step 2: Save Meal Plan to Database, get resultId
        // long resultId = DatabaseService.saveResult(mealPlans);

        // Step 3: Create Result Response
        // ResultResponse response = new ResultResponse(resultId, mealPlans);

        // Step 4: return the created results
        // return response;

        return MockResultData.makeFakeResponse(mealPlans);
    }

}
