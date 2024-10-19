package com.tech.english_quiz.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tech.english_quiz.model.Question;

public interface QuizRepository extends JpaRepository<Question,Long> {
    
}
