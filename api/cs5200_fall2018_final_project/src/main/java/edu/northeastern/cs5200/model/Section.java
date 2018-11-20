package edu.northeastern.cs5200.model;
import java.util.*;
import javax.persistence.*;

@Entity
public class Section {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	
	@OneToMany(mappedBy="id.section")
	private List<Teaching> teachings;
	@OneToMany(mappedBy="id.section")
	private List<Enrollment> enrollments;
	@ManyToOne(optional=false)
	private Class schoolClass;
	private boolean approved;
	
	public Section() {
		this.teachings = new ArrayList<>();
		this.enrollments = new ArrayList<>();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public List<Teaching> getTeachings() {
		return teachings;
	}

	public void setTeachings(List<Teaching> teachings) {
		this.teachings = teachings;
	}

	public Class getSchoolClass() {
		return schoolClass;
	}

	public void setSchoolClass(Class schoolClass) {
		this.schoolClass = schoolClass;
	}

	public List<Enrollment> getEnrollments() {
		return enrollments;
	}

	public void setEnrollments(List<Enrollment> enrollments) {
		this.enrollments = enrollments;
	}
	
	

}
