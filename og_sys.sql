-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2025 at 02:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `og_sys`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `class_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `section` varchar(20) DEFAULT NULL,
  `school_year` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`class_id`, `subject_id`, `teacher_id`, `semester_id`, `section`, `school_year`) VALUES
(1, 1, 4, 1, 'BSIT 2A', '2024-2025'),
(2, 2, 4, 1, 'BSIT 2B', '2024-2025'),
(3, 3, 5, 1, 'BSIT 2C', '2024-2025'),
(4, 2, 4, 1, 'BSIT 2A', '2024-2025'),
(5, 4, 5, 1, 'BSIT 2A', '2024-2025'),
(6, 5, 4, 1, 'BSIT 2A', '2024-2025'),
(7, 6, 5, 1, 'BSIT 2A', '2024-2025'),
(8, 1, 4, 1, 'BSIT 2B', '2024-2025'),
(9, 4, 5, 1, 'BSIT 2B', '2024-2025'),
(10, 5, 4, 1, 'BSIT 2B', '2024-2025'),
(11, 6, 5, 1, 'BSIT 2B', '2024-2025'),
(12, 1, 5, 1, 'BSIT 2C', '2024-2025'),
(13, 2, 4, 1, 'BSIT 2C', '2024-2025'),
(14, 4, 5, 1, 'BSIT 2C', '2024-2025'),
(15, 5, 4, 1, 'BSIT 2C', '2024-2025'),
(16, 6, 5, 1, 'BSIT 2C', '2024-2025'),
(17, 1, 4, 1, 'BSIT 2A', '2024-2025'),
(18, 2, 4, 1, 'BSIT 2A', '2024-2025'),
(19, 4, 5, 1, 'BSIT 2A', '2024-2025'),
(20, 5, 5, 1, 'BSIT 2A', '2024-2025'),
(21, 6, 4, 1, 'BSIT 2A', '2024-2025'),
(22, 7, 4, 1, 'BSIT 2A', '2024-2025'),
(23, 8, 5, 1, 'BSIT 2A', '2024-2025'),
(24, 9, 5, 1, 'BSIT 2A', '2024-2025'),
(25, 10, 4, 1, 'BSIT 2A', '2024-2025'),
(26, 11, 5, 1, 'BSIT 2A', '2024-2025'),
(27, 12, 4, 1, 'BSIT 2A', '2024-2025'),
(28, 13, 5, 1, 'BSIT 2A', '2024-2025'),
(29, 14, 4, 1, 'BSIT 2A', '2024-2025'),
(30, 15, 5, 1, 'BSIT 2A', '2024-2025'),
(31, 3, 4, 1, 'BSIT 2A', '2024-2025');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `enrollment_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `enrollment_date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`enrollment_id`, `student_id`, `class_id`, `enrollment_date`) VALUES
(1, 1, 1, '2024-06-01'),
(2, 2, 2, '2024-06-01'),
(3, 3, 3, '2024-06-01'),
(5, 1, 4, '2024-06-01'),
(6, 1, 5, '2024-06-01'),
(7, 1, 6, '2024-06-01'),
(8, 1, 7, '2024-06-01'),
(10, 2, 8, '2024-06-01'),
(11, 2, 9, '2024-06-01'),
(12, 2, 10, '2024-06-01'),
(13, 2, 11, '2024-06-01'),
(15, 3, 12, '2024-06-01'),
(16, 3, 13, '2024-06-01'),
(17, 3, 14, '2024-06-01'),
(18, 3, 15, '2024-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `grade_id` int(11) NOT NULL,
  `enrollment_id` int(11) NOT NULL,
  `perf_task_score` decimal(5,2) DEFAULT NULL,
  `perf_task_max` decimal(5,2) DEFAULT NULL,
  `written_score` decimal(5,2) DEFAULT NULL,
  `written_max` decimal(5,2) DEFAULT NULL,
  `exam_score` decimal(5,2) DEFAULT NULL,
  `exam_max` decimal(5,2) DEFAULT NULL,
  `final_grade` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`grade_id`, `enrollment_id`, `perf_task_score`, `perf_task_max`, `written_score`, `written_max`, `exam_score`, `exam_max`, `final_grade`) VALUES
(4, 1, 38.00, 40.00, 45.00, 50.00, 85.00, 100.00, 90.50),
(5, 5, 40.00, 40.00, 48.00, 50.00, 92.00, 100.00, 94.40),
(6, 6, 37.00, 40.00, 46.00, 50.00, 84.00, 100.00, 89.90),
(7, 7, 39.00, 40.00, 47.00, 50.00, 89.00, 100.00, 92.40),
(8, 8, 35.00, 40.00, 42.00, 50.00, 80.00, 100.00, 86.10),
(9, 2, 36.00, 40.00, 45.00, 50.00, 88.00, 100.00, 90.10),
(10, 10, 37.00, 40.00, 46.00, 50.00, 85.00, 100.00, 89.90),
(11, 11, 39.00, 40.00, 47.00, 50.00, 91.00, 100.00, 93.60),
(12, 12, 35.00, 40.00, 43.00, 50.00, 82.00, 100.00, 86.30),
(13, 13, 38.00, 40.00, 45.00, 50.00, 87.00, 100.00, 90.50),
(14, 3, 40.00, 40.00, 48.00, 50.00, 90.00, 100.00, 94.00),
(15, 15, 39.00, 40.00, 47.00, 50.00, 86.00, 100.00, 91.40),
(16, 16, 38.00, 40.00, 46.00, 50.00, 85.00, 100.00, 90.20),
(17, 17, 37.00, 40.00, 45.00, 50.00, 84.00, 100.00, 88.90),
(18, 18, 36.00, 40.00, 44.00, 50.00, 83.00, 100.00, 87.80);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `schedule_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `day` varchar(10) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `room` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`schedule_id`, `class_id`, `day`, `start_time`, `end_time`, `room`) VALUES
(1, 1, 'Monday', '08:00:00', '10:00:00', 'Lab 101'),
(2, 2, 'Tuesday', '10:00:00', '12:00:00', 'Lab 102'),
(3, 3, 'Wednesday', '13:00:00', '15:00:00', 'Lab 103'),
(4, 1, 'Monday', '08:00:00', '09:30:00', 'Room 201'),
(5, 4, 'Tuesday', '09:30:00', '11:00:00', 'Room 201'),
(6, 5, 'Wednesday', '11:00:00', '12:30:00', 'Room 201'),
(7, 6, 'Thursday', '08:00:00', '09:30:00', 'Room 201'),
(8, 7, 'Friday', '09:30:00', '11:00:00', 'Room 201'),
(9, 2, 'Monday', '11:00:00', '12:30:00', 'Room 202'),
(10, 8, 'Tuesday', '08:00:00', '09:30:00', 'Room 202'),
(11, 9, 'Wednesday', '09:30:00', '11:00:00', 'Room 202'),
(12, 10, 'Thursday', '11:00:00', '12:30:00', 'Room 202'),
(13, 11, 'Friday', '08:00:00', '09:30:00', 'Room 202'),
(14, 3, 'Monday', '09:30:00', '11:00:00', 'Room 203'),
(15, 12, 'Tuesday', '11:00:00', '12:30:00', 'Room 203'),
(16, 13, 'Wednesday', '08:00:00', '09:30:00', 'Room 203'),
(17, 14, 'Thursday', '09:30:00', '11:00:00', 'Room 203'),
(18, 15, 'Friday', '11:00:00', '12:30:00', 'Room 203'),
(19, 17, 'Monday', '08:00:00', '09:30:00', 'R201'),
(20, 18, 'Monday', '09:30:00', '11:00:00', 'R201'),
(21, 19, 'Monday', '11:00:00', '12:30:00', 'R201'),
(22, 20, 'Tuesday', '08:00:00', '09:30:00', 'R201'),
(23, 21, 'Tuesday', '09:30:00', '11:00:00', 'R201'),
(24, 22, 'Tuesday', '11:00:00', '12:30:00', 'R201'),
(25, 23, 'Wednesday', '08:00:00', '09:30:00', 'R201'),
(26, 24, 'Wednesday', '09:30:00', '11:00:00', 'R201'),
(27, 25, 'Wednesday', '11:00:00', '12:30:00', 'R201'),
(28, 26, 'Thursday', '08:00:00', '09:30:00', 'R201'),
(29, 27, 'Thursday', '09:30:00', '11:00:00', 'R201'),
(30, 28, 'Thursday', '11:00:00', '12:30:00', 'R201'),
(31, 29, 'Friday', '08:00:00', '09:30:00', 'R201'),
(32, 30, 'Friday', '09:30:00', '11:00:00', 'R201'),
(33, 31, 'Friday', '11:00:00', '12:30:00', 'R201'),
(34, 1, 'Monday', '08:00:00', '09:30:00', 'Room 101'),
(35, 4, 'Monday', '09:30:00', '11:00:00', 'Room 102'),
(36, 5, 'Monday', '11:00:00', '12:30:00', 'Room 103'),
(37, 6, 'Tuesday', '08:00:00', '09:30:00', 'Room 101'),
(38, 7, 'Tuesday', '09:30:00', '11:00:00', 'Room 102'),
(39, 17, 'Tuesday', '11:00:00', '12:30:00', 'Room 103'),
(40, 18, 'Wednesday', '08:00:00', '09:30:00', 'Room 101'),
(41, 19, 'Wednesday', '09:30:00', '11:00:00', 'Room 102'),
(42, 20, 'Wednesday', '11:00:00', '12:30:00', 'Room 103'),
(43, 21, 'Thursday', '08:00:00', '09:30:00', 'Room 101'),
(44, 22, 'Thursday', '09:30:00', '11:00:00', 'Room 102'),
(45, 23, 'Thursday', '11:00:00', '12:30:00', 'Room 103'),
(46, 24, 'Friday', '08:00:00', '09:30:00', 'Room 101'),
(47, 25, 'Friday', '09:30:00', '11:00:00', 'Room 102'),
(48, 26, 'Friday', '11:00:00', '12:30:00', 'Room 103');

