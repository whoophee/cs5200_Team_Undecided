package edu.northeastern.cs5200.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.repository.CareerEventRepository;
import edu.northeastern.cs5200.repository.CompanyRepository;

@RestController
public class CompanyController {

	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private CareerEventRepository careerEventRepository;
	
	@RequestMapping("/api/insert")
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
	
	@RequestMapping("/api/get")
	public List<Company> getCompanies() {
		return this.companyRepository.findAllCompaniesDetailed();
	}
	
	@RequestMapping(value="/api/companies/", method=RequestMethod.POST)
	public int registerCompany(@RequestBody Company company) {
		this.companyRepository.save(company);
		return 1;
	}

}
