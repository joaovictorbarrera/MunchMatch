package org.example.MunchMatch.Class;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="users")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String fname;
    @Column
    private String lname;
    @Column
    private String email;


    @OneToOne(
            fetch = FetchType.EAGER,
            targetEntity = Result.class,
            cascade = CascadeType.ALL

    )
    @JoinColumn(name = "userId")
    private Result result;

    public User() {
    }

    public User(Long id, String fname, String lname, String email, Result result) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.result = result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fname='" + fname + '\'' +
                ", lname='" + lname + '\'' +
                ", email='" + email + '\'' +
                ", result=" + result +
                '}';
    }
}
