package org.example.advjavaproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "WebController")
public class AdvJavaProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdvJavaProjectApplication.class, args);
    }

}
