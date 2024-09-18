package mk.ukim.finki.examscheduler.web.web.rest;

import mk.ukim.finki.examscheduler.web.model.SubjectExam;
import mk.ukim.finki.examscheduler.web.model.dto.SubjectExamDTO;
import mk.ukim.finki.examscheduler.web.service.SubjectExamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
@RequestMapping("/api/exams")
public class SubjectExamRestController {
    private final SubjectExamService subjectExamService;

    public SubjectExamRestController(SubjectExamService subjectExamService) {
        this.subjectExamService = subjectExamService;
    }

    @GetMapping
    public List<SubjectExamDTO> getForCalendarDisplay() {
        return this.subjectExamService.getForCalendarDisplay();
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<SubjectExam> edit(@PathVariable String id, @RequestBody SubjectExamDTO subjectExamDTO) {
        return this.subjectExamService.edit(id, subjectExamDTO)
                .map(subjectExam -> ResponseEntity.ok().body(subjectExam))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteById(@PathVariable String id) {
        this.subjectExamService.deleteById(id);
        if (this.subjectExamService.findById(id).isEmpty()) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

}
