package edu.northeastern.cs5200.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.repository.*;
import edu.northeastern.cs5200.resolvers.CurrentUser;

@RestController
public class ConversationController {

	@Autowired
	private ConversationRepository conversationRepository;
	@Autowired
	private MessageRepository messageRepository;
	
	@RequestMapping(value="/api/me/conversations/", method=RequestMethod.GET)
	public List<Conversation> getConversationsForMe(@CurrentUser User currentUser) {
		return this.conversationRepository.getConversationsForUser(currentUser.getId());
	}
	
	@RequestMapping(value="/api/conversations/{id}/", method=RequestMethod.GET)
	public Conversation getConversationDetailed(@PathVariable("id") int id) {
		return this.conversationRepository.getConversationWithMessages(id);
	}
	
	@RequestMapping(value="/api/me/conversations/", method=RequestMethod.POST)
	public int addConversation(@CurrentUser User currentUser, @RequestBody Conversation conversation) {
		return this.conversationRepository.save(conversation).getId();
	}
	
	@RequestMapping(value="/api/conversations/{id}/messages/", method=RequestMethod.POST)
	public int addMessageToConversation(
			@CurrentUser User currentUser,
			@PathVariable("id") int conversationId,
			@RequestBody Message message) {
		message.setUser(currentUser);
		message.setConversation(this.conversationRepository.getOne(conversationId));
		this.messageRepository.save(message);
		return 0;
	}

}
