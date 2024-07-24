import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaTrash } from "react-icons/fa";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  title: string;
  points: number;
  questionText: string;
  choices: Answer[];
}

interface Props {
  onSave: (question: Question) => void;
  onCancel: () => void;
}

function MultipleChoiceEditor({ onSave, onCancel }: Props) {
  const [question, setQuestion] = useState<Question>({
    title: '',
    points: 1,
    questionText: '',
    choices: [{ text: '', isCorrect: true }]
  });

  const handleAddChoice = () => {
    setQuestion({
      ...question,
      choices: [...question.choices, { text: '', isCorrect: false }]
    });
  };

  const handleChoiceChange = (index: number, text: string) => {
    const newChoices = question.choices.map((choice, i) => {
      if (i === index) return { ...choice, text };
      return choice;
    });
    setQuestion({ ...question, choices: newChoices });
  };

  const handleChoiceCorrectChange = (index: number) => {
    const newChoices = question.choices.map((choice, i) => {
      return { ...choice, isCorrect: i === index };
    });
    setQuestion({ ...question, choices: newChoices });
  };

  const handleRemoveChoice = (index: number) => {
    const newChoices = question.choices.filter((_, i) => i !== index);
    setQuestion({ ...question, choices: newChoices });
  };

  return (
    <div>
      <br/>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Question Title"
        value={question.title}
        onChange={(e) => setQuestion({ ...question, title: e.target.value })}
      />
      <h4>pts:</h4>
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Points"
        value={question.points}
        onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value, 10) })}
      />
      <h4>Question:</h4>
      <ReactQuill
        theme="snow"
        value={question.questionText}
        onChange={(value) => setQuestion({ ...question, questionText: value })}
      />
      {question.choices.map((choice, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="radio"
            name="correctAnswer"
            checked={choice.isCorrect}
            onChange={() => handleChoiceCorrectChange(index)}
          />
          <input
            type="text"
            value={choice.text}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
            style={{ marginLeft: '10px', flexGrow: 1 }}
          />
          {question.choices.length > 1 && (
            <button onClick={() => handleRemoveChoice(index)} className="text-danger me-4">
            <FaTrash />
          </button>
          )}
        </div>
      ))}
      <div className="mt-3">
        <button className="btn btn-secondary "onClick={handleAddChoice}>Add Answer</button>
        <button className="btn btn-success ms-2" onClick={() => onSave(question)}>Save</button>
        <button className="btn btn-danger ms-2" onClick={onCancel}>Cancel</button>
      </div>
      <br/>
    </div>
  );
}

export default MultipleChoiceEditor;
