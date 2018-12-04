package edu.northeastern.cs5200.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.model.Class;
import edu.northeastern.cs5200.repository.*;
import edu.northeastern.cs5200.resolvers.CurrentUser;;

@RestController
public class ClassController {

	@Autowired
	private ClassRepository classRepository;

	@RequestMapping(value="/api/school/me/classes/", method=RequestMethod.GET)
	public List<Class> getClassesForMe(@CurrentUser User currentUser) {
		if (currentUser instanceof School) {
			return this.classRepository.findClassesForSchool(currentUser.getId());
		} else if (currentUser instanceof Professor) {
			return this.classRepository.findClassesForSchool(((Professor) currentUser).getSchool().getId());
		}
		return null;
	}
	
	@RequestMapping(value="/api/classes/{id}/", method=RequestMethod.GET)
	public Class getClassWithSections(@PathVariable("id") int id) {
		return this.classRepository.getClassWithSections(id);
	}
	
	@RequestMapping(value="/api/school/me/classes/", method=RequestMethod.POST)
	public int addClassForSchool(
			@CurrentUser School currentUser,
			@RequestBody Class classData) {
		classData.setSchool(currentUser);
		this.classRepository.save(classData);
		return 0;
	}
	

}
