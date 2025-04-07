package org.example.MunchMatch.Repository;

import org.example.MunchMatch.API.ResultResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<ResultResponse, Long> {

}

