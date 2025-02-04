package WebController;

import org.example.MunchMatch.User;
import org.example.MunchMatch.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller

public class WebController {

    @Autowired
    UserRepository repository;

    @GetMapping("/")
    public String indexPage(Model model) {
        model.addAttribute("userForm", new User());
        System.out.println();
        return "index";
    }

    @PostMapping("/success")
    public String successPage(@ModelAttribute User user, Model model) {
            repository.save(user);
            return "success";

    }

}
