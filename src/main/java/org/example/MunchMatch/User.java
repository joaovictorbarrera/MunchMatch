package org.example.MunchMatch;

import jakarta.persistence.*;

@Entity
@Table(name="users")

public class User {

    @Id
    @GeneratedValue
    private Long id;
    @Column
    private String fname;
    @Column
    private String lname;
    @Column
    private String email;

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



    @Override
    public String toString() {
        return "User{" +
                "id=" + id + '\'' +
                "fname='" + fname + '\'' +
                ", lname='" + lname + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
