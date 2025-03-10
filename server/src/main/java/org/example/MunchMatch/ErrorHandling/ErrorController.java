package org.example.MunchMatch.ErrorHandling;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController {

    @RequestMapping("/error")
    public String handleError(Model model) {
        // You can add custom error messages here
        model.addAttribute("errorMessage", "Oops! Something went wrong.");
        return "error"; // Return the error.html template
    }
}
