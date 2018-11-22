package edu.northeastern.cs5200.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.repository.*;;

@RestController
public class SchoolController {

	@Autowired
	private SchoolRepository schoolRepository;
	
	@RequestMapping(value = "/api/schools/", method = RequestMethod.GET)
	public List<School> getSchools() {
		return this.schoolRepository.findAll();
	}
	
	@RequestMapping(value = "/api/schools/{id}/", method = RequestMethod.GET)
	public School getSchoolWithClasses(@PathVariable(value="id") int id) {
		return this.schoolRepository.findWithClasses(id);
	}
	
	@RequestMapping(value = "/api/schools/", method = RequestMethod.POST)
	public int registerSchool(@RequestBody School school) {
		this.schoolRepository.save(school);
		return 1;
	}
	

}
