package org.example.MunchMatch;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
@Configuration
@SpringBootApplication
@ComponentScan(basePackages = {"WebController", "org.example.MunchMatch.API"})
public class MunchMatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(MunchMatchApplication.class, args);
    }
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}
