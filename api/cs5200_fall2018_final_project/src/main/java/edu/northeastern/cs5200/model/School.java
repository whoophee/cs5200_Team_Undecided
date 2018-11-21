package edu.northeastern.cs5200.model;

import java.util.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
public class School extends User {
	@OneToMany(mappedBy="school")
	private List<CareerEvent> careerEvents;
	@OneToMany(mappedBy="school")
	private List<Class> classes;
	@OneToMany(mappedBy="school")
	private List<Student> students;
	@OneToMany(mappedBy="school")
	private List<Professor> professors;

	public School() {
		this.careerEvents = new ArrayList<>();
		this.classes = new ArrayList<>();
		this.students = new ArrayList<>();
		this.professors = new ArrayList<>();
		// TODO Auto-generated constructor stub
	}

	public List<CareerEvent> getCareerEvents() {
		return careerEvents;
	}

	public void setCareerEvents(List<CareerEvent> careerEvents) {
		this.careerEvents = careerEvents;
	}

	public List<Class> getClasses() {
		return classes;
	}

	public void setClasses(List<Class> classes) {
		this.classes = classes;
	}

	public List<Student> getStudents() {
		return students;
	}

	public void setStudents(List<Student> students) {
		this.students = students;
	}

	public List<Professor> getProfessors() {
		return professors;
	}

	public void setProfessors(List<Professor> professors) {
		this.professors = professors;
	}
	
	
	
}
