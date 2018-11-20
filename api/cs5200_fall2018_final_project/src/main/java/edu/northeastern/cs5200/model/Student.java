package edu.northeastern.cs5200.model;

import java.util.*;
import javax.persistence.*;

@Entity
public class Student extends User {

	@OneToMany(mappedBy="id.student")
	private List<Enrollment> enrollments;
	public Student() {
		this.enrollments = new ArrayList<>();
		// TODO Auto-generated constructor stub
	}
	public List<Enrollment> getEnrollments() {
		return enrollments;
	}
	public void setEnrollments(List<Enrollment> enrollments) {
		this.enrollments = enrollments;
	}
	

}
