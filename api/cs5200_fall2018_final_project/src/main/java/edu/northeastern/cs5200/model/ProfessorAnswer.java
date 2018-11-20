package edu.northeastern.cs5200.model;

import javax.persistence.*;

@Entity
public class ProfessorAnswer extends Answer {

	@ManyToOne(optional=false)
	private Teaching teaching;
	public ProfessorAnswer() {
		// TODO Auto-generated constructor stub
	}
	public Teaching getTeaching() {
		return teaching;
	}
	public void setTeaching(Teaching teaching) {
		this.teaching = teaching;
	}
}
