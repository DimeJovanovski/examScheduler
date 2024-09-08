INSERT INTO year_exam_session (name, session, year, session_start, session_end, enrollment_start_date, enrollment_end_date)
VALUES
    ('2024-FIRST_MIDTERM', 'FIRST_MIDTERM', '2024', '2024-02-01', '2024-02-15', '2024-01-01', '2024-01-15'),
    ('2024-SECOND_MIDTERM', 'SECOND_MIDTERM', '2024', '2024-04-01', '2024-04-15', '2024-03-01', '2024-03-15'),
    ('2024-JUNE', 'JUNE', '2024', '2024-06-01', '2024-06-30', '2024-05-01', '2024-05-20'),
    ('2024-SEPTEMBER', 'SEPTEMBER', '2024', '2024-09-01', '2024-09-30', '2024-08-01', '2024-08-15');



-- For the FIRST_MIDTERM session
INSERT INTO year_exam_session_cycle (year_exam_session_name, cycle)
VALUES
    ('2024-FIRST_MIDTERM', 'UNDERGRADUATE'),
    ('2024-FIRST_MIDTERM', 'MASTER'),
    ('2024-FIRST_MIDTERM', 'PHD'),

    -- For the SECOND_MIDTERM session
    ('2024-SECOND_MIDTERM', 'UNDERGRADUATE'),
    ('2024-SECOND_MIDTERM', 'MASTER'),

    -- For the JUNE session
    ('2024-JUNE', 'UNDERGRADUATE'),
    ('2024-JUNE', 'MASTER'),
    ('2024-JUNE', 'PHD'),

    -- For the SEPTEMBER session
    ('2024-SEPTEMBER', 'UNDERGRADUATE'),
    ('2024-SEPTEMBER', 'MASTER');
