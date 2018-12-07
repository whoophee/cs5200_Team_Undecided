package edu.northeastern.cs5200.model;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;

import edu.northeastern.cs5200.model.util.EasyToDeserializeObjectIdGenerator;

@Entity
@JsonIdentityInfo(generator = EasyToDeserializeObjectIdGenerator.class, property = "@id")
public class Admin extends User {

	public Admin() {
		// TODO Auto-generated constructor stub
	}

}
