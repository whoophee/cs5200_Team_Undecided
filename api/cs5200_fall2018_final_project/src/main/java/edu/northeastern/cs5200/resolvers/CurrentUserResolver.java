package edu.northeastern.cs5200.resolvers;

import edu.northeastern.cs5200.model.User;
import edu.northeastern.cs5200.repository.UserRepository;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class CurrentUserResolver implements HandlerMethodArgumentResolver {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterAnnotation(CurrentUser.class) != null
				&& User.class.isAssignableFrom(parameter.getParameterType());
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		HttpServletRequest req = (HttpServletRequest)webRequest.getNativeRequest();
		Cookie[] cookies = req.getCookies();
		String token = null, username = null;
		for (Cookie cookie : cookies) {
			switch (cookie.getName()) {
				case "token":
					token = cookie.getValue();
					break;
				case "username":
					username = cookie.getValue();
					break;
			}
		}
		if (token == null || username == null) return null;
		User u = userRepository.findByToken(token, username);
		if (parameter.getParameterType().isAssignableFrom(u.getClass())) {
			return u;
		}
		return null;
	}

}
