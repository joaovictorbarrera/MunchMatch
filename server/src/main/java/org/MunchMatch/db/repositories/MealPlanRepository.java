package org.MunchMatch.db.repositories;

import org.MunchMatch.db.tables.MealPlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlanEntity, Integer> {
    boolean existsByMealPlanId(int mealPlanId);
}
