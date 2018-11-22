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

import edu.northeastern.cs5200.model.util.EasyToDeserializeObjectIdGenerator;
import edu.northeastern.cs5200.model.util.ManyToOneDeserializer;
import edu.northeastern.cs5200.repository.ClassRepository;

@Entity
@JsonIdentityInfo(generator = EasyToDeserializeObjectIdGenerator.class, property = "@id")
public class Section {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	
	@ManyToOne(optional=false)
	private Professor professor;
	@OneToMany(mappedBy="id.section")
	private List<Enrollment> enrollments;
	@OneToMany(mappedBy="section")
	private List<ProfessorAnswer> professorAnswers;
	@OneToMany(mappedBy="section")
	private List<Note> notes;
	@ManyToOne(optional=false)
	@JsonDeserialize(using=ClassDeserializer.class)
	@JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
	private Class schoolClass;
	private boolean approved;
	
	public Section() {
		this.enrollments = new ArrayList<>();
		this.professorAnswers = new ArrayList<>();
		this.notes = new ArrayList<>();
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

	

	public Professor getProfessor() {
		return professor;
	}

	public void setProfessor(Professor professor) {
		this.professor = professor;
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
	
	
	public List<ProfessorAnswer> getProfessorAnswers() {
		return professorAnswers;
	}

	public void setProfessorAnswers(List<ProfessorAnswer> professorAnswers) {
		this.professorAnswers = professorAnswers;
	}

	public List<Note> getNotes() {
		return notes;
	}

	public void setNotes(List<Note> notes) {
		this.notes = notes;
	}


	static class ClassDeserializer extends ManyToOneDeserializer<Class> {
		@Autowired
		private ClassRepository classRepository;
		@Override
		public Class deserialize(JsonParser p, DeserializationContext ctxt)
				throws IOException, JsonProcessingException {
			int id = p.getIntValue();
			return this.classRepository.getOne(id);
		}
	}

}
