package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
	@Query("select enrollment from Enrollment enrollment join enrollment.id.section join enrollment.id.student where enrollment.id.section.id=?1 and enrollment.id.student.id=?2")
	public Enrollment getEnrollmentForSectionAndStudent(int sectionId, int studentId);
}
