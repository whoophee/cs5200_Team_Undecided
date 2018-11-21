package edu.northeastern.cs5200.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.repository.*;;

@RestController
public class ProfessorController {

	@Autowired
	private ProfessorRepository professorRepository;

	@RequestMapping(value="/api/professors/", method=RequestMethod.POST)
	public int registerProfessor(@RequestBody Professor professor) {
		this.professorRepository.save(professor);
		return 1;
	}
	

}
