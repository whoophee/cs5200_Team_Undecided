package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
	@Query("select question from Question question left join fetch question.answers where question.id=?1")
	public Question getQuestionWithAnswers(int id);
}
