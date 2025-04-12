package org.example.MunchMatch;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import io.github.cdimascio.dotenv.Dotenv;
@Configuration
@SpringBootApplication
@ComponentScan(basePackages = {"WebController", "org.example.MunchMatch.API", "org.example.MunchMatch.db"})
public class MunchMatchApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

        dotenv.entries().forEach(entry ->
                System.setProperty(entry.getKey(), entry.getValue())
        );

//        System.out.println(System.getProperty("API_KEY"));
//        System.out.println(System.getProperty("DB_USERNAME"));
//        System.out.println(System.getProperty("DB_PASSWORD"));

        if (System.getProperty("API_KEY") == null) {
            System.out.println("NO API KEY WAS FOUND. SHUTTING DOWN...");
            System.exit(0);
        }

        if (System.getProperty("DB_USERNAME") == null) {
            System.out.println("DB USERNAME WAS NOT FOUND. SHUTTING DOWN...");
            System.exit(0);
        }

        if (System.getProperty("DB_PASSWORD") == null) {
            System.out.println("DB PASSWORD WAS NOT FOUND. SHUTTING DOWN...");
            System.exit(0);
        }

        SpringApplication.run(MunchMatchApplication.class, args);
    }
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}
