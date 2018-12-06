package edu.northeastern.cs5200.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface RegistrationRepository extends JpaRepository<Registration, Integer> {
	
	@Query("select reg from Registration reg join reg.id.event event join reg.id.student student where student.id=?1 and event.id=?2")
	public Optional<Registration> getRegistrationForStudent(int studentId, int eventId);
}
