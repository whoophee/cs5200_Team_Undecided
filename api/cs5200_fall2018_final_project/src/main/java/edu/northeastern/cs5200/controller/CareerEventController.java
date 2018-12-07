package edu.northeastern.cs5200.controller;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.repository.CareerEventRepository;
import edu.northeastern.cs5200.repository.CompanyRepository;
import edu.northeastern.cs5200.resolvers.CurrentUser;

@RestController
public class CareerEventController {

	@Autowired
	private CareerEventRepository careerRepository;
	@Autowired
	private CompanyRepository companyRepository;
	
	@RequestMapping(value="/api/me/careerevents/", method=RequestMethod.GET)
	@Transactional
	public List<CareerEvent> getCareerEventsForMe(
			@CurrentUser User user) {
		if (user instanceof Company) {
			Company company = (Company) user;
			return this.careerRepository.getCareerEventsForCompany(company.getId());
		} else if (user instanceof Student) {
			Student student = (Student) user;
			return this.careerRepository.getApprovedCareerEventsForSchool(student.getSchool().getId(), LocalDateTime.now());
		} else if (user instanceof School) {
			School school = (School) user;
			return this.careerRepository.getCareerEventsForSchool(school.getId(), LocalDateTime.ofEpochSecond(0, 0, ZoneOffset.UTC));
		}
		return null;
	}
	
	@RequestMapping(value="/api/me/careerevents/", method=RequestMethod.POST)
	@Transactional
	public int addCareerEventForMe(
			@CurrentUser Company company,
			@RequestBody CareerEvent event) {
		event.setCompany(this.companyRepository.getOne(company.getId()));
		event.setApproved(false);
		this.careerRepository.save(event);
		return 0;
	}
	
	@RequestMapping(value="/api/careerevents/{id}/", method=RequestMethod.DELETE)
	@Transactional
	public int deleteEvent(
			@CurrentUser Company company,
			@PathVariable("id") int id) {
		CareerEvent e = this.careerRepository.findById(id).get();
		assert (company.getId() == e.getCompany().getId());
		this.careerRepository.delete(e);
		return 0;
	}
	
	@RequestMapping(value="/api/careerevents/{id}/", method=RequestMethod.PUT)
	@Transactional
	public int updateEvent(
			@CurrentUser Company company,
			@RequestBody CareerEvent event,
			@PathVariable("id") int id) {
		CareerEvent e = this.careerRepository.findById(id).get();
		assert (company.getId() == e.getCompany().getId());
		e.setLocation(event.getLocation());
		e.setDescription(event.getDescription());
		e.setName(event.getName());
		e.setSchool(event.getSchool());
		this.careerRepository.save(e);
		return 0;
	}
	
	static class EventApprove {public boolean approved;}
	@RequestMapping(value="/api/careerevents/{id}/approve/", method=RequestMethod.PUT)
	@Transactional
	public int approveEvent(@CurrentUser School school, @PathVariable("id") int id, @RequestBody EventApprove approve) {
		CareerEvent e = this.careerRepository.findById(id).get();
		assert (e.getSchool().getId() == school.getId());
		e.setApproved(approve.approved);
		return 0;
	}
	
	@RequestMapping(value="/api/careerevents/{id}/", method=RequestMethod.GET)
	@Transactional
	public CareerEvent getEventById(@CurrentUser User user, @PathVariable("id") int id) {
		if (user instanceof Company) {
			CareerEvent e = this.careerRepository.getCareerEventWithAttendees(id);
			if (user.getId() == e.getCompany().getId()) {
				return e;
			}
			e.setRegistrations(Collections.emptyList());
			return e;
		}
		return this.careerRepository.findById(id).get();
	}


}
