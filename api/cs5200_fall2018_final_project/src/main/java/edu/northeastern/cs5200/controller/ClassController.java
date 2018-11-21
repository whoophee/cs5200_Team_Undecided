package edu.northeastern.cs5200.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.Class;
import edu.northeastern.cs5200.repository.*;;

@RestController
public class ClassController {

	@Autowired
	private ClassRepository classRepository;

	@RequestMapping(value="/api/school/{schoolId}/classes/", method=RequestMethod.GET)
	public List<Class> registerProfessor(@PathVariable(value="schoolId") int id) {
		return this.classRepository.findClassesForSchool(id);
	}
	

}
