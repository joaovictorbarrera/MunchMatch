package org.example.MunchMatch.Class;
import org.example.MunchMatch.Repository.ResultRepository;
import org.springframework.stereotype.Service;
import java.util.List;



@Service
public class MealSelectionService {

    private final ResultRepository resultRepository;

    public MealSelectionService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    public ResultResponse saveResult(List<MealPlan> mealPlans) {
        ResultResponse result = new ResultResponse(mealPlans);
        return resultRepository.save(result);
    }
}


