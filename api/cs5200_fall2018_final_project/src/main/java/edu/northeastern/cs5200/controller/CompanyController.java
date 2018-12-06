package edu.northeastern.cs5200.controller;

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
public class CompanyController {

	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private CareerEventRepository careerEventRepository;
	
	@RequestMapping("/api/insert")
	@Transactional
	public Company insertCompany() {
		Company c = new Company();
		c.setName("Test Company");
		c.setUsername("username");
		c.setPassword("password");
		
		CareerEvent e = new CareerEvent();
		e.setCompany(c);
		e.setName("test name");
		c.getCareerEvents().add(e);
		this.companyRepository.save(c);
		this.careerEventRepository.save(e);
		return c;
	}
	
	@RequestMapping(value="/api/companies/me/", method=RequestMethod.PUT)
	@Transactional
	public int updateProfile(@CurrentUser Company user, @RequestBody Company newUser) {
		user.setDescription(newUser.getDescription());
		user.setHeadquartersText(newUser.getHeadquartersText());
		user.setIndustry(newUser.getIndustry());
		user.setSize(newUser.getSize());
		this.companyRepository.save(user);
		return 0;
	}
	
	@RequestMapping(value="/api/companies/", method=RequestMethod.GET)
	@Transactional
	public List<Company> getCompanies() {
		return this.companyRepository.findAllCompaniesDetailed();
	}
	
	@RequestMapping(value="/api/companies/{id}/", method=RequestMethod.GET)
	@Transactional
	public Company getCompany(@PathVariable("id") int id) {
		return this.companyRepository.findWithCareerEvents(id);
	}
	
	@RequestMapping(value="/api/companies/search/", method=RequestMethod.GET)
	@Transactional
	public List<Company> getCompaniesByName(@RequestParam("text") String text) {
		return this.companyRepository.findCompaniesByName(text);
	}
	
	@RequestMapping(value="/api/companies/", method=RequestMethod.POST)
	@Transactional
	public int registerCompany(@RequestBody Company company) {
		this.companyRepository.save(company);
		return 1;
	}

}
