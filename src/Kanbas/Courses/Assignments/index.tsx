import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import SingleAssignmentControlButtons from "./SingleAssignmentControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAssignmentsForCourse, deleteAssignment } from "./client";
import { setAssignments, deleteAssignment as reduxDeleteAssignment } from './reducer'
import "./index.css"
export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const assignments = useSelector((state:any) => state.assignments.assignments.filter((a:any) => a.course === cid));
  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  };
  useEffect(() => {
    const loadAssignments = async () => {
      if (cid) {
        const assignmentsData = await fetchAssignmentsForCourse(cid);
        dispatch(setAssignments(assignmentsData));
      }
    };
    loadAssignments();
  }, [cid, dispatch]);
  const confirmDelete = async (assignmentId: string) => {
    setShowModal(true);
    setDeleteId(assignmentId);
  };
  const handleDelete = async () => {
    await deleteAssignment(deleteId);
    dispatch(reduxDeleteAssignment(deleteId));
    setShowModal(false);
    setDeleteId('');
  };
  
  return (
      <div id="wd-assignments">
        <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end" onClick={handleAddAssignment}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> Assignment
        </button>
      <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </button>
      <div id="wd-assignments" className="d-flex align-items-center justify-content-end">
    <div className="input-group me-5">
        <span className="input-group-text"><IoSearchOutline /></span>
        <input type="text" className="form-control" placeholder="Search..." />
    </div>
</div>
        <br/><br/><br/><br/>
        <ul id="wd-modules" className="list-group rounded-0">
    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        <BsGripVertical className="me-2 fs-3" />
        <MdArrowDropDown className="me-1 fs-3" />
        ASSIGNMENTS
        <AssignmentControlButtons />
      </div>
      <ul className="wd-lessons list-group rounded-0 wd-padded-left wd-bg-color-green">
  {assignments.map((assignment: any) => (
    <li key={assignment._id} className="wd-lesson list-group-item d-flex align-items-center p-3">
      <div className="icon-container me-2">
        <BsGripVertical className="fs-3" />
        <TfiWrite className="wd-fg-color-green me-2 fs-3" />
      </div>
      <div className="assignment-details flex-grow-1">
        <strong>
          <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="wd-_id">
            {assignment.title}
          </Link>
        </strong>
        <h6>
          <p className="wd-fg-color-red">
            <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="wd-link">
              Multiple Modules
            </Link>
            <span className="wd-fg-color-black"> | <b>Due</b> {assignment.dueDate || 'May 13 at 11:59pm'} | {assignment.points || 100} pts</span>
          </p>
        </h6>
      </div>
      <div className="control-buttons">
        <FaTrash onClick={() => confirmDelete(assignment._id)} className="text-danger me-4 mb-2" />
        <SingleAssignmentControlButtons />
      </div>
    </li>
  ))}
</ul>
{showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <div className="modal-body">
              <p>Delete this assignment?</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary">No</button>
              <button onClick={handleDelete} className="btn btn-danger">Yes</button>
            </div>
          </div>
        </div>
      )}
    </li>
  </ul>
</div>
  );
}