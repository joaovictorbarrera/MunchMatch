package WebController;

import jakarta.mail.MessagingException;
import org.example.MunchMatch.API.*;
import org.example.MunchMatch.Class.*;

import org.example.MunchMatch.Engine.MealPlanGenerator;
import org.example.MunchMatch.Engine.Target;
import org.example.MunchMatch.db.Services.EmailService;
import org.example.MunchMatch.db.Services.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RestController
@CrossOrigin(origins = "*")
public class WebController {
    @Autowired
    private APIService apiService;

    @Autowired
    private ResultService resultService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/success")
    public String successPage(Model model) {
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
            @RequestParam int offset) {
        return apiService.getMeals(title, new Target(calories, protein, carbs, fat), vegetarian, gluten, dairy, offset);
    }

    @PostMapping("/suggestions")
    public List<Meal> getMealSuggestions(@RequestBody MealRequest request, int offset) {

        System.out.println(request);
        System.out.println("offset: " + offset);

        Questionnaire questionnaire = request.getQuestionnaire();
        List<Integer> seenMeals = request.getSeenMeals();

        // Destructure preferences from the questionnaire
        Target target = new Target(questionnaire);

        boolean lactoseFree = questionnaire.getRestrictions().isLactoseFree();
        boolean glutenFree = questionnaire.getRestrictions().isGlutenFree();
        boolean vegetarian = questionnaire.getRestrictions().isVegetarian();

        // Get meals from apiService based on the user's preferences
        List<Meal> meals = apiService.getMeals("", target, vegetarian, glutenFree, lactoseFree, offset).getResults();

        // Apply filtering on the list of meals based on seen meals
        return meals.stream()
                .filter(meal -> !seenMeals.contains(meal.getId())) // Exclude seen meals limit
                .collect(Collectors.toList());
    }

    @GetMapping("/results")
    public ResultResponse getResultFromId(@RequestParam (required = true) int resultId) {
        ResultResponse res = resultService.getResult(resultId);
        if (res == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found");
        return res;
    }

    //Create a meal plan results
    @PostMapping("/results")
    public ResultResponse createMealPlan(@RequestBody ResultRequest request) {
        System.out.println(request);

        Target target = new Target(request.getQuestionnaire());

        // Step 1: Generate Meal Plans
        List<MealPlan> mealPlans = MealPlanGenerator.generateMealPlans(request.getAcceptedMeals(), target);

        // Step 2: Save Meal Plan to Database, get resultId
         int resultId = resultService.addResult(mealPlans);

        // Step 3: return the created results
        return new ResultResponse(resultId, mealPlans);

//        return MockResultData.makeFakeResponse(mealPlans);
    }

    @PostMapping("/email")
    public void sendEmail(@RequestBody EmailRequest request) {
        System.out.println(request);

        String email = "Hello there,\n\n" +
                "You are receiving this email because you opted in for receiving your meal plan results.\n\n" +
                "Access my MunchMatch results: " + request.getResultLink() +
                "\n\nEnjoy your meals!\n\n" +
                "The MunchMatch Organization";

        try {
            emailService.sendSimpleEmail(request.getEmailAddress(), "Your MunchMatch Results", email);
            System.out.println("Email Sent!");
        } catch (MessagingException | UnsupportedEncodingException e) {
            System.out.println("Error sending email!");
            throw new RuntimeException(e);
        }

    }
}
