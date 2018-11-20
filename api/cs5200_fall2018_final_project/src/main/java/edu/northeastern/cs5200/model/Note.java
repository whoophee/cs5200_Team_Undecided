package edu.northeastern.cs5200.model;

import javax.persistence.*;

@Entity
public class Note {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String body;
	@ManyToOne(optional=false)
	private Teaching teaching;
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
	public Teaching getTeaching() {
		return teaching;
	}
	public void setTeaching(Teaching teaching) {
		this.teaching = teaching;
	}

}
