package edu.northeastern.cs5200.model;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import edu.northeastern.cs5200.model.util.EasyToDeserializeObjectIdGenerator;
import edu.northeastern.cs5200.model.util.ManyToOneDeserializer;
import edu.northeastern.cs5200.repository.SchoolRepository;

@Entity
@JsonIdentityInfo(generator = EasyToDeserializeObjectIdGenerator.class, property = "@id")
@Table(name="cevent")
public class CareerEvent {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@ManyToOne(optional=false)
	private Company company;
	@OneToMany(mappedBy="id.event")
	private List<Registration> registrations;
	@ManyToOne
	@JsonDeserialize(using=CareerEventSchoolDeserializer.class)
	@JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
	private School school;
	@JsonDeserialize(using=CareerEventDateTimeDeserializer.class)
	@JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
	private LocalDateTime start;
	@Column(name="endTime")
	@JsonDeserialize(using=CareerEventDateTimeDeserializer.class)
	@JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
	private LocalDateTime end;
	private String name;
	private String description;
	private String location;

	public CareerEvent() {
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public School getSchool() {
		return school;
	}

	public void setSchool(School school) {
		this.school = school;
	}

	public LocalDateTime getStart() {
		return start;
	}

	public void setStart(LocalDateTime start) {
		this.start = start;
	}

	public LocalDateTime getEnd() {
		return end;
	}

	public void setEnd(LocalDateTime end) {
		this.end = end;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public List<Registration> getRegistrations() {
		return registrations;
	}

	public void setRegistrations(List<Registration> registrations) {
		this.registrations = registrations;
	}

	public List<Student> getAttendees() {
		if (!org.hibernate.Hibernate.isInitialized(this.registrations)) {
			return null;
		}
		return this.registrations.stream()
				.map((Registration r) -> r.getId().getStudent())
				.collect(Collectors.toList());
	}

	static class CareerEventSchoolDeserializer extends ManyToOneDeserializer<School> {
		@Autowired
		private SchoolRepository schoolRepository;
		@Override
		public School deserialize(JsonParser p, DeserializationContext ctxt)
				throws IOException, JsonProcessingException {
			int id = p.getIntValue();
			return this.schoolRepository.getOne(id);
		}
	}
	
	static class CareerEventDateTimeDeserializer extends ManyToOneDeserializer<LocalDateTime> {

		@Override
		public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt)
				throws IOException, JsonProcessingException {
			long l = p.getLongValue();
			return LocalDateTime.ofInstant(Instant.ofEpochMilli(l), ZoneId.of("UTC"));
		}
		
	}
	
	
	
}
