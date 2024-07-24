import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizDetails, updateQuizDetails } from "./client";
import { setQuizDetails as reduxSetQuizDetails } from './reducer';
import QuestionEditor from './QuestionEditor';

function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = useSelector((state:any) => state.quizzes.quizzes.find((q:any) => q._id === qid) || {});

  const [quizDetails, setQuizDetails] = useState({
    _id: qid || `quiz-${Date.now()}`,
    title: quiz.title || '',
    description: quiz.description || '',
    quizType: quiz.quizType || 'Graded Quiz',
    assignmentGroup: quiz.assignmentGroup || 'Quizzes',
    shuffleAnswers: quiz.shuffleAnswers || false,
    timeLimit: quiz.timeLimit || 20,
    multipleAttempts: quiz.multipleAttempts || false,
    showCorrectAnswers: quiz.showCorrectAnswers || '',
    accessCode: quiz.accessCode || '',
    oneQuestionAtATime: quiz.oneQuestionAtATime || true,
    webcamRequired: quiz.webcamRequired || false,
    lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false,
    dueDate: quiz.dueDate || '',
    availableDate: quiz.availableDate || '',
    untilDate: quiz.untilDate || '',
    questions: quiz.questions || []
  });

  useEffect(() => {
    if (cid && qid && !quiz._id) {
      fetchQuizDetails(cid, qid!).then(details => {
        dispatch(reduxSetQuizDetails(details));
        setQuizDetails(details);
      }).catch(error => console.error('Failed to fetch quiz details:', error));
    }
  }, [cid, qid, dispatch, quiz._id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuizDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (qid) {
      await updateQuizDetails(qid, quizDetails);
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } else {
      console.error("Quiz ID is missing!");
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const [activeTab, setActiveTab] = useState('detail');

  return (
    <div className="col-12" style={{
        display: "flex",
        flexDirection: "column",
        margin: "20px 0",
        padding: "20px",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
      }}>
      <hr/>
      <div className="nav nav-tabs">
        <button className={`nav-link ${activeTab === 'detail' ? 'active' : ''}`}
                onClick={() => setActiveTab('detail')}>Details</button>
        <button className={`nav-link ${activeTab === 'question' ? 'active' : ''}`}
                onClick={() => setActiveTab('question')}>Questions</button>
      </div>
      <br/>
      {activeTab === 'detail' && (
        <>
          <input type="text" name="title" value={quizDetails.title}
                 onChange={handleChange} className="form-control mb-2" placeholder="Unnamed Quiz" />
          <textarea name="description" value={quizDetails.description}
                    onChange={handleChange} className="form-control mb-2" placeholder="Quiz Instructions" rows={4} />
          <br/>
          <label>Quiz Type</label>
          <select name="quizType" value={quizDetails.quizType} onChange={handleChange}
                  className="form-control mb-2">
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
          <label>Assignment Group</label>
          <select name="assignmentGroup" value={quizDetails.assignmentGroup} onChange={handleChange}
                  className="form-control mb-2">
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Projects">Projects</option>
          </select><br/>
          <h5>Options</h5>
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          <label>Shuffle Answers</label>
          <input type="checkbox"  name="shuffleAnswers" checked={quizDetails.shuffleAnswers}
                 onChange={(e) => setQuizDetails({ ...quizDetails, shuffleAnswers: e.target.checked })} /></div>
          <label>Time Limit (minutes)</label>
          <input type="number" name="timeLimit" value={quizDetails.timeLimit}
                 onChange={handleChange} className="form-control mb-2" placeholder="Time Limit (minutes)" />
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          <label>Allow Multiple Attempts</label>
          <input type="checkbox" name="multipleAttempts" checked={quizDetails.multipleAttempts}
                 onChange={(e) => setQuizDetails({ ...quizDetails, multipleAttempts: e.target.checked })} /></div>
          <div className="mb-3 row">
        <label htmlFor="assign-group" className="mt-4 col-sm-4 col-form-label text-end">Assign</label>

        <div className="mt-4 col-sm-8" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h5>Assign to</h5>
          <input type="text" className="form-control" value="Everyone" readOnly /><br />
          <h5>Due</h5>  
          <input type="datetime-local" className="form-control" name="dueDate" value={quizDetails.dueDate} onChange={handleChange} /><br />
          <div className="row">
            <div className="col-sm-6">
              <h5>Available from</h5>
              <input type="datetime-local" className="form-control" name="availableFrom" value={quizDetails.availableDate} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <h5>Until</h5>
              <input type="datetime-local" className="form-control" name="untilDate" value={quizDetails.untilDate} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
        </>
      )}
      {activeTab === 'question' && (
        <div>
          <p>Questions editor will be implemented here.</p>
          <QuestionEditor/>
        </div>
      )}
      <div className="float-end">
        <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        <button onClick={handleSave} className="btn btn-danger ms-2">{qid ? 'Update' : 'Create'} & Save</button>
      </div>
    </div>
  );
}

export default QuizEditor;
