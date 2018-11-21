package edu.northeastern.cs5200.model;
import java.io.Serializable;
import java.util.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Teaching {
	@EmbeddedId
	private TeachingId id;
	
	@OneToMany(mappedBy="teaching")
	private List<Note> notes;
	@OneToMany(mappedBy="teaching")
	private List<ProfessorAnswer> answers;
	
	public Teaching() {
		this.notes = new ArrayList<>();
		this.answers = new ArrayList<>();
		// TODO Auto-generated constructor stub
	}
	
	

	public TeachingId getId() {
		return id;
	}



	public void setId(TeachingId id) {
		this.id = id;
	}



	public List<Note> getNotes() {
		return notes;
	}



	public void setNotes(List<Note> notes) {
		this.notes = notes;
	}



	public List<ProfessorAnswer> getAnswers() {
		return answers;
	}



	public void setAnswers(List<ProfessorAnswer> answers) {
		this.answers = answers;
	}



	@Embeddable
	static class TeachingId implements Serializable {
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		@ManyToOne(optional=false)
		private Professor professor;
		@ManyToOne(optional=false)
		private Section section;
		
		public TeachingId() {
			
		}

		public TeachingId(Professor professor, Section section) {
			super();
			this.professor = professor;
			this.section = section;
		}

		public Professor getProfessor() {
			return professor;
		}

		public void setProfessor(Professor professor) {
			this.professor = professor;
		}

		public Section getSection() {
			return section;
		}

		public void setSection(Section section) {
			this.section = section;
		}

		public static long getSerialversionuid() {
			return serialVersionUID;
		}
		
	}
}
