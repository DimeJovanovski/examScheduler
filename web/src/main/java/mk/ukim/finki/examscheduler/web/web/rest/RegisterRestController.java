package mk.ukim.finki.examscheduler.web.web.rest;

import mk.ukim.finki.examscheduler.web.model.User;
import mk.ukim.finki.examscheduler.web.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
@RequestMapping("/api/register")
public class RegisterRestController {

    private final UserService userService;

    public RegisterRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> register(@RequestBody User user) {
        // Check if username is already taken
        Optional<User> existingUser = userService.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return new ResponseEntity<>("Username is already taken", HttpStatus.BAD_REQUEST);
        }

        // Register user (password will be encoded in the service)
        userService.registerUser(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }
}

