package edu.northeastern.cs5200.model;

import java.util.*;

import javax.persistence.*;

@Entity
public class Professor extends User {
	
	@OneToMany(mappedBy="id.professor")
	private List<Teaching> teachings;

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
}
