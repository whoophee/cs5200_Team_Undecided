package edu.northeastern.cs5200.model;

import java.util.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
public class Company extends User {
	@OneToMany(mappedBy="company")
	private List<CareerEvent> careerEvents;
	
	@Lob
	private String description;
	private String headquartersText;
	private String size;
	private String industry;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getHeadquartersText() {
		return headquartersText;
	}

	public void setHeadquartersText(String headquartersText) {
		this.headquartersText = headquartersText;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}
	
	

}
