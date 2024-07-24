import React from 'react';

interface QuestionProps {
    question: {
      id: string;
      title: string;
      questionText: string;
      choices?: { text: string; isCorrect: boolean }[];
      isTrue?: boolean;
    };
    answer: any;
    onChange: (answer: any) => void;
  }
  
function FillInBlanksQuestion({ question, answer, onChange }: QuestionProps) {
  return (
    <div>
      <h4>{question.title}</h4>
      <p>{question.questionText}</p>
      {question.choices && question.choices.map((choice, index) => (
        <div key={index}>
          <input
            type="text"
            value={answer || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default FillInBlanksQuestion;
