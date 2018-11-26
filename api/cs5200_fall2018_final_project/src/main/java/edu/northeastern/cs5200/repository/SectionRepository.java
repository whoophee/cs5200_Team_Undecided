package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface SectionRepository extends JpaRepository<Section, Integer>  {
	@Query("select section from Section section join section.schoolClass join section.schoolClass.school left join fetch section.professor where section.schoolClass.school.id=?1")
	public List<Section> findSectionsForSchool(int schoolId);
	
	@Query("select section from Section section left join fetch section.notes left join fetch section.questions where section.id=?1")
	public Section getSectionWithQuestions(int sectionId);
}
