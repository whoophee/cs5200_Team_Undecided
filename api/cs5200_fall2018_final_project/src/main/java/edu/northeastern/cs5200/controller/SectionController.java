package edu.northeastern.cs5200.controller;

import java.util.ArrayList;
import java.util.List;

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
	public List<Section> getSectionsForMe(@CurrentUser User currentUser) {
		if (currentUser instanceof School) {
			return this.sectionRepository.findSectionsForSchool(currentUser.getId());
		} else if (currentUser instanceof Student) {
			return this.sectionRepository.findSectionsForStudent(currentUser.getId());
		}
		return new ArrayList<>();
	}
	
	@RequestMapping(value="/api/sections/{id}/", method=RequestMethod.PATCH)
	public int patchSection(
			@CurrentUser User currentUser,
			@RequestBody Section section,
			@PathVariable("id") int id) {
		section.setId(id);
		this.sectionRepository.save(section);
		return 0;
	}
	
	@RequestMapping(value="/api/professors/{professorId}/sections/", method=RequestMethod.POST)
	public int addSectionToClass(
			@CurrentUser User currentUser,
			@PathVariable("professorId") int professorId,
			@RequestBody Section section) {
		section.setProfessor(this.professorRepository.getOne(professorId));
		this.sectionRepository.save(section);
		return 0;
	}
	
	@RequestMapping(value="/api/sections/{id}/", method=RequestMethod.GET)
	public Section getSectionWithQuestions(
			@PathVariable("id") int id) {
		return this.sectionRepository.getSectionWithQuestions(id);
	}
	
	@RequestMapping(value="/api/sections/search/", method=RequestMethod.GET)
	public List<Section> getSectionsByName(
			@RequestParam("name") String name,
			@CurrentUser Student student) {
		return this.sectionRepository.getSectionsByName(name, student.getSchool().getId());
	}
}
