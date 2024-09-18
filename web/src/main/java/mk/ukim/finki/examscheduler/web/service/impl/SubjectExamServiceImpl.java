package mk.ukim.finki.examscheduler.web.service.impl;

import mk.ukim.finki.examscheduler.web.model.Room;
import mk.ukim.finki.examscheduler.web.model.SubjectExam;
import mk.ukim.finki.examscheduler.web.model.dto.SubjectExamDTO;
import mk.ukim.finki.examscheduler.web.model.enumerations.StudyCycle;
import mk.ukim.finki.examscheduler.web.repository.RoomRepository;
import mk.ukim.finki.examscheduler.web.repository.SubjectExamRepository;
import mk.ukim.finki.examscheduler.web.service.SubjectExamService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SubjectExamServiceImpl implements SubjectExamService {
    private final SubjectExamRepository subjectExamRepository;
    private final RoomRepository roomRepository;

    public SubjectExamServiceImpl(SubjectExamRepository subjectExamRepository, RoomRepository roomRepository) {
        this.subjectExamRepository = subjectExamRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public List<SubjectExamDTO> getForCalendarDisplay() {
        return subjectExamRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<SubjectExam> findById(String id) {
        return this.subjectExamRepository.findById(id);
    }

    @Override
    public Optional<SubjectExam> edit(String id, SubjectExamDTO subjectExamDTO) {
        SubjectExam exam = this.subjectExamRepository.findById(id).orElse(null);

        exam.setFromTime(subjectExamDTO.getFromTime());
        exam.setToTime(subjectExamDTO.getToTime());
        Set<Room> rooms = this.roomRepository.findByNameIn(subjectExamDTO.getRoomNames());
        exam.setRooms(rooms);

        this.subjectExamRepository.save(exam);
        return Optional.of(exam);
    }

    private SubjectExamDTO convertToDTO(SubjectExam subjectExam) {
        // extract study cycle
        StudyCycle studyCycle = subjectExam.getDefinition().getSubject().getCycle();

        // extract room names
        Set<String> roomNames = subjectExam.getRooms().stream()
                .map(Room::getName)
                .collect(Collectors.toSet());

        return new SubjectExamDTO(
                subjectExam.getId(),
                subjectExam.getDefinition().getSubject().getAbbreviation(),
                subjectExam.getDefinition().getSubject().getName(),
                studyCycle,
                subjectExam.getDurationMinutes(),
                subjectExam.getFromTime(),
                subjectExam.getToTime(),
                roomNames
        );
    }

    @Override
    public void deleteById(String id) {
        this.subjectExamRepository.deleteById(id);
    }
}

