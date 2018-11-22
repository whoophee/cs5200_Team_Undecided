package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.model.Class;

public interface ClassRepository extends JpaRepository<Class, Integer>  {
	@Query("select classs from Class classs join classs.school where classs.school.id=?1")
	public List<Class> findClassesForSchool(int schoolId);
	
	@Query("select c from Class c left join fetch c.sections where c.id=?1")
	public Class getClassWithSections(int classId);
}
