package edu.northeastern.cs5200.model;

import java.util.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Company extends User {
	@OneToMany(mappedBy="company")
	private List<CareerEvent> careerEvents;

	public Company() {
		this.careerEvents = new ArrayList<>();
		// TODO Auto-generated constructor stub
	}

	public List<CareerEvent> getCareerEvents() {
		return careerEvents;
	}

	public void setCareerEvents(List<CareerEvent> careerEvents) {
		this.careerEvents = careerEvents;
	}
	
	

}
