package edu.northeastern.cs5200.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import edu.northeastern.cs5200.model.util.EasyToDeserializeObjectIdGenerator;

@Entity
@JsonIdentityInfo(generator = EasyToDeserializeObjectIdGenerator.class, property = "@id")
public class Note {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String body;
	@ManyToOne(optional=false)
	private Section section;
	public Note() {
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public Section getSection() {
		return section;
	}
	public void setSection(Section section) {
		this.section = section;
	}
	
}
