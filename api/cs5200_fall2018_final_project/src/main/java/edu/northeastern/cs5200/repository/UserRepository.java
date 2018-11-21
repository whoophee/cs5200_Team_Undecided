package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface UserRepository extends JpaRepository<User, Integer>  {
	@Query("select user from User user where user.username=?1 and user.password=?2")
	public User getLoggedInUser(String username, String password);
	
	@Query("select user from User user where user.token=?1 and user.username=?2")
	public User findByToken(String token, String username);
}
