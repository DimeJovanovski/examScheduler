package mk.ukim.finki.examscheduler.web.service.impl;

import mk.ukim.finki.examscheduler.web.model.Room;
import mk.ukim.finki.examscheduler.web.model.SubjectExam;
import mk.ukim.finki.examscheduler.web.model.dto.SubjectExamDTO;
import mk.ukim.finki.examscheduler.web.model.enumerations.StudyCycle;
import mk.ukim.finki.examscheduler.web.repository.SubjectExamRepository;
import mk.ukim.finki.examscheduler.web.service.SubjectExamService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SubjectExamServiceImpl implements SubjectExamService {
    private final SubjectExamRepository subjectExamRepository;

    public SubjectExamServiceImpl(SubjectExamRepository subjectExamRepository) {
        this.subjectExamRepository = subjectExamRepository;
    }

    @Override
    public List<SubjectExamDTO> getForCalendarDisplay() {
        return subjectExamRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private SubjectExamDTO convertToDTO(SubjectExam subjectExam) {
        // extract study cycle
        StudyCycle studyCycle = subjectExam.getDefinition().getSubject().getCycle();

        // extract room names
        Set<String> roomNames = subjectExam.getRooms().stream()
                .map(Room::getName)
                .collect(Collectors.toSet());

        return new SubjectExamDTO(
                subjectExam.getDefinition().getSubject().getAbbreviation(),
                studyCycle,
                subjectExam.getDurationMinutes(),
                subjectExam.getFromTime(),
                subjectExam.getToTime(),
                roomNames
        );
    }
}
