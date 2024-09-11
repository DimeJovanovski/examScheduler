INSERT INTO subject_exam (id, session_name, definition_id, duration_minutes, previous_year_attendants_number, previous_year_total_students, attendants_number, total_students, expected_number, num_repetitions, from_time, to_time, comment)
VALUES
    -- For the September session
    ('2024-DIST_SYS-SEPTEMBER', '2024-SEPTEMBER', '2024-DIST_SYS-JUNE-LAB', 90, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-10T10:00:00', '2024-09-10T12:00:00', 'Final lab exam for Distributed Systems'),
    ('2024-AI-SEPTEMBER', '2024-SEPTEMBER', '2024-AI-JUNE-EXAM', 120, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-12T10:00:00', '2024-09-12T12:00:00', 'Final exam for Artificial Intelligence'),

    -- For the June session
    ('2024-DIST_SYS-JUNE', '2024-JUNE', '2024-DIST_SYS-JUNE-LAB', 90, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-10T10:00:00', '2024-06-10T12:00:00', 'Lab exam for Distributed Systems'),
    ('2024-AI-JUNE', '2024-JUNE', '2024-AI-JUNE-EXAM', 120, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-12T10:00:00', '2024-06-12T12:00:00', 'Final exam for Artificial Intelligence'),

    -- For the first midterm session
    ('2024-DIST_SYS-FIRST-MIDTERM', '2024-FIRST_MIDTERM', '2024-DIST_SYS-FIRST-MIDTERM', 60, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-05T10:00:00', '2024-02-05T11:00:00', 'First midterm for Distributed Systems'),
    ('2024-AI-FIRST-MIDTERM', '2024-FIRST_MIDTERM', '2024-AI-FIRST-MIDTERM', 60, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-07T10:00:00', '2024-02-07T11:00:00', 'First midterm for Artificial Intelligence'),
    ('2024-DB_SYS-FIRST-MIDTERM', '2024-FIRST_MIDTERM', '2024-DB_SYS-FIRST-MIDTERM', 60, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-10T10:00:00', '2024-02-10T11:00:00', 'First midterm for Databases'),
    ('2024-OS-FIRST-MIDTERM', '2024-FIRST_MIDTERM', '2024-OS-FIRST-MIDTERM', 60, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-12T10:00:00', '2024-02-12T11:00:00', 'First midterm for Operating Systems'),

    -- For the second midterm session
    ('2024-DIST_SYS-SECOND-MIDTERM', '2024-SECOND_MIDTERM', '2024-DIST_SYS-SECOND-MIDTERM', 60, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-05T10:00:00', '2024-04-05T11:00:00', 'Second midterm for Distributed Systems'),
    ('2024-AI-SECOND-MIDTERM', '2024-SECOND_MIDTERM', '2024-AI-FIRST-MIDTERM', 60, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-07T10:00:00', '2024-04-07T11:00:00', 'Second midterm for Artificial Intelligence'),
    ('2024-DB_SYS-SECOND-MIDTERM', '2024-SECOND_MIDTERM', '2024-DB_SYS-SECOND-MIDTERM', 60, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-10T10:00:00', '2024-04-10T11:00:00', 'Second midterm for Databases');