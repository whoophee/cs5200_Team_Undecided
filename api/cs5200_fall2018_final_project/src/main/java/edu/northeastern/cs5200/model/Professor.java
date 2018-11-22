package edu.northeastern.cs5200.model;

import java.io.IOException;
import java.util.*;

import javax.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import edu.northeastern.cs5200.model.util.EasyToDeserializeObjectIdGenerator;
import edu.northeastern.cs5200.model.util.ManyToOneDeserializer;
import edu.northeastern.cs5200.repository.SchoolRepository;

@Entity
@JsonIdentityInfo(generator = EasyToDeserializeObjectIdGenerator.class, property = "@id")
public class Professor extends User {
	
	@OneToMany(mappedBy="professor")
	private List<Section> sections;
	@ManyToOne
	@JsonDeserialize(using=ProfessorSchoolDeserializer.class)
	@JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
	private School school;

	public Professor() {
		this.sections = new ArrayList<>();
		// TODO Auto-generated constructor stub
	}

	

	public List<Section> getSections() {
		return sections;
	}



	public void setSections(List<Section> sections) {
		this.sections = sections;
	}



	public School getSchool() {
		return school;
	}

	public void setSchool(School school) {
		this.school = school;
	}
	

	static class ProfessorSchoolDeserializer extends ManyToOneDeserializer<School> {
		@Autowired
		private SchoolRepository schoolRepository;
		@Override
		public School deserialize(JsonParser p, DeserializationContext ctxt)
				throws IOException, JsonProcessingException {
			int id = p.getIntValue();
			System.out.println("Deserializing using " + id);
			School result = this.schoolRepository.getOne(id);
			System.out.println(result.getName() + " " + result.getId());
			return result;
		}
	}
}