-- --------------------------------------------------------

--
-- Table structure for table `semesters`
--

CREATE TABLE `semesters` (
  `semester_id` int(11) NOT NULL,
  `semester_name` enum('First Semester','Second Semester') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semesters`
--

INSERT INTO `semesters` (`semester_id`, `semester_name`) VALUES
(1, 'First Semester'),
(2, 'Second Semester');

-- --------------------------------------------------------

--
-- Table structure for table `student_profiles`
--

CREATE TABLE `student_profiles` (
  `student_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `grade_level` varchar(20) DEFAULT NULL,
  `section` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_profiles`
--

INSERT INTO `student_profiles` (`student_id`, `full_name`, `grade_level`, `section`) VALUES
(1, 'Juan Dela Cruz', '2nd Year', 'BSIT 2A'),
(2, 'Maria Santos', '2nd Year', 'BSIT 2B'),
(3, 'Rico Reyes', '2nd Year', 'BSIT 2C');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `subject_name`) VALUES
(1, 'Web Development'),
(2, 'Database Systems'),
(3, 'Object-Oriented Programming'),
(4, 'Data Structures'),
(5, 'Systems Analysis and Design'),
(6, 'Operating Systems'),
(7, 'Software Engineering'),
(8, 'Human-Computer Interaction'),
(9, 'Computer Networks'),
(10, 'Computer Programming'),
(11, 'Data Communication'),
(12, 'IT Elective 1'),
(13, 'Multimedia Systems'),
(14, 'Introduction to AI'),
(15, 'Technopreneurship');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_profiles`
--

CREATE TABLE `teacher_profiles` (
  `teacher_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `department` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_profiles`
--

INSERT INTO `teacher_profiles` (`teacher_id`, `full_name`, `department`) VALUES
(4, 'Mark Aquino', 'Computer Science'),
(5, 'Jen Lopez', 'Information Technology');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` enum('Student','Teacher','Admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `role`) VALUES
(1, 'jdelacruz', 'burgiskaba', 'juan@college.edu', 'Student'),
(2, 'msantos', 'hashedpass2', 'maria@college.edu', 'Student'),
(3, 'rreyes', 'hashedpass3', 'rico@college.edu', 'Student'),
(4, 'maquino', 'hashedpass4', 'mark@college.edu', 'Teacher'),
(5, 'jlopez', 'hashedpass5', 'jen@college.edu', 'Teacher');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`grade_id`),
  ADD KEY `enrollment_id` (`enrollment_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `semesters`
--
ALTER TABLE `semesters`
  ADD PRIMARY KEY (`semester_id`);

--
-- Indexes for table `student_profiles`
--
ALTER TABLE `student_profiles`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`);

--
-- Indexes for table `teacher_profiles`
--
ALTER TABLE `teacher_profiles`
  ADD PRIMARY KEY (`teacher_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `semesters`
--
ALTER TABLE `semesters`
  MODIFY `semester_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
  ADD CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_profiles` (`teacher_id`),
  ADD CONSTRAINT `classes_ibfk_3` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`semester_id`);

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_profiles` (`student_id`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`);

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`enrollment_id`);

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`);

--
-- Constraints for table `student_profiles`
--
ALTER TABLE `student_profiles`
  ADD CONSTRAINT `student_profiles_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `teacher_profiles`
--
ALTER TABLE `teacher_profiles`
  ADD CONSTRAINT `teacher_profiles_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
