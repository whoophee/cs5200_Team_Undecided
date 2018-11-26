package edu.northeastern.cs5200;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.SpringHandlerInstantiator;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.cfg.HandlerInstantiator;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;

import edu.northeastern.cs5200.resolvers.CurrentUserResolver;

import org.springframework.web.method.support.HandlerMethodArgumentResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Autowired
	private CurrentUserResolver currentUserResolver;
	
	@Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(this.currentUserResolver);
    }
	
	@Bean
	public HandlerInstantiator handlerInstantiator(ApplicationContext applicationContext) {
	    return new SpringHandlerInstantiator(applicationContext.getAutowireCapableBeanFactory());
	}

	@Bean
	public Jackson2ObjectMapperBuilder objectMapperBuilder(HandlerInstantiator handlerInstantiator) {
	    return new Jackson2ObjectMapperBuilder()
	    	.handlerInstantiator(handlerInstantiator)
	    	.modulesToInstall(Hibernate5Module.class);
	}
	

}