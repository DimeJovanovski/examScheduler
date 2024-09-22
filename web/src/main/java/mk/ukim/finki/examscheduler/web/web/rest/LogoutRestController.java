package mk.ukim.finki.examscheduler.web.web.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
@RequestMapping("/api/logout")
public class LogoutRestController {

    @GetMapping
    public ResponseEntity<String> logoutPage() {
        return ResponseEntity.ok("You have been logged out successfully");
    }
}


