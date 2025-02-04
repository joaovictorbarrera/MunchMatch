package org.example.MunchMatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "WebController")
public class MunchMatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(MunchMatchApplication.class, args);
    }

}
