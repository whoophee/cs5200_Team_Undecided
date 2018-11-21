package edu.northeastern.cs5200.model.util;

import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.fasterxml.jackson.databind.JsonDeserializer;

abstract public class ManyToOneDeserializer<T> extends JsonDeserializer<T> {
	public ManyToOneDeserializer() {
		super();
		SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this); 
	}
}
