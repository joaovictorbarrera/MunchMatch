package org.example.MunchMatch.db.Repository;

import org.example.MunchMatch.db.Tables.MealPlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlanEntity, Integer> {
    boolean existsByMealPlanId(int mealPlanId);
}
