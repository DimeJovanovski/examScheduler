package mk.ukim.finki.examscheduler.web.service.impl;

import mk.ukim.finki.examscheduler.web.model.YearExamSession;
import mk.ukim.finki.examscheduler.web.repository.YearExamSessionRepository;
import mk.ukim.finki.examscheduler.web.service.YearExamSessionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class YearExamSessionServiceImpl implements YearExamSessionService {
    private final YearExamSessionRepository yearExamSessionRepository;

    public YearExamSessionServiceImpl(YearExamSessionRepository yearExamSessionRepository) {
        this.yearExamSessionRepository = yearExamSessionRepository;
    }

    @Override
    public List<YearExamSession> findAll() {
        return this.yearExamSessionRepository.findAll();
    }
}
