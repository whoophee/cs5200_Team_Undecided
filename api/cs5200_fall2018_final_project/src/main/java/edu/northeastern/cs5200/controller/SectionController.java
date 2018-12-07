package edu.northeastern.cs5200.controller;

import java.util.ArrayList;
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
import edu.northeastern.cs5200.repository.*;
import edu.northeastern.cs5200.resolvers.CurrentUser;

@RestController
public class SectionController {

	@Autowired
	private SectionRepository sectionRepository;
	@Autowired
	private ProfessorRepository professorRepository;

	@RequestMapping(value="/api/me/sections/", method=RequestMethod.GET)
	@Transactional
	public List<Section> getSectionsForMe(@CurrentUser User currentUser) {
		if (currentUser instanceof School) {
			return this.sectionRepository.findSectionsForSchool(currentUser.getId());
		} else if (currentUser instanceof Student) {
			return this.sectionRepository.findSectionsForStudent(currentUser.getId());
		} else if (currentUser instanceof Professor) {
			return this.sectionRepository.findSectionsForProfessor(currentUser.getId());
		}
		return new ArrayList<>();
	}
	
	@RequestMapping(value="/api/sections/{id}/", method=RequestMethod.PATCH)
	@Transactional
	public int patchSection(
			@CurrentUser User currentUser,
			@RequestBody Section section,
			@PathVariable("id") int id) {
		section.setId(id);
		this.sectionRepository.save(section);
		return 0;
	}
	
	@RequestMapping(value="/api/professors/{professorId}/sections/", method=RequestMethod.POST)
	@Transactional
	public int addSectionToClass(
			@CurrentUser User currentUser,
			@PathVariable("professorId") int professorId,
			@RequestBody Section section) {
		if (currentUser instanceof Student || currentUser instanceof Company) {
			return -1;
		}
		if (currentUser instanceof Professor) {
			Professor p = (Professor) currentUser;
			if (p.getId() != professorId) return -1;
			section.setApproved(false);
		}
		if (currentUser instanceof School) {
			section.setApproved(true);
		}
		section.setProfessor(this.professorRepository.getOne(professorId));
		this.sectionRepository.save(section);
		return 0;
	}
	
	@RequestMapping(value="/api/sections/{id}/", method=RequestMethod.GET)
	@Transactional
	public Section getSectionWithQuestions(
			@PathVariable("id") int id) {
		return this.sectionRepository.getSectionWithQuestions(id);
	}
	
	static class ApprovePut {public boolean approved;}
	@RequestMapping(value="/api/sections/{id}/approve/", method=RequestMethod.PUT)
	@Transactional
	public int approveSection(
			@CurrentUser School school,
			@PathVariable("id") int id,
			@RequestBody ApprovePut body) {
		assert (school != null);
		Section s = this.sectionRepository.findById(id).get();
		s.setApproved(body.approved);
		this.sectionRepository.save(s);
		return 0;
	}
	
	@RequestMapping(value="/api/sections/search/", method=RequestMethod.GET)
	@Transactional
	public List<Section> getSectionsByName(
			@RequestParam("name") String name,
			@CurrentUser Student student) {
		return this.sectionRepository.getSectionsByName(name, student.getSchool().getId());
	}
}
