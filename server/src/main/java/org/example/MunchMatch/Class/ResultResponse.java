package org.example.MunchMatch.Class;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "results")
public class ResultResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<Long> acceptedMeals;

    // Default constructor for JPA
    public ResultResponse() {}

    public ResultResponse(List<Long> acceptedMeals) {
        this.acceptedMeals = acceptedMeals;
    }

    public List<Long> getAcceptedMeals() {
        return acceptedMeals;
    }

    public void setAcceptedMeals(List<Long> acceptedMeals) {
        this.acceptedMeals = acceptedMeals;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

