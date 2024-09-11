package mk.ukim.finki.examscheduler.web.service;

import mk.ukim.finki.examscheduler.web.model.dto.SubjectExamDTO;

import java.util.List;

public interface SubjectExamService {
    /*
    Return the exams as DTO objects with necessary data only
    to be displayed on calendar
     */
    List<SubjectExamDTO> getForCalendarDisplay();
}
