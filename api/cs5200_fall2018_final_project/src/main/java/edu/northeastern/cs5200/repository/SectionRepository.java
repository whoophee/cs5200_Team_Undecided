package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface SectionRepository extends JpaRepository<Section, Integer>  {
	@Query("select section from Section section join section.schoolClass join section.schoolClass.school left join fetch section.professor where section.schoolClass.school.id=?1")
	public List<Section> findSectionsForSchool(int schoolId);
}
