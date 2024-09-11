-- Insert into subject_exam_rooms table

-- September session
INSERT INTO subject_exam_rooms (subject_exam_id, rooms_name)
VALUES
    ('2024-DIST_SYS-SEPTEMBER', 'Lab3'),  -- Final lab exam for Distributed Systems
    ('2024-AI-SEPTEMBER', 'VirtualRoom2');  -- Final exam for Artificial Intelligence

-- June session
INSERT INTO subject_exam_rooms (subject_exam_id, rooms_name)
VALUES
    ('2024-DIST_SYS-JUNE', 'Lab3'),  -- Lab exam for Distributed Systems
    ('2024-AI-JUNE', 'VirtualRoom2');  -- Final exam for Artificial Intelligence

-- First midterm session
INSERT INTO subject_exam_rooms (subject_exam_id, rooms_name)
VALUES
    ('2024-DIST_SYS-FIRST-MIDTERM', 'Lab1'),  -- First midterm for Distributed Systems
    ('2024-AI-FIRST-MIDTERM', 'VirtualRoom1'),  -- First midterm for Artificial Intelligence
    ('2024-DB_SYS-FIRST-MIDTERM', 'Lab2'),  -- First midterm for Databases
    ('2024-OS-FIRST-MIDTERM', 'Classroom1');  -- First midterm for Operating Systems

-- Second midterm session
INSERT INTO subject_exam_rooms (subject_exam_id, rooms_name)
VALUES
    ('2024-DIST_SYS-SECOND-MIDTERM', 'Lab1'),  -- Second midterm for Distributed Systems
    ('2024-AI-SECOND-MIDTERM', 'VirtualRoom1'),  -- Second midterm for Artificial Intelligence
    ('2024-DB_SYS-SECOND-MIDTERM', 'Lab2');  -- Second midterm for Databases
