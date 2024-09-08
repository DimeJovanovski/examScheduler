INSERT INTO joined_subject (abbreviation, last_update_time, last_update_user, codes, cycle, name, semester_type, validation_message, weekly_auditorium_classes, weekly_lab_classes, weekly_lectures_classes, main_subject_id)
VALUES
    ('INTRO_PROG', NOW(), 'admin', 'CS101-001', 'UNDERGRADUATE', 'Introduction to Programming', 'WINTER', 'Fundamentals of programming.', 1, 2, 3, NULL),
    ('DATA_STRUCT', NOW(), 'admin', 'CS102-002', 'UNDERGRADUATE', 'Data Structures', 'WINTER', 'Core data structures and algorithms.', 1, 2, 3, NULL),
    ('COMP_NET', NOW(), 'admin', 'CS103-003', 'UNDERGRADUATE', 'Computer Networks', 'SUMMER', 'Networking principles and technologies.', 1, 2, 2, NULL),
    ('DB_SYS', NOW(), 'admin', 'CS104-004', 'UNDERGRADUATE', 'Database Systems', 'SUMMER', 'Database design and management.', 1, 1, 3, NULL),
    ('OS', NOW(), 'admin', 'CS105-005', 'UNDERGRADUATE', 'Operating Systems', 'WINTER', 'Operating system principles and practices.', 1, 2, 3, NULL),
    ('ALGO', NOW(), 'admin', 'CS106-006', 'UNDERGRADUATE', 'Algorithms', 'SUMMER', 'Advanced algorithms and problem-solving techniques.', 1, 1, 3, NULL),
    ('SOFT_ENG', NOW(), 'admin', 'CS107-007', 'UNDERGRADUATE', 'Software Engineering', 'WINTER', 'Principles and practices of software engineering.', 2, 1, 3, NULL),
    ('AI', NOW(), 'admin', 'CS108-008', 'UNDERGRADUATE', 'Artificial Intelligence', 'SUMMER', 'Introduction to artificial intelligence and machine learning.', 1, 2, 2, NULL),
    ('COMP_SEC', NOW(), 'admin', 'CS109-009', 'UNDERGRADUATE', 'Computer Security', 'WINTER', 'Fundamentals of computer security.', 1, 1, 3, NULL),
    ('DIST_SYS', NOW(), 'admin', 'CS110-010', 'UNDERGRADUATE', 'Distributed Systems', 'SUMMER', 'Principles of distributed systems and applications.', 1, 2, 3, NULL);
