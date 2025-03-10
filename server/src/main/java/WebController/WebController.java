package WebController;

import org.example.MunchMatch.API.MealPlanService;
import org.example.MunchMatch.Class.Meal;
import org.example.MunchMatch.Class.MealPlan;
import org.example.MunchMatch.Class.ResultResponse;
import org.example.MunchMatch.Class.User;
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
    @PostMapping("/suggestions")
    public List<Meal> createSuggestions() {
        return Arrays.asList(
                new Meal(1L, "Salad", 123.0, "100", "100", "100","image", "jpg", true, false, true, "lunch"),
                new Meal(2L, "Pasta",  345.0,"200", "200", "200","image", "jpg", true, false, true, "dinner")
        );
    }

    //http://localhost:8080/results - works.
    @PostMapping("/results")
    public ResultResponse createResults() {
        ArrayList<MealPlan> mealPlans = new ArrayList<>();
        MealPlan m1 = new MealPlan(5L, Arrays.asList(
                new Meal(1L, "Salad", 123.0, "100", "100", "100","image", "jpg", true, false, true, "lunch"),
                new Meal(2L, "Pasta",  345.0,"200", "200", "200","image", "jpg", true, false, true, "dinner")
        ), 2L);
        mealPlans.add(m1);
        return new ResultResponse(3L, mealPlans);

    }
    //http://localhost:8080/results?resultId=123  - works.
    @GetMapping("/results")
    public ResultResponse resultsPage(@RequestParam Long resultId) {

        ArrayList<MealPlan> mealPlans = new ArrayList<>();
        MealPlan m1 = new MealPlan(5L, Arrays.asList(
                new Meal(1L, "Salad", 123.0, "100", "100", "100","image", "jpg", true, false, true, "lunch"),
                new Meal(2L, "Pasta",  345.0,"200", "200", "200","image", "jpg", true, false, true, "dinner")
        ), 2L);
        mealPlans.add(m1);
        return new ResultResponse(3L, mealPlans);

    }
}
