package edu.northeastern.cs5200.model;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;

@Entity
public class Enrollment {
	@EmbeddedId
	private EnrollmentId id;
	@OneToMany(mappedBy="enrollment")
	private List<Question> questions;
	@OneToMany(mappedBy="enrollment")
	private List<StudentAnswer> answers;
	public Enrollment() {
		this.questions = new ArrayList<>();
		this.answers = new ArrayList<>();
	}

	public List<Question> getQuestions() {
		return questions;
	}
	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
	
	public EnrollmentId getId() {
		return id;
	}

	public void setId(EnrollmentId id) {
		this.id = id;
	}

	public List<StudentAnswer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<StudentAnswer> answers) {
		this.answers = answers;
	}

	@Embeddable
	static class EnrollmentId implements Serializable {
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		@ManyToOne(optional=false)
		private Student student;
		@ManyToOne(optional=false)
		private Section section;
		
		public EnrollmentId() {
			
		}
		
		public EnrollmentId(Student student, Section section) {
			super();
			this.student = student;
			this.section = section;
		}
		
		public Student getStudent() {
			return student;
		}
		public void setStudent(Student student) {
			this.student = student;
		}
		public Section getSection() {
			return section;
		}
		public void setSection(Section section) {
			this.section = section;
		}
		
		
	}
}
