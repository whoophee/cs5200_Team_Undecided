package edu.northeastern.cs5200.model;

import javax.persistence.*;

@Entity
public class StudentAnswer extends Answer {

	@ManyToOne(optional=false)
	private Enrollment enrollment;
	public StudentAnswer() {
		// TODO Auto-generated constructor stub
	}
	public Enrollment getEnrollment() {
		return enrollment;
	}
	public void setEnrollment(Enrollment enrollment) {
		this.enrollment = enrollment;
	}
}
