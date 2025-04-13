package org.MunchMatch.db.repositories;

import org.MunchMatch.db.tables.MealEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<MealEntity, Integer> {

}

