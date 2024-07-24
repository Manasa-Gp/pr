import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TrueFalseEditorProps {
  onSave: (questionData: any) => void;
  onCancel: () => void;
}

function TrueFalseEditor({ onSave, onCancel }: TrueFalseEditorProps) {
  const [question, setQuestion] = useState({
    title: '',
    points: 1,
    questionText: '',
    isTrue: true
  });

  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        margin: "20px",
        padding: "20px"
      }}>
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
        className="mb-2"
      />
      <div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="isTrue"
            checked={question.isTrue}
            onChange={() => setQuestion({ ...question, isTrue: true })}
          />
          <label className="form-check-label">True</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="isTrue"
            checked={!question.isTrue}
            onChange={() => setQuestion({ ...question, isTrue: false })}
          />
          <label className="form-check-label">False</label>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-success" onClick={onSave}>Save</button>
        <button className="btn btn-danger ms-2" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default TrueFalseEditor;
