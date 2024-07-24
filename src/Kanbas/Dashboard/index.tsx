import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardProps {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: any) => void;
  updateCourse: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse
}) => {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>New Course
        <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addNewCourse}>Add</button>
        <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">Update</button>
      </h5><br/>
      <input value={course.name} className="form-control mb-2"
             onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <textarea value={course.description} className="form-control"
             onChange={(e) => setCourse({ ...course, description: e.target.value })} /><hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course) => (
          <div key={course._id} className="col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <img src={course.images} alt={`${course.name} Course Cover`} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
              <div className="card-body">
                <div className="wd-dashboard-course-link" style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                  {course.name}
                </div>
                <div className="wd-dashboard-course-title card-text" style={{ maxHeight: "48px", overflow: "hidden" }}>
                  {course.description}
                </div>
                <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
                <button onClick={() => deleteCourse(course._id)} className="btn btn-danger float-end"
                        id="wd-delete-course-click">Delete</button>
                <button onClick={() => setCourse(course)} className="btn btn-warning me-2 float-end"
                        id="wd-edit-course-click">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
