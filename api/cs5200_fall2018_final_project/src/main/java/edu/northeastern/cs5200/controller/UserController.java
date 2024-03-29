package edu.northeastern.cs5200.controller;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.model.*;
import edu.northeastern.cs5200.repository.*;
import edu.northeastern.cs5200.resolvers.CurrentUser;;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	private String generateToken() {
		Random r = new Random();
		char[] arr = new char[50];
		for (int i = 0; i < 50; i++) {
			arr[i] = (char) ('A' + r.nextInt(26));
		}
		return new String(arr);
	}
	
	@RequestMapping(value="/api/users/me/", method=RequestMethod.GET)
	@Transactional
	public User getLoggedInUser(
			@CookieValue(value="token", required=false) String token,
			@CookieValue(value="username", required=false) String username) {
		if (token == null || username == null) return null;
		return this.userRepository.findByToken(token, username);
	}

	@RequestMapping(value="/api/users/login/", method=RequestMethod.POST)
	@Transactional
	public User loginUser(
			@RequestParam("username") String username,
			@RequestParam("password") String password,
			HttpServletResponse response) {
		
		User u = this.userRepository.getLoggedInUser(username, password);
		if (u != null) {
			String token = generateToken();
			u.setToken(token);
			this.userRepository.save(u);
			Cookie tokenCookie = new Cookie("token", token);
			tokenCookie.setPath("/");
			Cookie usernameCookie = new Cookie("username", u.getUsername());
			usernameCookie.setPath("/");
			response.addCookie(tokenCookie);
			response.addCookie(usernameCookie);
		}
		return u;
	}
	
	@RequestMapping(value="/api/users/logout/", method=RequestMethod.GET)
	public int logout(HttpServletResponse response) {
		Cookie a = new Cookie("token", "");
		a.setPath("/");
		a.setMaxAge(0);
		Cookie b = new Cookie("username", "");
		b.setPath("/");
		b.setMaxAge(0);
		response.addCookie(a);
		response.addCookie(b);
		return 0;
	}
	
	@RequestMapping(value="/api/admins/", method=RequestMethod.POST)
	public int makeAdmin(@RequestBody Admin admin) {
		this.userRepository.save(admin);
		return 0;
	}
	
	@RequestMapping(value="/api/me/contacts/", method=RequestMethod.GET)
	@Transactional
	public List<User> getConversationPartnersForUser(
			@CurrentUser User user,
			@RequestParam("name") String query) {
		return this.userRepository.findLike(query).stream()
				.filter(u -> u.getId() != user.getId())
				.collect(Collectors.toList());
	}

}
