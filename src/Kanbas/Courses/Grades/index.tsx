import { IoSettingsSharp } from "react-icons/io5";
import { TbFileImport } from "react-icons/tb";
import { TbFileExport } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { users, assignments, enrollments, grades } from '../../Database';
import "./index.css"
export default function Grades() {
  const { cid } = useParams();
  const currentEnrollments = enrollments.filter(e => e.course === cid);
  const students = currentEnrollments.map(e => ({
    ...users.find(user => user._id === e.user),
    grades: grades.filter(g => g.student === e.user)
  }));
  const courseAssignments = assignments.filter(a => a.course === cid);
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-3 float-end">
        <IoSettingsSharp className="position-relative me-2" style={{ bottom: "1px" }} />
      </button>
      <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-3 float-end">
        <TbFileExport className="position-relative" style={{ bottom: "1px" }} />
        Export
        <IoIosArrowDown className="position-relative" style={{ bottom: "1px" }} />
      </button>
      <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-3 float-end">
        <TbFileImport className="position-relative me-2" style={{ bottom: "1px" }} />
        Import
      </button><br /><br /><br /><br />
    <div className="mb-3">
  <div className="row">
    <div className="col-sm-6">
      <label className="form-label"><strong>Student Names</strong></label>
    </div>
    <div className="col-sm-6">
      <label className="form-label"><strong>Assignment Names</strong></label>
    </div>
  </div>
  <div className="row">
    <div className="col-sm-6">
      <div className="input-group mb-3">
        <span className="input-group-text"><IoSearchOutline /></span>
        <select className="form-select">
         <option selected>Search Students</option>
         {students.map(student => (
                  <option key={student._id} value={student._id}>{student.firstName} {student.lastName}</option>
                ))}
      </select>
      </div>
    </div>
    <div className="col-sm-6">
      <div className="input-group mb-3">
        <span className="input-group-text"><IoSearchOutline /></span>
        <select className="form-select">
         <option selected>Search Assignments</option>
         {courseAssignments.map(assignment => (
                  <option key={assignment._id} value={assignment._id}>{assignment._id}-{assignment.title}</option>
                ))}
      </select>
      </div>
    </div>
  </div>
</div>
    
    <button className="btn btn-lg btn-secondary text-start">
        <FiFilter className="me-2 fs-5" />
        Apply Filters
      </button><br /><br />
      <div id="wd-grades-tables" className="table-responsive">
      <table className="table table-striped table-custom">
        <thead>
          <tr>
            <th>Student Name</th>
            {courseAssignments.map(a => (
                <th key={a._id} className="assignment-header">
                <div>{a._id}</div>
                <div className="assignment-subtitle">Out of 100</div>
              </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td className="red-text">{s.firstName} {s.lastName}</td>
              {courseAssignments.map(a => {
                  const grade = s.grades.find(g => g.assignment === a._id);
                  return <td key={`${s._id}-${a._id}`} className="assignment-header">{grade ? `${grade.grade}%` : 'N/A'}</td>;
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    
  );
}