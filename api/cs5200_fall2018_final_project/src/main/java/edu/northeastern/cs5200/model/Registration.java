package edu.northeastern.cs5200.model;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;

import edu.northeastern.cs5200.model.util.EasyToDeserializeObjectIdGenerator;

@Entity
@JsonIdentityInfo(generator = EasyToDeserializeObjectIdGenerator.class, property = "@id")
public class Registration {
	@EmbeddedId
	private RegistrationId id;
	public Registration() {
		
	}
	
	public Registration(RegistrationId id) {
		this();
		this.id = id;
	}

	public RegistrationId getId() {
		return id;
	}

	public void setId(RegistrationId id) {
		this.id = id;
	}

	@Embeddable
	public static class RegistrationId implements Serializable {
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		@ManyToOne(optional=false)
		private Student student;
		@ManyToOne(optional=false)
		private CareerEvent event;
		
		public RegistrationId() {
			
		}
		
		public RegistrationId(Student student, CareerEvent event) {
			super();
			this.student = student;
			this.event = event;
		}

		public Student getStudent() {
			return student;
		}

		public void setStudent(Student student) {
			this.student = student;
		}

		public CareerEvent getEvent() {
			return event;
		}

		public void setEvent(CareerEvent event) {
			this.event = event;
		}

		public static long getSerialversionuid() {
			return serialVersionUID;
		}

		@Override
		public int hashCode() {
			return Objects.hash(student.getId(), event.getId());
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			RegistrationId other = (RegistrationId) obj;
			return student.getId() == other.student.getId() &&
					event.getId() == other.event.getId();
		}
		
		
		
	}
}
