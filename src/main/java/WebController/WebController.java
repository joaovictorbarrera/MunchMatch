package WebController;

import org.example.advjavaproject.Student;
import org.example.advjavaproject.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller

public class WebController {

    @Autowired
    StudentRepository repository;

    @GetMapping("/")
    public String indexPage(Model model) {
        model.addAttribute("studentForm", new Student());
        System.out.println();
        return "index";
    }

    @PostMapping("/success")
    public String successPage(@ModelAttribute Student student, Model model) {
        if (!student.getEmail().endsWith("@mail.valenciacollege.edu")) {
            return "error";
        }
        else {
            model.addAttribute("studentForm", student);
            repository.save(student);
            return "success";
        }

    }

}
