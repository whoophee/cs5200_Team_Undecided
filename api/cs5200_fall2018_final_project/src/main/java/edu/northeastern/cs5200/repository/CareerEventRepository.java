package edu.northeastern.cs5200.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface CareerEventRepository extends JpaRepository<CareerEvent, Integer> {
	@Query("select event from CareerEvent event join event.company where event.company.id=?1")
	public List<CareerEvent> getCareerEventsForCompany(int id);
	
	@Query("select event from CareerEvent event left join fetch event.registrations registration left join fetch registration.id.student where event.id=?1")
	public CareerEvent getCareerEventWithAttendees(int id);
	
	@Query("select event from CareerEvent event join event.school school where event.school.id = ?1 and event.start > ?2 order by event.start desc")
	public List<CareerEvent> getCareerEventsForSchool(int id, LocalDateTime after);
	
	@Query("select event from CareerEvent event join event.school school where event.school.id = ?1 and event.start > ?2 and event.approved=true order by event.start desc")
	public List<CareerEvent> getApprovedCareerEventsForSchool(int id, LocalDateTime after);
}
