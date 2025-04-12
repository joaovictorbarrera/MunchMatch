package org.example.MunchMatch.db.Services;

import org.example.MunchMatch.API.ResultResponse;
import org.example.MunchMatch.Class.Meal;
import org.example.MunchMatch.Class.MealPlan;
import org.example.MunchMatch.db.Class.ResultMealJoinDTO;
import org.example.MunchMatch.db.Repository.MealPlanRepository;
import org.example.MunchMatch.db.Repository.MealRepository;
import org.example.MunchMatch.db.Repository.ResultRepository;
import org.example.MunchMatch.db.Tables.MealEntity;
import org.example.MunchMatch.db.Tables.MealPlanEntity;
import org.example.MunchMatch.db.Tables.ResultEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Autowired
    private MealRepository mealRepository;

    public int addResult(List<MealPlan> mealPlans) {

        // Step 1: Generate unique result ID
        int resultId;
        do {
            resultId = generateRandomId();
        } while (resultRepository.existsByResultId(resultId));

        // Prepare all entities
        List<MealEntity> mealsToSave = new ArrayList<>();
        List<MealPlanEntity> mealPlansToSave = new ArrayList<>();
        List<ResultEntity> resultsToSave = new ArrayList<>();

        for (MealPlan mp : mealPlans) {

            // Generate unique mealPlanId
            int mealPlanId;
            do {
                mealPlanId = generateRandomId();
            } while (mealPlanRepository.existsByMealPlanId(mealPlanId));

            for (Meal meal : mp.getMeals()) {
                MealEntity mealEntity = new MealEntity(
                        meal.getId(), meal.getTitle(), meal.getCalories(),
                        meal.getCarbs(), meal.getFat(), meal.getProtein(), meal.getImage(),
                        meal.isVegetarian(), meal.isGluten(), meal.isDairy(),
                        flattenDishTypes(meal.getDishTypes())
                );
                mealsToSave.add(mealEntity);

                MealPlanEntity mealPlanEntity = new MealPlanEntity(
                        mealPlanId, meal.getId(), mp.getScore(), mp.getBestScoreCategory()
                );
                mealPlansToSave.add(mealPlanEntity);
            }

            ResultEntity resultEntity = new ResultEntity(resultId, mealPlanId);
            resultsToSave.add(resultEntity);
        }

        // Step 3: Save all in bulk
        mealRepository.saveAll(mealsToSave);
        mealPlanRepository.saveAll(mealPlansToSave);
        resultRepository.saveAll(resultsToSave);

        System.out.println("New result saved! ResultId: " + resultId);
        return resultId;
    }

    public boolean isResultIdExist(int resultId) {
        return resultRepository.existsByResultId(resultId);
    }

    public ResultResponse getResult(int resultId) {

        // Gets all rows with this result ID
        List<ResultMealJoinDTO> rows = resultRepository.fetchJoinedResults(resultId);

        if (rows.isEmpty()) return null;

        Map<Integer, MealPlan> mealPlanMap = new HashMap<>();

        for (ResultMealJoinDTO row : rows) {
            Meal meal = new Meal(row.getMealId(), row.getTitle(),
                    row.getCalories(), row.getCarbs(), row.getFat(), row.getProtein(),
                    row.getImage(), row.isVegetarian(), row.isGluten(), row.isDairy(),
                    unflattenDishTypes(row.getDishTypes())
            );

            mealPlanMap.computeIfAbsent(row.getMealPlanId(), id -> {
                MealPlan mp = new MealPlan();
                mp.setMeals(new ArrayList<>());
                mp.setScore(row.getScore());
                mp.setBestScoreCategory(row.getBestScoreCategory());
                return mp;
            }).getMeals().add(meal);
        }

        System.out.println(mealPlanMap);

        return new ResultResponse(resultId, new ArrayList<>(mealPlanMap.values()));
    }

    private static String flattenDishTypes(List<String> dishTypes) {
        if (dishTypes == null || dishTypes.isEmpty()) return null;
        StringBuilder flattened = new StringBuilder(dishTypes.get(0));
        for (String dishType : dishTypes) {
            flattened.append(",");
            flattened.append(dishType);
        }

        return flattened.toString();
    }

    private static int generateRandomId() {
        Random random = new Random();
        return random.nextInt(Integer.MAX_VALUE);
    }

    private static List<String> unflattenDishTypes(String flatDishTypes) {
        if (flatDishTypes == null) return null;
        String[] dishTypesArr = flatDishTypes.split(",");

        return Arrays.asList(dishTypesArr);
    }
}
