package org.example.MunchMatch.db.Repository;

import org.example.MunchMatch.db.Tables.MealEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<MealEntity, Integer> {

}

