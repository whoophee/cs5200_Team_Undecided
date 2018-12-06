package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface CareerEventRepository extends JpaRepository<CareerEvent, Integer> {
	@Query("select event from CareerEvent event join event.company where event.company.id=?1")
	public List<CareerEvent> getCareerEventsForCompany(int id);
	
	@Query("select event from CareerEvent event left join fetch event.registrations registration left join fetch registration.id.student where event.id=?1")
	public CareerEvent getCareerEventWithAttendees(int id);
}
