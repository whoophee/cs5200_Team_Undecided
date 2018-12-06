package edu.northeastern.cs5200.model;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

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
import edu.northeastern.cs5200.model.util.HasPostedOn;
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
	private Set<Enrollment> enrollments;
	@OneToMany(mappedBy="section")
	private List<ProfessorAnswer> professorAnswers;
	@OneToMany(mappedBy="section")
	private Set<Note> notes;
	@ManyToOne(optional=false)
	@JsonDeserialize(using=ClassDeserializer.class)
	@JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
	private Class schoolClass;
	private boolean approved;
	
	public Section() {
		this.enrollments = new LinkedHashSet<>();
		this.professorAnswers = new ArrayList<>();
		this.notes = new LinkedHashSet<>();
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
	
	
	public List<ProfessorAnswer> getProfessorAnswers() {
		return professorAnswers;
	}

	public void setProfessorAnswers(List<ProfessorAnswer> professorAnswers) {
		this.professorAnswers = professorAnswers;
	}
	
	public Set<Enrollment> getEnrollments() {
		return enrollments;
	}

	public void setEnrollments(Set<Enrollment> enrollments) {
		this.enrollments = enrollments;
	}

	public Set<Note> getNotes() {
		return notes;
	}

	public void setNotes(Set<Note> notes) {
		this.notes = notes;
	}

	public List<Question> getQuestions() {
		if (!org.hibernate.Hibernate.isInitialized(this.enrollments)) {
			return null;
		}
		return this.enrollments.stream()
				.flatMap((Enrollment e) -> e.getQuestions().stream())
				.sorted((a, b) -> -(a.getAskedOn().compareTo(b.getAskedOn())))
				.collect(Collectors.toList());
	}

	public List<HasPostedOn> getPosts() {
		if (!org.hibernate.Hibernate.isInitialized(this.notes)) return null;
		if (!org.hibernate.Hibernate.isInitialized(this.enrollments)) return null;
		
		List<HasPostedOn> posts = this.enrollments.stream()
				.flatMap((Enrollment e) -> e.getQuestions().stream())
				.collect(Collectors.toList());
		posts.addAll(this.getNotes());
		Collections.sort(posts, Collections.reverseOrder((HasPostedOn a, HasPostedOn b) -> {
			return a.getPostedOn().compareTo(b.getPostedOn());
		}));
		
		return posts;
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
