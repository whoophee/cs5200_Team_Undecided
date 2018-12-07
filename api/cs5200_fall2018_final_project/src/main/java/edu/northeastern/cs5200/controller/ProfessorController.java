package edu.northeastern.cs5200.controller;

import java.util.ArrayList;
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
public class ProfessorController {

	@Autowired
	private ProfessorRepository professorRepository;

	@RequestMapping(value="/api/professors/", method=RequestMethod.POST)
	@Transactional
	public int registerProfessor(@RequestBody Professor professor) {
		this.professorRepository.save(professor);
		return 1;
	}
	
	@RequestMapping(value="/api/me/professors/", method=RequestMethod.GET)
	@Transactional
	public List<Professor> getProfessorsForMe(@CurrentUser User user) {
		if (user instanceof School) {
			return this.professorRepository.getProfessorsForSchool(user.getId());
		} else {
			return new ArrayList<>();
		}
	}
	
	@RequestMapping(value="/api/professors/", method=RequestMethod.GET)
	@Transactional
	public List<Professor> getProfessors(@CurrentUser Admin admin) {
		assert (admin != null);
		return this.professorRepository.findAll();
	}
	
	@RequestMapping(value="/api/professors/{id}/", method=RequestMethod.DELETE)
	public int deleteProfessor(@CurrentUser Admin admin, @PathVariable("id") int id) {
		assert (admin != null);
		this.professorRepository.deleteById(id);
		return 0;
	}
	
	@RequestMapping(value="/api/professors/{id}/", method=RequestMethod.GET)
	public Professor getProfessor(@CurrentUser Admin admin, @PathVariable("id") int id) {
		assert (admin != null);
		return this.professorRepository.findById(id).get();
	}
	
	@RequestMapping(value="/api/professors/{id}/", method=RequestMethod.PUT)
	public int editProfessor(
			@CurrentUser Admin admin,
			@PathVariable("id") int id,
			@RequestBody Professor professor) {
		assert (admin != null);
		assert (id == professor.getId());
		this.professorRepository.save(professor);
		return 0;
	}
}
