package edu.northeastern.cs5200.model;

import java.util.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
public class Professor extends User {
	
	@OneToMany(mappedBy="id.professor")
	private List<Teaching> teachings;
	@ManyToOne
	private School school;

	public Professor() {
		this.teachings = new ArrayList<>();
		// TODO Auto-generated constructor stub
	}

	public List<Teaching> getTeachings() {
		return teachings;
	}

	public void setTeachings(List<Teaching> teachings) {
		this.teachings = teachings;
	}

	public School getSchool() {
		return school;
	}

	public void setSchool(School school) {
		this.school = school;
	}
	
	
}
