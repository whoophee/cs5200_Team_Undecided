package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface ProfessorRepository extends JpaRepository<Professor, Integer>  {
	@Query("select p from Professor p join p.school where p.school.id=?1")
	public List<Professor> getProfessorsForSchool(int schoolId);
}
