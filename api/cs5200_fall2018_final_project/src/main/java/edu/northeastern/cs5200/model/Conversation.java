package edu.northeastern.cs5200.model;

import java.util.*;
import javax.persistence.*;

@Entity
public class Conversation {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private User user1;
	@ManyToOne
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

	
}
