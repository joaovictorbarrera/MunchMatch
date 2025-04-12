package org.example.MunchMatch.db.Repository;

import org.example.MunchMatch.db.Class.ResultMealJoinDTO;
import org.example.MunchMatch.db.Tables.MealPlanEntity;
import org.example.MunchMatch.db.Tables.ResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<ResultEntity, Integer> {
    boolean existsByResultId(int resultId);
    @Query("""
    SELECT new org.example.MunchMatch.db.Class.ResultMealJoinDTO(
        r.resultId, r.mealPlanId, mp.mealId, mp.score, mp.bestScoreCategory,
        m.title, m.calories, m.carbs, m.fat, m.protein, m.image,
        m.vegetarian, m.gluten, m.dairy, m.dishTypes
    )
    FROM ResultEntity r
    JOIN MealPlanEntity mp ON r.mealPlanId = mp.mealPlanId
    JOIN MealEntity m ON mp.mealId = m.mealId
    WHERE r.resultId = :resultId
""")
    List<ResultMealJoinDTO> fetchJoinedResults(@Param("resultId") int resultId);
}

