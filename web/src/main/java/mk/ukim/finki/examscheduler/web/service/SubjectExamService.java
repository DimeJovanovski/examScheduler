package mk.ukim.finki.examscheduler.web.service;

import mk.ukim.finki.examscheduler.web.model.SubjectExam;
import mk.ukim.finki.examscheduler.web.model.dto.SubjectExamDTO;

import java.util.List;
import java.util.Optional;

public interface SubjectExamService {
    /*
    Return the exams as DTO objects with necessary data only
    to be displayed on calendar
     */
    List<SubjectExamDTO> getForCalendarDisplay();
    Optional<SubjectExam> findById(String id);
    void deleteById(String id);
}
