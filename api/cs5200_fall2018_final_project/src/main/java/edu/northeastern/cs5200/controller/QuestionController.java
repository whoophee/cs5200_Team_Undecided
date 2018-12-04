package edu.northeastern.cs5200.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
public class QuestionController {

	@Autowired
	private QuestionRepository questionRepository;
	
	@Autowired
	private EnrollmentRepository enrollmentRepository;
	
	@Autowired
	private AnswerRepository answerRepository;

	@RequestMapping(path="/api/sections/{sectionId}/questions/", method=RequestMethod.POST)
	public int addQuestion(
			@CurrentUser Student student,
			@PathVariable("sectionId") int sectionId,
			@RequestBody Question question) {
		if (student == null) return 0;
		question.setEnrollment(this.enrollmentRepository.getEnrollmentForSectionAndStudent(sectionId, student.getId()));
		question.setAskedOn(LocalDateTime.now());
		this.questionRepository.save(question);
		return 0;
	}
	
	@RequestMapping(path="/api/questions/{questionId}/answers/", method=RequestMethod.POST)
	public int addStudentAnswerToQuestion(
			@PathVariable("questionId") int questionId,
			@CurrentUser Student student,
			@RequestBody StudentAnswer answer) {
		Question question = this.questionRepository.findById(questionId).get();
		int sectionId = question.getEnrollment().getId().getSection().getId();
		
		answer.setQuestion(question);
		answer.setEnrollment(this.enrollmentRepository.getEnrollmentForSectionAndStudent(sectionId, student.getId()));
		answer.setPostedOn(LocalDateTime.now());
		
		this.answerRepository.save(answer);
		return 1;
	}
	
	@RequestMapping(path="/api/questions/{questionId}/", method=RequestMethod.GET)
	public Question getQuestionWithAnswers(@PathVariable("questionId") int id) {
		return this.questionRepository.getQuestionWithAnswers(id);
	}
}
