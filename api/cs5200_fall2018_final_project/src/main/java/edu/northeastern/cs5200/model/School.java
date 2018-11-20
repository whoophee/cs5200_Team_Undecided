package edu.northeastern.cs5200.model;

import java.util.*;
import javax.persistence.*;

@Entity
public class School extends User {
	@OneToMany(mappedBy="school")
	private List<CareerEvent> careerEvents;
	@OneToMany(mappedBy="school")
	private List<Class> classes;

	public School() {
		this.careerEvents = new ArrayList<>();
		this.classes = new ArrayList<>();
		// TODO Auto-generated constructor stub
	}

	public List<CareerEvent> getCareerEvents() {
		return careerEvents;
	}

	public void setCareerEvents(List<CareerEvent> careerEvents) {
		this.careerEvents = careerEvents;
	}

	public List<Class> getClasses() {
		return classes;
	}

	public void setClasses(List<Class> classes) {
		this.classes = classes;
	}
	
	

}
