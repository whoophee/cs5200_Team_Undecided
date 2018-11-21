package edu.northeastern.cs5200.model;

import java.io.IOException;
import java.util.*;
import javax.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import edu.northeastern.cs5200.model.util.ManyToOneDeserializer;
import edu.northeastern.cs5200.repository.SchoolRepository;

@Entity
public class Student extends User {

	@OneToMany(mappedBy="id.student")
	private List<Enrollment> enrollments;
	@ManyToOne
	@JsonDeserialize(using=StudentSchoolDeserializer.class)
	@JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
	private School school;
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
	public School getSchool() {
		return school;
	}
	public void setSchool(School school) {
		this.school = school;
	}
	
	static class StudentSchoolDeserializer extends ManyToOneDeserializer<School> {
		@Autowired
		private SchoolRepository schoolRepository;
		@Override
		public School deserialize(JsonParser p, DeserializationContext ctxt)
				throws IOException, JsonProcessingException {
			int id = p.getIntValue();
			System.out.println("Getting with id = " + id);
			return this.schoolRepository.getOne(id);
		}
	}
}
