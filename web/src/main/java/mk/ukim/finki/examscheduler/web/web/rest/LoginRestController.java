package mk.ukim.finki.examscheduler.web.web.rest;

import mk.ukim.finki.examscheduler.web.model.User;
import mk.ukim.finki.examscheduler.web.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
@RequestMapping("/api/login")
public class LoginRestController {

    // No explicit login method is needed since Spring Security handles it.
    // This controller is kept for clarity or future customization needs.

    @GetMapping
    public ResponseEntity<String> loginPage() {
        return ResponseEntity.ok("Please log in using the form");
    }
}

