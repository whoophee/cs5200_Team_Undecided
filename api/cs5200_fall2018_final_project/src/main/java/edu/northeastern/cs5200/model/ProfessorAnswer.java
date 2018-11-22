package edu.northeastern.cs5200.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import edu.northeastern.cs5200.model.util.EasyToDeserializeObjectIdGenerator;

@Entity
@JsonIdentityInfo(generator = EasyToDeserializeObjectIdGenerator.class, property = "@id")
public class ProfessorAnswer extends Answer {

	@ManyToOne(optional=false)
	private Section section;
	public ProfessorAnswer() {
		// TODO Auto-generated constructor stub
	}
	public Section getSection() {
		return section;
	}
	public void setSection(Section section) {
		this.section = section;
	}
	
}
