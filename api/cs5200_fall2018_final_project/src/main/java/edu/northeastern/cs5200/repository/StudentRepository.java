package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface StudentRepository extends JpaRepository<Student, Integer>  {
	@Query("select student from Student student join student.school where student.school.id=?1")
	public List<Student> getStudentsForSchool(int schoolId);
}
