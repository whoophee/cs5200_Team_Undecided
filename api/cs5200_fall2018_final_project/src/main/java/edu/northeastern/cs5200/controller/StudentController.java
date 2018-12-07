package edu.northeastern.cs5200.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.repository.*;
import edu.northeastern.cs5200.resolvers.CurrentUser;;

@RestController
public class StudentController {

	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private SectionRepository sectionRepository;
	@Autowired
	private EnrollmentRepository enrollmentRepository;
	@Autowired
	private RegistrationRepository registrationRepository;
	@Autowired
	private CareerEventRepository eventRepository;
	
	static class IDContainer {
		public int id;
	}
	@RequestMapping(value="/api/me/enroll/", method=RequestMethod.POST)
	@Transactional
	public int enrollInSection(
			@RequestBody IDContainer idContainer,
			HttpServletRequest request,
			@CurrentUser Student student) {
		Enrollment e = new Enrollment(new Enrollment.EnrollmentId(
					student,
					this.sectionRepository.getOne(idContainer.id)
				));
		this.enrollmentRepository.save(e);
		return 1;
	}

	@RequestMapping(value="/api/students/", method=RequestMethod.POST)
	@Transactional
	public int registerStudent(@RequestBody Student student) {
		this.studentRepository.save(student);
		return 1;
	}
	
	@RequestMapping(value="/api/me/students/", method=RequestMethod.GET)
	@Transactional
	public List<Student> registerStudent(@CurrentUser School school) {
		return this.studentRepository.getStudentsForSchool(school.getId());
	}
	
	static class RegistrationBody { public int event; }
	@RequestMapping(value="/api/students/me/registrations/", method=RequestMethod.POST)
	@Transactional
	public int registerMeForEvent(@CurrentUser Student student, @RequestBody RegistrationBody eventId) {
		Registration r = new Registration(new Registration.RegistrationId(student, this.eventRepository.getOne(eventId.event)));
		this.registrationRepository.save(r);
		return 0;
	}
	
	@RequestMapping(value="/api/students/me/registrations/{id}/", method=RequestMethod.GET)
	@Transactional
	public Registration getRegistrationForMe(@CurrentUser Student student, @PathVariable("id") int eventId) {
		return this.registrationRepository.getRegistrationForStudent(student.getId(), eventId).orElseGet(() -> null);
	}
	
	@RequestMapping(value="/api/students/", method=RequestMethod.GET)
	@Transactional
	public List<Student> getStudent(@CurrentUser Admin admin) {
		assert (admin != null);
		return this.studentRepository.findAll();
	}
	
	@RequestMapping(value="/api/students/{id}/", method=RequestMethod.DELETE)
	public int deleteStudent(@CurrentUser Admin admin, @PathVariable("id") int id) {
		assert (admin != null);
		this.studentRepository.deleteById(id);
		return 0;
	}
	
	@RequestMapping(value="/api/students/{id}/", method=RequestMethod.GET)
	public Student getStudent(@CurrentUser Admin admin, @PathVariable("id") int id) {
		assert (admin != null);
		return this.studentRepository.findById(id).get();
	}
	
	@RequestMapping(value="/api/students/{id}/", method=RequestMethod.PUT)
	public int editStudent(
			@CurrentUser Admin admin,
			@PathVariable("id") int id,
			@RequestBody Student student) {
		assert (admin != null);
		assert (id == student.getId());
		this.studentRepository.save(student);
		return 0;
	}
}
