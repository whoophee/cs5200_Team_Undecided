package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface ConversationRepository extends JpaRepository<Conversation, Integer> {
	@Query("select conversation from Conversation conversation where conversation.user1.id=?1 or conversation.user2.id=?1")
	public List<Conversation> getConversationsForUser(int userId);
	
	@Query("select conversation from Conversation conversation left join fetch conversation.messages where conversation.id=?1")
	public Conversation getConversationWithMessages(int conversationId);
}
