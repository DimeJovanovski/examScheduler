package mk.ukim.finki.examscheduler.web.web.rest;

import mk.ukim.finki.examscheduler.web.model.dto.SubjectExamDTO;
import mk.ukim.finki.examscheduler.web.service.SubjectExamService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
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
}
