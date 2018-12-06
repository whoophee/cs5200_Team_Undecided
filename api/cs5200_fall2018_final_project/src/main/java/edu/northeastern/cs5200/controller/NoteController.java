package edu.northeastern.cs5200.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

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
public class NoteController {

	@Autowired
	private QuestionRepository questionRepository;
	
	@Autowired
	private EnrollmentRepository enrollmentRepository;
	
	@Autowired
	private AnswerRepository answerRepository;
	
	@Autowired
	private SectionRepository sectionRepository;
	
	@Autowired
	private NoteRepository noteRepository;

	@RequestMapping(path="/api/sections/{sectionId}/notes/", method=RequestMethod.POST)
	@Transactional
	public int addNote(
			@CurrentUser Professor professor,
			@PathVariable("sectionId") int sectionId,
			@RequestBody Note note) {
		if (professor == null) return 0;
		Section section = this.sectionRepository.findById(sectionId).get();
		assert (section.getProfessor().getId() == professor.getId());
		note.setSection(section);
		note.setPostedOn(LocalDateTime.now());
		this.noteRepository.save(note);
		return 0;
	}
	
	@RequestMapping(path="/api/notes/{noteId}/", method=RequestMethod.GET)
	@Transactional
	public Note getNoteById(@PathVariable("noteId") int noteId) {
		return this.noteRepository.findById(noteId).get();
	}
	
}
