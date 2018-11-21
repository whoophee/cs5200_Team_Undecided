package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface SchoolRepository extends JpaRepository<School, Integer>  {
	@Query("select school from School school left join fetch school.classes where school.id=?1")
	public School findWithClasses(int id);
}
