package edu.northeastern.cs5200.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.repository.*;
import edu.northeastern.cs5200.resolvers.CurrentUser;;

@RestController
public class SchoolController {

	@Autowired
	private SchoolRepository schoolRepository;
	
	@RequestMapping(value = "/api/schools/", method = RequestMethod.GET)
	@Transactional
	public List<School> getSchools() {
		return this.schoolRepository.findAll();
	}
	
	@RequestMapping(value = "/api/schools/{id}/", method = RequestMethod.GET)
	@Transactional
	public School getSchoolWithClasses(@PathVariable(value="id") int id) {
		return this.schoolRepository.findWithClasses(id);
	}
	
	@RequestMapping(value = "/api/schools/", method = RequestMethod.POST)
	@Transactional
	public int registerSchool(@RequestBody School school) {
		this.schoolRepository.save(school);
		return 1;
	}
	
	@RequestMapping(value="/api/schools/{id}/", method=RequestMethod.DELETE)
	public int deleteSchopl(@CurrentUser Admin admin, @PathVariable("id") int id) {
		assert (admin != null);
		this.schoolRepository.deleteById(id);
		return 0;
	}
	
	@RequestMapping(value="/api/schools/{id}/", method=RequestMethod.PUT)
	public int editSchool(
			@CurrentUser Admin admin,
			@PathVariable("id") int id,
			@RequestBody School school) {
		assert (admin != null);
		assert (id == school.getId());
		this.schoolRepository.save(school);
		return 0;
	}
}
