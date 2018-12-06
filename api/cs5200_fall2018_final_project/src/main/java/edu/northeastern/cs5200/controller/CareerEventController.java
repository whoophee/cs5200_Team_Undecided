package edu.northeastern.cs5200.controller;

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
		}
		return null;
	}
	
	@RequestMapping(value="/api/me/careerevents/", method=RequestMethod.POST)
	@Transactional
	public int addCareerEventForMe(
			@CurrentUser Company company,
			@RequestBody CareerEvent event) {
		event.setCompany(this.companyRepository.getOne(company.getId()));
		this.careerRepository.save(event);
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
