import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Assignment } from './types';
import { createAssignment, updateAssignment } from "./client";
import {  addAssignment, updateAssignment as reduxUpdateAssignment } from './reducer';
export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid?: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assignments = useSelector((state: any) => state.assignments.assignments);
  const currentAssignment = assignments.find((a: any) => a._id === aid) || null;

  const [assignmentDetails, setAssignmentDetails] = useState<Assignment>({
    _id: currentAssignment ? currentAssignment._id : '',
    title: currentAssignment ? currentAssignment.title : '',
    description: currentAssignment ? currentAssignment.description : '',
    points: currentAssignment ? currentAssignment.points : 100,
    dueDate: currentAssignment ? currentAssignment.dueDate : '',
    availableFromDate: currentAssignment ? currentAssignment.availableFromDate : '',
    availableUntilDate: currentAssignment ? currentAssignment.availableUntilDate : '',
    course: cid ?? ''
  });
  useEffect(() => {
    if (currentAssignment) {
      setAssignmentDetails(currentAssignment);
    }
  }, [currentAssignment]);

  const handleChange = ((e: any) => {
    const { name, value } = e.target;
    setAssignmentDetails(prev => ({ ...prev, [name]: value }));
  });

  const handleSave = async () => {
    if (aid) {
      if (!cid) {
        console.error("Course ID is missing!");
        return;
      }
      await updateAssignment({ ...assignmentDetails, course: cid });
      dispatch(reduxUpdateAssignment({ ...assignmentDetails, course: cid }));
    } else {
      const newAssignment = await createAssignment(cid || 'defaultCourse', assignmentDetails);
      dispatch(addAssignment(newAssignment));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };
    return (
      <div id="wd-assignments-editor">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Assignment Name</label>
        <input type="text" className="form-control" id="title" name="title"
               placeholder="New Assignment" value={assignmentDetails.title}
               onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <textarea className="form-control" id="description" name="description"
                  placeholder="New Assignment Description"
                  value={assignmentDetails.description} onChange={handleChange}/>
      </div>
<div className="mb-3 row">
        <label htmlFor="points" className="col-sm-4 col-form-label text-end">Points</label>
        <div className="col-sm-8">
        <input type="text" className="form-control" id="points" name="points"
               value={assignmentDetails.points} onChange={handleChange}/>
        </div>
      </div>
      <div className="mb-3 row">
      <label htmlFor="assign-group"
        className="col-sm-4 col-form-label text-end">
        Assignment Group
      </label>
      <div className="col-sm-8" id="wd-assign-group-dropdown">
      <select className="form-select">
         <option selected>ASSIGNMENT</option>
         <option value="1">One</option>
         <option value="2">Two</option>
         <option value="3">Three</option>
      </select>
      </div>
      </div>
      <div className="mb-3 row">
      <label htmlFor="assign-group"
        className="col-sm-4 col-form-label text-end">
        Display Grade as
      </label>
      <div className="col-sm-8" id="wd-assign-group-dropdown">
      <select className="form-select">
         <option selected>Percentage</option>
         <option value="1">One</option>
         <option value="2">Two</option>
         <option value="3">Three</option>
      </select>
      </div>
      </div>
      <div className="mb-3 row">
      <label htmlFor="assign-group"
        className="col-sm-4 col-form-label text-end">
        Submission Type
      </label>
      <div className="col-sm-8" id="wd-assign-group-dropdown" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
      <select className="form-select">
         <option selected>Online</option>
         <option value="1">One</option>
         <option value="2">Two</option>
         <option value="3">Three</option>
      </select><br></br>
      <h5>Online Entry Options</h5>
      <div className="row mb-3">
        <div className="ccol-sm-8">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" 
                   id="r1" />
            <label className="form-check-label" htmlFor="r1">
              Text Entry </label> <br/><br/>
            <input className="form-check-input" type="checkbox" 
                   id="r2" />
            <label className="form-check-label" htmlFor="r2">
              Media Recordings </label> <br/><br/>
            <input className="form-check-input" type="checkbox" 
                   id="r3" />
            <label className="form-check-label" htmlFor="r3">
              Website URL </label> <br/><br/>
            <input className="form-check-input" type="checkbox" 
                   id="r4" />
            <label className="form-check-label" htmlFor="r4">
              Student Annotation </label> <br/><br/>
            <input className="form-check-input" type="checkbox" 
                   id="r5" />
            <label className="form-check-label" htmlFor="r5">
              File Upload </label> <br/>
          </div> 
        </div>
      </div>
    </div>
  </div>
  <div className="mb-3 row">
  <label htmlFor="assign-group" className="col-sm-4 col-form-label text-end">Assign</label>
  <div className="col-sm-8" id="wd-assign-assign-to" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
    <h5>Assign to</h5>
    <input type="text" className="form-control" id="assign-to" value="Everyone" /><br></br>
    <h5>Due</h5>  
    <input type="datetime-local" className="form-control" id="dueDate" name="dueDate"
               value={assignmentDetails.dueDate} onChange={handleChange}/><br/>
    <div className="row">
      <div className="col-sm-6">
        <h5>Available from</h5>
        <input type="datetime-local" className="form-control" id="availableFromDate" name="availableFromDate"
               value={assignmentDetails.availableFromDate} onChange={handleChange}/>
      </div>
      <div className="col-sm-6">
        <h5>Until</h5>
        <input type="date" className="form-control" id="availableUntilDate" name="availableUntilDate"
               value={assignmentDetails.availableUntilDate} onChange={handleChange}/>
      </div>
    </div>
  </div>
</div>
  <hr />
  <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
  <button id="wd-save-btn" className="btn btn-danger me-1 float-end" onClick={handleSave}>
        Save
      </button>
      </Link>
      <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
      <button id="wd-cancel-btn" className="btn btn-secondary me-1 float-end" onClick={handleCancel}>
        Cancel
      </button>
      </Link>
</div>
  );
}  