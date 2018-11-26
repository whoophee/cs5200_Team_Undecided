package edu.northeastern.cs5200.model;

import java.io.IOException;
import java.util.*;
import javax.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import edu.northeastern.cs5200.model.Professor.ProfessorSchoolDeserializer;
import edu.northeastern.cs5200.model.util.EasyToDeserializeObjectIdGenerator;
import edu.northeastern.cs5200.model.util.ManyToOneDeserializer;
import edu.northeastern.cs5200.repository.SchoolRepository;
import edu.northeastern.cs5200.repository.UserRepository;

@Entity
@JsonIdentityInfo(generator = EasyToDeserializeObjectIdGenerator.class, property = "@id")
public class Conversation {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JsonDeserialize(using=ConversationUserDeserializer.class)
	@JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
	private User user1;
	@ManyToOne
	@JsonDeserialize(using=ConversationUserDeserializer.class)
	@JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
	private User user2;
	@OneToMany(mappedBy="conversation")
	private List<Message> messages;
	
	public Conversation() {
		this.messages = new ArrayList<>();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser1() {
		return user1;
	}

	public void setUser1(User user1) {
		this.user1 = user1;
	}

	public User getUser2() {
		return user2;
	}

	public void setUser2(User user2) {
		this.user2 = user2;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	static class ConversationUserDeserializer extends ManyToOneDeserializer<User> {
		@Autowired
		private UserRepository userRepository;
		@Override
		public User deserialize(JsonParser p, DeserializationContext ctxt)
				throws IOException, JsonProcessingException {
			int id = p.getIntValue();
			return this.userRepository.getOne(id);
		}
	}
}
