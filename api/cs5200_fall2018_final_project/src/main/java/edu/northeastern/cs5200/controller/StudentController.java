package edu.northeastern.cs5200.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.repository.*;
import edu.northeastern.cs5200.resolvers.CurrentUser;;

@RestController
public class StudentController {

	@Autowired
	private StudentRepository studentRepository;

	@RequestMapping(value="/api/students/", method=RequestMethod.POST)
	public int registerStudent(@RequestBody Student student) {
		this.studentRepository.save(student);
		return 1;
	}
	
	@RequestMapping(value="/api/me/students/", method=RequestMethod.GET)
	public List<Student> registerStudent(@CurrentUser School school) {
		return this.studentRepository.getStudentsForSchool(school.getId());
	}
	
}
