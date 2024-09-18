package mk.ukim.finki.examscheduler.web.service;

import mk.ukim.finki.examscheduler.web.model.YearExamSession;

import java.util.List;

public interface YearExamSessionService {
    List<YearExamSession> findAll();
}
