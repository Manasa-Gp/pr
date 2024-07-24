import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MultipleChoiceQuestion from './QuizPreview/MultipleChoiceQuestion';
import TrueFalseQuestion from './QuizPreview/TrueFalseQuestion';
import FillInBlanksQuestion from './QuizPreview/FillInBlanksQuestion';

export interface QuestionProps {
  question: Question;
  answer: any;
  onChange: (answer: any) => void;
}

export interface Question {
  id: string;
  title: string;
  questionText: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in-blanks';
  choices?: Array<{ text: string; isCorrect: boolean }>;
  isTrue?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface AnswerMap {
  [key: string]: any;
}

function QuizPreviewScreen() {
  const { quizId } = useParams<{ quizId?: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});

  useEffect(() => {
    if (quizId) {
      const fetchQuizDetails = async (): Promise<Quiz> => {
        return {
          id: quizId,
          title: "Sample Quiz",
          description: "This is a sample quiz",
          questions: [
            { id: 'q1', title: 'Question 1', questionText: 'What is 2+2?', type: 'multiple-choice', choices: [{ text: '4', isCorrect: true }, { text: '3', isCorrect: false }] },
            { id: 'q2', title: 'Question 2', questionText: 'True or False: Earth is flat?', type: 'true-false', isTrue: false },
            { id: 'q3', title: 'Question 3', questionText: 'Fill in the blank: The sun rises in the ___', type: 'fill-in-blanks', choices: [{ text: 'East', isCorrect: true }] }
          ]
        };
      };
  
      fetchQuizDetails().then(data => {
        setQuiz(data);
        const initialAnswers: AnswerMap = {};
        data.questions.forEach(question => {
          initialAnswers[question.id] = '';
        });
        setAnswers(initialAnswers);
      });
    }
  }, [quizId]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      {quiz.questions.map(question => {
        let QuestionComponent = null;

        // 确定使用哪个组件
        switch (question.type) {
          case 'multiple-choice':
            QuestionComponent = MultipleChoiceQuestion;
            break;
          case 'true-false':
            QuestionComponent = TrueFalseQuestion;
            break;
          case 'fill-in-blanks':
            QuestionComponent = FillInBlanksQuestion;
            break;
          default:
            return null;
        }


        return QuestionComponent && (
          <QuestionComponent
            key={question.id}
            question={question}
            answer={answers[question.id]}
            onChange={(answer: any) => handleAnswerChange(question.id, answer)}
          />
        );
      })}
    </div>
  );
}

export default QuizPreviewScreen;
